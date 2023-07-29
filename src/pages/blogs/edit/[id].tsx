import { withAdmin } from "ProtectedRoutes/AdminRoute";
import BlogEditor from "components/app/blog/BlogEditor/BlogEditor";
import { db } from "components/general/firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";


function index(props:any) {

  const metaBlogData = JSON.parse(props.metaBlogDataString);
  const blogData = JSON.parse(props.blogDataString);
  const blogID = props.blogID;

  return (
    <>
     <BlogEditor metaBlogData={metaBlogData} blogData={blogData.blogData} blogID={blogID}/>
    </>
  );
}

export async function getServerSideProps(context:any) {
  const blogID = context.params.id;
  
  const metaBlogSnap = await getDoc(doc(collection(db, "metaBlogs"), blogID));
  const metaBlogData = metaBlogSnap.data();
  const metaBlogDataString = JSON.stringify(metaBlogData);

  const blogSnap = await getDoc(doc(collection(db, "blogs"), blogID));
  const blogData = blogSnap.data();
  const blogDataString = JSON.stringify(blogData);

  return {
    props: {
      metaBlogDataString,
      blogDataString,
      blogID
    }, // will be passed to the page component as props
  };
}

export default withAdmin(index);