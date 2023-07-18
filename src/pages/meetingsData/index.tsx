import { useMeeting } from "components/MeetingContext";
import { db } from "components/general/firebase-config";
import { endMeeting, getToken } from "controllers/meeting";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";

interface MeetingType {
  userId: string;
  meetingId: string;
  userData?: any;
}

interface MeetingsDataProps {
  meetingsData: MeetingType[];
}

// use JSON.parse(meeting.userData) to get the userData object

const MeetingsData = ({ meetingsData }: MeetingsDataProps) => {
  
  meetingsData.map((item)=>{
    console.log(JSON.parse(item.userData))
  })
  const router = useRouter();
  const { updateToken } = useMeeting();

  // get the user id from active and set its activeMeetingId field to null
  const handleMeetingSuccess = async (userId: string, meetingId: string) => {
    const docRef = doc(db, "Userdata", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      // if meetings field exists in docData append the cuurent timestamp in it if not create and append
      await setDoc(
        docRef,
        {
          meetings: docData.meetings
            ? [...docData.meetings, Timestamp.now()]
            : [Timestamp.now()],
          activeMeetingId: null,
        },
        { merge: true }
      );

      // await setDoc(docRef, { activeMeetingId: null }, { merge: true });
      await deleteDoc(doc(db, "Meetings", meetingId));

      // end the meeting
      const token = await getToken();
      const res = await endMeeting({ roomId: meetingId, token });
      updateToken(token);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <div>
      {meetingsData?.map((meeting) => {
        return (
          <>
            <div
              key={meeting.meetingId}
              className="flex p-1 items-center gap-2 bg-white"
            >
              <h1>
                {meeting.userId} - {meeting.meetingId}
              </h1>
              <button
                className="p-1 border-[1px] border-black rounded-lg"
                onClick={() =>
                  router.push({
                    pathname: "/meeting",
                    query: { meetId: meeting.meetingId },
                  })
                }
              >
                Join meeting
              </button>
              <button
                className="p-1 border-[1px] border-black rounded-lg"
                onClick={() =>
                  handleMeetingSuccess(meeting.userId, meeting.meetingId)
                }
              >
                Success
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default MeetingsData;

export async function getStaticProps() {
  const meetingCollectionRef = collection(db, "Meetings");
  const querySnapshot = await getDocs(meetingCollectionRef);
  const meetingsData = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), meetingId: doc.id } as MeetingType)
  );

  const updatedMeetings = await Promise.all(
    meetingsData.map(async (meeting) => {
      const docRef = doc(db, "Userdata", meeting?.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        return { ...meeting, userData: JSON.stringify(userData) };
      } else {
        console.log("No such document!");
        return meeting;
      }
    })
  );

  return { props: { meetingsData: updatedMeetings } };
}
