import { Parallax, useParallax } from "react-scroll-parallax";
import { useState } from "react";

export const ParaParaImage: React.FC = () => {
  const [url, setUrl] = useState("");

  const parallax = useParallax<HTMLImageElement>({
    onProgressChange: (progress) => {
      console.log({ progress });
      let imageUrl = "";
      if (progress < 0.5) {
        imageUrl = "https://depo-sequence.netlify.app/img/001.webp";
      } else {
        imageUrl = "https://depo-sequence.netlify.app/img/002.webp";
      }
      // parallax.ref.current?.style.setProperty("--opacity", opacity.toString());
      setUrl(imageUrl);
    },
  });

  return (
    <div style={{ width: "100%", height: "100px" }}>
      <img src={url} ref={parallax.ref} style={{ width: "100%" }} />;
    </div>
  );
};
