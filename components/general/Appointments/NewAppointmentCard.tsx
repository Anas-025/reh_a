import { Alert, Button, Modal, Snackbar } from "@mui/material";
import React from "react";
import { BsPlus } from "react-icons/bs";
import useDevice from "utils/useDevice";
import NewAppointmentForm from "./NewAppointmentForm/NewAppointmentForm";

const NewAppointmentCard = ({getAppointmentData}: {getAppointmentData: ()=>void}) => {
  const [newOpen, setNewOpen] = React.useState(false);
  const handleNewOpen = () => setNewOpen(true);
  const handleNewClose = () => setNewOpen(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { isMobile } = useDevice();

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          New case created successfully
        </Alert>
      </Snackbar>

      {isMobile ? (
        <div
          className="fixed right-[24px] bottom-[72px] z-50 rounded-full bg-[#000] text-[#FFF] p-3"
          onClick={handleNewOpen}
        >
          <BsPlus className="w-8 h-8" />
        </div>
      ) : (
        <div
          className="hover:border-[2px] hover:border-solid flex flex-row items-center justify-center max-w-[240px] border-[1px] min-h-[250px] border-dashed border-[#000] rounded-[15px] cursor-pointer justify-self-center w-full md:justify-self-auto"
          onClick={handleNewOpen}
        >
          <BsPlus className="w-8 h-8" />
        </div>
      )}
      <Modal
        open={newOpen}
        onClose={handleNewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px] justify-center items-center h-[80vh] w-[80%] mobile:w-[97%]  bg-[#fff] m-auto">
          <NewAppointmentForm getAppointmentData={getAppointmentData} setSnackbarOpen={setSnackbarOpen} handleClose={handleNewClose} />
        </div>
      </Modal>
    </>
  );
};

export default NewAppointmentCard;
