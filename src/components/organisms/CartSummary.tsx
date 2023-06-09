import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { formatPrice } from "@/utils/common-utiils";
import RoundedButton from "../atoms/RoundedButton";

type SummaryRowProps = {
  label: string;
  value: string | number;
};

const CartSummary = () => {
  return (
    <Paper className="shadow" sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
        Summary
      </Typography>
      <SummaryRow label="Subtotal" value={2300} />
      <SummaryRow label="Shipping" value="Free" />
      <Divider sx={{ mt: 2, mb: 3 }} />
      <SummaryRow label="Total" value={2300}  />

      <RoundedButton variant="contained" disableElevation fullWidth sx={{ mt: 2 }} size="large">
        Process to Checkout
      </RoundedButton>
    </Paper>
  );
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography variant="body1" color="initial">
      {label}
    </Typography>
    <Typography variant="body1" color="initial" fontWeight="bold">
      {typeof value === "number" ? formatPrice(value) : value}
    </Typography>
  </Box>
);

export default CartSummary;
