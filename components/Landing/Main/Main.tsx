import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useDevice from "utils/useDevice";
import { useVisibility } from "../../../utils/isVisible";
import Testimonial from "../../general/Testimonial/Testimonial";
import consultancyGIF from "./../../../public/consultancy.gif";
import trustGIF from "./../../../public/trust.gif";
import videoGIF from "./../../../public/video.gif";
import { testimonials } from "./constants";

export default function Main() {
  var offset: number = 1040;
  const isMobile = useDevice();
  const [specialIsVisible, setSpecialIsVisible] = useState(false);
  const firstSlice = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const width = window.innerWidth;
    const elementTop = firstSlice.current?.getBoundingClientRect().top!;
    let targetElementSpan = firstSlice.current?.parentElement!.children[0]
      .children[0] as HTMLDivElement;

    if (width < 768) {
      elementTop > 750 ? setSpecialIsVisible(false) : setSpecialIsVisible(true);
      targetElementSpan.style.transition = "opacity 250ms ease-in-out";
    } else {
      elementTop < 167 && elementTop > -1200
        ? setSpecialIsVisible(true)
        : setSpecialIsVisible(false);
      targetElementSpan.style.transition = "none";
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  const [isSecondSliceVisible, secondSlice] = useVisibility<HTMLDivElement>(
    offset,
    0
  );
  const [isThirdSliceVisible, thirdSlice] = useVisibility<HTMLDivElement>(
    710,
    0
  );

  return (
    <>
      <main id="about">
        <section className="slice-container">
          <div className="slice slice--image text-c">
            <span style={{ opacity: specialIsVisible != true ? "0" : "1" }}>
              <Image src={trustGIF} alt="gif of trust and worthyness" />
            </span>
          </div>

          <div className="slice slice--content" ref={firstSlice}>
            <div className="content-container">
              <div className="content-text">
                <div className="content-hero-text">Quality and Trust!</div>
                <div className="content-info-text">
                  Quality and trust are the foundation of our online
                  physiotherapy services, and we are dedicated to helping you
                  achieve your health and wellness goals with confidence.
                </div>
              </div>

              <Testimonial data={testimonials[0]} />

              <div className="spacer"></div>
            </div>
          </div>
        </section>

        <section className="slice-container slice--inverted">
          <div className="slice slice--image slice--inverted-image text-c">
            <span style={{ opacity: isSecondSliceVisible != true ? "0" : "1" }}>
              <Image src={consultancyGIF} alt="gif of trust and worthyness" />
            </span>
          </div>

          <div className="slice" ref={secondSlice}>
            <div className="content-container">
              <div className="content-text">
                <div className="content-hero-text">Virtual Physiotherapy!</div>
                <div className="content-info-text">
                  With secure video consultations and messaging, our online
                  physiotherapy consultancy lets you connect with experienced
                  physiotherapists from home, saving you time and hassle.
                </div>
              </div>

              <Testimonial data={testimonials[1]} />

              <div className="spacer"></div>
            </div>
          </div>
        </section>

        <section className="slice-container">
          <div className="slice slice--image text-c">
            <span style={{ opacity: isThirdSliceVisible != true ? "0" : "1" }}>
              <Image src={videoGIF} alt="gif of trust and worthyness" />
            </span>
          </div>

          <div className="slice slice--content" ref={thirdSlice}>
            <div className="content-container">
              <div className="content-text">
                <div className="content-hero-text">
                  Clear and Concise Videos!
                </div>
                <div className="content-info-text">
                  From injury prevention to post-operative rehabilitation, our
                  video illustrations provide the guidance you need to achieve
                  your physiotherapy goals.
                </div>
              </div>

              <Testimonial data={testimonials[2]} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
