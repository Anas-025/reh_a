import FadeIn from "components/animaiton/animation";
import services from "./Services.module.css";
export default function Service({ image, name }) {
  return (
    <>
      <div className={services.service}>
        <FadeIn direction="up">
          <img src={image} alt="NA" className={services.image} />
          <div className={services.name}>{name}</div>
        </FadeIn>
      </div>
    </>
  );
}
