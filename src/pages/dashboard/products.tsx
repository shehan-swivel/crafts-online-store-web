import AdminLayout from "@/components/templates/AdminLayout";
import { ReactNode } from "react";

const Products = () => {
  return <div>Products</div>;
};

Products.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Products;
