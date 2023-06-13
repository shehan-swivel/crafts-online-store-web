import EmptyResult from "@/components/molecules/EmptyResult";
import CartSummary from "@/components/organisms/CartSummary";
import CartTable from "@/components/organisms/CartTable";
import MainLayout from "@/components/templates/MainLayout";
import useAppSelector from "@/hooks/useAppSelector";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ReactNode } from "react";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import Button from "@mui/material/Button";
import Link from "next/link";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cart.items);

  if (cartItems.length) {
    return (
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
    );
  } else {
    return (
      <EmptyResult
        message="Your cart is empty"
        icon={<ProductionQuantityLimitsTwoToneIcon color="disabled" fontSize="large" />}
        action={
          <Button variant="contained" LinkComponent={Link} href="/shop">
            Continue Shopping
          </Button>
        }
      />
    );
  }
};

Cart.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Cart;
