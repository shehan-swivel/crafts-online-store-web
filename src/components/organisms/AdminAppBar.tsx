import useAuth from "@/hooks/useAuth";
import useConfirm from "@/hooks/useConfirm";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

type AdminAppBarProps = {
  open: boolean;
  drawerWidth: number;
  onToggleDrawer: () => void;
};

type AppBarProps = MuiAppBarProps & {
  open: boolean;
  drawerWidth: number;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AdminAppBar = ({ open, drawerWidth, onToggleDrawer }: AdminAppBarProps) => {
  const { confirm } = useConfirm();
  const router = useRouter();
  const auth = useAuth();

  const logout = async () => {
    const isConfirmed = await confirm("Do you want to logout ?");

    if (isConfirmed) {
      auth.logout();
      router.push("/login");
    }
  };

  return (
    <AppBar
      position="absolute"
      color="inherit"
      className="shadow"
      enableColorOnDark
      open={open}
      drawerWidth={drawerWidth}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onToggleDrawer}
          sx={{
            mr: 2,
            ...(open && { display: "none" }),
          }}
        >
          <MenuTwoToneIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Online Crafts Store
        </Typography>
        <IconButton color="inherit" onClick={logout}>
          <LogoutTwoToneIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
