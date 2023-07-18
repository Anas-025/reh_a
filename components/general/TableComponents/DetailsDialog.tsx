import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Data } from './Table.interface';

export default function AlertDialog({open, handleToggleDialog, detailsCase}: {open: boolean, handleToggleDialog: () => void, detailsCase: Data | null}) {

  return (

    <Dialog
        open={open}
        onClose={handleToggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Case Details: {detailsCase?.displayName}
        </DialogTitle>


        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Number of Sessions Left: {detailsCase?.numberOfSessions} </b>
          </DialogContentText>
          <br />

          <DialogContentText id="alert-dialog-description">
            <b>Diurnal:</b> {detailsCase?.diurnal?.length ? detailsCase?.diurnal?.map((item, index)=>{
                return <div style={{marginLeft: "2rem", marginTop: "1rem"}} key={index}>{index+1}. {item}</div>
            }) : "None"}
          </DialogContentText>
          <br />

          <DialogContentText id="alert-dialog-description">
            <b>PainType:</b> {detailsCase?.painType?.length ? detailsCase?.painType?.map((item, index)=>{
                return <div style={{marginLeft: "2rem", marginTop: "1rem"}} key={index}>{index+1}. {item}</div>
            }) : "None"}
          </DialogContentText>
          <br />

          <DialogContentText id="alert-dialog-description">
            <b>When is it bad:</b> <div style={{marginTop: "0.5rem"}}> {detailsCase?.whenBad ? detailsCase?.whenBad : "None"} </div>
          </DialogContentText>
          <br />

          <DialogContentText id="alert-dialog-description">
            <b>When is it better:</b> <div style={{marginTop: "0.5rem"}}> {detailsCase?.whenBetter ? detailsCase?.whenBetter : "None"} </div>
          </DialogContentText>
          
        </DialogContent>

        
        <DialogActions>
          <Button sx={{backgroundColor: "black!important" ,color: "white"}} onClick={handleToggleDialog} autoFocus>
            Close
          </Button>
        </DialogActions>

      </Dialog>
  );
}