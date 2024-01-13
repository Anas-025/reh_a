import FadeIn from "components/animation/animation";
import { useRef } from "react";
import Testimonial from "../../general/Testimonial/Testimonial";
// import trustGIF from "./../../../public/trust.gif";
import style from "./Main.module.css";
import { testimonials } from "./constants";
import useScrollColorChange from "./useScrollColorChange";

export default function Main() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  useScrollColorChange(mainContainerRef);

  return (
    <>
      <main className={style.container} ref={mainContainerRef}>
        <div className={style.main}>
          <div className={style.imageSide}>
            <div className={style.screen}>
              <FadeIn direction="right">
                <img
                  className={style.image}
                  src="/home/trust.png"
                  alt="gif of trust and worthyness"
                />
              </FadeIn>
            </div>
          </div>
          <div className={style.textSide}>
            <div className={style.texts}>
              <div className={style.hero_text}>Quality and Trust!</div>
              <div className={style.info_text}>
                Quality and trust are the foundation of our online physiotherapy
                services, and we are dedicated to helping you achieve your
                health and wellness goals with confidence.
              </div>
            </div>

            <div>
              <FadeIn direction="left">
                <Testimonial data={testimonials[0]} />
              </FadeIn>
            </div>

            <div className={style.spacer}></div>
          </div>
        </div>

        <div className={style.main}>
        <div className={style.imageSide}>
            <div className={style.screen}>
              <FadeIn direction="left">
                <img
                  className={style.image}
                  src="/home/virtual.png"
                  alt="gif of trust and worthyness"
                />
              </FadeIn>
            </div>
          </div>
          <div className={style.textSide}>
            <div className={style.texts}>
              <div className={style.hero_text}>Virtual Physiotherapy!</div>
              <div className={style.info_text}>
                With secure video consultations and messaging, our online
                physiotherapy consultancy lets you connect with experienced
                physiotherapists from home, saving you time and hassle.
              </div>
            </div>

            <FadeIn direction="left">
              <Testimonial data={testimonials[1]} />
            </FadeIn>

            <div className={style.spacer}></div>
          </div>
        </div>

        <div className={style.main}>
          <div className={style.imageSide}>
            <div className={style.screen}>
              <FadeIn direction="right">
                <img
                  className={style.image}
                  src="/home/clear.png"
                  alt="gif of trust and worthyness"
                />
              </FadeIn>
            </div>
          </div>
          <div className={style.textSide}>
            <div className={style.texts}>
              <div className={style.hero_text}>Clear and Concise Videos!</div>
              <div className={style.info_text}>
                From injury prevention to post-operative rehabilitation, our
                video illustrations provide the guidance you need to achieve
                your physiotherapy goals.
              </div>
            </div>

            <FadeIn direction="left">
              <Testimonial data={testimonials[2]} />
            </FadeIn>

            <div className={style.spacer}></div>
          </div>
        </div>
      </main>
    </>
  );
}
