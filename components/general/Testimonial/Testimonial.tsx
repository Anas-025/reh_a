import Image from "next/image";

import FadeIn from "components/animaiton/animation";
import styles from "./Testimonial.module.css";

interface data {
  content: string;
  name: string;
  reputation: string;
  decorations?: {
    name: string;
    animation: string;
    src: any;
    fadeInFrom?: string;
    styles?: any;
  }[];
}

function Testimonial({ data }: { data: data }) {
  return (
    <div className={styles.testimonial_container}>
      <div className={styles.testimonial}>
        <div className={styles.testimonial_content}>“ {data.content} ”</div>

        <div className={styles.testimonial_credentials}>
          <div className={styles.testimonial_avatar}>
            <img src={`${data.name}.jpg`} alt="" />
          </div>
          <div className={styles.testimonial_name_container}>
            <div className={styles.testimonial_name}>{data.name}</div>
            <div className={styles.testimonial_reputation}>
              {data.reputation}
            </div>
          </div>
        </div>

        {data.decorations?.map((decoration) => {
          return (
            <FadeIn direction={decoration.fadeInFrom} style={{...decoration.styles, position: "absolute"}}>
              <Image
                className={`${styles.decorations} ${
                  styles[decoration.animation]
                }`}
                src={decoration.src}
                alt=""
              />
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}

export default Testimonial;
