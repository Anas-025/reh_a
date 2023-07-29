import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    contentText: string;
    buttons: [
      {text: string, color?: "primary" | "secondary" | "error" | "warning" | "info" | "success", onClick?: () => void},
      {text: string, color?: "primary" | "secondary" | "error" | "warning" | "info" | "success", onClick: () => void}
    ];
}



export default function GPDialog(props: Props) {
  const {title, contentText, open, setOpen, buttons} = props;
  const button1 = buttons[0];
  const button2 = buttons[1];

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={button1?.onClick ? button1.onClick : handleClose} color={button1?.color}>{button1.text}</Button>
          <Button onClick={button2.onClick} color={button2.color} autoFocus>
            {button2.text}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}