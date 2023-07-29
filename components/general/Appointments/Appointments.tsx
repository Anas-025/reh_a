import Loading from "Providers/Loading";
import { useUser } from "components/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import AppointmentCard from "./AppointmentCard";
import NewAppointmentCard from "./NewAppointmentCard";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Appointments = ({ sessionCount }: { sessionCount: number }) => {
  const { user, userLoading } = useUser();
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
        className="ml-0 pl-4 py-4 rounded mt-6  md:ml-6 flex gap-5 items-center"
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
          onClick={() => router.push("/app/pay")}
        >
          Buy More
        </Button>
      </div>
      <div
        className={`flex flex-row flex-wrap justify-center md:justify-start gap-8 text-[#000] px-8 py-8`}
      >
        {appointmentsData?.map((appointment, index) => {
          return (
            <AppointmentCard
              key={index + 1}
              id={appointment.id}
              user={user}
              number={index + 1}
              name={appointment.caseName}
              date={appointment.createdAt.toDate().toDateString()}
              getAppointmentData={getAppointmentData}
            />
          );
        })}
        <NewAppointmentCard getAppointmentData={getAppointmentData} />
      </div>
    </>
  );
};

export default Appointments;
