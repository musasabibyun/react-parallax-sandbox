import React from "react";
import { Parallax } from "react-scroll-parallax";

export const Step1: React.FC = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        padding: "2000px 0",
        width: "80%",
      }}
    >
      <Step1Parallax>
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
      </Step1Parallax>
    </div>
  );
};

const Step1Parallax: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const handleProgressChange = React.useCallback((progress: number) => {
    console.log({ progress });
    const axis = 2 * progress - 1;

    const opacity = -Math.abs(axis) + 1;

    if (divRef.current === null) {
      return;
    }
    const current = divRef.current;
    current.style.opacity = String(opacity);

    return;
  }, []);

  return (
    <Parallax onProgressChange={handleProgressChange}>
      <div ref={divRef}>{children}</div>
    </Parallax>
  );
};
