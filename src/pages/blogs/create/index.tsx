import BlogCreator from "components/app/blog/BlogCreator/BlogCreator";
import { db } from "components/firebase/firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";


function index({dataString}: {dataString: string}) {

  return (
    <>
     <BlogCreator dataString={dataString} />
    </>
  );
}

export default index;



export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  // get cookies from Context
  const cookieString = ctx.req.headers.cookie;
  // convert cookies to object
  const cookies = cookieString?.split(";").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key.trim()] = value;
    return acc;
  }, {} as { [key: string]: string });

  const userId = cookies?.uid;

  if(!userId) return {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };

  const userSnap = await getDoc(doc(collection(db, "Userdata"), userId));
  const data = {
    uid: userSnap.id,
    ...userSnap.data(),
  }
  const dataString = JSON.stringify(data);
  return {
    props: {
      dataString,
    },
  };
}
);
