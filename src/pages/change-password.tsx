import AuthLayout from "@/components/templates/AuthLayout";
import React, { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChangePasswordForm from "@/components/organisms/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom mb={4} fontWeight="bold">
        Change Password
      </Typography>

      <Box maxWidth={400}>
        <ChangePasswordForm />
      </Box>
    </>
  );
};

ChangePassword.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ChangePassword;
