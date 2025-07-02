import React from "react";
import ReactDOM from "react-dom/client";
import ReactScrollParallaxApp from "./ReactScrollParallaxApp";
import FramerMotionApp from "./FramerMotionApp";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/*
      react-scroll-parallax のテスト
    */}
    {/* <ReactScrollParallaxApp />  */}

    {/* 
      framer-motion のテスト
    */}
    <FramerMotionApp />
  </React.StrictMode>
);
