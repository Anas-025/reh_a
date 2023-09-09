import { useState, useEffect } from "react";

export function scrollTrigger(): [boolean] {
  const [triggered, setTriggered] = useState(false);

  const onScroll = () => {
    const navTrigger = document.querySelector(".navTrigger")!;
    const triggerTop = navTrigger.getBoundingClientRect().top;

    if (triggerTop <= 0) setTriggered(true);
    else setTriggered(false)
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);

    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  return [triggered];
}
