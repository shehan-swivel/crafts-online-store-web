import StatCard from "@/components/molecules/StatCard";
import OrdersChart from "@/components/organisms/OrdersChart";
import TopSellingProducts from "@/components/organisms/TopSellingProducts";
import AdminLayout from "@/components/templates/AdminLayout";
import useAppSelector from "@/hooks/useAppSelector";
import { wrapper } from "@/store";
import { getAnalytics } from "@/store/slices/stat-slice";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import ShoppingCartCheckoutTwoToneIcon from "@mui/icons-material/ShoppingCartCheckoutTwoTone";
import { Grid, useTheme } from "@mui/material";
import type { ReactNode } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const data = useAppSelector((state) => state.stats.analytics.data);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Orders"
            value={data?.totalOrders}
            icon={ShoppingBagTwoToneIcon}
            color={theme.gradients.blue}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Pending Orders"
            value={data?.pendingOrders}
            icon={ShoppingCartCheckoutTwoToneIcon}
            color={theme.gradients.purple}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Products"
            value={data?.totalProducts}
            icon={Inventory2TwoToneIcon}
            color={theme.gradients.orange1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Revenue"
            value={data?.totalRevenue}
            icon={AccountBalanceTwoToneIcon}
            color={theme.gradients.orange2}
            subtitle="LKR"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
          <OrdersChart data={data?.orderCountPerDay} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopSellingProducts products={data?.topSellingProducts} />
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getAnalytics());

  return {
    props: {},
  };
});

export default Dashboard;
