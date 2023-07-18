import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField
} from "@mui/material";
import { useUser } from "components/UserContext";
import FormCheckbox from "components/general/Profile/FormCheckbox";
import FormTextarea from "components/general/Profile/FormTextarea";
import {
  diurnalOptions,
  painOptions,
} from "components/general/Profile/constants";
import { db } from "components/general/firebase-config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import style from "./NewAppointmentForm.module.css";

interface Profile {
  fname?: string;
  lname?: string;
  email?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  referredBy?: string;
  painType?: string[];
  chiefComplaint?: string;
  diurnal?: string[];
  otherComplaints?: string[];
  problemInGait?: string;
  medicalHistory?: string[];
  personalHistory?: string[];
  familyHistory?: string[];
  surgicalHistory?: string[];
  whenBad?: string;
  whenBetter?: string;
  slots?: string[];
  caseName?: string;
}

export default function NewAppointmentForm({
  handleClose,
  setSnackbarOpen,
  getAppointmentData
}: {
  handleClose: () => void;
  setSnackbarOpen: (value: boolean) => void;
  getAppointmentData: ()=>void;
}) {
  const [formData, setFormData] = useState<Profile | null>({});
  const [loading, setLoading] = useState(false);
  const { user, userLoading } = useUser();
  const [error, setError] = useState(false);


  const onChangePainOptions = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      painType: newCheckedValues,
    }));
  };

  const onChangeCaseName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(false);
    setFormData((prev) => ({
      ...prev,
      caseName: e.target.value,
    }));
  };

  const onChangeDiurnal = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      diurnal: newCheckedValues,
    }));
  };

  const onChangeWhenBad = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      whenBad: e.target.value,
    }));
  };

  const onChangeWhenBetter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      whenBetter: e.target.value,
    }));
  };

  const handleProfileSave = async () => {
    if (formData?.caseName && formData?.caseName.length > 0) {
      try {
        setLoading(true);
        await addDoc(
          collection(db, `Userdata/${user.uid}/cases`),
          { ...formData, createdAt: Timestamp.now(), numberOfSessions: 0 }
        );
        setSnackbarOpen(true);
        setLoading(false);
        handleClose();
        getAppointmentData();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a case name");
      setError(true);
    }
    // await setDoc(doc(db, `Userdata/${user.uid}/`, user.uid), formData, { merge: true });
  };

  return (
    <>

      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className={style.container}>
          <IconButton onClick={handleClose} className={style.cancelButton}>
            <CloseIcon />
          </IconButton>

          <div className={style.right}>
            <div className="mb-4">
              <TextField
                variant="standard"
                onChange={onChangeCaseName}
                label="Enter Case Name"
                value={formData?.caseName || ""}
                sx={{ marginY: "1rem" }}
                error={error}
                fullWidth
                helperText={error ? "Please enter a case name" : ""}
                style={{ marginBottom: "3rem" }}
              />
              <div className="grid justify-between align-start grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
                {/* <FormTextarea
                  label="Case name"
                  value={formData?.caseName || ""}
                  onChange={onChangeCaseName}
                /> */}

                <FormCheckbox
                  options={painOptions}
                  label="Type"
                  checkedValues={formData?.painType || []}
                  onChange={onChangePainOptions}
                  otherOption={true}
                />
                <FormCheckbox
                  options={diurnalOptions}
                  label="Diurnal"
                  checkedValues={formData?.diurnal || []}
                  onChange={onChangeDiurnal}
                  otherOption={true}
                />
                <FormTextarea
                  label="When is it bad"
                  value={formData?.whenBad || ""}
                  onChange={onChangeWhenBad}
                />
                <FormTextarea
                  label="When is it better"
                  value={formData?.whenBetter || ""}
                  onChange={onChangeWhenBetter}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleClose}
              variant="outlined"
              disableElevation
              className="bg-[white!important] text-[#B4B4B4!important] border-[#B4B4B4!important] hover:bg-[white]"
            >
              Cancel
            </Button>

            <Button
              onClick={handleProfileSave}
              className="bg-[#fab700!important]"
              variant="contained"
              disableElevation
            >
              Create
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
