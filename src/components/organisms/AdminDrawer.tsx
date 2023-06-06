import ChevronLeftTwoToneIcon from "@mui/icons-material/ChevronLeftTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Divider from "@mui/material/Divider";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";

type AdminDrawerProps = {
  open: boolean;
  drawerWidth: number;
  onToggleDrawer: () => void;
};

type DrawerProps = MuiDrawerProps & {
  open: boolean;
  drawerWidth: number;
};

const menuItems = [
  {
    label: "Dashboard",
    icon: <DashboardTwoToneIcon />,
    to: "/dashboard",
  },
  {
    label: "Orders",
    icon: <ShoppingCartTwoToneIcon />,
    to: "/dashboard/orders",
  },
  {
    label: "Products",
    icon: <Inventory2TwoToneIcon />,
    to: "/dashboard/products",
  },
  {
    label: "Settings",
    icon: <SettingsTwoToneIcon />,
    to: "/dashboard/settings",
  },
];

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<DrawerProps>(({ theme, open, drawerWidth }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7),
      },
    }),
  },
}));

const AdminDrawer = ({ open, drawerWidth, onToggleDrawer }: AdminDrawerProps) => {
  const router = useRouter();

  return (
    <Drawer variant="permanent" className="shadow" open={open} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={onToggleDrawer}>
          <ChevronLeftTwoToneIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {menuItems.map((menu) => (
          <ListItemButton
            LinkComponent={Link}
            key={menu.label}
            href={menu.to}
            selected={router.pathname === menu.to}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminDrawer;
