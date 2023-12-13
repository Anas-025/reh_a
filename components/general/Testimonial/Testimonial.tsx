import Image from "next/image";

import styles from "./Testimonial.module.css";

interface data {
  content: string;
  name: string;
  reputation: string;
  decorations?: {
    name: string;
    animation: string;
    src: any;
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

        {
          data.decorations?.map((decoration) => {
            return (
              <Image
                className={`${styles.decorations} ${styles[decoration.animation]}`}
                style={decoration.styles}
                src={decoration.src}
                alt=""
              />
            );
          })
        }


{/* 
        <Image
          className={`${styles.decorations} ${styles.stars} ${styles.wobble}`}
          src={stars}
          alt=""
        />
        <Image
          className={`${styles.decorations} ${styles.bigStar} ${styles.spin}`}
          src={bigStar}
          alt=""
        />
        <Image
          className={`${styles.decorations} ${styles.bleed}`}
          src={bleed}
          alt=""
        />
        <Image
          className={`${styles.decorations} ${styles.flower} ${styles.pulse}`}
          src={flower}
          alt=""
        /> */}
      </div>
    </div>
  );
}

export default Testimonial;
