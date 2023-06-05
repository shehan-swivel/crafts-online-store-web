import Footer from "@/components/organisms/Footer";
import { Container } from "@mui/material";
import type { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default AdminLayout;
