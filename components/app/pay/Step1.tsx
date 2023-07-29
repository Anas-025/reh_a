import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { IconButton } from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import Image from "next/image";
import qrSample from "public/qrSample.png";
import { useContext, useState } from "react";
import style from "./pay.module.css";

function Step1() {
  const { showSnackbar } = useContext(GPCContext);
  const [copied, setCopied] = useState(false);
  const upi = "sampleupiid@oksbi"

  const handleCopyButton = () => {
    navigator.clipboard.writeText(upi);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
    showSnackbar("UPI ID copied to clipboard");
  };

  return (
    <div className={`${style.container}`}>
      <div>
        <Image
          width={150}
          height={150}
          alt="img not found"
          src={qrSample}
          className={style.qrcode}
        />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          alignItems: "center",
        }}
      >
        <div>UPI ID : {upi}</div>
        {copied ? (
          <IconButton>
            <DoneAllIcon fontSize="small" color="success" />
          </IconButton>
        ) : (
          <IconButton onClick={handleCopyButton}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Step1;
