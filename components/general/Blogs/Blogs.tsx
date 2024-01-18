import Link from "next/link";
import BlogCard from "./BlogsCard/BlogsCard";

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

const Blogs = ({ metaBlogs }: { metaBlogs: MetaBlog[] }) => {
  const firstThreeMetaBlogs = metaBlogs.slice(0, 3);

  return (
    <div className="w-full mx-auto text-[#1d2b36]">
      <div className="bg-gradient-to-b from-[#dee7ff99] p-5 md:p-24 md:pt-16">
        <div className="w-full lg:w-[85%] mb-8">
          <h2 className="font-bold mb-5 navTrigger text-[calc(30px+(18)*((100vw-430px)/(770)))]">
            The R-A Blog
          </h2>
          <p className="text-[24px] font-extralight">
            Explore our physiotherapy blog for expert insights and enjoy
            expert video content, guiding you toward a stronger, pain-free
            life.
          </p>
        </div>
      </div>

      <div className="px-5 md:px-24">
        <div className="mb-8">
          <h3 className="text-[32px] font-bold mb-5">Most Recent Posts</h3>
          <div className="h-[1px] bg-[#ccc] w-full mb-10" />
          <div className="grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 ">
            <div
              className={`sm:row-span-2 ${
                firstThreeMetaBlogs[1] ? "sm:col-span-2" : "sm:col-span-3"
              }`}
            >
              <Link href={`/blogs/read/${firstThreeMetaBlogs[0].id}`}>
                <div className={`w-full h-full overflow-hidden`}>
                  <div className="rounded-[4px] overflow-hidden mb-4 border-2 border-black h-[210px] sm:min-h-[400px] sm:h-[80%]">
                    <img
                      src={
                        firstThreeMetaBlogs[0].heroVideoId
                          ? `https://drive.google.com/thumbnail?id=${firstThreeMetaBlogs[0].heroVideoId}`
                          : firstThreeMetaBlogs[0].heroImageSrc
                      }
                      className="w-full h-full object-cover hover:scale-[1.015] transition-all duration-300"
                    />
                  </div>
                  <h4 className="text-[20px] font-semibold">
                    {firstThreeMetaBlogs[0].headTitle}
                  </h4>
                </div>
              </Link>
            </div>
            {firstThreeMetaBlogs[1] && firstThreeMetaBlogs[2] ? (
              <>
                <Link href={`/blogs/read/${firstThreeMetaBlogs[1].id}`}>
                  <BlogCard
                    heroVideoId={firstThreeMetaBlogs[1].heroVideoId}
                    imgUrl={firstThreeMetaBlogs[1].heroImageSrc}
                    mainTitle="Customer Service"
                    title={firstThreeMetaBlogs[1].headTitle}
                  />
                </Link>
                <Link href={`/blogs/read/${firstThreeMetaBlogs[2].id}`}>
                  <BlogCard
                    heroVideoId={firstThreeMetaBlogs[2].heroVideoId}
                    imgUrl={firstThreeMetaBlogs[2].heroImageSrc}
                    mainTitle="Customer Service"
                    title={firstThreeMetaBlogs[2].headTitle}
                  />
                </Link>
              </>
            ) : (
              firstThreeMetaBlogs[1] && (
                <BlogCard
                  heroVideoId={firstThreeMetaBlogs[1].heroVideoId}
                  imgUrl={firstThreeMetaBlogs[1].heroImageSrc}
                  mainTitle="Customer Service"
                  title={firstThreeMetaBlogs[1].headTitle}
                />
              )
            )}
          </div>
        </div>
        <h3 className="text-[32px] font-bold mb-5">All Posts</h3>
        <div className="h-[1px] bg-[#ccc] w-full mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-center sm:justify-start">
          {metaBlogs.map((metaBlog: MetaBlog) => {
            console.log(metaBlog);
            return (
              <Link href={`/blogs/read/${metaBlog.id}`}>
                <BlogCard
                  key={metaBlog.id}
                  heroVideoId={metaBlog.heroVideoId}
                  imgUrl={metaBlog.heroImageSrc}
                  mainTitle="Customer Service"
                  title={metaBlog.headTitle}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
