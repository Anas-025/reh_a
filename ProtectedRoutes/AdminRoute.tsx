// adminRoute.tsx
import { Typography } from "@mui/material";
import { auth } from "components/firebase/firebase-config";
import Loading from "components/general/Loading/Loading";
import { useRouter } from "next/router";
import { useState } from "react";

export function withAdmin<T>(Component: React.ComponentType<any>) {
  return function AdminComponent(props: any) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    const user = auth.currentUser;
    user?.getIdTokenResult().then((idTokenResult) => {
      setIsAdmin(idTokenResult.claims.admin || false);
    });
    
    if (isAdmin === true) {
      return  <Component {...props} />;
    } else if (isAdmin === null) {
      return <Loading message="Checking for Admin Priviledges" />;
    } else {
      router.back();
      return (
        <div style={{ height: "75vh", display: "grid", placeItems: "center" }}>
          <Typography variant="h3">Not Authorised</Typography>
        </div>
      );
    }
  };
}
