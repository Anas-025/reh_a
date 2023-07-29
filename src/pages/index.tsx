import Main from "components/Landing/Main/Main";
import { useEffect } from "react";
import Footer from "../../components/Landing/Footer/Footer";
import Hero from "../../components/Landing/Hero/Hero";
import Services from "../../components/Landing/Services/Services";
import SignIn from "../../components/general/SignIn/SignIn";

export default function Home() {
  useEffect(() => {
    window.localStorage.getItem("loggedIn") == "true" &&
      window.location.replace("/app");
  }, []);
  return (
    <>
      <Hero />
      <Main />
      <Services />
      <div style={{ marginTop: "8rem" }}>
        <SignIn />
      </div>
      <Footer />
    </>
  );
}
