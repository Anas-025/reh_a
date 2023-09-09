import { Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Avatar from "../Avatar/Avatar";
import sidebar from "./AppNavBar.module.css";

const drawerWidth = 270;


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 100,
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



export default function AppNavBar({ open }: { open: boolean }) {
  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "white", borderBottom: "1px solid #0000001f" }}
        elevation={0}
        className={sidebar.testBar}
      >
        <Toolbar>
          <div className={sidebar.allNavContent}>
            <Typography
              variant="h6"
              id="NavLogo"
              className={sidebar.navLogo}
              sx={{ color: "black", position: "relative" }}
            >
              R
            </Typography>
            <div
              style={{ color: "black" }}
              id="NavTitle"
              className={sidebar.navBarContent}
            >
              <Avatar />
            </div>
          </div>
          {/*--------------------------------------Navbar content -------------------------------------  */}
        </Toolbar>
      </AppBar>
    </>
  );
}
