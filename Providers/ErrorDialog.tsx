import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  message: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ErrorDialog(props: Props) {
  const { message, open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>An Error Has Occured</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
