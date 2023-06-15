import AuthLayout from "@/components/templates/AuthLayout";
import React, { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import ChangePasswordForm from "@/components/organisms/ChangePasswordForm";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const ChangePassword = () => {
  const router = useRouter();

  const handleSuccess = () => router.push("/dashboard");

  return (
    <>
      <Typography variant="h5" gutterBottom mb={3} fontWeight="bold">
        Change Password
      </Typography>

      <Box maxWidth={400}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          You are required to change the default password.
        </Alert>

        <ChangePasswordForm onSuccess={handleSuccess} />
        <Button
          variant="text"
          LinkComponent={Link}
          href="/dashboard"
          color="secondary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Skip for Now
        </Button>
      </Box>
    </>
  );
};

ChangePassword.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ChangePassword;
