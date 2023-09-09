import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const MobileNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="flex md:hidden flex-row items-center px-8 py-8 justify-between bg-[#fff] text-[#000] z-10">
        <h2 className="font-semibold text-[20px]">Reh-A</h2>
        <AiOutlineMenu
          className="text-[24px] cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      </div>
      {showMenu && (
        <>
          <div
            className="fixed bg-[#000] opacity-60 top-0 right-0 left-0 bottom-0 w-full z-20"
            onClick={() => setShowMenu(false)}
          ></div>
          <div
            className={`flex flex-col fixed top-0 transition ease-in-out h-[100vh] duration-3000 bg-[#FFF] text-[#000] z-50 w-[65%]`}
          >
            <div className="flex flex-row items-center px-8 py-8 justify-between bg-[#fff] text-[#000]">
              <h2 className="font-semibold text-[20px]">Reh-A</h2>
              <AiOutlineClose
                className="text-[24px] cursor-pointer"
                onClick={() => setShowMenu(false)}
              />
            </div>
            <ul className="flex flex-col">
              <Link href="/app">
                <li className="hover:font-semibold text-[18px] cursor-pointer px-8 py-4 hover:bg-[#0081FE] hover:text-white">
                  Book your Slot
                </li>
              </Link>
              <Link href="#about" scroll={false}>
                <li
                  className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                  onClick={() => setShowMenu(false)}
                >
                  About
                </li>
              </Link>
              <Link href="#services" scroll={false}>
                <li
                  className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                  onClick={() => setShowMenu(false)}
                >
                  Services
                </li>
              </Link>
              <Link href="/blogs">
                <li
                  className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                  onClick={() => setShowMenu(false)}
                >
                  Blogs
                </li>
              </Link>
              <Link href="/signin">
                <li
                  className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                  onClick={() => setShowMenu(false)}
                >
                  Sign in
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNavbar;
