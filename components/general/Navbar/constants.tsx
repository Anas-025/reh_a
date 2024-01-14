import BookIcon from "@mui/icons-material/Book";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CallIcon from '@mui/icons-material/Call';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const drawerList = [
  {
    name: "Book a slot",
    icon: <BookmarksIcon />,
    link: "/app/myBlogs",
  },
  {
    name: "Services",
    icon: <MedicalServicesIcon />,
    link: "/app/profile",
  },
  {
    name: "Blogs",
    icon: <BookIcon />,
    link: "/app/myBlogs",
  },
  {
    name: "About us",
    icon: <InfoIcon />,
    link: "/app/logout",
  },
  {
    name: "Contact us",
    icon: <CallIcon />,
    link: "/app/logout",
  },
  {
    name: "Signin",
    icon: <LoginIcon />,
    link: "/app/logout",
  },
];

export default drawerList;
