import ChangePasswordForm from "@/components/organisms/ChangePasswordForm";
import AuthLayout from "@/components/templates/AuthLayout";
import { StorageKeys } from "@/constants";
import { removeCookie } from "@/utils/cookie-utils";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const ChangePassword = () => {
  const router = useRouter();

  const handleSuccess = () => {
    removeCookie(StorageKeys.REQUIRE_PASSWORD_CHANGE);
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Craftify | Change Password</title>
      </Head>

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
