import AdminHeader from "@/components/molecules/AdminHeader";
import AppDialog from "@/components/molecules/AppDialog";
import ProductForm from "@/components/organisms/ProductForm";
import ProductsTable from "@/components/organisms/ProductsTable";
import AdminLayout from "@/components/templates/AdminLayout";
import { wrapper } from "@/store";
import { getProducts } from "@/store/slices/product-slice";
import { Product } from "@/types";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Button from "@mui/material/Button";
import { ReactNode, useState } from "react";

const initialValues: Product = {
  name: "",
  description: "",
  price: 0,
  qty: 0,
  category: "",
  image: undefined,
};

const Products = () => {
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getProducts({}));

  return {
    props: {},
  };
});

export default Products;
