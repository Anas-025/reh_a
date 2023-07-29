import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { AppNavList } from "types/app";

export const bottomNavList: AppNavList[] = [
  {
    id: 0,
    name: "Blogs",
    icon: ImportContactsIcon ,
    link: "/app/blogs",
  },
  {
    id: 1,
    name: "Payments",
    icon: AccountBalanceWalletOutlinedIcon ,
    link: "/app/paymentHistory",
  },
  {
    id: 2,
    name: "Appoinments",
    icon: CalendarMonthIcon ,
    link: "/app",
  },
  {
    id: 3,
    name: "Profile",
    icon: PermIdentityIcon ,
    link: "/app/profile",
  },
];