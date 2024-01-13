import { useEffect } from 'react';

const useScrollColorChange = (mainContainerRef: any) => {
  const changeBackgroundColor = () => {
    const scrollPosition = window.scrollY;
    const sections = Array.from(mainContainerRef!.current!.children);
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * (3 / 4);

    const mainContainer = mainContainerRef?.current;

    sections.forEach((section: any, index: number) => {
      const offsetTop = section.offsetTop;
      const offsetBottom = offsetTop + section.clientHeight;

      // Check if three-fourths of the section is visible
      if (scrollPosition + triggerPoint >= offsetTop && scrollPosition + triggerPoint < offsetBottom) {
        const color = interpolateColor(index + 1);
        mainContainer.style.backgroundColor = color;
      }
    });
  };

  const interpolateColor = (section: any) => {
    //rgb color
    const colorStops = [
      { position: 1, color: [248, 255, 80] },       // Yellow rgb(248 255 80)
      { position: 2, color: [0, 244, 126] },        // Green rgb(0 244 126)
      { position: 3, color: [114, 177, 255] }       // Blue rgb(114 177 255)
    ];

    const colorStop = colorStops.find(stop => stop.position === section);

    if (colorStop) {
      return `rgb(${colorStop.color.join(',')})`;
    }

    // Default to white if the section is not found
    return 'rgb(255, 255, 255)';
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackgroundColor);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', changeBackgroundColor);
    };
  }, []); // Empty dependency array ensures useEffect runs only once on component mount
};

export default useScrollColorChange;
