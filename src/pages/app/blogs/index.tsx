import BlogsGrid from "components/general/App/BlogsGrid/BlogsGrid";
import { db } from "components/general/firebase-config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

interface MetaBlog {
  id: string;
  date: Date;
  displayName: string;
  headTitle: string;
  heroImageSrc: string;
  published: boolean;
  uid: string;
}

const app = ({ metaBlogsDataString }: { metaBlogsDataString: string }) => {
  const data: MetaBlog[] = JSON.parse(metaBlogsDataString);

  return (
    <>
      <BlogsGrid data={data} />
    </>
  );
};

export default app;

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
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
