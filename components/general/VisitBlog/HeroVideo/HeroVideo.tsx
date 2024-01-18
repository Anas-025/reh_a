import style from "./HeroVideo.module.css";

export default function HeroVideo({ heroVideoId }: { heroVideoId: string }) {
  const embedUrl = `https://drive.google.com/file/d/${heroVideoId}/preview`;
  return (
    <div className={style.image1} id="heroImage">
      <div> 
        {/* <video
          controls
        >
          <source src="https://drive.google.com/uc?export=download&id=1qmayA6BcHKkNqeNzfhrFwFfBlnJlOW50" type="video/mp4"/>
        </video> */}
        <iframe
          src={embedUrl}
          width="640"
          height="480"
          allowFullScreen

        ></iframe>
      </div>
    </div>
  );
}
