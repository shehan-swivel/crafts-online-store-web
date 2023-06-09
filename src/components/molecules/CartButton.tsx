import useAppSelector from "@/hooks/useAppSelector";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const CartButton = () => {
  const cartItemsCount = useAppSelector((state) => state.cart.items.length);

  return (
    <IconButton aria-label="cart" color="inherit" href="/cart" LinkComponent={Link}>
      <StyledBadge badgeContent={cartItemsCount} color="secondary">
        <ShoppingCartTwoToneIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default CartButton;
