import { Avatar, Typography } from "@mui/material";
import style from "./HeadTitle.module.css";

interface HeadTitleProps {
  displayName: string;
  headTitle: string;
  date: FirebaseTimestamp;
}

interface FirebaseTimestamp {
  nanoseconds: number;
  seconds: number;
}

function HeadTitle({ displayName, headTitle, date }: HeadTitleProps) {
  const blogCreatedDate = new Date(date.seconds * 1000);

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
          Written By {displayName}
          {"  "}
        </Typography>

        <Typography variant="body1">
          {`${blogCreatedDate.toLocaleString("default", {
            month: "long",
          })} ${blogCreatedDate.getDate()}, ${blogCreatedDate.getFullYear()}`}
        </Typography>
      </div>
    </div>
  );
}

export default HeadTitle;
