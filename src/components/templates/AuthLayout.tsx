import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import Logo from "../atoms/Logo";
import Box from "@mui/material/Box";

type AuthLayoutProps = {
  children: ReactNode;
};

const Main = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Main>
      <Box mb={4}>
        <Logo width={240} height={64} />
      </Box>

      {children}
    </Main>
  );
};

export default AuthLayout;
