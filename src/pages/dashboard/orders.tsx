import AdminLayout from "@/components/templates/AdminLayout";
import { ReactNode } from "react";

const Orders = () => {
  return <div>orders</div>;
};

Orders.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Orders;
