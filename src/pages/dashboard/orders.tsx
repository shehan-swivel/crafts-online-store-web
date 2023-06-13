import AdminHeader from "@/components/molecules/AdminHeader";
import OrdersTable from "@/components/organisms/OrdersTable";
import AdminLayout from "@/components/templates/AdminLayout";
import { getOrders } from "@/store/slices/order-slice";
import { ReactNode } from "react";
import { wrapper } from "@/store";

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

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getOrders());

  return {
    props: {},
  };
});

export default Orders;
