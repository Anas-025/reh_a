import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { useUser } from "components/UserContext";
import Loading from "components/general/Loading/Loading";
import { useState } from "react";
import AppStructure from "../../components/general/AppStructure/AppStructure";

interface LayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Layout(props: LayoutProps) {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  if (user.accessToken)
    user?.getIdTokenResult().then((idTokenResult: any) => {
      setIsAdmin(idTokenResult.claims.admin);
      setLoading(false);
    });

  return loading ? (
    <Loading message="Loading Data..." />
  ) : (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppStructure isAdmin={isAdmin} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            paddingBottom: "3rem",
            paddingTop: "2rem",
          }}
        >
          <DrawerHeader />

          {props.children}
        </Box>
      </Box>
    </>
  );
}
