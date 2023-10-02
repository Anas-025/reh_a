import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Typography } from "@mui/material";
import { db } from "components/firebase/firebase-config";
import { collection, doc, writeBatch } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import emptyHere from "public/emptyHere.jpg";
import { useRef, useState } from "react";
import { uploadFileToFirebaseAndGetUrl } from "utils/ExtendedUtils";
import GPBackdrop from "../../../general/GeneralPurpose/GPBackdrop";
import style from "../Blog.module.css";
import HeadTitle from "../blog_components//HeadTitle/HeadTitle";
import HeroImage from "../blog_components//HeroImage/HeroImage";
import BlogImage from "../blog_components/BlogImage/BlogImage";
import BlogPartition from "../blog_components/BlogPartition/BlogPartition";

export default function BlogCreator({ dataString }: { dataString: string }) {
  const data = JSON.parse(dataString);
  const [titles, setTitles] = useState([]);
  const container = useRef(null);
  const blogImageInput = useRef<HTMLInputElement>(null);
  const [headTitle, setHeadTitle] = useState("Click to Edit Title");
  const [blogData, setBlogData] = useState<
    { title: string; src?: string; content?: string }[]
  >([]);
  const displayName = `${data.fname} ${data.lname}`;
  const date = new Date();
  const userBlogs = data.blogs;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const uid = data.uid;
  const [open, setOpen] = useState(false);

  const [blogCoverImage, setBlogCoverImage] = useState<string>("");
  const [blogCoverImageFile, setBlogCoverImageFile] = useState<File | null>(
    null
  );
  const [videoId, setVideoId] = useState<string>("");

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
    let isVideo : boolean = false;
    if(videoId !== ""){
      isVideo = true;
    }
    if (!isVideo && !blogCoverImageFile) {
      alert("Please add a cover image");
      return;
    }

    setLoading(true);
    try {
      const blog = {
        blogData: blogData,
        uid: uid,
      };

      
      const blogCoverImageUrl = await uploadFileToFirebaseAndGetUrl(
        blogCoverImageFile,
        "BlogImages"
      );

      const metaBlog = {
        displayName: displayName,
        date: date,
        headTitle: headTitle,
        heroImageSrc: blogCoverImageUrl.uploadedToUrl,
        heroVideoId: videoId,
        uid: uid,
        published: false,
      };

      // write blog to firestore in batch
      const batch = writeBatch(db);
      const blogRef = doc(collection(db, "blogs"));
      const blogId = blogRef.id;

      const blogs = [...userBlogs, blogId] || [blogId];
      const userRef = doc(collection(db, "Userdata"), uid);
      const metaBlogRef = doc(collection(db, "metaBlogs"), blogId);

      batch.set(userRef, { blogs: blogs }, { merge: true });
      batch.set(blogRef, blog);
      batch.set(metaBlogRef, metaBlog);
      await batch.commit();
      router.push(`/blogs/edit/${blogId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GPBackdrop loading={loading} message="Creating new Blog..." />

      <HeadTitle
        displayName={displayName}
        date={date}
        headTitle={headTitle}
        setHeadTitle={setHeadTitle}
      />
      <HeroImage
        blogCoverImage={blogCoverImage}
        setBlogCoverImage={setBlogCoverImage}
        blogCoverImageFile={blogCoverImageFile}
        setBlogCoverImageFile={setBlogCoverImageFile}
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
                  onClick={(e) => ((e.target as HTMLInputElement).value = "")}
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
                    anchorId={index}
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
