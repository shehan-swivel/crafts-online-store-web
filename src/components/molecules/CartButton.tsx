import React from "react";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Badge, { BadgeProps } from "@mui/material/Badge";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const CartButton = () => {
  return (
    <IconButton aria-label="cart" color="inherit">
      <StyledBadge badgeContent={4} color="secondary">
        <ShoppingCartTwoToneIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default CartButton;
