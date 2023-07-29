import CloseIcon from "@mui/icons-material/Close";
import { Alert, Grow, GrowProps, IconButton, Snackbar } from "@mui/material";

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

function GPSnackbar(props: any) {
    const { snackbarMessage, openSnackbar, setOpenSnackbar  } = props;

    const handleClose = () => {
      setOpenSnackbar(false);
    };

  return (
    <Snackbar
      open={openSnackbar}
      onClose={handleClose}
      TransitionComponent={GrowTransition}
      key={GrowTransition.name}
      autoHideDuration={4000}
    >
      <Alert severity="success" variant="filled" sx={{ alignItems: "center" }}>
        {snackbarMessage}
        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ marginLeft: 1, p: 0 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Alert>
    </Snackbar>
  );
}

export default GPSnackbar;
