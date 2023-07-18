import MeetingsTable from "components/general/MeetingsTable/MeetingsTable";
import { MeetingType } from "components/general/TableComponents/Table.interface";
import { db } from "components/general/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";





function index({ meetingsDataString }: {meetingsDataString: string}) {
    
  const rows = JSON.parse(meetingsDataString);

  console.log(rows);

  return (
    <>
        <MeetingsTable rows={rows} />   
    </>
    );
}

export default index;




export async function getStaticProps() {
  const querySnapshot = await getDocs(collection(db, "Meetings"));
  const meetingsData = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), meetingId: doc.id } as MeetingType)
  );

  const updatedMeetings = await Promise.all(
    meetingsData.map(async (meeting) => {

        const docSnap = await getDoc(doc(collection(db, `Userdata/${meeting.userId}/cases`), meeting.caseId));

        if (docSnap.exists()) {
            return { ...meeting, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return meeting;
        }
    })
  );

  const meetingsDataString = JSON.stringify(updatedMeetings);


  return { props: { meetingsDataString: meetingsDataString } };
}
