import useAppSelector from "@/hooks/useAppSelector";
import { cartTotalPriceSelector } from "@/store/slices/cart-slice";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import RoundedButton from "../atoms/RoundedButton";
import SummaryRow from "../molecules/SummaryRow";

const CartSummary = () => {
  const total = useAppSelector(cartTotalPriceSelector);
  const shippingCost = useAppSelector((state) => state.cart.shippingCost);

  return (
    <Paper className="shadow" sx={{ p: 3 }} aria-label="cart summary">
      <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
        Summary
      </Typography>
      <SummaryRow label="Subtotal" value={total} />
      <SummaryRow label="Shipping" value={shippingCost} />
      <Divider sx={{ mt: 2, mb: 3 }} />
      <SummaryRow label="Total" value={total} />

      <RoundedButton
        variant="contained"
        disableElevation
        fullWidth
        sx={{ mt: 2 }}
        size="large"
        LinkComponent={Link}
        href="/checkout"
      >
        Process to Checkout
      </RoundedButton>
    </Paper>
  );
};

export default CartSummary;
