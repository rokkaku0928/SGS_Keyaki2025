import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";

function Game2({ scoreState, setScoreState, playState, setPlayState }) {

    const [showFrame, setShowFrame] = useState(true);
  // Unity → React のメッセージを受け取る（BackButton / NextButton）
  useEffect(() => {
    function handleMessage(event) {
        if (!event.data || typeof event.data !== "object") return;
        
        // ★ iframe を消す（＝WebGL を破棄）
        const destroyIframe = () => {
        console.log("[Game2] iframe を削除して WebGL を破棄します");
        setShowFrame(false);  // ← DOM から削除される
      };

        if (event.data.type === "BackButton") {
            destroyIframe();
            setPlayState(0);
      }

        if (event.data.type === "NextButton") {
            destroyIframe();
            setScoreState(prev => prev + 1);
            setPlayState(0);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={styles.gameContainer}>
          {/* iframe で Unity WebGL を読み込む */}
          {showFrame && (
          <iframe
              key="unit2"
              src="/unity2/index.html"        // ← Unity のビルドフォルダ内 index.html
              className={styles.unityCanvas}
              title="UnityGame2"
              allow="autoplay; fullscreen"
              />
              )}
    </div>
  );
}

export default Game2;
