import "./styles.css";
import { Parallax, useParallax } from "react-scroll-parallax";
import { useState } from "react";

export const Component: React.FC = () => {
  const [opacity, setOpacity] = useState(0);

  const parallax = useParallax<HTMLDivElement>({
    // rotate: [0, 360, 0],
    onProgressChange: (progress) => {
      console.log({ progress });
      let opacity = 0;
      if (progress < 0.5) {
        opacity = progress * 2;
      } else {
        opacity = 1 - (progress - 0.5) * 2;
      }
      parallax.ref.current?.style.setProperty("--opacity", opacity.toString());
      // setOpacity(opacity);
      console.log({ opacity });
    },
  });

  return (
    <div
      ref={parallax.ref}
      className="spinner"
      style={{
        width: "100px",
        backgroundColor: "red",
        opacity: "var(--opacity)",
        // opacity,
      }}
    >
      😵‍💫
      <div className="diamond">💎</div>
      <div className="clown">🤡</div>
      <div className="money">💰</div>
      <div className="hand">👌🏻</div>
    </div>
  );
};

export const Example: React.FC = () => {
  const parallax = useParallax<HTMLDivElement>({
    onProgressChange: (progress) => {
      if (parallax.ref.current) {
        // set progress to CSS variable
        parallax.ref.current.style.setProperty(
          "--progress",
          progress.toString()
        );
      }
    },
  });

  return (
    <div
      ref={parallax.ref}
      className="text-stroke"
      style={{
        fontSize: "100px",
        opacity: "0.5",
        WebkitTextStrokeWidth: `calc(20px * var(--progress))`,
      }}
    >
      Hello World
    </div>
  );
};
