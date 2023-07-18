import { Button, styled } from "@mui/material";
import { useMeeting } from "components/MeetingContext";
import { useUser } from "components/UserContext";
import { db } from "components/general/firebase-config";
import { createMeeting, getToken } from "controllers/meeting";
import { collection, doc, getDoc, getDocs, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Container = styled("div")(({ theme }) => ({
  border: "1px solid #B4B4B4",
  padding: "1rem",
  borderRadius: "10px",
  marginTop: "2rem",
  whiteSpace: "nowrap",
  flexShrink: 0,
}));

function Session({ slot, caseId }: { slot: string, caseId: string }) {
  const [date, time] = slot.split(" ");
  const { updateToken, updateMeetingId } = useMeeting();
  const router = useRouter();
  const { user } = useUser();

  const [meetId, setMeetId] = useState<string>("");

  useEffect(() => {
    if (meetId) {
      updateMeetingsData(meetId);
    }
  }, [meetId]);


  const handleJoinMeetClick = async () => {
    const meetingDocSnap = await getDocs(collection(db, "Meetings"));
    const meetingAlreayExists = meetingDocSnap.docs.some((doc) => doc.data().caseId === caseId);

    if (!meetingAlreayExists) {
      const token = await getToken();
      const _meetingId = await createMeeting({ token });
      updateToken(token);
      updateMeetingId(_meetingId);
      setMeetId(_meetingId);
    } else {
      const meetingId = meetingDocSnap.docs.filter((doc) => doc.data().caseId === caseId)[0].id;
      updateMeetingId(meetingId);
      router.push(`/meeting?meetId=${meetingId}`);
    }
  }

  const updateMeetingsData = async (meetingId: any) => {

      const userRef = doc(db, "Userdata", user?.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();

        const batch = writeBatch(db);

        const meetingRef = doc(db, "Meetings", meetingId);

        batch.set(meetingRef, { userId: user?.uid, caseId: caseId, displayName: userData?.fname + " " + userData?.lname })
        batch.set(userRef, { activeMeetingId: meetingId }, { merge: true });
        batch.commit();

        router.push(`/meeting?meetId=${meetingId}`)

      } else {
        console.log("No such document!");
      }
  };


  return (
    <>
      <Container>
        <h5 style={{ marginBottom: "1rem" }}>Meeting</h5>
        <div style={{ marginBottom: "0.5rem", whiteSpace: "normal" }}>
          Date of meeting: <b style={{ whiteSpace: "nowrap" }}>{date}</b>
        </div>
        <div style={{ marginBottom: "1.2rem", whiteSpace: "normal" }}>
          Time of meeting: <b style={{ whiteSpace: "nowrap" }}>{time}</b>
        </div>
        
          <Button
            disableElevation
            variant="contained"
            onClick={handleJoinMeetClick}
            sx={{
              backgroundColor: "hsl(44, 100%, 49%)!important",
              "&:hover": { backgroundColor: "hsl(44, 100%, 45%)!important" },
            }}
          >
            Join Meeting
          </Button>

        
      </Container>
    </>
  );
}

export default Session;
