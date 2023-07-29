import AppointmentHeroImage from "components/general/Appointments/AppointmentHeroImage/AppointmentHeroImage";
import Appointments from "components/general/Appointments/Appointments";
import { db } from "components/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";

const app = (props: any) => {
  const user = JSON.parse(props.userString);
  const sessionCount = user.sessionCount || 0;

  return (
    <>
      <AppointmentHeroImage />
      <Appointments sessionCount={sessionCount} />
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
