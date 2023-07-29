import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import BookIcon from '@mui/icons-material/Book';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { AppDrawerList, AppNavList } from "types/app";

export const userNavList: AppNavList[] = [
  {
    id: 0,
    name: "My appoinments",
    icon: CalendarMonthIcon ,
    link: "/app",
  },
  {
    id: 1,
    name: "Blogs",
    icon: BookOutlinedIcon,
    link: "/app/blogs",
  },
  {
    id: 2,
    name: "Profile",
    icon: PermIdentityIcon ,
    link: "/app/profile",
  },
];

export const adminNavList: AppNavList[] = [
  ...userNavList,
  {
    id: 3,
    name: "My Blogs",
    icon: ImportContactsIcon ,
    link: "/app/myBlogs",
  },
  {
    id: 4,
    name: "Payment History",
    icon: AccountBalanceWalletOutlinedIcon ,
    link: "/app/paymentHistory",
  },
  {
    id: 5,
    name: "Create Slots",
    icon: ScheduleIcon ,
    link: "/app/createSlots",
  },
  {
    id: 6,
    name: "Meeting Data",
    icon: GroupsOutlinedIcon ,
    link: "/app/meetingData",
  },
  {
    id: 7,
    name: "Analytics",
    icon: AnalyticsOutlinedIcon ,
    link: "/app/analytics",
  },
];

export const userDrawerList: AppDrawerList[] = []

export const adminDrawerList: AppDrawerList[] = [
  ...userDrawerList,
  {
    name: "My Blogs",
    icon: BookIcon ,
    link: "/app/myBlogs",
  },
  {
    name: "Analytics",
    icon: AnalyticsOutlinedIcon ,
    link: "/app/analytics",
  },
  {
    name: "Create Slots",
    icon: ScheduleIcon ,
    link: "/app/createSlots",
  },
  {
    name: "Meetings Data",
    icon: GroupsOutlinedIcon ,
    link: "/app/meetingData",
  },
];