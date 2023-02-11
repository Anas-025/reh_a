import React, { useEffect, useState } from "react";
import useDevice from "utils/useDevice";
import Navbar from "./Navbar";

const Hero = () => {
  const [activeImage, setActiveImage] = useState(1);
  const { isMobile } = useDevice();

  const changeBackgroundImage = () => {
    setTimeout(() => {
      setActiveImage((prev) => (prev % 4) + 1);
    }, 7000);
  };

  useEffect(() => {
    changeBackgroundImage();
  }, [activeImage]);

  return (
    <div
      className={`relative background-image-${activeImage} w-full text-[#FFF]`}
    >
      <div
        className={`relative h-[650px] max-w-[1440px] m-auto ${
          isMobile ? "bg-[#262525]" : ""
        }`}
      >
        {!isMobile && (
          <div>
            <img
              src={`/bg-hero-${activeImage}.png`}
              alt="Hero background"
              className="absolute z-0 object-fill w-[100%] h-[650px]"
            />
          </div>
        )}
        <div className="flex flex-col h-full z-20 relative">
          <Navbar />
          <div className="flex flex-col gap-8 h-full px-8 md:px-16 justify-center md:-mt-16">
            <h1 className="text-[48px] leading-[58px]">
              <span>Online</span>
              <br />
              <span className="font-serif">Physiotherapy</span>{" "}
              <span>consultancy.</span>
              <br />
              <span>A new standard in the market.</span>
            </h1>
            <div>
              <button className="text-[18px] border-[1px] border-[#D9D9D9] rounded-[4px] px-6 py-2 hover:bg-[#0081FE] hover:border-[#0081FE] transition-all duration-500">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
