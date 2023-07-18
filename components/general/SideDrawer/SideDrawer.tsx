import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { auth } from "components/general/firebase-config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Avatar from "../Avatar/Avatar";

interface drawerList {
  name: string;
  icon: any;
  link: string;
}

interface Props {
  window?: () => Window;
  setMobieOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerList: drawerList[];
}

export default function SideDrawer(props: any) {
  const router = useRouter();
  const id = router.query.id;
  const { window } = props;
  const { mobileOpen, setMobileOpen, handleDrawerToggle, drawerList } = props;

  const drawerWidth = 240;

  const handleLogOutClick = async () => {
    try {
      await auth.signOut();
      if (window) {
        // @ts-ignore
        window.localStorage.setItem("loggedIn", "false");
      }
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar
            sx={{ justifyContent: "space-between", paddingBlock: "1.5rem" }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
            <Link href="/app/profile">
              <Avatar withPopOver={false} />
            </Link>
          </Toolbar>

          <Divider />

          <List>
            {drawerList.map((item: drawerList, index: number) => (
              <Link href={item.link} key={`drawer-${index}`}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ paddingBlock: "1rem" }}>
                    <ListItemIcon sx={{ color: "black!important" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}

            <ListItem key="logout" disablePadding>
              <ListItemButton
                sx={{ paddingBlock: "1rem" }}
                onClick={handleLogOutClick}
              >
                <ListItemIcon sx={{ color: "black!important" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
