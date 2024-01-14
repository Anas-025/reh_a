import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.jpeg";
import MobileNavbar from "../MobileNavbar/MobileNavbar";

const Navbar = () => {
  return (
    <>
      <div className="hidden md:flex flex-row items-center px-16 py-8 w-full justify-between absolute top-0 right-0">
        <Link href="/">
          <Image src={logo} alt="logo" width={60} style={{marginLeft: "1rem"}} />
        </Link>

        <ul className="flex flex-row gap-8 items-center">
          <li>
            <Link href="/about" scroll={false}>
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
            <li className="bg-[#fab800] rounded-[8px] text-[white] font-[600] px-8 py-3 hover:bg-[#FAB800] hover:border-[#FAB800]">
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
