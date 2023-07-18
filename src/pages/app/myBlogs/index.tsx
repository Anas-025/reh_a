import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { Box, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from "@mui/material";
import { withAdmin } from 'ProtectedRoutes/AdminRoute';
import BlogsCard from "components/general/Blogs/BlogsCard/BlogsCard";
import GPBackdrop from 'components/general/GeneralPurpose/GPBackdrop';
import GPDialog from 'components/general/GeneralPurpose/GPDialog';
import GPSnackbar from 'components/general/GeneralPurpose/GPSnackbar';
import { db } from "components/general/firebase-config";
import { getCookie } from "cookies-next";
import { collection, doc, getDoc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import useDevice from 'utils/useDevice';

const app = (props : any) => {
  const [metaBlogsData, setMetaBlogsData] = useState(JSON.parse(props.metaBlogsDataString));
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [published, setPublished] = useState(false);
  const [backdropMessage, setBackdropMessage] = useState("");
  const router = useRouter();
  const { isMobile } = useDevice();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string, published: boolean) => {
    setAnchorEl(event.currentTarget);
    setPublished(published);
    setBlogId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  const handleClickOpen = () => {
    setDialogOpen(true);
  };


  const handleDelete = async () => {
    
    try{
      const blogRef = doc(db, "blogs", blogId);
      const metaBlogRef = doc(db, "metaBlogs", blogId);
      const batch = writeBatch(db);
      batch.delete(blogRef);
      batch.delete(metaBlogRef);

      setDialogOpen(false);
      setAnchorEl(null);
      setBackdropMessage("Deleting blog...");
      setLoading(true);
      await batch.commit();
      setLoading(false);
      setSnackbarMessage("Blog deleted successfully!");
      setSnackbarOpen(true);
    }
    catch(err){
      console.log(err);
    }

    metaBlogsData.splice(metaBlogsData.findIndex((blog: any) => blog.id === blogId), 1);
    setMetaBlogsData([...metaBlogsData]);

  }

  const handlePublishToggle = async () => {
    try{
      const blogRef = doc(db, "blogs", blogId);
      const metaBlogRef = doc(db, "metaBlogs", blogId);
      const batch = writeBatch(db);
      batch.update(blogRef, {published: !published});
      batch.update(metaBlogRef, {published: !published});

      setAnchorEl(null);
      setBackdropMessage("Publishing blog...");
      setLoading(true);
      await batch.commit();
      setLoading(false);

      metaBlogsData.find((blog: any) => blog.id === blogId).published = !published;
      setMetaBlogsData([...metaBlogsData]);

      setSnackbarMessage(`Blog ${!published ? "published" : "unpublished"} successfully!`);
      setSnackbarOpen(true);
    }
    catch(err){
      console.log(err);
    }
  }





  return (
    <>

      <GPBackdrop loading={loading} message={backdropMessage} />

    
      <Box sx={{ textAlign: "center", marginTop: "2rem", '@media (max-width:768px)': { paddingInline : "2rem"} }}>

        <Box sx={{position: "relative", "&:hover>a>svg": {right: "2px"}, maxWidth: "max-content", margin: "auto", '@media (max-width:250px)': { fontSize : "0.7rem"}}}>
          <Link href="/blogs/create" style={{backgroundColor: "black", padding: "0.6rem 2rem 0.6rem 1rem", color: "white", borderRadius: "5px"}}>
              Create&nbsp;New&nbsp;Blog&nbsp;<ChevronRightIcon sx={{position: "absolute", top: "50%", transform: "translatey(-50%)"}}/>
          </Link>
        </Box>

        <Divider sx={{ marginTop: "2rem", marginBottom: "3rem" }} />

        <Grid container spacing={5}>
          {metaBlogsData.map((blog: any) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={blog.id} sx={{position: "relative"}} >
              <Link href={`/blogs/read/${blog.id}`} passHref>
                <BlogsCard imgUrl={blog.heroImageSrc} title={blog.headTitle} mainTitle={blog.published ? "Published" : "Not Published"} />
              </Link>

              <IconButton aria-describedby={popoverId} onClick={(e)=>handleClick(e, blog.id, blog.published)} sx={{position: "absolute", top: "0", right: "-1.8rem", transform: "translatey(85%)", zIndex: 1}}>
                <MoreVertIcon />
              </IconButton>

            </Grid>
          ))}  
        </Grid>
      </Box>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          <ListItem disablePadding>

            <ListItemButton onClick={()=>router.push(`/blogs/edit/${blogId}`)}>
              <ListItemIcon sx={{color: "black"}}>
                <EditIcon />
              </ListItemIcon>
              <ListItemText sx={{color: "black!important"}}  primary="Edit" />
            </ListItemButton>

          </ListItem>

          <ListItem disablePadding>

            <ListItemButton onClick={handlePublishToggle}>
              <ListItemIcon sx={{color: "black"}}>

                {published ? <UnpublishedIcon /> : <PublishIcon/> }
                
              </ListItemIcon>
              <ListItemText primary={published ? "Unublish" : "Publish"} />
            </ListItemButton>
            
          </ListItem>

          <ListItem disablePadding>

            <ListItemButton onClick={handleClickOpen}>
              <ListItemIcon>
                <DeleteIcon color="error"/>
              </ListItemIcon>
              <ListItemText  primary="Delete" />
            </ListItemButton>
            
          </ListItem>

        </List>
      </Popover>

      <GPDialog
        title="Are you sure you want to Delete this blog?"
        contentText="This will permanantely delete this blog."
        buttons={[{text: "Cancel"}, {text: "Delete", color: "error", onClick: handleDelete}]}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
      <GPSnackbar message={snackbarMessage} />

    </>
  );
};

export default withAdmin(app);


export const getServerSideProps = async ({req, res}: {req: NextApiRequest, res: NextApiResponse}) => {
  
  const uid =  getCookie("uid", {req, res});

  const userSnap = await getDoc(doc(collection(db, "Userdata"), `${uid}`));
  const user = userSnap.data();
  const userBlogs = user?.blogs;

  let metaBlogsDataString = null;
  if(userBlogs && userBlogs.length > 0){
    const q = query(collection(db, "metaBlogs"), where("__name__", "in", userBlogs));
    const metaBlogs = await getDocs(q);
    const metaBlogsData = metaBlogs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    metaBlogsDataString = JSON.stringify(metaBlogsData);
  }


  return {
    props: {
      metaBlogsDataString
    },
  };
}
