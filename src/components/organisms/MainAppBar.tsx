import useConfirm from "@/hooks/useConfirm";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Logo from "../atoms/Logo";
import NextLink from "next/link";
import { useRouter } from "next/router";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Search from "../molecules/Search";
import RoundedButton from "../atoms/RoundedButton";
import CartButton from "../molecules/CartButton";

type MainAppBarProps = {};

const menuItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Shop",
    to: "/shop",
  },
];

const MainAppBar = ({}: MainAppBarProps) => {
  const router = useRouter();

  const search = (value: string) => {
    console.log(value);
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Logo width={200} height={64} />

        <Box flexGrow={1}>
          {menuItems.map((menu) => (
            <Link
              href={menu.to}
              key={menu.to}
              mr={4}
              component={NextLink}
              underline="none"
              fontWeight="bold"
              color="text.secondary"
              className={router.pathname == menu.to ? "active" : ""}
            >
              {menu.label}
            </Link>
          ))}
        </Box>

        <Search placeholder="Search" size="small" onSearch={search} sx={{ mr: 3 }} />
        <CartButton />
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
