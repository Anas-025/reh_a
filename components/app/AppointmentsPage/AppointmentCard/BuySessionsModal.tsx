import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Modal } from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styles from "../Appointments/Appoinments.module.css";

interface BuySessionsModalProps {
  buy: boolean;
  toggleBuy: () => void;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
}

const BuySessionsModal = ({
  buy,
  toggleBuy,
  setSnackbarMessage,
}: BuySessionsModalProps) => {
  const handleCopyButton = () => {
    navigator.clipboard.writeText("sampelupiid@oksbi");
    setSnackbarMessage("UPI ID copied to clipboard");
  };

  return (
    <Modal
      open={buy}
      onClose={toggleBuy}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className={`${styles.container} absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[15px bg-[#fff] m-auto`}
      >
        <div className={styles.name}>R-A</div>
        <div className={styles.title}>Scan this code for payment</div>
        <div>
          <Image
            width={150}
            height={150}
            alt="img not found"
            src="/qrSample.png"
            className={styles.qrcode}
          />
        </div>
        <div style={{ display: "flex", marginTop: "40px" }}>
          <div>UPI ID : sample384983@oksbi &nbsp;&nbsp;</div>
          <IconButton onClick={handleCopyButton}>
            <ContentCopyIcon
              fontSize="small"
              sx={{ width: "max-content" }}
              className={styles.copyIcn}
            />
          </IconButton>
        </div>
      </div>
    </Modal>
  );
};

export default BuySessionsModal;
