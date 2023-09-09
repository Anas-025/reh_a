import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import styles from "./BlogPartition.module.css";

export default function BlogPartition({
  anchorId,
  data,
  index,
  length,
  setBlogData,
}) {
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setBlogData((current) => {
      const newData = [...current];
      newData[index].title = title;
      return newData;
    });
  };

  const handleContentChange = (e) => {
    const content = e.target.value;
    setBlogData((current) => {
      const newData = [...current];
      newData[index].content = content;
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

  // up click will move the partition up
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

  return (
    <div className={styles.block} id={anchorId}>
      <div style={{ position: "relative" }}>
        <textarea
          type="text"
          className={styles.title}
          value={data.title}
          onChange={handleTitleChange}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
        <div className={styles.buttonGroup}>
          <IconButton onClick={handleUpClick}>
            <KeyboardArrowUpIcon color="primary" />
          </IconButton>

          <IconButton onClick={handleDownClick}>
            <KeyboardArrowDownIcon color="primary" />
          </IconButton>

          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      </div>
      <div>
        <textarea
          type="text"
          className={styles.text}
          onChange={handleContentChange}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          value={data.content}
        />
      </div>
    </div>
  );
}
