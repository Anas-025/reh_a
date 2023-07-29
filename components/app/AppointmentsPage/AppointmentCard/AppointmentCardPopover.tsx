import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Popover, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface AppointmentCardPopoverProps {
  popoverId: string | undefined;
  popoverOpen: boolean;
  anchorEl: HTMLButtonElement | null;
  handlePopoverClose: () => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const AppointmentCardPopover = ({
  popoverId,
  popoverOpen,
  anchorEl,
  handlePopoverClose,
  setDialogOpen,
}: AppointmentCardPopoverProps) => {
  return (
    <Popover
      id={popoverId}
      open={popoverOpen}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Button sx={{ m: 1 }} onClick={() => setDialogOpen(true)}>
        <DeleteIcon color="error" />
        <Typography sx={{ px: 2, py: 1 }} color={"black"}>
          Delete
        </Typography>
      </Button>
    </Popover>
  );
};

export default AppointmentCardPopover;
