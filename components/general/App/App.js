import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Appointments from "../Appointments/Appointments";
import BlogsGrid from "./BlogsGrid/BlogsGrid";
import AppStructure from "../AppStructure/AppStructure.js"


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



export default function MiniDrawer() {

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppStructure />


        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

            <Appointments />
            <BlogsGrid />

            
        </Box>
      </Box>

    </>
  );
}
