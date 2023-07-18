import Hero from "../../components/general/Hero/Hero";
import Footer from "../../components/general/Footer/Footer";
import SignIn from "../../components/general/SignIn/SignIn";
import Services from "../../components/general/Services/Services";
import Main from "components/general/Main/Main";
import { useEffect } from "react";

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
