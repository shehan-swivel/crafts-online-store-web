import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Logo from "../atoms/Logo";
import CartButton from "../molecules/CartButton";
import Search from "../molecules/Search";

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
        <NextLink href="/">
          <Logo width={200} height={64} />
        </NextLink>

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

        <CartButton />
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
