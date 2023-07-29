import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import BookIcon from '@mui/icons-material/Book';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; //appoinment
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ImportContactsIcon from "@mui/icons-material/ImportContacts"; //blog
import PermIdentityIcon from "@mui/icons-material/PermIdentity"; //profile
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppNavBar from "../AppNavBar/AppNavBar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BottomNav from "./BottomNav/BottomNav";
import sidebar from "./Sidebar.module.css";

const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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
})(({ theme, open }) => ({
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

export default function MiniDrawer({isAdmin}) {
  const [open, setOpen] = useState(true);
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const [uid, setUid] = useState("hello");
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const normalList = [
    {
      id: 0,
      name: "My appoinments",
      icon: <CalendarMonthIcon />,
      link: "/app",
    },
    {
      id: 1,
      name: "Blogs",
      icon: <BookOutlinedIcon />,
      link: "/app/blogs",
    },
    {
      id: 2,
      name: "Profile",
      icon: <PermIdentityIcon />,
      link: "/app/profile",
    },
    
  ];

  const adminList = [
    {
      id: 3,
      name: "My Blogs",
      icon: <ImportContactsIcon />,
      link: "/app/myBlogs",
    },
    {
      id: 4,
      name: "Payment History",
      icon: <AccountBalanceWalletOutlinedIcon />,
      link: "/app/paymentHistory",
    },
    {
      id: 5,
      name: "Create Slots",
      icon: <ScheduleIcon />,
      link: "/app/createSlots",
    },
    {
      id: 6,
      name: "Meeting Data",
      icon: <GroupsOutlinedIcon />,
      link: "/app/meetingData",
    },
    {
      id: 7,
      name: "Analytics",
      icon: <AnalyticsOutlinedIcon />,
      link: "/app/analytics",
    },
  ];

  const navList = isAdmin ? [...normalList, ...adminList] : normalList;


  useEffect(() => {
    setUid(localStorage.getItem("uid"));

    const activeMenu = navList.find((item) => item.link === router.pathname);
    if(activeMenu){
      activeElement(activeMenu.id);
    }
  }, [router.pathname]);

  const handleDrawerOpen = () => {
    let drawerBtn = document.getElementById("drawerBtn");
    let navLogo = document.getElementById("NavLogo");
    let navItm = document.getElementById("NavTitle");

    navLogo.style = "opacity: 0; left: -10px";
    navItm.style = "margin-left: 0px";
    drawerBtn.style.rotate = "0deg";
    drawerBtn.style.transition = "0.5s ease";
    setOpen(true);
  };

  const handleDrawerClose = () => {
    let drawerBtn = document.getElementById("drawerBtn");
    let navItm = document.getElementById("NavTitle");
    let navLogo = document.getElementById("NavLogo");

    navLogo.style = "opacity: 1; left: 0px";
    navItm.style = "margin-left: 70px";
    drawerBtn.style.rotate = "180deg";
    drawerBtn.style.transition = "0.5s ease";
    setOpen(false);
  };

  const activeElement = (ind) => {
    let bar = document.getElementById("bar");
    let tp = 0;
    if (ind == 0) tp = 100;
    else if (ind == 1) tp = 181;
    else if (ind == 2) tp = 264;
    else if (ind == 3) tp = 346;
    else if (ind == 4) tp = 426;
    else if (ind == 5) tp = 508; 
    else if (ind == 6) tp = 590; 
    else tp = 672;

    document.getElementById(`item${current}`).style.color = "black";
    document.getElementById(`icon${current}`).children[0].style.color = "black";
    
    setCurrent(ind);
    

    bar.style.top = `${tp}px`;
    document.getElementById(`item${ind}`).style.color = "white";
    document.getElementById(`icon${ind}`).children[0].style.color = "white";


  };

  const drawerList = [
    {
      name: "My Blogs",
      icon: <BookIcon />,
      link: "/app/myBlogs",
    },
    {
      name: "Analytics",
      icon: <AnalyticsOutlinedIcon />,
      link: "/app/analytics",
    },
    {
      name: "Create Slots",
      icon: <ScheduleIcon />,
      link: "/app/createSlots",
    },
    {
      name: "Meetings Data",
      icon: <GroupsOutlinedIcon />,
      link: "/app/meetingData",
    },
  ];


  return (
    <>
      <AppNavBar open={open} />

      <Drawer variant="permanent" open={open} className={sidebar.view1}>
        <DrawerHeader>
          <Typography className={sidebar.drawerHead} variant="h5">
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
            className={sidebar.sidebarBtn}
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
              className={sidebar.sidebarIcn}
              id="drawerBtn"
            >
              <ArrowForwardOutlinedIcon
                sx={{ transform: "rotate(180deg)" }}
                fontSize="medium"
                color="action"
              />
            </ListItemIcon>
          </ListItemButton>

          <div className={sidebar.bar} id="bar"></div>

          {navList.map(
            (item, index) => (
              <Link key={index} href={item.link }   >
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    color: index == 0 ? "white" : "black",
                  }}
                  id={`item${index}`}
                  className={sidebar.elements}
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
                      {item.icon}
                      
                    </ListItemIcon>

                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0,  }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          )}
        </List>
        <Divider />
      </Drawer>


      {/* navigation bar for mobile view */}
      <BottomNav handleDrawerToggle={handleDrawerToggle} current={current}/>

      {/* rectractable drawer from hamburger */}
      <SideDrawer sx={{display: { "@media (min-width:768px)": "none" }}}  drawerList={drawerList} handleDrawerToggle={handleDrawerToggle} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen}/>
    </>
  );
}


