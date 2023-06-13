import SearchOffTwoToneIcon from "@mui/icons-material/SearchOffTwoTone";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type EmptyResultProps = {
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

const EmptyResult = ({ message = "No data to display", icon, action }: EmptyResultProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="inherit"
    >
      {icon ? icon : <SearchOffTwoToneIcon fontSize="large" color="disabled" />}
      <Typography color="textSecondary" variant="h6" gutterBottom mb={2}>
        {message}
      </Typography>

      {action}
    </Box>
  );
};

export default EmptyResult;
