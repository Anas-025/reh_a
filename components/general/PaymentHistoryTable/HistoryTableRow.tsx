import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Button,
  CircularProgress,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import { getCookie } from "cookies-next";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../firebase-config";

interface Props {
  historyRow: { date: string; id: string; time: string; token: string, status: string };
  index: number;
}

export default function HistoryTableRow(props: Props) {
  const { historyRow, index } = props;
  const { id, date, time, token, status } = historyRow;
  const [confirm, setConfirm] = useState(status === "y");
  const link = `https://firebasestorage.googleapis.com/v0/b/reh-a-demo1-9efe4.appspot.com/o/BlogImages%2Fimage%2F${id}?alt=media&token=${token}`;
  const [loading, setLoading] = useState(false);
  const uid = getCookie("uid") as string;
  const { showError, showSnackbar, showDialog } = useContext(GPCContext);

  const handleClickOpen = (value: string) => {
    const message = value === "confirm" ? "Confirm" : "Un-Confirm";
    showDialog(
      `Are you sure you want to ${message} this payment?`,
      `By clicking on ${message}, you are ${message}ing that user have paid the amount.`,
      "Cancel",
      message,
      () => handleStatusChangeClick(value === "confirm" ? "y" : "n"),
    )
  };

  const handleStatusChangeClick = async (value: string) => {
    const userRef = doc(db, "Userdata", uid);
    setLoading(true);
    const uerSnap = await getDoc(userRef);
    if (uerSnap.exists()) {
      const user = uerSnap.data();
      const payments = user?.payments;
      let sessionCount = user?.sessionCount;
      payments[index].status = value;
      sessionCount = value === "y" ? sessionCount + 5 : sessionCount - 5;
      sessionCount = sessionCount < 0 ? 0 : sessionCount;
      
      try {
        await updateDoc(userRef, {
          payments: payments,
          sessionCount: sessionCount,
        });
        setLoading(false);
        setConfirm(value === "y");
        showSnackbar("Payment Status changed successfully!");
      } catch (e) {
        setLoading(false);
        showError("Oops! Something went wrong. Please try again later. Open console for more details.");
        console.log(e);
      }
    } else {
      setLoading(false);
      showError("User not found!");
    }
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
            see image
            <LaunchIcon sx={{ fontSize: 15, marginLeft: "0.5rem" }} />
          </Link>
        </TableCell>

        <TableCell align="right">
          {confirm ? (
            loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography color="green">
                Confirmed
                <IconButton
                  aria-label="edit"
                  size="small"
                  sx={{ marginLeft: "0.5rem" }}
                  onClick={() => handleClickOpen("unconfirm")}
                >
                  <EditIcon
                    sx={{ fontSize: 18 }}
                    color="warning"
                  />
                </IconButton>
              </Typography>
            )
          ) : (
            <Button
              disableElevation
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: loading
                  ? "#fafafa"
                  : "rgb(250 184 0)!important",
                color: "white",
              }}
              onClick={() => handleClickOpen("confirm")}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  Confirm
                  <DoneIcon sx={{ fontSize: 18, marginLeft: "0.5rem" }} />
                </>
              )}
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
