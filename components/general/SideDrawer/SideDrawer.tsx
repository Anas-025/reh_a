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
import { Dispatch, SetStateAction, useEffect } from "react";
import { AppDrawerList } from "types/app";
import Avatar from "../Avatar/Avatar";

interface SideDrawerProps {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  handleDrawerToggle: () => void;
  drawerList: AppDrawerList[];
}

export default function SideDrawer({
  mobileOpen,
  setMobileOpen,
  handleDrawerToggle,
  drawerList,
}: SideDrawerProps) {
  const router = useRouter();
  const drawerWidth = 240;

  const handleLogOutClick = async () => {
    try {
      await auth.signOut();
      if (typeof window !== "undefined") {
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
    typeof window !== "undefined" ? () => window.document.body : undefined;

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
            {drawerList.map((item, index) => (
              <Link href={item.link} key={`drawer-${index}`}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ paddingBlock: "1rem" }}>
                    <ListItemIcon sx={{ color: "black!important" }}>
                      <item.icon />
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
