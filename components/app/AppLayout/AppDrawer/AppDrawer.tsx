import { Theme } from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { AppNavList } from "types/app";

interface AppDrawerProps {
  open: boolean;
  navList: AppNavList[]
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const drawerWidth = 270;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }: { theme: Theme; open: boolean }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AppDrawer = ({
  open,
  navList,
  handleDrawerOpen,
  handleDrawerClose,
}: AppDrawerProps) => {
  return (
    <Drawer variant="permanent" open={open} className="hidden md:block">
      <DrawerHeader>
        <Typography className="m-auto" variant="h5">
          R-A
        </Typography>
      </DrawerHeader>
      <Divider />

      <List>
        <ListItemButton
          sx={{
            height: "auto",
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            paddingX: "20px",
            paddingY: "25px",
          }}
          className="flex m-auto w-full justify-start"
          onClick={!open ? handleDrawerOpen : handleDrawerClose}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
            id="drawerBtn"
          >
            <ArrowForwardOutlinedIcon
              sx={{ transform: "rotate(180deg)" }}
              fontSize="medium"
              color="action"
            />
          </ListItemIcon>
        </ListItemButton>

        <div
          className="absolute top-[100px] left-[10px] right-[10px] h-[50px] bg-black rounded-[15px] transition-all ease-in-out duration-300"
          id="bar"
        ></div>

        {navList.map((item, index) => (
          <Link key={index} href={item.link}>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                color: index == 0 ? "white" : "black",
              }}
              id={`item${index}`}
              className="transition-all duration-500"
            >
              <ListItemButton
                sx={{
                  height: "auto",
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  paddingX: "20px",
                  paddingY: "25px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: index == 0 ? "white" : "black",
                  }}
                  id={`icon${index}`}
                >
                  <item.icon />
                </ListItemIcon>

                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default AppDrawer;
