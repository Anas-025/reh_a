import {
  Tooltip
} from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import { useUser } from "components/UserContext";
import { db } from "components/firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { uploadFileToFirebaseAndGetUrl } from "utils/ExtendedUtils";
import FormCheckbox from "./FormCheckbox";
import FormRadio from "./FormRadio";
import FormTextarea from "./FormTextarea";
import Input from "./Input";
import { Profile } from "./Profile.interface";
import {
  familyHistoryOptions,
  genderOptions,
  medicalHistoryOptions,
  occupationOptions,
  otherComplaintsOptions,
  personalHistoryOptions,
  referrerOptions,
  surgicalHistoryOptions,
} from "./constants";

const Profile = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState<Profile | null>({});
  const [formData, setFormData] = useState<Profile | null>({});
  const [isEditing, setIsEditing] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const {showBackdrop, closeBackdrop, showSnackbar} = useContext(GPCContext);

  const onChangeProfileImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      console.log(e.target.files);
      setProfileImageFile(e.target.files[0]);
      setIsEditing(true);
    }
  };

  const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeOccupation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      occupation: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeReferrer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      referredBy: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeChiefComplaint = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      chiefComplaint: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeOtherComplaints = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      otherComplaints: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeProblemInGait = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      problemInGait: e.target.value,
    }));
    setIsEditing(true);
  };

  const onChangeMedicalHistory = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangePersonalHistory = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      personalHistory: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeFamilyHistory = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      familyHistory: newCheckedValues,
    }));
    setIsEditing(true);
  };

  const onChangeSurgicalHistory = (newCheckedValues: string[]) => {
    setFormData((prev) => ({
      ...prev,
      surgicalHistory: newCheckedValues,
    }));
    setIsEditing(true);
  };

  // update the profile image in the database
  const updateProfileImage = async () => {
    if (profileImageFile) {
      showBackdrop("Uploading Image...");
      const profile = await uploadFileToFirebaseAndGetUrl(profileImageFile, "UserProfiles");
      setFormData((prev) => ({
        ...prev,
        profileImageUrl: profile.uploadedToUrl,
      }));
      closeBackdrop();
    }
  };

  // update state every time image file changes
  useEffect(() => {
    const fetchProfileImage = async () => {
      await updateProfileImage();
    };

    fetchProfileImage();
  }, [profileImageFile]);

  const { userLoading } = useUser();

  // get the profile data from the database and set the profileData state and formData state
  const getProfileData = async () => {
    if (userLoading === "loaded") {
      const docRef = doc(db, "Userdata", user?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
        setFormData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  };

  // load the data on page load
  useEffect(() => {
    getProfileData();
  }, []);

  // trigger this function on any input change and set the value of corresponding state
  const handleProfileDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsEditing(true);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // update the data and store in the firebase database
  const handleProfileSave = async () => {
    showBackdrop("Updating Profile...");
    await setDoc(doc(db, "Userdata", user.uid), formData, { merge: true });
    setIsEditing(false);
    // get the latest data
    await getProfileData();
    showSnackbar("Profile updated successfully");
    closeBackdrop();
  };

  return (
    <div className="px-4 py-8 md:p-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[42px] font-bold">Profile Details</h2>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="mb-4">
          <h3 className="text-[20px] font-semibold mb-2">PERSONAL DETAILS</h3>

          <div className="flex flex-col gap-8 border-[2px] p-4">
            <Tooltip TransitionProps={{ timeout: 600 }} title="Change profile picture" arrow>
              <div
                className={`flex relative ${
                  formData?.profileImageUrl ? "" : "border-2 border-p-border"
                } h-24 w-24 sm:h-36 sm:w-36 rounded-full items-center justify-center bg-s-bg z-10 cursor-pointer`}
              >
                {formData?.profileImageUrl && (
                  <label htmlFor="profileImage">
                    {" "}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="absolute top-0 left-0 -z-10 rounded-full object-cover h-24 w-24 sm:h-36 sm:w-36 cursor-pointer"
                      src={formData?.profileImageUrl}
                      alt="PFP"
                    />
                  </label>
                )}

                <div className="flex flex-row items-center space-x-3">
                  <label htmlFor="profileImage">
                    <div className="bg-s-bg rounded-full p-1 cursor-pointer">
                      <AiOutlineCamera className="h-6 w-6 " />
                    </div>
                  </label>
                </div>

                {/* {profileImageFile && (
                  <Tooltip
                    TransitionProps={{ timeout: 600 }}
                    title="Clear"
                    arrow
                  >
                    <div
                      className="bg-s-bg rounded-full p-1 cursor-pointer"
                      onClick={() => {
                        profileImageInputRef.current.value = "";
                        setProfileImageFile(null);
                        // @ts-ignore
                        // set to existing profile image
                        setProfileImage(null);

                        setFormData((prev) => ({
                          ...prev,
                          profileImageUrl: profileData?.profileImageUrl,
                        }));
                      }}
                    >
                      <MdOutlineClear className="h-6 w-6" />
                    </div>
                  </Tooltip>
                )} */}
              </div>
            </Tooltip>
            
            <input
              type="file"
              id="profileImage"
              placeholder="Profile Image"
              onChange={onChangeProfileImage}
              hidden
            />
            <div className="grid justify-between align-start grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
              <div className="flex items-center justify-between flex-wrap max-w-[600px]">
                <div className="text-[18px] font-semibold text-[#333]">
                  First Name
                </div>
                <Input
                  type="text"
                  value={formData?.fname}
                  name="fname"
                  onChange={handleProfileDataChange}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap max-w-[600px]">
                <div className="font-semibold text-[18px] text-[#333]">
                  Last Name
                </div>
                <Input
                  type="text"
                  value={formData?.lname}
                  name="lname"
                  onChange={handleProfileDataChange}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap max-w-[600px]">
                <div className="font-semibold text-[18px] text-[#333]">
                  Email
                </div>
                <Input
                  type="email"
                  value={formData?.email}
                  name="email"
                  onChange={handleProfileDataChange}
                  disabled
                />
              </div>
              <div className="flex items-center justify-between flex-wrap max-w-[600px]">
                <div className="font-semibold text-[18px] text-[#333]">Age</div>
                <Input
                  type="number"
                  value={Number(formData?.age)}
                  name="age"
                  onChange={handleProfileDataChange}
                  min="0"
                  max="150"
                />
              </div>
              <FormRadio
                options={genderOptions}
                label="Gender"
                name="gender"
                checkedValue={formData?.gender || ""}
                onChange={onChangeGender}
              />
              <FormRadio
                options={occupationOptions}
                label="Occupation"
                name="occupation"
                checkedValue={formData?.occupation || ""}
                onChange={onChangeOccupation}
              />
              <FormRadio
                options={referrerOptions}
                label="Referred By"
                name="referrer"
                checkedValue={formData?.referredBy || ""}
                onChange={onChangeReferrer}
              />
              <FormTextarea
                label="Chief Complaint / Pain"
                value={formData?.chiefComplaint || ""}
                onChange={onChangeChiefComplaint}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-[20px] font-semibold mb-2">HISTORY</h3>
          <div className="grid border-[2px] p-4 justify-between align-start grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
            <FormCheckbox
              options={medicalHistoryOptions}
              label="Medical History"
              checkedValues={formData?.medicalHistory || []}
              onChange={onChangeMedicalHistory}
              otherOption={true}
            />
            <FormCheckbox
              options={personalHistoryOptions}
              label="Personal History"
              checkedValues={formData?.personalHistory || []}
              onChange={onChangePersonalHistory}
              otherOption={true}
            />
            <FormCheckbox
              options={familyHistoryOptions}
              label="Family History"
              checkedValues={formData?.familyHistory || []}
              onChange={onChangeFamilyHistory}
              otherOption={true}
            />
            <FormCheckbox
              options={surgicalHistoryOptions}
              label="Surgical History"
              checkedValues={formData?.surgicalHistory || []}
              onChange={onChangeSurgicalHistory}
              otherOption={true}
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-[20px] font-semibold mb-2">OTHER</h3>
          <div className="grid border-[2px] p-4 justify-between align-start grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
            <FormCheckbox
              options={otherComplaintsOptions}
              label="Patient Complaints"
              checkedValues={formData?.otherComplaints || []}
              onChange={onChangeOtherComplaints}
            />
            <FormTextarea
              label="Difficulty in Walking"
              value={formData?.problemInGait || ""}
              onChange={onChangeProblemInGait}
            />
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="sticky bottom-[60px] md:bottom-[20px] right-0 flex gap-2 justify-end">
          <button
            className="px-4 py-1 border-[1px] border-gray-300 hover:border-gray-600 text-[#000] text-[20px] font-semibold rounded-[10px]"
            onClick={() => {
              setIsEditing(false);
              // reset the form data
              setFormData(profileData);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-[#000] border-[1px] text-[#fff] text-[20px] font-semibold rounded-[10px]"
            onClick={handleProfileSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
