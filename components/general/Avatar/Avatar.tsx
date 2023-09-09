import { Box } from "@mui/material";
import AvatarMui from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { useUser } from "components/UserContext";
import { removeCookies } from "cookies-next";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import arrow_down from "../../../public/arrow_down.svg";
import { auth, db } from "../../firebase/firebase-config";
import styles from "./Avatar.module.css";

function Avatar({ withPopOver = true }: { withPopOver?: boolean }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const router = useRouter();
  const { user, userLoading } = useUser();
  const [displayName, setDisplayName] = useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogOutClick = async () => {
    try {
      await auth.signOut();
      if (window) {
        window.localStorage.setItem("loggedIn", "false");
      }
      removeCookies("uid");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const getProfileImage = async () => {
    if (userLoading === "loaded") {
      const docRef = doc(db, "Userdata", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDisplayName(data?.fname);
        if (data?.profileImageUrl) {
          setAvatar(data.profileImageUrl);
        } else {
          setAvatar(" ");
        }
      }
    }
  };

  useEffect(() => {
    // update avatar if it exists in the database
    const fetchProfile = async () => {
      await getProfileImage();
    };

    if (avatar === "") fetchProfile();
  }, [userLoading]);

  return (
    <>
      {withPopOver ? (
        <div>
          <Button
            sx={{ backgroundColor: "transparent!important" }}
            aria-describedby={id}
            onClick={handleClick}
          >
            <div className={styles.down_arrow}>
              <Image src={arrow_down} alt="v" />
            </div>

            <AvatarMui
              alt={displayName}
              src={avatar}
              sx={{ marginLeft: "0.8rem", backgroundColor: "rgb(250 184 0)" }}
            />
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            elevation={0}
          >
            <Box
              sx={{
                px: 4,
                py: 3,
                border: "1px solid black",
                borderRadius: "4px",
              }}
            >
              <Button
                onClick={handleLogOutClick}
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "rgb(250 184 0)!important",
                  ":hover": { backgroundColor: "rgb(233, 171, 2)" },
                }}
              >
                Logout
              </Button>
            </Box>
          </Popover>
        </div>
      ) : (
        <AvatarMui
          alt={displayName}
          src={avatar}
          sx={{ marginLeft: "0.8rem", backgroundColor: "rgb(250 184 0)" }}
        />
      )}
    </>
  );
}

export default Avatar;
