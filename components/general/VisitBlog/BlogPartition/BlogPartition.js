import React from "react";
import blogpart from "./BlogPartition.module.css";
import sanitize from "sanitize-html";

export default function BlogPartition({ text, title, index }) {
  const sanitized = sanitize(text);
  return (
    <div className={blogpart.block}>
      <div className={blogpart.title} id={`anchor${index}`}>
        {title}
      </div>
      <div className={blogpart.text}>
        <pre style={{fontFamily : 'Arial', whiteSpace : 'pre-wrap'}} contentEditable="true" dangerouslySetInnerHTML={{ __html: sanitized }} />
      </div>
    </div>
  );
}
