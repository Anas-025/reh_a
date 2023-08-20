import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function scrollTrigger(): boolean {
  const [triggered, setTriggered] = useState(false);
  const router = useRouter();

  
  const onScroll = () => {
    const navTrigger = document.querySelector(".navTrigger")!;
    const triggerTop = navTrigger.getBoundingClientRect().top;
    
    if (triggerTop <= 0) setTriggered(true);
    else setTriggered(false)
  };

  useEffect(() => {
    if (router.pathname !== "/blogs") return;

    document.addEventListener("scroll", onScroll, true);

    return () => document.removeEventListener("scroll", onScroll, true);
  }, [router.pathname]);

  return triggered;
}