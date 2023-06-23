import AdminHeader from "@/components/molecules/AdminHeader";
import AppDialog from "@/components/molecules/AppDialog";
import ProductForm from "@/components/organisms/ProductForm";
import ProductsTable from "@/components/organisms/ProductsTable";
import AdminLayout from "@/components/templates/AdminLayout";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import useDebounce from "@/hooks/useDebounce";
import { getProducts } from "@/store/slices/product-slice";
import { Product } from "@/types";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Button from "@mui/material/Button";
import { ReactNode, useEffect, useState } from "react";

const initialValues: Product = {
  name: "",
  description: "",
  price: 0,
  qty: 0,
  category: "",
  image: undefined,
};

const Products = () => {
  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.products.query);
  const debouncedQuery = useDebounce(query, 300);

  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [defaultValues, setDefaultValues] = useState(initialValues);

  const handleOpenDialog = (row?: Product) => {
    if (row) {
      setDialogTitle("Edit Product");
      setIsEdit(true);
      setDefaultValues(row);
    } else {
      setDialogTitle("Add Product");
      setIsEdit(false);
      setDefaultValues(initialValues);
    }

    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getProducts(debouncedQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <div>
      <AdminHeader
        title="Products"
        extra={
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddTwoToneIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Product
          </Button>
        }
        sx={{ mb: 4 }}
      />

      <ProductsTable onEdit={handleOpenDialog} />

      <AppDialog open={isOpen} title={dialogTitle} onClose={handleCloseDialog}>
        <ProductForm isEdit={isEdit} defaultValues={defaultValues} onClose={handleCloseDialog} />
      </AppDialog>
    </div>
  );
};

Products.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Products;
