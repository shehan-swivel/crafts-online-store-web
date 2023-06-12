import RoundedButton from "@/components/atoms/RoundedButton";
import SummaryRow from "@/components/molecules/SummaryRow";
import BillingForm from "@/components/organisms/BillingForm";
import MainLayout from "@/components/templates/MainLayout";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ReactNode, useState } from "react";

const Checkout = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" mb={3} fontWeight="bold">
            Billing details
          </Typography>
          <BillingForm />
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper className="shadow" sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom mb={3}>
              Your Order
            </Typography>

            <SummaryRow label="Payment Method" value="Cash on Delivery" />
            <SummaryRow label="Total" value={2300} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Kindly note that we only accept cash for COD orders. Credit cards, debit cards, or other
              electronic payment methods are not applicable for COD.
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              If you have any questions or need further assistance, please feel free to contact our customer
              support. Thank you for choosing our store!
            </Typography>

            <RoundedButton
              type="submit"
              variant="contained"
              disableElevation
              fullWidth
              sx={{ mt: 3 }}
              size="large"
              form="billing-form"
            >
              Place Order
            </RoundedButton>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

Checkout.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Checkout;
