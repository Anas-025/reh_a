import style from "./HeroVideo.module.css";

export default function HeroVideo({ heroVideoId }: { heroVideoId: string }) {
  return (
    <div className={style.image1} id="heroImage">
      <div>
        <video controls>
          <source
            src={`https://drive.google.com/uc?export=download&id=${heroVideoId}`}
          />
        </video>
      </div>
    </div>
  );
}
