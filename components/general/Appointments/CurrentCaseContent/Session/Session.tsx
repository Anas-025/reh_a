import { Button, ButtonProps, styled } from "@mui/material";
import { useMeeting } from "components/MeetingContext";
import { useRouter } from "next/router";
import React from "react";
import { createMeeting, getToken } from "../../../../../controllers/meeting";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "hsl(44, 100%, 49%)",
  "&:hover": {
    backgroundColor: "hsl(44, 100%, 45%)",
  },
}));

const Container = styled("div")(({ theme }) => ({
  border: "1px solid #B4B4B4",
  padding: "1rem",
  borderRadius: "10px",
  marginTop: "2rem",
  whiteSpace: "nowrap",
  flexShrink: 0,
}));

function Session({ slot, index }: { slot: string; index: number }) {
  const [date, time] = slot.split(" ");
  const { token, meetingId, updateToken, updateMeetingId } = useMeeting();
  const router = useRouter();

  const handleMeetingJoin = async () => {
    const token = await getToken();
    const _meetingId = await createMeeting({ token });
    updateToken(token);
    updateMeetingId(_meetingId);
    router.push('/meeting')
  };

  return (
    <Container>
      <h5 style={{ marginBottom: "1rem" }}>Meeting {index + 1}</h5>
      <div style={{ marginBottom: "0.5rem", whiteSpace: "normal" }}>
        Date of meeting: <b style={{ whiteSpace: "nowrap" }}>{date}</b>
      </div>
      <div style={{ marginBottom: "1.2rem", whiteSpace: "normal" }}>
        Time of meeting: <b style={{ whiteSpace: "nowrap" }}>{time}</b>
      </div>

      <ColorButton
        disableElevation
        variant="contained"
        onClick={handleMeetingJoin}
      >
        Join Meeting
      </ColorButton>
    </Container>
  );
}

export default Session;