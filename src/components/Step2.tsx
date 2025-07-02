import React from "react";
import { Parallax } from "react-scroll-parallax";
import { getScrollPadding } from "../App";

export const Step2One: React.FC = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        padding: "2000px 0",
        width: "80%",
      }}
    >
      <Step2Parallax>
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
          1
        </div>
      </Step2Parallax>
    </div>
  );
};

export const Step2Ten: React.FC = () => {
  const [scrollLayerVerticalPadding, setScrollLayerVerticalPadding] =
    React.useState(getScrollPadding());

  React.useEffect(() => {
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
          <Step2Parallax key={index}>
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
          </Step2Parallax>
        );
      })}
    </div>
  );
};

const Step2Parallax: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const handleProgressChange = React.useCallback((progress: number) => {
    const axis = 2 * progress - 1;
    const opacity = -Math.abs(axis) + 1;
    const minScale = 0.7;

    const scale =
      (1 - minScale) * Math.cos((Math.PI / 2) * axis) ** 2 + minScale;

    if (divRef.current === null) {
      return;
    }
    const current = divRef.current;
    current.style.opacity = String(opacity);
    current.style.transform = `scale(${scale})`;

    return;
  }, []);

  return (
    <Parallax onProgressChange={handleProgressChange}>
      <div ref={divRef}>{children}</div>
    </Parallax>
  );
};
