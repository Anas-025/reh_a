import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, IconButton, Modal, Popover, Typography } from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import { useMeeting } from "components/MeetingContext";
import { createMeeting, getToken } from "controllers/meeting";
import { doc, getDoc, updateDoc, writeBatch } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import SlotBooking from "../SlotBooking/SlotBooking";
import CaseModal from "./CaseModal/CaseModal";

interface CaseCardProps {
  serial: number;
  caseData: any;
  getAppointmentData: any;
  userId: string;
}

const Card: FC<CaseCardProps> = ({
  serial,
  caseData,
  getAppointmentData,
  userId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [slot, setSlot] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { showSnackbar, showBackdrop, closeBackdrop, showDialog, showError } =
    useContext(GPCContext);
  const [meeting, setMeeting] = useState<any>(caseData.meeting);
  const [meetingId, setMeetingId] = useState<string>(caseData.meetingId);
  const router = useRouter();
  const { updateToken, updateMeetingId } = useMeeting();

  //date format: weekday, dd mm yyyy hour:minute AM/PM
  const date = new Date(meeting?.seconds * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    year: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  const toggleSlot = async () => {
    try {
      const userD = await getDoc(
        doc(db, `Userdata/`, userId)
      );
      const data = userD.data();

      if (data?.meetingsLeft <= 0 ) {
        showDialog(
          "You have 0 meetings left",
          `Buy more meetings to continue`,
          "Cancel",
          "Buy",
          () => {
            router.push("/app/buyMore");
          }
        );
        return;
      }
    } catch (err) {
      showError("Something went wrong... Try again later");
      console.log(err);
    }
    setSlot((prev) => !prev);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  const handleCaseDelete = async () => {
    setAnchorEl(null);
    showBackdrop("Deleting...");
    try {
      const batch = writeBatch(db);
      const caseRef = doc(db, `Userdata/${userId}/cases`, caseData.id);
      if (meetingId !== "") {
        const meetingRef = doc(db, "Meetings", meetingId);
        const date = new Date();
        const meetingDate = new Date(meeting.seconds * 1000);
        // @ts-ignore
        const diff = (meetingDate - date) / (1000 * 60 * 60);

        if(diff >= -0.5 && diff <= 0){
          showError("Cannot delete a case within 30 minutes of the meeting");
          closeBackdrop();
          return;
        }

        if (diff > 0 && diff <= 24) {
          showError(
            "Cannot delete a case with a meeting scheduled within 24 hours"
          );
          closeBackdrop();
          return;
        }
        batch.delete(meetingRef);
      }
      batch.delete(caseRef);
      await batch.commit();
      await getAppointmentData();
    } catch (err: any) {
      console.log(err);
      showError("Something went wrong... Try again later");
    }
    closeBackdrop();
    showSnackbar("Case deleted successfully");
  };

  const handleDeleteButton = () => {
    showDialog(
      "Are you sure you want to delete this case?",
      `Delete case name, ${caseData.caseName}?`,
      "Cancel",
      "Delete",
      handleCaseDelete
    );
  };

  const handleJoinMeetClick = async () => {
    try {
      showBackdrop("Joining meeting");
      const meetingSnap = await getDoc(doc(db, "Meetings", meetingId));

      if (!meetingSnap.exists()) {
        throw new Error("Meeting does not exist");
      }
      const meetingData = meetingSnap.data();
      if (meetingData.status === "success") {
        throw new Error("Meeting has already ended");
      }

      const date = new Date();
      const meetingDate = new Date(meetingData.meeting.seconds * 1000);
      // @ts-ignore
      const diff = Math.abs(date - meetingDate) / (1000 * 60);
      if (diff > 15) {
        throw new Error(
          "Cant join now. You can only join a meeting 15 minutes before it starts."
        );
      }

      const activeMeetingId = meetingData.activeMeetingId;
      if (activeMeetingId) {
        router.push(`/meeting?meetId=${activeMeetingId}&MID=${meetingId}`);
      } else {
        const token = await getToken();
        const _meetingId = await createMeeting({ token });
        updateToken(token);
        updateMeetingId(_meetingId);
        const meetingRef = doc(db, "Meetings", meetingId);
        await updateDoc(meetingRef, {
          activeMeetingId: _meetingId,
        });
        router.push(`/meeting?meetId=${_meetingId}&MID=${meetingId}`);
      }
    } catch (err: any) {
      showError(err.message);
      closeBackdrop();
      console.log(err);
    }
  };

  return (
    <>
      <div className="hover:outline hover:outline-[1px] transition ease-in-out flex flex-col w-[240px] h-[260px] border-[1px] border-[#000] rounded-[15px] cursor-pointer px-5 py-5 relative justify">
        <IconButton
          onClick={handlePopoverClick}
          className="!absolute top-4 right-1 z-50"
        >
          <MoreVertIcon />
        </IconButton>

        <Popover
          id={popoverId}
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Button sx={{ m: 2 }} onClick={handleDeleteButton}>
            <DeleteIcon color="error" />
            <Typography sx={{ px: 2, py: 1 }} color={"black"}>
              Delete
            </Typography>
          </Button>
        </Popover>

        <div
          onClick={handleOpen}
          style={{ position: "relative", height: "100%" }}
        >
          <div
            style={{
              marginBottom: "15px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span className="text-[20px] mr-2">{serial}.</span>
            <span className="text-[26px] mr-2">{caseData.caseName}</span>
          </div>

          {meeting === null ? (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-row gap-2">
                <div className="font-light">No meeting scheduled</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-row gap-2">
                <div className="font-light">Meeting&nbsp;at:</div>
                <div className="font-bold">{` ${date}`}</div>
              </div>
            </div>
          )}

          <Image
            src="/appointmentCardBg.svg"
            alt="Three rows of three dots"
            width={60}
            height={60}
            className="absolute bottom-32 right-5"
          />
        </div>

        <div className="absolute bottom-4 w-full left-0 text-center px-6">
          {meeting === null ? (
            <Button
              fullWidth
              variant="contained"
              onClick={toggleSlot}
              style={{ backgroundColor: "#e9ab02" }}
            >
              Book Meeting
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#e9ab02" }}
              onClick={handleJoinMeetClick}
            >
              Join Meeting
            </Button>
          )}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[95%] bg-[#fff] m-auto md:w-[80%]">
          <CaseModal
            caseData={caseData}
            toggleSlot={toggleSlot}
            handleClose={handleClose}
            setMeeting={setMeeting}
            meeting={meeting}
            meetingId={meetingId}
            handleJoinMeetClick={handleJoinMeetClick}
          />
        </div>
      </Modal>

      <Modal
        open={slot}
        onClose={toggleSlot}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[97%] bg-[#fff] m-auto sm:w-[80%]">
          <SlotBooking
            id={caseData.id}
            meeting={meeting}
            setMeeting={setMeeting}
            setMeetingId={setMeetingId}
            toggleSlot={toggleSlot}
          />
        </div>
      </Modal>
    </>
  );
};

export default Card;
