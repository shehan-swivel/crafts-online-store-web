import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import MainAppBar from "../organisms/MainAppBar";
import MainFooter from "../organisms/MainFooter";

type MainLayoutProps = {
  children: ReactNode;
};

const Main = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <MainAppBar />
      <Main>{children}</Main>
      <MainFooter />
    </>
  );
};

export default MainLayout;
