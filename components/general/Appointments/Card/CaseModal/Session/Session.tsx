import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, styled } from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import { useMeeting } from "components/MeetingContext";
import { useUser } from "components/UserContext";
import { db } from "components/firebase/firebase-config";
import { createMeeting, getToken } from "controllers/meeting";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import {
  useContext,
  useEffect,
  useState
} from "react";

const Container = styled("div")(({ theme }) => ({
  border: "1px solid #B4B4B4",
  padding: "1rem",
  borderRadius: "10px",
  marginTop: "2rem",
  whiteSpace: "nowrap",
  flexShrink: 0,
}));

interface Props {
  meeting: any;
  caseId: string;
  setMeeting: any;
  meetingId: string;
}

function Session(props: Props) {
  const { caseId, meeting, setMeeting, meetingId } = props;
  // const [date, time] = slot.split(" ");
  const { updateToken, updateMeetingId } = useMeeting();
  const router = useRouter();
  const { user } = useUser();
  const { showDialog, showBackdrop, closeBackdrop, showSnackbar, showError } =
    useContext(GPCContext);
  const [meetId, setMeetId] = useState<string>("");
  const batch = writeBatch(db);
  const date = new Date(meeting?.seconds * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = new Date(meeting?.seconds * 1000).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  useEffect(() => {
    if (meetId) {
      updateMeetingsData(meetId);
    }
  }, [meetId]);

  const handleJoinMeetClick = async () => {
    const meetingDocSnap = await getDocs(collection(db, "Meetings"));
    const meetingAlreayExists = meetingDocSnap.docs.some(
      (doc) => doc.data().caseId === caseId
    );

    if (!meetingAlreayExists) {
      const token = await getToken();
      const _meetingId = await createMeeting({ token });
      updateToken(token);
      updateMeetingId(_meetingId);
      setMeetId(_meetingId);
    } else {
      const meetingId = meetingDocSnap.docs.filter(
        (doc) => doc.data().caseId === caseId
      )[0].id;
      updateMeetingId(meetingId);
      router.push(`/meeting?meetId=${meetingId}`);
    }
  };

  const updateMeetingsData = async (meetingId: any) => {
    const userRef = doc(db, "Userdata", user?.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();

      const batch = writeBatch(db);

      const meetingRef = doc(db, "Meetings", meetingId);

      batch.set(meetingRef, {
        userId: user?.uid,
        caseId: caseId,
        displayName: userData?.fname + " " + userData?.lname,
      });
      batch.set(userRef, { activeMeetingId: meetingId }, { merge: true });
      batch.commit();

      router.push(`/meeting?meetId=${meetingId}`);
    } else {
      console.log("No such document!");
    }
  };

  function dateDiffInDays(a: Date, b: Date, c: number, d: number) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const timeDiff = d - c;
    const dayDiff = Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
    return { dayDiff, timeDiff };
  }

  const handleDelete = async () => {
    console.log(meetingId)
    try {
      showBackdrop("Cancelling meeting");
      const date = new Date();
      const meetingDate = new Date(meeting.seconds * 1000)
      // @ts-ignore
      const diff = (Math.abs(date - meetingDate)) / (1000 * 60 * 60);
      const caseRef = doc(db, `Userdata/${user.uid}/cases`, caseId);
      const meetingRef = doc(db, "Meetings", meetingId);


      if (diff <= 24) {
        showError(
          "A meeting can not be cancelled within 24 hours of the scheduled time."
        );
        return;
      }

      batch.update(caseRef, {
        meeting: null
      });
      batch.delete(meetingRef);
      await batch.commit();
      setMeeting(null);
      showSnackbar("Meeting cancelled");
    } catch (err) {
      showError("Something went wrong");
      console.log(err);
    } finally {
      closeBackdrop();
    }
  };

  const handleClick = () => {
    showDialog(
      "Are you sure you want to cancel this meeting?",
      `A meeting can not be cancelled within 24 hours of the scheduled time.`,
      "Back",
      "Proceed",
      handleDelete
    );
  };


  return (
    <>
      <Container
        sx={{
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
          }}
          onClick={handleClick}
        >
          <DeleteIcon color="error" />
        </IconButton>

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
