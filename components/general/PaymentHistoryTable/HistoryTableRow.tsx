import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, Snackbar, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function HistoryTableRow({historyRow, index} : {historyRow: string, index: number}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState("confirm");
    const [id, date, time, link, statusTemp] = historyRow.split(" ");
    const [status, setStatus] = useState(statusTemp);
    const [statusToBeChanged, setStatusToBeChanged] = useState(statusTemp);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

  
    const handleClickOpen = (value: string) => {
        setDialog(value);
        setStatusToBeChanged(value === "confirm" ? "y" : "n");
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleStatusChangeClick = async (value: string) => {
      const docRef = doc(db, "Userdata", id);
      setLoading(true);
      setOpen(false);
      const findDoc = await getDoc(docRef);
      if (findDoc.exists()) {
        const user = findDoc.data();
        const payments = user?.payments;
        payments[index] = `${date} ${time} ${link} ${value}`;
        try{
          await updateDoc(docRef, {
            payments: payments,
          });
          setStatus(value);
          setLoading(false);
          setSnackbarOpen(true);
        }
        catch(e){
          setLoading(false);
          setErrorMessage("Oops! Something went wrong. Please try again later.");
          setErrorOpen(true);
        }

      } else {
        setLoading(false);
        setErrorMessage("Oops! Something went wrong. Please try again later.");
        setErrorOpen(true);
      }

    }

    const handleErrorClose = () => {
      setErrorOpen(false);
    };

    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };



  return (
    <>
      <TableRow key={`${historyRow}-${index}`}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{time}</TableCell>
        <TableCell align="right">
          <Link href={link} target="_blank">
            {link}
            <LaunchIcon sx={{ fontSize: 15, marginLeft: "0.5rem" }} />
          </Link>
        </TableCell>

        <TableCell align="right">
          {status === "y" ? (
            loading ?  ( <CircularProgress size={24}/> ) : 
            (
              <Typography color="green">
                Confirmed
                <IconButton
                  aria-label="edit"
                  size="small"
                  sx={{ marginLeft: "0.5rem" }}
                >
                  <EditIcon sx={{ fontSize: 18 }} color="warning" onClick={()=> handleClickOpen("unconfirm")} />
                </IconButton>
              </Typography>
            )

          ) : (
            <Button
              disableElevation
              variant="contained"
              disabled={loading}
              sx={{ backgroundColor: loading ? "#fafafa" : "rgb(250 184 0)!important" , color: "white" }}
              onClick={() => handleClickOpen("confirm")}
            >
              {loading ?

                (<CircularProgress size={24}/>)
              
              : (
                  <>
                    Confirm
                    <DoneIcon sx={{ fontSize: 18, marginLeft: "0.5rem" }} />
                  </>
              )
              }
            </Button>
          )}
        </TableCell>
      </TableRow>



      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {dialog === "confirm" ? "Confirm " : " Unconfirm "}          
          this payment?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            By clicking Yes, you will
            {dialog === "confirm" ? " confirm " : " unconfirm "}
            this payment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button color="warning" onClick={()=> handleStatusChangeClick(statusToBeChanged)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={errorOpen}
        onClose={handleErrorClose}
        aria-labelledby="error dialog"
      >
        <DialogTitle>
          <Typography>
            {errorMessage}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleErrorClose}>Okay</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity="success" sx={{ width: '100%' }}>
          Payment status updated successfully!
        </Alert>
      </Snackbar>

    </>
  );
}
