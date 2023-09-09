import { Avatar, Typography } from "@mui/material";
import { HeadTitleProps } from "../BlogInterface/Blog.interface";
import style from "./HeadTitle.module.css";

function HeadTitle(props: HeadTitleProps) {
  const { headTitle, displayName } = props;
  const date = new Date(props.date.seconds * 1000);

  return (
    <div className={style.head}>
      <Typography
        variant="h3"
        className={style.title}
        style={{
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        {headTitle}
      </Typography>
      <div className={style.author}>
        <Avatar
          className={style.authorAvatar}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQaD1mEh95w9y6o_8eVSErM9mnbbRQUiCgw&usqp=CAU"
          sx={{ backgroundColor: "#1565c0", width: "2rem", height: "2rem" }}
        ></Avatar>

        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Written By {displayName} &nbsp; &nbsp;
        </Typography>

        <Typography variant="body1">
          {`${date.toLocaleString("default", {
            month: "long",
          })} ${date.getDate()}, ${date.getFullYear()}`}
        </Typography>
      </div>
    </div>
  );
}

export default HeadTitle;
