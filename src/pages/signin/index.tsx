import SignIn from "components/Landing/SignIn/SignIn";
import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.jpeg";

const index = () => {
  return (
    <>
      <div
        style={{
          margin: "2rem 0 0 2rem",
        }}
      >
        <Link href="/">
          <Image src={logo} alt="Hero" width={50} height={50} />
        </Link>
      </div>
      <SignIn />
    </>
  );
};

export default index;
