import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { Data } from "./BlogInterface/Blog.interface";
import BlogPartition from "./BlogPartition/BlogPartition";
import HeadTitle from "./HeadTitle/HeadTitle";
import HeroImage from "./HeroImage/HeroImage";
import HeroVideo from "./HeroVideo/HeroVideo";
import visblog from "./VisitBlog.module.css";

export default function VisitBlog({ data }: { data: Data }) {
  console.log(data)
  return (
    <>
      <HeadTitle
        headTitle={data.headTitle}
        displayName={data.displayName}
        date={data.date}
      />

      {data.heroVideoId && data.heroVideoId !== "" ? (
        <HeroVideo heroVideoId={data.heroVideoId} />
      ) : (
        <HeroImage heroImageSrc={data.heroImageSrc} />
      )}

      <div className={visblog.container}>
        <ul className={visblog.anchors}>
          {data.blogData.map((content, index) => {
            return (
                content.title !== "Image" && content.title !== "" && (
                <li key={`anchor${index}`}>
                  <a href={`#anchor${index}`}>- {content.title}</a>
                </li>
              )
            );
          })}
        </ul>

        <ul className={visblog.contact}>
          <li className={visblog.fb}>
            <CgFacebook className={visblog.icn} color="white" />
          </li>
          <li className={visblog.fb}>
            <AiOutlineTwitter className={visblog.icn} color="white" />
          </li>
          <li className={visblog.fb}>
            <AiOutlineInstagram className={visblog.icn} color="white" />
          </li>
          <li className={visblog.fb}>
            <MdOutlineEmail className={visblog.icn} color="white" />
          </li>
        </ul>

        <div className={visblog.content}>
          {data.blogData.map((content, index) => {
            return (
              <BlogPartition
                key={`title${index}`}
                index={index}
                title={content.title}
                text={content.content}
                src={content.src}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
