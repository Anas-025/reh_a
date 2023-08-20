import BookIcon from "@mui/icons-material/Book";
import CottageIcon from "@mui/icons-material/Cottage";
import EditIcon from "@mui/icons-material/Edit";

export const getDrawerList = (isAdmin: boolean, uid: string, id: string) => {
  let drawerList = [
    {
      name: "Home",
      link: "/app",
      icon: <CottageIcon />,
    },
    {
      name: "Book Appointment",
      link: "/app",
      icon: <BookIcon />,
    },
  ];

  if (isAdmin) {
    drawerList.push({
      name: "Edit",
      link: `/blogs/edit/${id}`,
      icon: <EditIcon />,
    });
  }

  return drawerList;
}