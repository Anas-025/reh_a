import { db } from "components/firebase/firebase-config";
import AppointmentHeroImage from "components/general/Appointments/AppointmentHeroImage/AppointmentHeroImage";
import CaseCards from "components/general/Appointments/CaseCards";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";

const app = (props: any) => {
  const user = JSON.parse(props.userString);
  const sessionCount = user.meetingsLeft || "error";

  return (
    <>
      <AppointmentHeroImage />
      <CaseCards sessionCount={sessionCount} />
    </>
  );
};

export default app;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const uid = ctx.req.cookies.uid as string;

  if(uid === undefined) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const userRef = doc(db, "Userdata", uid);
  const uerSnap = await getDoc(userRef);
  if (uerSnap.exists()) {
    const user = uerSnap.data();
    const userString = JSON.stringify(user);
    return {
      props: {
        userString,
      },
    };
  }
  return {
    props: {
      userString: "{}",
    },
  };
};
