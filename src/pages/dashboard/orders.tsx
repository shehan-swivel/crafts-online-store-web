import AdminHeader from "@/components/molecules/AdminHeader";
import OrdersTable from "@/components/organisms/OrdersTable";
import AdminLayout from "@/components/templates/AdminLayout";
import { ReactNode } from "react";

const Orders = () => {
  return (
    <div>
      <AdminHeader title="Orders" sx={{ mb: 4 }} />

      <OrdersTable />
    </div>
  );
};

Orders.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Orders;
