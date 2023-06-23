import RoundedButton from "@/components/atoms/RoundedButton";
import SpinnerIcon from "@/components/atoms/SpinnerIcon";
import SummaryRow from "@/components/molecules/SummaryRow";
import CheckoutForm from "@/components/organisms/CheckoutForm";
import MainLayout from "@/components/templates/MainLayout";
import useAppSelector from "@/hooks/useAppSelector";
import { cartTotalPriceSelector } from "@/store/slices/cart-slice";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { ReactNode } from "react";

const Checkout = () => {
  const total = useAppSelector(cartTotalPriceSelector);
  const paymentMethod = useAppSelector((state) => state.cart.paymentMethod);
  const submitState = useAppSelector((state) => state.orders.submit);

  return (
    <>
      <Head>
        <title>Craftify | Checkout</title>
      </Head>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Typography variant="h5" mb={3} fontWeight="bold">
              Billing details
            </Typography>
            <CheckoutForm />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper className="shadow" sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom mb={3}>
                Your Order
              </Typography>

              <SummaryRow label="Payment Method" value={paymentMethod} />
              <SummaryRow label="Total" value={total} />
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Kindly note that we only accept cash for COD orders. Credit cards, debit cards, or other
                electronic payment methods are not applicable for COD.
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                If you have any questions or need further assistance, please feel free to contact our
                customer support. Thank you for choosing our store!
              </Typography>

              <RoundedButton
                type="submit"
                variant="contained"
                disableElevation
                fullWidth
                sx={{ mt: 3 }}
                size="large"
                form="checkout-form"
                disabled={submitState.loading}
              >
                {submitState.loading ? <SpinnerIcon /> : "Place Order"}
              </RoundedButton>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Checkout.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Checkout;
