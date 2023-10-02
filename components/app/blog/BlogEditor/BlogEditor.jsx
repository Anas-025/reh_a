import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Typography } from "@mui/material";
import BlogImage from "components/app/blog/blog_components/BlogImage/BlogImage";
import BlogPartition from "components/app/blog/blog_components/BlogPartition/BlogPartition";
import HeadTitle from "components/app/blog/blog_components/HeadTitle/HeadTitle";
import HeroImage from "components/app/blog/blog_components/HeroImage/HeroImage";
import { db } from "components/firebase/firebase-config";
import { collection, doc, writeBatch } from "firebase/firestore";
import Image from "next/image";
import emptyHere from "public/emptyHere.jpg";
import { useEffect, useRef, useState } from "react";
import { uploadFileToFirebaseAndGetUrl } from "utils/ExtendedUtils";
import GPBackdrop from "../../../general/GeneralPurpose/GPBackdrop";
import style from "../Blog.module.css";

export default function BlogEditor(props) {
  const container = useRef(null);
  const blogImageInput = useRef(null);
  const [headTitle, setHeadTitle] = useState(props.metaBlogData.headTitle);
  const [blogData, setBlogData] = useState(props.blogData);
  const date = props.metaBlogData.date;
  const [loading, setLoading] = useState(false);
  const blogID = props.blogID;
  const displayName = props.metaBlogData.displayName;
  const [uid, setUid] = useState(null);
  const [open, setOpen] = useState(false);
  const [blogCoverImage, setBlogCoverImage] = useState(
    props.metaBlogData?.heroImageSrc || ""
  );
  const [blogCoverImageFile, setBlogCoverImageFile] = useState(null);
  const [videoId, setVideoId] = useState<string>("");

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

  const handleParaClick = () => {
    setBlogData((current) => [
      ...current,
      { title: "Title", content: "Content" },
    ]);
  };

  const handleAddImageClick = () => {
    if (blogImageInput.current?.files) {
      const file = blogImageInput.current.files[0];
      const src = URL.createObjectURL(file);

      setBlogData((current) => [...current, { title: "Image", src: src }]);
    }
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const blog = {
        blogData: blogData,
        uid: uid,
      };
      let url;

      if (blogCoverImage !== "" && blogCoverImageFile) {
        url = await uploadFileToFirebaseAndGetUrl(
          blogCoverImageFile,
          "BlogImages"
        );
        setBlogCoverImage(url.uploadedToUrl);
      }

      const metaBlog = {
        displayName: displayName,
        date: date,
        headTitle: headTitle,
        videoId: videoId,
        heroImageSrc: url?.uploadedToUrl || blogCoverImage,
        uid: uid,
      };

      // write blog to firestore in batch
      const batch = writeBatch(db);

      const blogRef = doc(collection(db, "blogs"), blogID);
      const metaBlogRef = doc(collection(db, "metaBlogs"), blogID);

      batch.update(blogRef, blog);
      batch.update(metaBlogRef, metaBlog);
      await batch.commit();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GPBackdrop loading={loading} message="Saving..." />

      <HeadTitle
        displayName={displayName}
        date={new Date()}
        headTitle={headTitle}
        setHeadTitle={setHeadTitle}
      />
      <HeroImage
        blogCoverImage={blogCoverImage}
        setBlogCoverImage={setBlogCoverImage}
        blogCoverImageFile={blogCoverImageFile}
        setBlogCoverImageFile={setBlogCoverImageFile}
        videoId={videoId}
        setVideoId={setVideoId}
      />

      <div className={style.container}>
        <ul className={style.anchors} style={{ paddingLeft: "1.2rem" }}>
          {/* {titles.map((item, index) => {
            if(item === 'image') return
            return (
              <li key={index}>
                <a href={"#" + block[index].props.anchorId}> ----{item} </a>
              </li>
            );
          })} */}
        </ul>
        <ul
          className={`${style.contact} ${
            open === true ? style.contactMobile : ""
          }`}
        >
          <li className={style.fb} onClick={handleParaClick}>
            <Button className={style.addPara}>P</Button>
          </li>

          <li className={style.fb}>
            <Button sx={{ padding: "0" }}>
              <label htmlFor="addImage" className={style.addImage}>
                <input
                  ref={blogImageInput}
                  onClick={(e) => (e.target.value = null)}
                  onChange={handleAddImageClick}
                  type="file"
                  name="addImage"
                  id="addImage"
                  className={style.file}
                  accept=".jpg, .jpeg, .png"
                />
                <AddPhotoAlternateIcon />
              </label>
            </Button>
          </li>

          <li className={style.fb}>
            <Button className={style.addPara} onClick={handleSaveClick}>
              <SaveIcon />
            </Button>
          </li>

          <li className={`${style.fb} ${style.openBtn}`}>
            <Button onClick={() => setOpen(!open)} className={style.addPara}>
              <CloseIcon
                sx={{
                  transform: open === false ? "rotate(45deg)" : "",
                  transition: "transform 250ms ease-in-out",
                }}
              />
            </Button>
          </li>

          <li
            onClick={() => setOpen(false)}
            className={`${style.fb} ${style.backdrop}`}
            style={{ scale: open === true ? "100" : "1" }}
          ></li>
        </ul>

        <div className={style.content} ref={container}>
          {blogData.length > 0 ? (
            blogData.map((item, index) => {
              if (item.title === "Image")
                return (
                  <BlogImage
                    key={index}
                    data={item}
                    index={index}
                    length={blogData.length}
                    setBlogData={setBlogData}
                  />
                );
              else
                return (
                  <BlogPartition
                    key={index}
                    data={item}
                    index={index}
                    length={blogData.length}
                    setBlogData={setBlogData}
                  />
                );
            })
          ) : (
            <>
              <Image
                style={{
                  display: "block",
                  marginInline: "auto",
                  marginTop: "9rem",
                  opacity: "0.7",
                  width: "40%",
                }}
                src={emptyHere}
                alt="NO content added, Please add content by clicking the P button"
              />
              <Typography sx={{ textAlign: "center", marginTop: "2rem" }}>
                Please Enter content by clicking add buttons
              </Typography>
            </>
          )}
        </div>
      </div>
    </>
  );
}
