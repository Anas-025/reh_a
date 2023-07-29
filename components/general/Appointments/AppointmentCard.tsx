import { Delete } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, IconButton, Modal, Popover, Typography } from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import React, { FC, useContext, useState } from "react";
import { db } from "../../firebase/firebase-config";
import CurrentCaseContent from "./CurrentCaseContent/CurrentCaseContent";
import SlotBooking from "./SlotBooking/SlotBooking.jsx";

interface AppointmentCardProps {
  number: number;
  id: string;
  name: string;
  time?: string;
  date?: string;
  user: any;
  getAppointmentData: () => void;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  number,
  id,
  name,
  date,
  user,
  getAppointmentData,
}) => {
  const [open, setOpen] = React.useState(false);
  const [slot, setSlot] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleSlot = () => setSlot((prev) => !prev);
  const { showSnackbar, showBackdrop, closeBackdrop, showDialog, showError } =
    useContext(GPCContext);

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
      await deleteDoc(doc(db, `Userdata/${user.uid}/cases`, id));
      await getAppointmentData();
    } catch (err: any) {
      showError("Something went wrong... Try again later");
    }
    closeBackdrop();
  };

  const handleDeleteButton = () => {
    showDialog(
      "Are you sure you want to delete this case?",
      `Delete case name, ${name}?`,
      "Cancel",
      "Delete",
      handleCaseDelete
    );
  };

  return (
    <>
      <div className="hover:outline hover:outline-[1px] transition ease-in-out flex flex-col w-[240px] border-[1px] border-[#000] rounded-[15px] cursor-pointer px-5 py-5 relative justify">
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
            <Delete color="error" />
            <Typography sx={{ px: 2, py: 1 }} color={"black"}>
              Delete
            </Typography>
          </Button>
        </Popover>

        <div onClick={handleOpen} style={{ position: "relative" }}>
          <div
            style={{
              marginBottom: "15px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span className="text-[20px] mr-2">{number}.</span>
            <span className="text-[26px] mr-2">{name}</span>
          </div>

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
          style={{ backgroundColor: "#e9ab02", marginTop: "50px" }}
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
        open={slot}
        onClose={toggleSlot}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[97%] bg-[#fff] m-auto sm:w-[80%]">
          <SlotBooking id={id} setSlot={setSlot} />
        </div>
      </Modal>
    </>
  );
};

export default AppointmentCard;