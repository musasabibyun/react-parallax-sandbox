import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import "./styles.css";

export default function App() {
  return <Complete />;
}

const BubbleParallax: React.FC<{
  children: ReactNode;
  containerRef: React.RefObject<HTMLElement>;
}> = ({ children, containerRef }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, (progressValue) => {
    const axis = 2 * progressValue - 1;
    return -Math.abs(axis) + 1;
  });

  const scale = useTransform(scrollYProgress, (progressValue) => {
    const axis = 2 * progressValue - 1;
    const minScale = 0.7;
    return (1 - minScale) * Math.cos((Math.PI / 2) * axis) ** 2 + minScale;
  });

  const y = useTransform(scrollYProgress, (progressValue) => {
    const axis = 2 * progressValue - 1;
    const transform = (3 / 2) * axis ** 3 - axis;
    return transform * 100;
  });

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        y,
        marginBottom: "50px",
      }}
    >
      {children}
    </motion.div>
  );
};

const Complete: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#E0E0E0",
      }}
    >
      <div
        ref={scrollContainerRef}
        style={{
          width: "100%",
          height: "80vh", // ❌ This breaks in React 19
          // height: "100vh", // ✅ This works in React 19
          overflowY: "scroll",
          backgroundColor: "#1A237E",
          padding: "20px",
          boxSizing: "border-box",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "2rem",
            padding: "40px 0",
          }}
        >
          Parallax Area
        </div>

        {[...Array(10)].map((_, index) => {
          return (
            <BubbleParallax key={index} containerRef={scrollContainerRef}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "300px",
                  backgroundColor: "#BBDEFB",
                  fontSize: "5rem",
                  color: "#1A237E",
                  borderRadius: "10px",
                }}
              >
                {index + 1}
              </div>
            </BubbleParallax>
          );
        })}
      </div>
    </div>
  );
};
