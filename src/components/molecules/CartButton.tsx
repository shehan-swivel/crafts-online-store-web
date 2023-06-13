import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { getCart } from "@/store/slices/cart-slice";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useEffect, useMemo } from "react";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const CartButton = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.cart.items);

  const cartItemsCount = useMemo(() => {
    let count = 0;

    cartItems.forEach((item) => {
      count += item.qty;
    });

    return count;
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IconButton aria-label="cart" color="inherit" href="/cart" LinkComponent={Link}>
      <StyledBadge badgeContent={cartItemsCount} color="secondary">
        <ShoppingCartTwoToneIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default CartButton;
