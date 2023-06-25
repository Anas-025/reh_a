import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Typography } from "@mui/material";
import { db } from "components/general/firebase-config";
import { collection, doc, writeBatch } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { uploadFileToFirebaseAndGetUrl } from "utils/ExtendedUtils";
import emptyHere from "../../../public/emptyHere.jpg";
import BlogImage from "../BlogComponents/BlogImage/BlogImage";
import BlogPartition from "../BlogComponents/BlogPartition/BlogPartition";
import HeadTitle from "../BlogComponents/HeadTitle/HeadTitle";
import HeroImage from "../BlogComponents/HeroImage/HeroImage";
import style from "../BlogCreator/BlogCreator.module.css";
import GPBackdrop from "../../general/GeneralPurpose/GPBackdrop";
import { MetaBlog, BlogData, BlogEditData } from "types/blogs";

export default function BlogEditor(props: {
  metaBlogData: MetaBlog;
  blogData: BlogData[];
  blogID: string;
}) {
  const [titles, setTitles] = useState([]);
  const container = useRef(null);
  const blogImageInput = useRef<HTMLInputElement>(null);
  const [headTitle, setHeadTitle] = useState(props.metaBlogData.headTitle);
  const [blogData, setBlogData] = useState<BlogEditData[]>(props.blogData);
  const date = props.metaBlogData.date;
  const [loading, setLoading] = useState(false);
  const blogID = props.blogID;
  const displayName = props.metaBlogData.displayName;
  const [uid, setUid] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [blogCoverImage, setBlogCoverImage] = useState<string>(
    props.metaBlogData?.heroImageSrc || ""
  );
  const [blogCoverImageFile, setBlogCoverImageFile] = useState<File | null>(
    null
  );

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

  // const getTitle = (anchorId) => {
  //   const title = document.getElementById(`${anchorId}`);
  //   return title.children[0].innerText;
  // };

  const handleParaClick = () => {
    setBlogData((current) => [
      ...current,
      { title: "Title", content: "Content" },
    ]);
  };

  const handleAddImageClick = () => {
    if (blogImageInput.current?.files) {
      const file = blogImageInput.current.files[0];

      setBlogData((current) => [...current, { title: "Image", src: file }]);
    }
  };

  const uploadImageToFirebase = async (file: File, path: string) => {
    const imageUrl = await uploadFileToFirebaseAndGetUrl(file, path);
    return imageUrl.uploadedToUrl;
  };

  const handleBlogImageUpload = async (blog: {
    title: string;
    src?: File | string;
    content?: string;
  }) => {
    if (blog.title === "Image") {
      // if image is not updated (because if string imageUrl already exists if not new file is there)
      if (typeof blog.src === "string") return blog;

      const blogImageUrl = await uploadImageToFirebase(blog.src!, "BlogImages");
      console.log(blogImageUrl);
      return { ...blog, src: blogImageUrl };
    }
    return blog;
  };

  const handleSaveClick = async () => {
    if (!blogCoverImage) {
      alert("Please add a cover image");
      return;
    }

    setLoading(true);
    try {
      // set the src to the src from firebase for the changed images
      const updatedBlogData = await Promise.all(
        blogData.map(async (blog) => {
          return await handleBlogImageUpload(blog);
        })
      );

      console.log(updatedBlogData);

      const blog = {
        blogData: updatedBlogData,
        uid: uid,
      };

      // if cover image changed then upload
      let heroImageSrc = blogCoverImage;
      if (blogCoverImage !== props.metaBlogData.heroImageSrc) {
        const blogCoverImageUrl = await uploadFileToFirebaseAndGetUrl(
          blogCoverImageFile,
          "BlogImages"
        );
        heroImageSrc = blogCoverImageUrl.uploadedToUrl;
      }

      const metaBlog = {
        displayName: displayName,
        date: date,
        headTitle: headTitle,
        heroImageSrc: heroImageSrc,
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
                    data={{ title: item.title, content: item.content }}
                    index={index}
                    anchorId={index}
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
