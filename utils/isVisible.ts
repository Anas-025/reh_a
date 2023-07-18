import { useRef, useState, useEffect, RefObject } from "react";

export function useVisibility<T>(offset: number, indicator: number): [boolean, RefObject<HTMLDivElement>] {

  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef<HTMLDivElement>(null);
  var lastScrollTop = 0;

  const onScroll = () => {
    if (!currentElement.current) { setIsVisible(false); return; }

    var st = window.pageYOffset || document.documentElement.scrollTop;
    let targetElementSpan = currentElement.current.parentElement!.children[0].children[0] as HTMLDivElement;
      
    if (st > lastScrollTop && targetElementSpan.style.transition!=="opacity 250ms ease-in-out") { // downscroll code

      targetElementSpan.style.transition = "opacity 250ms ease-in-out";

    } else if (st < lastScrollTop && targetElementSpan.style.transition !== "none") { // upscroll code
      
      targetElementSpan.style.transition = "none";
    }
    
    lastScrollTop = st <= 0 ? 0 : st;


    const top = currentElement.current.getBoundingClientRect().top;

    if(indicator) setIsVisible(top + 1040 >= 0 && top + offset <= window.innerHeight);
    else setIsVisible(top + offset >= 0 && top <= window.innerHeight);
  };

  useEffect(() => {
    //to check on scroll
    document.addEventListener("scroll", onScroll, true);

    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  return [isVisible, currentElement];
}