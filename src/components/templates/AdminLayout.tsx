import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import type { ReactNode } from "react";
import { useState } from "react";
import AdminAppBar from "../organisms/AdminAppBar";
import AdminDrawer from "../organisms/AdminDrawer";
import AdminFooter from "../organisms/AdminFooter";

type AdminLayoutProps = {
  children: ReactNode;
};

const drawerWidth = 240;

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminAppBar drawerWidth={drawerWidth} open={open} onToggleDrawer={toggleDrawer} />

      <AdminDrawer open={open} drawerWidth={drawerWidth} onToggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3, minHeight: "calc(100vh - 112px)" }}>{children}</Box>
        <AdminFooter />
      </Box>
    </Box>
  );
};

export default AdminLayout;
