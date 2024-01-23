import BookIcon from "@mui/icons-material/Book";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';

const drawerList = [
  {
    name: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    name: "Book a slot",
    icon: <BookmarksIcon />,
    link: "/app",
  },
  {
    name: "Blogs",
    icon: <BookIcon />,
    link: "/blogs",
  },
  {
    name: "About us",
    icon: <InfoIcon />,
    link: "/about",
  },
  {
    name: "Contact us",
    icon: <CallIcon />,
    link: "/contact",
  },
  {
    name: "Login / Create Account",
    icon: <LoginIcon />,
    link: "/signin",
  },
];

export default drawerList;
