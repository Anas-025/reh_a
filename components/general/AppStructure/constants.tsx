import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import BookIcon from "@mui/icons-material/Book";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PaymentIcon from "@mui/icons-material/Payment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ScheduleIcon from "@mui/icons-material/Schedule";

export const normalList = [
  {
    id: 0,
    name: "My appoinments",
    icon: <CalendarMonthIcon />,
    link: "/app",
  },
  {
    id: 1,
    name: "Blogs",
    icon: <BookOutlinedIcon />,
    link: "/app/blogs",
  },
  {
    id: 2,
    name: "Pay",
    icon: <PaymentIcon />,
    link: "/app/pay",
  },
  {
    id: 3,
    name: "Profile",
    icon: <PermIdentityIcon />,
    link: "/app/profile",
  },
];

export const adminList = [
  {
    id: 4,
    name: "My Blogs",
    icon: <ImportContactsIcon />,
    link: "/app/myBlogs",
  },
  {
    id: 5,
    name: "Payment History",
    icon: <AccountBalanceWalletOutlinedIcon />,
    link: "/app/paymentHistory",
  },
  {
    id: 6,
    name: "Create Slots",
    icon: <ScheduleIcon />,
    link: "/app/createSlots",
  },
  {
    id: 7,
    name: "Meeting Data",
    icon: <GroupsOutlinedIcon />,
    link: "/app/meetingData",
  },
  {
    id: 8,
    name: "Analytics",
    icon: <AnalyticsOutlinedIcon />,
    link: "/app/analytics",
  },
];

export const drawerList = [
  {
    name: "My Blogs",
    icon: <BookIcon />,
    link: "/app/myBlogs",
  },
  {
    name: "Analytics",
    icon: <AnalyticsOutlinedIcon />,
    link: "/app/analytics",
  },
  {
    name: "Create Slots",
    icon: <ScheduleIcon />,
    link: "/app/createSlots",
  },
  {
    name: "Meetings Data",
    icon: <GroupsOutlinedIcon />,
    link: "/app/meetingData",
  },
];
