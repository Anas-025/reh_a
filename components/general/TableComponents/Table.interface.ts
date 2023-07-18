import { Timestamp } from "firebase/firestore";

export type Order = "asc" | "desc";

// export interface Data {
//   id: string,
//   name: string,
//   email: string,
//   payments?: Array<string>,
// }

export interface HeadCell {
  id: keyof Data;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  headCells: readonly HeadCell[];
}

export interface MeetingType {
  userId: string;
  meetingId: string;
  userData?: any;
  caseId?: string,
}

export interface MeetingsDataProps {
  meetingsData: MeetingType[];
}

export interface Data {
  slot: string,
  userId?: string,
  caseId?: string,
  meetingId?: string,
  displayName?: string,
  caseName?: string,
  createdAt?: Timestamp,
  diurnal?: string[],
  numberOfSessions?: number,
  painType?: string[],
  whenBad?: string,
  whenBetter?: string,
}