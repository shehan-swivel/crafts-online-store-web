import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 160px)",
});

const DashboardLoader = () => {
  return (
    <LoaderWrapper data-testid="dashboard-loader">
      <CircularProgress size={60} color="info" />
    </LoaderWrapper>
  );
};

export default DashboardLoader;
