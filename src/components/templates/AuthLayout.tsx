import { styled } from "@mui/material/styles";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "../atoms/Logo";

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
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Main>
      <Link href="/" style={{ marginBottom: 32 }}>
        <Logo width={240} height={64} />
      </Link>

      {children}
    </Main>
  );
};

export default AuthLayout;
