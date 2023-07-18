import Main from "components/general/Main/Main";
import { useEffect } from "react";
import Footer from "../../components/general/Footer/Footer";
import Hero from "../../components/general/Hero/Hero";
import Services from "../../components/general/Services/Services";
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

