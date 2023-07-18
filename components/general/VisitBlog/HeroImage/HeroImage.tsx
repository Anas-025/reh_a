import style from "./HeroImage.module.css";

export default function HeroImage({ heroImageSrc }: { heroImageSrc: string }) {

  return (
    <div className={style.image1} id="heroImage">
      <div>
          <img
            src={heroImageSrc}
            alt=""
          />
      </div>
    </div>
  );
}

