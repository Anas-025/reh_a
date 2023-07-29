import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { useUser } from "components/UserContext";
import Loading from "components/general/Loading/Loading";
import { auth } from "components/general/firebase-config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function Layout(props: LayoutProps ) {
  const { userLoading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const user = auth.currentUser;
  user?.getIdTokenResult().then((idTokenResult) => {
    setIsAdmin(idTokenResult.claims.admin);
    setLoading(false);
  });

  
  useEffect(() => {
    if (window) {
      if (window.localStorage.getItem("loggedIn") === "false") {
        router.push("/signin");
      }
    }
  }, []);

  

  return (
    <>
      {userLoading !== 'loaded' || loading ? (
        <Loading message="Loading Data..." />
      ) : 
      (
        <>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppStructure isAdmin={isAdmin}/>

            <Box component="main" sx={{ flexGrow: 1, paddingBottom: "3rem" }}>
              <DrawerHeader />

              {props.children}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

