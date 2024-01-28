import Image from "next/image";
import doctor from "public/DoctorManthan.png";
import style from "./About.module.css";

export default function About() {
  return (
    <>
      <div className={style.aboutContainer}>
        <div className={style.aboutTextContainer}>
          <h1 className={style.aboutTitle}>Dr. Manthan Purohit (PT)</h1>
          <p className={style.aboutText}>
            BPT(Gold Medalist) <br /> MPT(Community Health & Rehabilitation){" "}
            <br /> Certified Orthopaedic Manual Therapist (COMT) <br /> Research
            Enthusiast
          </p>
        </div>

        <div className={style.heroImageContainer}>
          <div className={style.heroImage}>
            <Image src={doctor} alt="Hero Image" width={300} />
          </div>
        </div>
      </div>
    </>
  );
}
