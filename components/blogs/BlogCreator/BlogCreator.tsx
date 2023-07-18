import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import { db } from "components/general/firebase-config";
import { collection, doc, writeBatch } from "firebase/firestore";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import emptyHere from '../../../public/emptyHere.jpg';
import BlogImage from "../BlogComponents/BlogImage/BlogImage";
import BlogPartition from '../BlogComponents/BlogPartition/BlogPartition';
import HeadTitle from "../BlogComponents/HeadTitle/HeadTitle";
import HeroImage from "../BlogComponents/HeroImage/HeroImage";
import style from "./VisitBlog.module.css";



export default function BlogCreator({dataString}: {dataString: string}) {
  const data = JSON.parse(dataString);
  const [titles, setTitles] = useState([]);
  const container = useRef(null);
  const [headTitle, setHeadTitle] = useState("Click to Edit Title");
  const [heroImageSrc, setHeroImageSrc] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaJKOnh70m9VVMzrgdZY0jTGUfLSXFI01IQ&usqp=CAU");
  const [blogData, setBlogData] = useState<{ title: string; src?: string; content?: string; }[]>([]);
  const displayName = `${data.fname} ${data.lname}`;
  const date = new Date();
  const userBlogs = data.blogs;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const uid = data.uid;
  const [open, setOpen] = useState(false);

  console.log(data);

  // useEffect(() => {
  //   const boldBtn = document.querySelector("#addBold");
  //   const italicBtn = document.querySelector("#addItalic");

  //   const handleBoldClick = () => {
  //     var range = window.getSelection().getRangeAt(0);

  //     let bold = document.createElement("b");

  //     bold.appendChild(range.extractContents());
  //     range.insertNode(bold);
  //   };

  //   const handleItalicClick = () => {
  //     var range = window.getSelection().getRangeAt(0);
  //     let italic = document.createElement("i");

  //     italic.appendChild(range.extractContents());
  //     range.insertNode(italic);
  //   };

  //   italicBtn.addEventListener("click", handleItalicClick);
  //   boldBtn.addEventListener("click", handleBoldClick);
  // });

  // useEffect(() => {
  //   const titles = block.map((item) => {
  //     if (item.type.name === "BlogImage") return 'image';
  //     return getTitle(item.props.anchorId);
  //   });

  //   setTitles(titles);
  // }, [block]);

  // const getTitle = (anchorId: any) => {
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
    if(blogImageInput.current?.files){
      const file = blogImageInput.current.files[0];

      setBlogData((current) => [
        ...current,
        { title: "Image", src: src },
      ]);
    }
  };

  const uploadImageToFirebase = async (file: File, path: string) => {
    const imageUrl = await uploadFileToFirebaseAndGetUrl(file, path);
    return imageUrl.uploadedToUrl;
  };

  const handleBlogImageUpload = async (blog: {
    title: string;
    src?: File;
    content?: string;
  }) => {
    if (blog.title === "Image") {
      const blogImageUrl = await uploadImageToFirebase(blog.src!, "BlogImages");
      console.log(blogImageUrl);
      return { ...blog, src: blogImageUrl };
    }
    return blog;
  };

  const handleSaveClick = async () => {
    const blog = {
      blogData: blogData,
      uid: uid,
    };

    const metaBlog = {
      displayName: displayName,
      date: date,
      headTitle: headTitle,
      heroImageSrc: heroImageSrc,
      uid: uid,
      published: false,
    }

    
    
    // write blog to firestore in batch
    const batch = writeBatch(db);
    const blogRef = doc(collection(db, "blogs"));
    const blogId = blogRef.id;

    const blogs = [...userBlogs, blogId ] || [blogId];
    const userRef = doc(collection(db, "Userdata"), uid);
    const metaBlogRef = doc(collection(db, "metaBlogs"), blogId);
    
    
    batch.set(userRef, {blogs: blogs}, {merge: true});
    batch.set(blogRef, blog);
    batch.set(metaBlogRef, metaBlog);
    setLoading(true);
    await batch.commit();
    router.push(`/blogs/edit/${blogId}`);
      
  };


  

  return (
    <>
      <Backdrop open={loading} sx={{zIndex: 100, flexDirection: 'column', gap: 4, color: 'white'}}>
        <Typography fontSize={24}> Creating new blog... </Typography>
        <CircularProgress  sx={{color: 'white'}} />
      </Backdrop>


      <HeadTitle
        displayName={displayName}
        date={date}
        headTitle={headTitle}
        setHeadTitle={setHeadTitle}
      />
      <HeroImage
        heroImageSrc={heroImageSrc}
        setHeroImageSrc={setHeroImageSrc}
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
        <ul className={`${style.contact} ${open === true ? style.contactMobile : ''}`}>
          <li className={style.fb} onClick={handleParaClick}>
            <Button className={style.addPara}>P</Button>
          </li>
          
          <li className={style.fb}>
            <Button sx={{ padding: "0" }}>
              <label htmlFor="addImage" className={style.addImage}>
                <input
                  ref={blogImageInput}
                  onClick={(e) => ((e.target as HTMLInputElement).value = '')}
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
            <Button onClick={()=>setOpen(!open)} className={style.addPara}>

              <CloseIcon sx={{transform: open === false ? "rotate(45deg)" : "", transition: "transform 250ms ease-in-out"}}/>
              
            </Button>
          </li>


          <li onClick={()=>setOpen(false)} className={`${style.fb} ${style.backdrop}`} style={{scale: open === true ? '100': '1'}}>
          </li>

          

        </ul>

        <div className={style.content} ref={container}>
          {
            blogData.length > 0 ?

            blogData.map((item, index) => {
              if(item.title === 'Image') return <BlogImage key={index} data={item} index={index} length={blogData.length} setBlogData={setBlogData}/>
              else
                return (
                  <BlogPartition key={index} anchorId={index} data={item} index={index} length={blogData.length} setBlogData={setBlogData}/>
                );
            })
            :
            <>
              <Image style={{display: 'block',marginInline: 'auto', marginTop: '9rem', opacity: '0.7', width: '40%'}} src={emptyHere} alt="NO content added, Please add content by clicking the P button" />
              <Typography sx={{textAlign: "center", marginTop: "2rem"}}>Please Enter content by clicking add buttons</Typography>
            </>
          }

        </div>
      </div>
    </>
  );
}
