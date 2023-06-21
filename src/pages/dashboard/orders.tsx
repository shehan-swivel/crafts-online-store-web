import AdminHeader from "@/components/molecules/AdminHeader";
import DashboardLoader from "@/components/molecules/DashboardLoader";
import OrdersTable from "@/components/organisms/OrdersTable";
import AdminLayout from "@/components/templates/AdminLayout";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { getOrders } from "@/store/slices/order-slice";
import { ReactNode, useEffect } from "react";

const Orders = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.orders.all);

  useEffect(() => {
    dispatch(getOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <DashboardLoader />;
  } else {
    return (
      <div>
        <AdminHeader title="Orders" sx={{ mb: 4 }} />

        <OrdersTable />
      </div>
    );
  }
};

Orders.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Orders;
