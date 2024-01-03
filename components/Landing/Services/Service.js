import FadeIn from "components/animation/animation";
import styles from "./Services.module.css";
export default function Service({ image, name }) {
  return (
    <>
      <div className={styles.service}>
        <FadeIn direction="up">
          <img src={image} alt="NA" className={styles.image} />
          <div className={styles.name}>{name}</div>
        </FadeIn>
      </div>
    </>
  );
}
