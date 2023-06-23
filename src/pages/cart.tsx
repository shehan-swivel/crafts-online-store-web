import EmptyResult from "@/components/molecules/EmptyResult";
import CartSummary from "@/components/organisms/CartSummary";
import CartTable from "@/components/organisms/CartTable";
import MainLayout from "@/components/templates/MainLayout";
import useAppSelector from "@/hooks/useAppSelector";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cart.items);

  return (
    <>
      <Head>
        <title>Craftify | Cart</title>
      </Head>

      {cartItems?.length ? (
        <Container sx={{ py: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <CartTable data={cartItems} />
            </Grid>
            <Grid item xs={12} md={4}>
              <CartSummary />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <EmptyResult
          variant="h6"
          message="Your cart is empty"
          icon={<ProductionQuantityLimitsTwoToneIcon color="disabled" fontSize="large" />}
          action={
            <Button variant="contained" LinkComponent={Link} href="/shop">
              Continue Shopping
            </Button>
          }
        />
      )}
    </>
  );
};

Cart.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Cart;
