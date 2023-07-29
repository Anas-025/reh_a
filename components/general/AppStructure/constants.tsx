import { AccountBalanceWalletOutlined, AnalyticsOutlined, Book, BookOutlined, CalendarMonth, GroupsOutlined, ImportContacts, Payment, PermIdentity, Schedule } from '@mui/icons-material';

export const normalList = [
  {
    id: 0,
    name: "My appoinments",
    icon: <CalendarMonth />,
    link: "/app",
  },
  {
    id: 1,
    name: "Blogs",
    icon: <BookOutlined />,
    link: "/app/blogs",
  },
  {
    id: 2,
    name: "Pay",
    icon: <Payment />,
    link: "/app/pay",
  },
  {
    id: 3,
    name: "Profile",
    icon: <PermIdentity />,
    link: "/app/profile",
  },
];

export const adminList = [
  {
    id: 4,
    name: "My Blogs",
    icon: <ImportContacts />,
    link: "/app/myBlogs",
  },
  {
    id: 5,
    name: "Payment History",
    icon: <AccountBalanceWalletOutlined />,
    link: "/app/paymentHistory",
  },
  {
    id: 6,
    name: "Create Slots",
    icon: <Schedule />,
    link: "/app/createSlots",
  },
  {
    id: 7,
    name: "Meeting Data",
    icon: <GroupsOutlined />,
    link: "/app/meetingData",
  },
  {
    id: 8,
    name: "Analytics",
    icon: <AnalyticsOutlined />,
    link: "/app/analytics",
  },
];

export const drawerList = [
  {
    name: "My Blogs",
    icon: <Book/>,
    link: "/app/myBlogs",
  },
  {
    name: "Analytics",
    icon: <AnalyticsOutlined/>,
    link: "/app/analytics",
  },
  {
    name: "Create Slots",
    icon: <Schedule />,
    link: "/app/createSlots",
  },
  {
    name: "Meetings Data",
    icon: <GroupsOutlined />,
    link: "/app/meetingData",
  },
];
