export interface Profile {
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

export interface CaseModalProps {
  caseData: any;
  handleClose: () => void;
  toggleSlot: () => void;
  setMeeting: any;
  meeting: any;
  meetingId: string;
  handleJoinMeetClick: () => void;
}
