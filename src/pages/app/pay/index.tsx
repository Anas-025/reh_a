import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { GPCContext } from "Providers/GPC_Provider";
import Step1 from "components/app/pay/Step1";
import Step2 from "components/app/pay/Step2";
import { db } from "components/general/firebase-config";
import { getCookie } from "cookies-next";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import * as React from "react";
import { useContext, useState } from "react";
import { uploadFileToFirebaseAndGetUrl } from "utils/ExtendedUtils";

const steps = ["Scan & Pay", "Upload Screen Shot"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [blogCoverImageFile, setBlogCoverImageFile] = useState<File | null>(
    null
  );
  const uid = getCookie("uid") as string;
  const router = useRouter();
  const { showSnackbar, showBackdrop, closeBackdrop, showError } = useContext(GPCContext);



  
  const handleNext = async () => {
    if (activeStep === 1) {
      await handleUploadImage();
    }
    else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const handleUploadImage = async () =>{
    if(blogCoverImageFile){
      showBackdrop("Uploading Image...")
      const blogCoverImageUrl = await uploadFileToFirebaseAndGetUrl(blogCoverImageFile, "BlogImages");
      const id = blogCoverImageUrl.uploadedToUrl.split("%2F")[2].split("?")[0];
      const token = blogCoverImageUrl.uploadedToUrl.split("%2F")[2].split("?")[1].split("=")[2];
      const userRef = doc(db, "Userdata", uid);


      await updateDoc(userRef, {
        payments: arrayUnion({
          id: id,
          token: token,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          status: "n",
        })
      })
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      showSnackbar("Payment Uploaded Successfully");
      closeBackdrop();
    }
    else{
      closeBackdrop();
      showError("Please upload a valid image");
    }
  }

  return (
    <Box sx={{ width: "100%", marginTop: "2rem" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography sx={{ mt: 2, mb: 1, ml: 4 }}>
          All steps completed - you&apos;re finished
        </Typography>
      ) : (
        <Typography
          sx={{ mt: 5, mb: 5, ml: 2, fontSize: 24, fontWeight: "600" }}
        >
          Step {activeStep + 1}{" "}
          {activeStep === 0
            ? "- Scan this code or use UPI Id for Payment"
            : "- Upload Payment Screen Shot"}
        </Typography>
      )}

      {activeStep === 0 ? (
        <Step1 />
      ) : (
        <Step2
          setBlogCoverImageFile={setBlogCoverImageFile}
          blogCoverImageFile={blogCoverImageFile}
        />
      )}

      {activeStep === steps.length ? (
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Upload" : "Next"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
