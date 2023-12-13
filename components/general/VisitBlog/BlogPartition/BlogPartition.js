import sanitize from "sanitize-html";
import style from "../../../app/blog/Blog.module.css";
import blogpart from "./BlogPartition.module.css";

export default function BlogPartition({ text, title, index, src }) {
  const sanitized = sanitize(text);
  return title !== "Image" ? (
    <div className={blogpart.block}>
      <div className={blogpart.title} id={`anchor${index}`}>
        {title}
      </div>
      <div className={blogpart.text}>
        <p dangerouslySetInnerHTML={{ __html: sanitized }} />
      </div>
    </div>
  ) : (
      <div className={blogpart.text}>
        <div className={style.image1} style={{ marginBottom: "70px" }}>
          <div style={{ width: "min(25rem, 94vw)" }}>
            <img src={src} alt="" />
          </div>
        </div>
      </div>
  );
}
