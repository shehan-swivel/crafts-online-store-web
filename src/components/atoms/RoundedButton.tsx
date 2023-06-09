import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const Button = styled(MuiButton)({
  borderRadius: 50,
});

const RoundedButton = (props: MuiButtonProps) => {
  return <Button {...props}>{props.children}</Button>;
};

export default RoundedButton;
