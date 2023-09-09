import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton } from '@mui/material';
import Grow, { GrowProps } from '@mui/material/Grow';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

interface Props {
    message: string;
}


export default function GPSnackbar(props: Props) {
  const [open, setOpen] = useState(false);
  const { message} = props;


  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(message === '' || message === undefined){
      return;
    }
    setOpen(true);
  }, [message])


  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={GrowTransition}
        key={GrowTransition.name}
        autoHideDuration={4000}
      >
        <Alert severity="success" variant='filled' sx={{alignItems: "center"}}>
            {message}
            <IconButton
                aria-label="close"
                color="inherit"
                sx={{ marginLeft: 1 , p: 0}}
                onClick={handleClose}
              >
                <CloseIcon />
            </IconButton>    
        </Alert>
    </Snackbar>
    </>
  );
}