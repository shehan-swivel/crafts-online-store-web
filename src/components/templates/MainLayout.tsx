import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import MainAppBar from "../organisms/MainAppBar";
import MainFooter from "../organisms/MainFooter";

type MainLayoutProps = {
  children: ReactNode;
};

const Main = styled("main")({
  minHeight: "calc(100vh - 360px)",
});

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
