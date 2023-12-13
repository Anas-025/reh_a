import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Container, IconButton } from "@mui/material";
import style from "../../Blog.module.css";

export default function BlogImage({ setBlogData, index, data, length }) {
  const src = data.src;

  const handleUpClick = () => {
    if (length === 0) return;
    if (index === 0) return;
    setBlogData((current) => {
      const newData = [...current];
      const temp = newData[index];
      newData[index] = newData[index - 1];
      newData[index - 1] = temp;
      return newData;
    });
  };

  const handleDownClick = () => {
    if (length === 0) return;
    if (index === length - 1) return;
    setBlogData((current) => {
      const newData = [...current];
      const temp = newData[index];
      newData[index] = newData[index + 1];
      newData[index + 1] = temp;
      return newData;
    });
  };

  const handleDeleteClick = () => {
    setBlogData((current) => {
      const newData = [...current];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <>
      <div className={style.image1} style={{ marginBottom: "70px" }}>
        <div style={{ width: "min(25rem, 94vw)", resize: "both" }}>
          <img src={src} alt="" />
        </div>
        <IconButton className={style.editIcon}>
          <EditIcon sx={{ color: "white" }} />
        </IconButton>

        <Container sx={{ resize: "none!important" }}>
          <IconButton onClick={handleUpClick}>
            <KeyboardArrowUpIcon color="primary" />
          </IconButton>

          <IconButton onClick={handleDownClick}>
            <KeyboardArrowDownIcon color="primary" />
          </IconButton>

          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon color="error" />
          </IconButton>
        </Container>
      </div>
    </>
  );
}
