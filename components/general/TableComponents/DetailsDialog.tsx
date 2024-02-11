import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
} from "@mui/material";
import { db } from "components/firebase/firebase-config";
import Loading from "components/general/Loading/Loading";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Data } from "./Table.interface";

export default function AlertDialog({
  open,
  handleToggleDialog,
  detailsCase,
}: {
  open: boolean;
  handleToggleDialog: () => void;
  detailsCase: Data | null;
}) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchDetails() {
      if (detailsCase) {
        setLoading(false);
      }
      setLoading(true);
      if (open) {
        const caseRef = doc(
          db,
          `Userdata/${detailsCase?.userId}/cases`,
          detailsCase!.caseId!
        );

        const meetingRef = doc(db, "Meetings", detailsCase!.meetingId!);

        const caseData = await getDoc(caseRef);
        const meetingData = await getDoc(meetingRef);

        setLoading(false);
        setDetails({ ...caseData.data(), ...meetingData.data() });
      }
    }
    fetchDetails();
  }, [open]);

  useEffect(() => {
    console.log("details", details);
  }, [details]);

  return (
    <Dialog
      open={open}
      onClose={handleToggleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {loading ? (
        <div style={{ width: "25rem", overflow: "hidden" }}>
          <Loading message="loading" />
        </div>
      ) : (
        <Box className="w-full sm:w-[25rem]">
          <DialogTitle id="alert-dialog-title">
            Case Details: {details?.caseName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <b>Diurnal:</b>{" "}
              {details?.diurnal?.length
                ? details?.diurnal?.map((item: string, index: number) => {
                    return (
                      <div
                        style={{ marginLeft: "2rem", marginTop: "1rem" }}
                        key={index}
                      >
                        {index + 1}. {item}
                      </div>
                    );
                  })
                : "None"}
            </DialogContentText>
            <br />

            <DialogContentText id="alert-dialog-description">
              <b>PainType:</b>{" "}
              {details?.painType?.length
                ? details?.painType?.map((item: string, index: number) => {
                    return (
                      <div
                        style={{ marginLeft: "2rem", marginTop: "1rem" }}
                        key={index}
                      >
                        {index + 1}. {item}
                      </div>
                    );
                  })
                : "None"}
            </DialogContentText>
            <br />

            <DialogContentText id="alert-dialog-description">
              <b>When is it bad:</b>{" "}
              <div style={{ marginTop: "0.5rem" }}>
                {" "}
                {details?.whenBad ? details?.whenBad : "None"}{" "}
              </div>
            </DialogContentText>
            <br />

            <DialogContentText id="alert-dialog-description">
              <b>When is it better:</b>{" "}
              <div style={{ marginTop: "0.5rem" }}>
                {" "}
                {details?.whenBetter ? details?.whenBetter : "None"}{" "}
              </div>
            </DialogContentText>
            <br />
            <DialogContentText id="alert-dialog-description">
              <b>Rating</b>{" "}
              <div style={{ marginTop: "0.5rem" }}>
                {" "}
                {details?.rating ? (
                  <Rating name="read-only" value={details?.rating} readOnly />
                ) : (
                  "None"
                )}
              </div>
            </DialogContentText>
            <br />
            <DialogContentText id="alert-dialog-description">
              <b>Review</b>{" "}
              <div style={{ marginTop: "0.5rem" }}>
                {" "}
                {details?.review ? details?.review : "None"}{" "}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ backgroundColor: "black!important", color: "white" }}
              onClick={handleToggleDialog}
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
}
