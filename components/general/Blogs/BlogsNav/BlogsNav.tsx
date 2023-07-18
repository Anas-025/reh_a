import BookIcon from "@mui/icons-material/Book";
import CottageIcon from "@mui/icons-material/Cottage";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton } from "@mui/material";
import Avatar from "components/general/Avatar/Avatar";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { scrollTrigger } from "utils/scrollTrigger";
import SideDrawer from "../../SideDrawer/SideDrawer";
import styles from "./BlogsNav.module.css";

export default function BlogsNav({
  isAdmin,
  isLoggedIn,
}: {
  isAdmin: boolean;
  isLoggedIn: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const uid = getCookie("uid");

  let triggered = false;
  if (router.pathname === "/blogs") {
    [triggered] = scrollTrigger();
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerList = [
    {
      name: "Home",
      link: "/app",
      icon: <CottageIcon />,
    },
    {
      name: "Book Appointment",
      link: "/app",
      icon: <BookIcon />,
    },
    {
      name: "Edit",
      link: `/blogs/edit/${id}`,
      icon: <EditIcon />,
    },
  ];

  if (!router.pathname.startsWith("/blogs/read/")) {
    drawerList.pop();
  }

  return (
    <>
      <nav
        className={styles.nav}
        style={{
          position: triggered ? "fixed" : "unset",
          animationName: triggered ? styles.navSlide : "unset",
        }}
      >
        <Link href="/blogs" className={styles.logo}>
          R-A
        </Link>

        <div className={styles.btnContainer}>
          <div className={styles.navBtns}>
            <Link href="/app" className={styles.bookBtn}>
              Book Slot
            </Link>

            {isLoggedIn ? (
              <div style={{ marginLeft: "1rem" }}>
                <Avatar />
              </div>
            ) : (
              <Link href="/signin" className={styles.signinBtn}>
                Sign In
              </Link>
            )}

            {router.pathname.startsWith("/blogs/read/") && isAdmin ? (
              <>
                <span style={{ marginInline: "1rem", fontSize: "1.5rem" }}>
                  /
                </span>

                <Button color="inherit">
                  <Link href={`/blogs/edit/${id}`} className={styles.signupBtn}>
                    Edit
                    <EditIcon
                      sx={{ fontSize: "1.4rem", marginLeft: "0.5rem" }}
                    />
                  </Link>
                </Button>
              </>
            ) : null}
          </div>

          <div className={styles.hamburger}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </nav>

      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <SideDrawer
        drawerList={drawerList}
        handleDrawerToggle={handleDrawerToggle}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
      />
    </>
  );
}
