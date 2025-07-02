import "./styles.css"; // グローバルスタイルを読み込み
import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Appコンポーネントは変更なし
export default function FramerMotionApp() {
  return <Complete />;
}

/**
 * Parallax効果を適用するコンポーネント
 * `container` refを受け取り、そのコンテナ内でのスクロールを監視する
 */
const BubbleParallax: React.FC<{
  children: ReactNode;
  container: React.RefObject<HTMLElement>; // スクロールコンテナのrefを受け取る
}> = ({ children, container }) => {
  const ref = useRef<HTMLDivElement>(null);

  // useScrollフックに`container`を指定し、その中でのスクロールを追跡
  const { scrollYProgress } = useScroll({
    target: ref,
    container: container, // 親から渡されたスクロールコンテナ
    offset: ["start end", "end start"], // 要素がコンテナに入った時に開始、出た時に終了
  });

  // scrollYProgress (0〜1) に基づくアニメーション値の変換ロジックは変更なし
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
        marginBottom: "50px", // 各アイテム間の余白
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Parallax要素を内包する親コンポーネント
 * ここでスクロール領域を定義する
 */
const Complete: React.FC = () => {
  // スクロール可能なコンテナ要素へのrefを作成
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    // ページ中央にParallaxエリアを配置するためのラッパー
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // 画面全体の高さ
        backgroundColor: "#E0E0E0", // 背景色をグレーに
      }}
    >
      {/* ===== ここがParallaxのスクロール領域 ===== */}
      <div
        ref={scrollContainerRef}
        style={{
          width: "80%",
          height: "80vh", // ★修正点: 高さをビューポートの80%に設定
          overflowY: "scroll", // ★修正点: このdivが縦方向にスクロールできるようにする
          backgroundColor: "#1A237E", // 画像に合わせた背景色
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
          ここが parallax エリア
        </div>

        {/* Parallaxアイテムをレンダリング */}
        {[...Array(10)].map((_, index) => {
          return (
            // 各アイテムにスクロールコンテナのrefを渡す
            <BubbleParallax key={index} container={scrollContainerRef}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "300px",
                  backgroundColor: "#BBDEFB", // アイテムの背景色
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
