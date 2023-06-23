import { ProductCategory } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { addProduct, updateProduct } from "@/store/slices/product-slice";
import { Product } from "@/types";
import { convertFileToBase64 } from "@/utils/common-utils";
import { productFormSchema } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SpinnerIcon from "../atoms/SpinnerIcon";
import FileUpload from "../molecules/FileUpload";

type ProductFormProps = {
  isEdit: boolean;
  defaultValues: Product;
  onClose: () => void;
};

const ProductForm = ({ isEdit, defaultValues, onClose }: ProductFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues,
    resolver: yupResolver(productFormSchema),
  });

  const dispatch = useAppDispatch();
  const submitState = useAppSelector((state) => state.products.submit);

  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (file) {
      const imageUrl = await convertFileToBase64(file);
      setImageUrl(imageUrl);
      setImage(file);
    }
  };

  const submitForm = async (values: Product) => {
    const { name, description, price, qty, category } = values;

    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description as string);
    fd.append("price", price.toString());
    fd.append("qty", qty.toString());
    fd.append("category", category);
    fd.append("image", image ? (image as Blob) : (values.image as string));

    if (isEdit) {
      await dispatch(updateProduct({ id: values._id as string, data: fd }));
    } else {
      await dispatch(addProduct(fd));
    }

    onClose();
  };

  useEffect(() => {
    if (defaultValues.image) {
      setImageUrl(defaultValues.image as string);
    }
  }, [defaultValues]);

  return (
    <Box component="form" onSubmit={handleSubmit(submitForm)} sx={{ mt: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Product Name"
                autoFocus
                error={!!errors.name?.message}
                helperText={errors.name?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField {...field} fullWidth label="Description" sx={{ mb: 2 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label="Price"
                error={!!errors.price?.message}
                helperText={errors.price?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="qty"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label="Quantity"
                error={!!errors.qty?.message}
                helperText={errors.qty?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  {...field}
                  labelId="category-label"
                  label="Category"
                  sx={{ textTransform: "capitalize" }}
                  error={!!errors.category?.message}
                >
                  {Object.entries(ProductCategory).map(([value, label]) => (
                    <MenuItem key={value} value={value} sx={{ textTransform: "capitalize" }}>
                      {label?.toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors.category?.message}>
                  {errors.category?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <FileUpload
            onChange={handleFileSelect}
            icon={<AddTwoToneIcon />}
            label="Select Product image"
            accept="image/png, image/jpeg"
            imageUrl={imageUrl}
          />
        </Grid>
      </Grid>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button variant="text" color="inherit" sx={{ mr: 2 }} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="text" disabled={submitState.loading}>
          {submitState.loading ? <SpinnerIcon /> : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
