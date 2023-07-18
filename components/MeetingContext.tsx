import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "./general/firebase-config";
import { useUser } from "./UserContext";

interface ContextType {
  token: string | null;
  meetingId: string;
  updateToken: (newToken: string | null) => void;
  updateMeetingId: (newMeetingId: string) => void;
}

interface MeetingProviderProps {
  children: React.ReactNode;
}

export const MeetingContext = createContext<ContextType>({
  token: null,
  meetingId: "",
  updateToken: () => {},
  updateMeetingId: () => {},
});

export const MeetingProvider = ({ children }: MeetingProviderProps) => {
  const [token, setToken] = useState<string | null>("");
  const [meetingId, setMeetingId] = useState<string>("");
  const { user } = useUser();

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
  };

  const updateMeetingId = (newMeetingId: string) => {
    setMeetingId(newMeetingId);
  };

  const updateMeetingsData = async () => {
    // get the current user data and set as a field in the meeting document
    const docRef = doc(db, "Userdata", user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // store the active meeting id in the user data
      await setDoc(docRef, { activeMeetingId: meetingId }, { merge: true });

      // only storing the user id in the meeting document
      await setDoc(doc(db, "Meetings", meetingId), { userId: user?.uid });
    } else {
      console.log("No such document!");
    }
  };

  // useEffect(() => {
  //   if (meetingId) {
  //     updateMeetingsData();
  //   }
  // }, [meetingId]);

  return (
    <MeetingContext.Provider
      value={{ token, meetingId, updateToken, updateMeetingId }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => useContext(MeetingContext);
