import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MetaBlog } from "./B.interface";
import styles from "./BlogsGrid.module.css";

function BlogsGrid({ data }: { data: MetaBlog[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleReadMore = () => {
    router.push("/blogs");
  };

  const firstMetaBlog = data[0];
  console.log(firstMetaBlog);
  const firstBlogThumbnail =
    firstMetaBlog.heroVideoId 
      ? `https://drive.google.com/thumbnail?id=${firstMetaBlog.heroVideoId}`
      : firstMetaBlog.heroImageSrc;

  // only show 6 blogs in the grid
  const remainingMetaBlogs = data.slice(1, 7);

  return data.length === 0 ? (
    <Typography
      variant="h4"
      style={{ height: "75vh", display: "grid", placeItems: "center" }}
    >
      {" "}
      No Blogs Yet{" "}
    </Typography>
  ) : (
    <>
      <div className={styles.container}>
        <div className={styles.grid_container}>
          <Link
            href={`/blogs/read/${firstMetaBlog.id}`}
            passHref
            className={styles.hero}
          >
            <img src={firstBlogThumbnail} alt="" />

            <div className={styles.hero_text}>
              <h1>{firstMetaBlog.headTitle}</h1>
              <p>- {firstMetaBlog.displayName}</p>
            </div>
          </Link>

          {remainingMetaBlogs.map((blog) => {
            const thumbnail = blog.heroVideoId
              ? `https://drive.google.com/thumbnail?id=${blog.heroVideoId}`
              : blog.heroImageSrc;

            return (
              <Link
                href={`/blogs/read/${blog.id}`}
                passHref
                key={blog.id}
                className={styles.normal}
              >
                <img src={thumbnail} alt="" className="w-full" />
                <div className={styles.hero_text}>
                  <h1>{blog.headTitle}</h1>
                  <p>- {blog.displayName}</p>
                </div>
              </Link>
            );
          })}

          <div className={styles.more} onClick={handleReadMore}>
            <u> read more... </u>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogsGrid;
