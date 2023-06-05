import AdminLayout from "@/components/templates/AdminLayout";
import type { ReactNode } from "react";

export default function Dashboard() {
  return <div>Dashboard page</div>;
}

Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
