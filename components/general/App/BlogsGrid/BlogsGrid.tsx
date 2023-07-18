import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./BlogsGrid.module.css";

interface MetaBlog {
  id: string;
  date: Date;
  displayName: string;
  headTitle: string;
  heroImageSrc: string;
  published: boolean;
  uid: string;
}

function BlogsGrid({ data }: { data: MetaBlog[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleReadMore = () => {
    router.push("/blogs");
  };

  const firstMetaBlog = data[0];

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
            <img src={firstMetaBlog.heroImageSrc} alt="" />

            <div className={styles.hero_text}>
              <h1>{firstMetaBlog.headTitle}</h1>
              <p>- {firstMetaBlog.displayName}</p>
            </div>
          </Link>

          {remainingMetaBlogs.map((blog) => {
            return (
              <Link
                href={`/blogs/read/${blog.id}`}
                passHref
                key={blog.id}
                className={styles.normal}
              >
                <img src={blog.heroImageSrc} alt="" className="w-full" />
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
