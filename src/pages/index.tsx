import Footer from "components/Landing/Footer/Footer";
import Hero from "components/Landing/Hero/Hero";
import Main from "components/Landing/Main/Main";
import Services from "components/Landing/Services/Services";
import SignIn from "components/Landing/SignIn/SignIn";

export default function Home() {
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

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const cookieString = ctx.req.headers.cookie;
//   const cookies = cookieString?.split(";").reduce((acc, curr) => {
//     const [key, value] = curr.split("=");
//     acc[key.trim()] = value;
//     return acc;
//   }, {} as { [key: string]: string });

//   const userId = cookies?.uid;
//   console.log(userId)

//   if (userId){
//     return {
//       redirect: {
//         destination: "/app",
//       },
//     };
//   }


//   return {
//     props: {},
//   };
// };
