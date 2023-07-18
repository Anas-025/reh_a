import { Delete } from "@material-ui/icons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  IconButton,
  Modal,
  Popover,
  Typography
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import React, { FC, useState } from "react";
import GPBackdrop from "../GeneralPurpose/GPBackdrop";
import GPDialog from "../GeneralPurpose/GPDialog";
import GPSnackbar from "../GeneralPurpose/GPSnackbar";
import { db } from "../firebase-config";
import appoinmentcss from "./Appoinments.module.css";
import CurrentCaseContent from "./CurrentCaseContent/CurrentCaseContent";
import SlotBooking from "./SlotBooking/SlotBooking.js";
import qrSample from "./qrSample.png";

interface AppointmentCardProps {
  number: number;
  id: string;
  name: string;
  time?: string;
  date?: string;
  setState: any;
  setErrorDialog: any;
  setErrorMsg: any;
  user: any;
  numberOfSessions: number;
  getAppointmentData: () => void;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  number,
  id,
  name,
  date,
  setState,
  setErrorDialog,
  setErrorMsg,
  user,
  numberOfSessions,
  getAppointmentData,
}) => {
  const [open, setOpen] = React.useState(false);
  const [slot, setSlot] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buy, setBuy] = useState(false);
  const toggleBuy = () => setBuy((prev) => !prev);
  const toggleSlot = () => setSlot((prev) => !prev);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCopyButton = () => {
    navigator.clipboard.writeText("sampelupiid@oksbi");
    setSnackbarMessage("UPI ID copied to clipboard");
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
    setLoading(true);
    setDialogOpen(false);
    try {
      await deleteDoc(doc(db, `Userdata/${user.uid}/cases`, id));
      await getAppointmentData();
    } catch (err: any) {
      setErrorMsg(err.message);
      setErrorDialog(true);
    }
    setLoading(false);
  };

  const handleDialogClose = () => {
    handlePopoverClose();
    setDialogOpen(false);
  };

  return (
    <>
      <GPBackdrop loading={loading} message="Deleting..."/>

      <GPSnackbar message={snackbarMessage} />

      <GPDialog
        open={dialogOpen}
        setOpen={handleDialogClose}
        title="Are you sure you want to delete this case?"
        contentText = {`Delete case name, ${name}?`}
        buttons = {[
          {
            text: "Cancel",
            onClick: handleDialogClose
          },
          {
            text: "Delete",
            onClick: handleCaseDelete,
            color: "error"
          }
        ]}
      />


      <div className="hover:outline hover:outline-[1px] transition ease-in-out flex flex-col w-[240px] h-[270px] border-[1px] border-[#000] rounded-[15px] cursor-pointer px-5 py-5 relative justify-items-start">
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
          <Button sx={{ m: 2 }} onClick={() => setDialogOpen(true)}>
            <Delete color="error" />
            <Typography sx={{ px: 2, py: 1 }} color={"black"}>
              Delete
            </Typography>
          </Button>
        </Popover>

        <div onClick={handleOpen} style={{ position: "relative" }}>
          <div style={{ marginBottom: "15px", overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <span className="text-[20px] mr-2">{number}.</span>
            <span className="text-[26px] mr-2">{name}</span>
          </div>

          <div className="font-light mb-2">Sessions left: {numberOfSessions}</div>
          <div className="font-light mb-2">
            Created at:
            <span className="font-light">{date || "2nd of January, 2023"}</span>
          </div>
          <Image
            src="/appointmentCardBg.svg"
            alt="Three rows of three dots"
            width={60}
            height={60}
            className="absolute bottom-5 right-5"
          />
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e9ab02", marginTop: "1.5rem" }}
          onClick={toggleBuy}
        >
          Buy sessions
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e9ab02", marginTop: "10px" }}
          onClick={toggleSlot}
        >
          Book Slots
        </Button>
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[95%] bg-[#fff] m-auto md:w-[80%]">
          <CurrentCaseContent
            toggleSlot={toggleSlot}
            handleClose={handleClose}
            id={id}
          />
        </div>
      </Modal>

      <Modal
        open={buy}
        onClose={toggleBuy}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className={`${appoinmentcss.container} absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px bg-[#fff] m-auto`}
        >
          <div className={appoinmentcss.name}>R-A</div>
          <div className={appoinmentcss.title}>Scan this code for payment</div>
          <div>
            <Image
              width={150}
              height={150}
              alt="img not found"
              src={qrSample}
              className={appoinmentcss.qrcode}
            />
          </div>
          <div style={{ display: "flex", marginTop: "40px" }}>
            <div>UPI ID : sample384983@oksbi &nbsp;&nbsp;</div>
            <IconButton onClick={handleCopyButton}>
              <ContentCopyIcon
                fontSize="small"
                sx={{ width: "max-content" }}
                className={appoinmentcss.copyIcn}
              />
            </IconButton>
          </div>
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
            id={id}
            setErrorMsg={setErrorMsg}
            setErrorDialog={setErrorDialog}
            setState={setState}
            setSnackbarMessage={setSnackbarMessage}
            setSlot={setSlot}
          />
        </div>
      </Modal>
    </>
  );
};

export default AppointmentCard;
