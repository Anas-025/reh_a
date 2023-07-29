import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { auth } from "components/firebase/firebase-config";
import BlogsNav from "./BlogsNav/BlogsNav";

function BlogsLayout(props: any) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getIsAdmin = () => {
    try {
      const user = auth.currentUser;
      user?.getIdTokenResult().then((idTokenResult) => {
        setIsAdmin(idTokenResult.claims.admin);
      });
      setIsLoggedIn(user ? true : false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIsAdmin();
  }, []);

  return (
    <>
      <BlogsNav isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
      {props.children}
      <Footer />
    </>
  );
}

export default BlogsLayout;
