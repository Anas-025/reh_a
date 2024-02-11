import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, styled } from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import { useUser } from "components/UserContext";
import { db } from "components/firebase/firebase-config";
import { doc, writeBatch } from "firebase/firestore";
import { useContext } from "react";

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
  handleJoinMeetClick: () => void;
}

function Session(props: Props) {
  const { caseId, meeting, setMeeting, meetingId, handleJoinMeetClick } = props;
  // const [date, time] = slot.split(" ");
  const { user } = useUser();
  const { showDialog, showBackdrop, closeBackdrop, showSnackbar, showError } =
    useContext(GPCContext);
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

  const handleDelete = async () => {
    try {
      showBackdrop("Cancelling meeting");
      const date = new Date();
      const meetingDate = new Date(meeting.seconds * 1000);
      const caseRef = doc(db, `Userdata/${user.uid}/cases`, caseId);
      const meetingRef = doc(db, "Meetings", meetingId);
      // @ts-ignore
      const diff = (meetingDate - date) / (1000 * 60 * 60);

      if (diff >= -0.5 && diff <= 0) {
        showError("Cannot delete a case within 30 minutes of the meeting");
        return;
      }

      if (diff > 0 && diff <= 24) {
        showError(
          "Cannot delete a case with a meeting scheduled within 24 hours"
        );
        return;
      }

      batch.update(caseRef, {
        meeting: null,
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
          onClick={() => {
            showDialog(
              "Are you sure you want to cancel this meeting?",
              "A meeting can not be cancelled within 24 hours of the scheduled time.",
              "Back",
              "Proceed",
              handleDelete
            );
          }}
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
