import { db } from "components/firebase/firebase-config";
import VisitBlog from "components/general/VisitBlog/VisitBlog";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";




function index({blogDataString}: {blogDataString: string}) {

  const data = JSON.parse(blogDataString);

  return (
    <>
      <VisitBlog data={data} />
    </>
  );
}

export default index;


export const getServerSideProps = async ({req, res, params}: {req: NextApiRequest, res: NextApiResponse, params: any}) => {
  // const router = useRouter();
  // const id = router.query.id;
  const id = params.id;
  const blogMetaRef = doc(db, "metaBlogs", id);
  const blogMetaSnap = await getDoc(blogMetaRef);
  const blogMetaData = blogMetaSnap.data();

  if(blogMetaData && blogMetaData.published === false){
    return {
      redirect: {
        destination: '/error404',
        permanent: false,
      },
    }
  }

  const blogRef = doc(db, "blogs", id);
  const blogSnap = await getDoc(blogRef);
  const blogData = blogSnap.data();

  const data = {...blogData, ...blogMetaData, id: id};
  const blogDataString = JSON.stringify(data);


  return {
    props: {
      blogDataString
    },
  };
}
