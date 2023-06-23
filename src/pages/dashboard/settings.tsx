import AdminHeader from "@/components/molecules/AdminHeader";
import Title from "@/components/molecules/Title";
import ChangePasswordForm from "@/components/organisms/ChangePasswordForm";
import AdminLayout from "@/components/templates/AdminLayout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { ReactNode } from "react";

const Settings = () => {
  return (
    <>
      <Head>
        <title>Craftify | Settings</title>
      </Head>

      <AdminHeader title="Settings" sx={{ mb: 4 }} />

      <Card className="shadow">
        <CardContent>
          <Title title="Security" subtitle="Change your security preferences below" />
        </CardContent>
        <Divider />

        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" color="initial" gutterBottom>
            Change Password
          </Typography>
          <Box maxWidth={400}>
            <ChangePasswordForm />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Settings;
