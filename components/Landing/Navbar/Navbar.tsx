import React from "react";
import MobileNavbar from "../../general/MobileNavbar/MobileNavbar";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="hidden md:flex flex-row items-center px-16 py-8 justify-end absolute top-0 right-0">
        <ul className="flex flex-row gap-8 items-center">
          <li>
            <Link href="#about" scroll={false}>
              About
            </Link>
          </li>
          <li>
            <Link href="#services" scroll={false}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/blogs">Blog</Link>
          </li>
          <li>
            <Link href="/signin">Sign in</Link>
          </li>
          <Link href="/app">
            <li className="border-[1px] border-[#D9D9D9] rounded-full px-5 py-1.5 hover:bg-[#0081FE] hover:border-[#0081FE] transition-all duration-500">
              Book your Slot
            </li>
          </Link>
        </ul>
      </div>

      {/* it will only render for mobile devices (handeled inside the component) */}
      <MobileNavbar />
    </>
  );
};

export default Navbar;
