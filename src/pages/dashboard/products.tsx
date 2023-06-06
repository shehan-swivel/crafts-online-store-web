import AdminHeader from "@/components/molecules/AdminHeader";
import AdminLayout from "@/components/templates/AdminLayout";
import { ReactNode, useState } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Button from "@mui/material/Button";
import ProductsTable from "@/components/organisms/ProductsTable";
import AppDialog from "@/components/molecules/AppDialog";
import ProductForm from "@/components/organisms/ProductForm";
import { Product } from "@/types";
import { ProductCategory } from "@/constants";

const defaultValues: Product = {
  name: "",
  description: "",
  price: 0,
  qty: 0,
  category: "",
  image: "",
};

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const handleOpenDialog = (row?: Product) => {
    if (row) {
      setDialogTitle("Edit Product");
    } else {
      setDialogTitle("Add Product");
    }

    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = (values: Product) => {
    console.log(values);
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
        <ProductForm defaultValues={defaultValues} onSubmit={handleSubmit} onClose={handleCloseDialog} />
      </AppDialog>
    </div>
  );
};

Products.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Products;
