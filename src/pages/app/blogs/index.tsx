import { db } from "components/firebase/firebase-config";
import { MetaBlog } from "components/general/App/BlogsGrid/B.interface";
import BlogsGrid from "components/general/App/BlogsGrid/BlogsGrid";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Suspense } from "react";

const app = ({ metaBlogsDataString }: { metaBlogsDataString: string }) => {
  const data: MetaBlog[] = JSON.parse(metaBlogsDataString);
  console.log(data);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogsGrid data={data} />
      </Suspense>
    </>
  );
};

export default app;

export const getServerSideProps = async () => {
  // get the latest 10 blogs from firestore
  const q = query(
    collection(db, "metaBlogs"),
    orderBy("date", "desc"),
    where("published", "==", true),
    limit(7)
  );

  const metaBlogs = await getDocs(q);
  const metaBlogsData = metaBlogs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const metaBlogsDataString = JSON.stringify(metaBlogsData);

  return {
    props: {
      metaBlogsDataString,
    },
  };
};
