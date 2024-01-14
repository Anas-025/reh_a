import { FC } from "react";

interface BlogCardProps {
  imgUrl: string;
  mainTitle: string;
  title: string;
  heroVideoId?: string;
}

const BlogCard: FC<BlogCardProps> = ({ imgUrl, mainTitle, title, heroVideoId }) => {
  return (
    <div className={`w-full overflow-hidden hover:cursor-pointer`}>
      <div className="rounded-[4px] h-[210px] overflow-hidden mb-4 border-2 border-black">
        <img
          src={
            heroVideoId
              ? `https://drive.google.com/thumbnail?id=${heroVideoId}`
              : imgUrl
          }
          className="w-full h-full object-cover hover:scale-[1.015] transition-all duration-300"
        />
      </div>
      <h2 className="my-3 text-xs">
        <span
          style={{
            backgroundColor:
              mainTitle !== "Published" ? "rgb(211, 47, 47)" : "rgb(46 125 50)",
            padding: "0.3rem 0.6rem",
            color: "white",
            borderRadius: "5px",
          }}
        >
          {mainTitle}
        </span>
      </h2>
      <h4 className="text-[21px] leading-6 font-semibold pr-4">{title}</h4>
    </div>
  );
};

export default BlogCard;
