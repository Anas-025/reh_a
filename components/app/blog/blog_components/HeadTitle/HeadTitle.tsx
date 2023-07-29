import { Avatar, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { HeadTitleProps } from "../../Blog.interface";
import style from "./HeadTitle.module.css";

function HeadTitle(props: HeadTitleProps) {
  const { headTitle, setHeadTitle, displayName, date } = props;
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    headTtitleHeight();
  }, []);

  const headTtitleHeight = () => {
    if (titleRef.current) {
      titleRef.current.style.height = "4rem";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  };

  const headTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeadTitle(e.target.value);
    headTtitleHeight();
  };


  return (
    <div className={style.head}>
      <Typography variant="h3" className={style.title}>
        <textarea
          value={headTitle}
          ref={titleRef}
          style={{
            height: "4rem",
            width: "100%",
            fontWeight: "bolder",
            resize: "none",
            textAlign: "center",
            paddingInline: "1rem",
          }}
          onChange={headTitleChange}
        ></textarea>
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

        <Typography variant="body1">{`${date.toLocaleString("default", {
          month: "long",
        })} ${date.getDate()}, ${date.getFullYear()}`}</Typography>

        
      </div>
    </div>
  );
}

export default HeadTitle;
