import AssignmentIcon from "@mui/icons-material/Assignment";
import BookIcon from "@mui/icons-material/Book";
import GroupsIcon from "@mui/icons-material/Groups";
import Navbar from "components/general/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import ui1 from "public/home/ui12.svg";
import ui2 from "public/home/ui22.svg";
import ui3 from "public/home/ui32.svg";
import { useEffect, useRef, useState } from "react";
import style from "./Hero.module.css";

const Hero = () => {
  // count from 1 to 3 and change the color of the children of ref accordingly also rest to 1 after 3
  const [activeImage, setActiveImage] = useState(1);
  const highlights = useRef<HTMLDivElement | null>(null);
  const colors = ["#e200db", "#00c466", "#0065e2"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === 3 ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!highlights?.current) return;
    const children = highlights.current.children;
    for (let i = 0; i < children.length; i++) {
      const childElement = children[i] as HTMLElement;
      if (i === activeImage - 1) {
        childElement.style.color = colors[i];
      } else {
        childElement.style.color = "black";
      }
    }
  }, [activeImage]);

  return (
    <>
      <Navbar />

      <div className={style.heroContainer}>
        <div>
          Online <span className={style.hlText}>physiotherapy</span>{" "}
          consultancies.
        </div>

        <div ref={highlights}>
          Create&nbsp;
          <span className={style.boldText}>
            cases&nbsp;
            <AssignmentIcon sx={{ marginLeft: "-10px" }} />
          </span>
          , join&nbsp;
          <span className={style.boldText}>
            meetings&nbsp;
            <GroupsIcon sx={{ fontSize: "60px" }} />
          </span>
          , read&nbsp;
          <span className={style.boldText}>
            blogs&nbsp;
            <BookIcon sx={{ fontSize: "60px", marginLeft: "-10px" }} />
          </span>
        </div>

        <Link href="/app">
          <button className={style.actionButton}>Get Started</button>
        </Link>

        <div className={style.heroImageContainer}>
          <div className={style.heroImage}>
            <Image src={activeImage == 1 ? ui1 : activeImage == 2 ? ui2 : ui3} alt="Hero background" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
