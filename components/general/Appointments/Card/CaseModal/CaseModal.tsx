import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Container,
  IconButton
} from "@mui/material";
import { useUser } from "components/UserContext";
import FormCheckbox from "components/app/profile/FormCheckbox";
import FormTextarea from "components/app/profile/FormTextarea";
import { diurnalOptions, painOptions } from "components/app/profile/constants";
import { db } from "components/firebase/firebase-config";
import Loading from "components/general/Loading/Loading";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import EmptyHere from "public/emptyHere.jpg";
import React, { useEffect, useState } from "react";
import { CaseModalProps } from "../../Cases.interface";
import style from "./CurrentCaseContent.module.css";
import Session from "./Session/Session";

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
  slot?: string;
  caseName?: string;
}

function CaseModel({
  handleClose,
  toggleSlot,
  caseData,
  meeting,
  setMeeting,
  meetingId
}: CaseModalProps) {
  const [formData, setFormData] = useState<Profile | null>({});
  const [profileData, setProfileData] = useState<Profile | null>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [slot, setSlot] = useState<string | undefined>("");

  const onChangePainOptions = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      painType: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeDiurnal = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      diurnal: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeWhenBad = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      whenBad: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeWhenBetter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      whenBetter: e.target.value,
    }));
    setIsEditing(true);
  };

  const getProfileData = async () => {
    // setLoading(true);
    const docRef = doc(db, `Userdata/${user.uid}/cases`, caseData.id);
    const docSnap = await getDoc(docRef);
    setLoading(false);
    if (docSnap.exists()) {
      setProfileData(docSnap.data());
      setSlot(docSnap.data()?.slot);
      setFormData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const handleBookSlot = () => {
    toggleSlot();
    handleClose();
  };

  // load the data on page load
  useEffect(() => {
    getProfileData();
  }, []);

  const handleProfileSave = async () => {
    await setDoc(doc(db, `Userdata/${user.uid}/cases`, caseData.id), formData, {
      merge: true,
    });
    setIsEditing(false);

    // get the latest data
    await getProfileData();
    // setIsSnackbarOpen(true);
  };

  console.log(caseData)


  return (
    <>
      {loading ? (
        <Loading message="Loading data..." />
      ) : (
        <div className={style.container}>
          <IconButton onClick={handleClose} className={style.cancelButton}>
            <CloseIcon />
          </IconButton>

          <div className={style.left}>
            <h3 className={style.mainHeading}>Case: {profileData?.caseName}</h3>
            <div className={style.leftContent}>
              <h4 className={style.sessionMainHeading}>Meeting Details:</h4>

              <div>
                {meeting === null ? (
                  <>
                    <Container
                      sx={{
                        opacity: "0.8",
                        borderRadius: "4px",
                        marginTop: "2rem",
                      }}
                    >
                      {" "}
                      <Image
                        src={EmptyHere}
                        alt={"No Slots Booked yet"}
                        width={150}
                      />{" "}
                    </Container>
                    <Container
                      sx={{ textAlign: "center", marginTop: "1.5rem" }}
                    >
                      <Button
                        sx={{
                          backgroundColor: "#fab700!important",
                          color: "white",
                          paddingInline: "1rem",
                        }}
                        onClick={handleBookSlot}
                      >
                        Book Meeting
                      </Button>
                    </Container>
                  </>
                ) : (
                  <Session
                    meeting={meeting}
                    setMeeting={setMeeting}
                    meetingId={meetingId}
                    caseId={caseData.id}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={style.seperator} />

          <div className={style.right}>
            <div className="mb-4">
              <div className="grid justify-between align-start grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
                <FormCheckbox
                  options={painOptions}
                  label="Type of Pain"
                  checkedValues={formData?.painType || []}
                  onChange={onChangePainOptions}
                  otherOption={true}
                />
                <FormCheckbox
                  options={diurnalOptions}
                  label="Time of Pain"
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
          {isEditing && (
            <div className="sticky w-max md:absolute  md:bottom-[0.5rem] md:left-[auto] md:right-[2rem] bottom-[-3rem] left-[100rem] flex gap-4">
              <Button
                onClick={() => {
                  setIsEditing(false);
                  // reset the form data
                  setFormData(profileData);
                }}
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
                Save
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CaseModel;
