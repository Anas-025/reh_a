import sanitize from "sanitize-html";
import blogpart from "./BlogPartition.module.css";

export default function BlogPartition({ text, title, index }) {
  const sanitized = sanitize(text);
  return (
    <div className={blogpart.block}>
      <div className={blogpart.title} id={`anchor${index}`}>
        {title}
      </div>
      <div className={blogpart.text}>
        <p contentEditable="true" dangerouslySetInnerHTML={{ __html: sanitized }} />
      </div>
    </div>
  );
}
