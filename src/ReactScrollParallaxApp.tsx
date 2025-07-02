import "./styles.css";
import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { useEffect, useState } from "react";
import { Step1 } from "./components/Step1";
import { Step2One, Step2Ten } from "./components/Step2";

export const getViewHeight = () => {
  if (window !== undefined) return window.innerHeight;
  return 0;
};
export const getScrollPadding = () => {
  const BALLOON_HEIGHT = 200;
  return (getViewHeight() - BALLOON_HEIGHT) / 2;
};

export default function ReactScrollParallaxApp() {
  return (
    <ParallaxProvider>
      <Complete />
      {/* <Step1 /> */}
      {/* <Step2One /> */}
      {/* <Step2Ten /> */}
    </ParallaxProvider>
  );
}

const BubbleParallax: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const handleProgressChange = React.useCallback((progress: number) => {
    const axis = 2 * progress - 1;
    const opacity = -Math.abs(axis) + 1;
    const minScale = 0.7;

    const scale =
      (1 - minScale) * Math.cos((Math.PI / 2) * axis) ** 2 + minScale;

    const transform = (3 / 2) * axis ** 3 - axis;

    if (divRef.current === null) {
      return;
    }
    const current = divRef.current;
    current.style.opacity = String(opacity);
    current.style.transform = `scale(${scale}) translateY(${
      transform * 100
    }px)`;

    return;
  }, []);

  return (
    <Parallax onProgressChange={handleProgressChange}>
      <div ref={divRef}>{children}</div>
    </Parallax>
  );
};

const Complete: React.FC = () => {
  const [scrollLayerVerticalPadding, setScrollLayerVerticalPadding] = useState(
    getScrollPadding()
  );

  useEffect(() => {
    const handleResize = () => {
      setScrollLayerVerticalPadding(getScrollPadding());
    };
    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div
      style={{
        margin: "0 auto",
        padding: `${scrollLayerVerticalPadding}px 0`,
        width: "80%",
      }}
    >
      {[...Array(10)].map((_, index) => {
        return (
          <BubbleParallax key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%%",
                height: "300px",
                backgroundColor: "red",
                fontSize: "5rem",
              }}
            >
              {index + 1}
            </div>
          </BubbleParallax>
        );
      })}
    </div>
  );
};
