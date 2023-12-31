import { useEffect, useRef, useState } from "react";
import css from "./animation.module.css";

export default function FadeIn(props: any) {
  const style = props.style;
  const direction =
    props.direction == "left"
      ? props.direction == "up"
        ? css.fadeInUp
        : css.fadeInLeft
      : props.direction == "right"
      ? css.fadeInRight
      : css.fadeInDown;
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${direction} ${isVisible ? css.isVisible : ""}`}
      style={style}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
