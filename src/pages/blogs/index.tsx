import { db } from "components/firebase/firebase-config";
import Blogs from "components/general/Blogs/Blogs";
import { collection, getDocs, query, where } from "firebase/firestore";

interface MetaBlog {
  id: string;
  date: Date;
  displayName: string;
  headTitle: string;
  heroImageSrc: string;
  published: boolean;
  uid: string;
  heroVideoId: string;
}

const index = ({ metaBlogsString }: { metaBlogsString: string }) => {

  const metaBlogs: MetaBlog[] = JSON.parse(metaBlogsString);

  return (
    <>
      <Blogs metaBlogs={metaBlogs} />
    </>
  );
};

export default index;

export const getServerSideProps = async () => {
  const metaBlogsCollectionRef = collection(db, "metaBlogs");
  const metaBlogsQuery = query(
    metaBlogsCollectionRef,
    where("published", "==", true)
  );

  const metaBlogsQuerySnapshot = await getDocs(metaBlogsQuery);

  const metaBlogs = metaBlogsQuerySnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });

  const metaBlogsString = JSON.stringify(metaBlogs);

  return {
    props: {
      metaBlogsString: metaBlogsString ?? null,
    },
  };
};
