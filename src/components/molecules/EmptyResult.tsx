import SearchOffTwoToneIcon from "@mui/icons-material/SearchOffTwoTone";
import { Box, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ReactNode } from "react";

type EmptyResultProps = {
  message?: string;
  icon?: ReactNode;
  variant?: Variant;
  action?: ReactNode;
};

const EmptyResult = ({
  message = "No data to display",
  icon,
  variant = "subtitle1",
  action,
}: EmptyResultProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="inherit"
    >
      {icon ? icon : <SearchOffTwoToneIcon fontSize="large" color="disabled" />}
      <Typography color="textSecondary" variant={variant} gutterBottom mb={2}>
        {message}
      </Typography>

      {action}
    </Box>
  );
};

export default EmptyResult;
