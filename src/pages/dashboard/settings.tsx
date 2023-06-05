import AdminLayout from "@/components/templates/AdminLayout";
import { ReactNode } from "react";

const Settings = () => {
  return <div>Settings</div>;
};

Settings.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Settings;
