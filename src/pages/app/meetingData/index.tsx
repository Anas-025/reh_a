import { withAdmin } from "ProtectedRoutes/AdminRoute";
import { db } from "components/firebase/firebase-config";
import MeetingsTable from "components/general/MeetingsTable/MeetingsTable";
import { MeetingType } from "components/general/TableComponents/Table.interface";
import { collection, getDocs } from "firebase/firestore";

function index({ meetingsDataString }: { meetingsDataString: string }) {
  const rows = JSON.parse(meetingsDataString);
  return <MeetingsTable rows={rows} />;
}

export default withAdmin(index);

export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(db, "Meetings"));
  const meetingsData = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), meetingId: doc.id } as MeetingType)
  );

  const meetingsDataString = JSON.stringify(meetingsData);

  return { props: { meetingsDataString: meetingsDataString } };
}
