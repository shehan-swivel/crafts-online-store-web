import useAuth from "@/hooks/useAuth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Logo from "../atoms/Logo";
import CartButton from "../molecules/CartButton";

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

const MainAppBar = () => {
  const router = useRouter();
  const theme = useTheme();
  const auth = useAuth();

  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="sticky" color="inherit" className="shadow">
      {isMobileScreen && (
        <>
          <LogoLink />
          <Divider />
        </>
      )}

      <Toolbar>
        {!isMobileScreen && <LogoLink />}

        <Box flexGrow={1} pl={{ xs: 1, sm: 3 }}>
          {menuItems.map((menu) => (
            <Link
              href={menu.to}
              key={menu.to}
              mr={3}
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

        {auth.isAuthenticated && (
          <Button
            variant="contained"
            color="secondary"
            LinkComponent={NextLink}
            href="/dashboard"
            disableElevation
            sx={{ mr: 2 }}
          >
            Dashboard
          </Button>
        )}
        <CartButton />
      </Toolbar>
    </AppBar>
  );
};

const LogoLink = () => (
  <NextLink href="/" style={{ textAlign: "center", padding: 12 }} aria-label="logo link">
    <Logo width={180} height={32} />
  </NextLink>
);

export default MainAppBar;
