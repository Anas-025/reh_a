import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.jpeg";
import { useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer";
import drawerList from "./constants";
// import MobileNavbar from "../MobileNavbar/MobileNavbar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <div className="flex flex-row items-center px-4 md:px-16 py-8 w-full justify-between">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={60}
            style={{ marginLeft: "1rem" }}
            className="md:w-[60px] w-[40px] cursor-pointer"
          />
        </Link>

        <ul className="flex gap-8 h-full">
          <ul className="hidden md:flex flex-row gap-8 items-center">
            <li>
              <Link href="/about" scroll={false}>
                About
              </Link>
            </li>
            <li>
              <Link href="/#services" scroll={false}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/blogs">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact&nbsp;us</Link>
            </li>
            <li>
              <Link href="/signin">Sign in</Link>
            </li>
            <Link href="/app">
              <li className="bg-[#fab800] rounded-[8px] text-[white] font-[600] px-8 py-3 hover:bg-[#FAB800] hover:border-[#FAB800]">
                Book your Slot
              </li>
            </Link>
          </ul>
          <div className="md:hidden">
            <MenuRoundedIcon fontSize="large" onClick={handleDrawerToggle}/>
          </div>
        </ul>
      </div>

      {/* it will only render for mobile devices (handeled inside the component) */}
      {/* <MobileNavbar /> */}
      <SideDrawer
        sx={{ display: { "@media (min-width:768px)": "none" } }}
        drawerList={drawerList}
        handleDrawerToggle={handleDrawerToggle}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
        logout={false}
      />
    </>
  );
};

export default Navbar;
