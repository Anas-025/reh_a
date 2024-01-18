import { Button } from "@mui/material";
import Loading from "Providers/Loading";
import { useUser } from "components/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import Card from "./Card/Card";
import NewAppointmentCard from "./NewAppointmentCard";

interface Props {
  sessionCount: number;
}

const CaseCards = (props: Props) => {
  const { user, userLoading } = useUser();
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionCount, setSessionCount] = useState(props.sessionCount);
  const router = useRouter();

  const getAppointmentData = async () => {
    setLoading(true);
    if (userLoading === "loaded") {
      const appoinments = await getDocs(
        collection(db, `Userdata/${user.uid}/cases`)
      );
      const appointmentsData = appoinments.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setLoading(false);
      setAppointmentsData(appointmentsData);
    }
  };

  useEffect(() => {
    getAppointmentData();
  }, []);

  return loading ? (
    <Loading message="Loading Appointments..." />
  ) : (
    <>
      <div
        className="ml-0 pl-4 py-4 rounded mt-6  md:ml-6 flex flex-wrap gap-5 items-center"
        style={{ background: "rgb(242 242 242)" }}
      >
        <h1 className="text-2xl">No. of meeting left: {sessionCount}</h1>
        <Button
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "rgb(250 184 0)!important",
            "&:hover": { backgroundColor: "rgb(233, 171, 2)!important" },
          }}
          onClick={() => router.push("/app/buyMore")}
        >
          Buy More
        </Button>
      </div>
      <div
        className={`flex flex-row flex-wrap justify-center md:justify-start gap-8 text-[#000] px-8 py-8`}
      >
        {appointmentsData?.map((caseData, index) => {
          return <Card userId={user.uid} caseData={caseData} serial={index+1} getAppointmentData={getAppointmentData}/>;
        })}
        <NewAppointmentCard getAppointmentData={getAppointmentData} />
      </div>
    </>
  );
};

export default CaseCards;
