import MainLayout from "@/components/templates/MainLayout";
import React, { ReactNode } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CartTable from "@/components/organisms/CartTable";
import CartSummary from "@/components/organisms/CartSummary";

const Cart = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <CartTable />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CartSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

Cart.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Cart;
