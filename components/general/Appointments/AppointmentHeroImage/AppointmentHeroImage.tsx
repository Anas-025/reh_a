import styles from "./AppointmentHeroImage.module.css";
import calenderGirl from "../../../../public/calenderGirl.svg";
import ring from "../../../../public/ring.png";
import stars from "../../../../public/stars.png";
import clock from "../../../../public/clock.png";
import Image from "next/image";

function AppointmentHeroImage() {
  return (
    <div className={styles.container}>
      {/* <Image src={heroImage} alt="Hero Image" /> */}
      <Image className={styles.stars} src={stars} alt="" />
      <Image
        className={styles.calender_girl}
        src={calenderGirl}
        alt="girl sitting on a calender"
      />
      <div className={styles.hero_background}>
        Make your schedules <span>with<Image src={ring} alt="" /></span> <br /> our experts doctors
      </div>

      <Image className={styles.clock} src={clock} alt="" />
    </div>
  );
}

export default AppointmentHeroImage;
