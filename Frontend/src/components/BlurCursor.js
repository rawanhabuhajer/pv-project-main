import React, { useEffect, useRef } from "react";

const BlurCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${clientX - 75}px, ${
          clientY - 75
        }px)`;
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return <div ref={cursorRef} className={"blur-cursor"} />;
};

export default BlurCursor;
