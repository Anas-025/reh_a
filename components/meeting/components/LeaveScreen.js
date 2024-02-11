import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { GPCContext } from "Providers/GPC_Provider";
import { db } from "components/firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export function LeaveScreen({ setIsMeetingLeft }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="bg-gray-800 h-screen flex flex-col flex-1 items-center justify-center">
      <FormDialog open={open} setOpen={setOpen} />
      <h1 className="text-white text-4xl text-center">Meeting has ended.</h1>
      <div
        style={{ width: "min(18rem, 85%)", marginTop: "3rem" }}
        className="flex mt-4 gap-4 wrap flex-wrap justify-center items-center"
      >
        <button
          className="basis-full border-[1px] border-white text-white px-4 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>
        <button
          className="basis-full bg-primary-500 font-bold text-white px-4 py-3 rounded-lg text-sm"
          onClick={() => {
            router.push("/app");
          }}
        >
          Exit
        </button>
        <div
          onClick={handleClickOpen}
          className="text-primary-500 mt-8 cursor-pointer underline hover:no-underline"
        >
          give rating
        </div>
      </div>
    </div>
  );
}

function FormDialog({ open, setOpen }) {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const { showBackdrop, closeBackdrop, showSnackbar, showEror } =
    useContext(GPCContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (reviewData) => {
    try {
      showBackdrop("Submitting review...");
      const MID = router.query.MID;
      const meetingRef = doc(db, "Meetings", MID);

      await updateDoc(
        meetingRef,
        {
          rating: reviewData.rating,
          review: reviewData.review,
        },
        { merge: true }
      );

      showSnackbar("Review submitted successfully");
    } catch (error) {
      showEror("Error submitting review");
    } finally {
      closeBackdrop();
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("rating", value);
            const formJson = Object.fromEntries(formData.entries());
            const reviewData = formJson;
            handleSubmit(reviewData);
            handleClose();
          },
        }}
      >
        <DialogTitle>Thank you for choosing us.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reviews help us improve. Please write a review about your
            experience.
          </DialogContentText>
          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            size="large"
            className="mt-8 mb-4"
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="review"
            label="Write a review"
            type="email"
            fullWidth
            variant="standard"
            multiline
            maxRows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
