import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";

function Game1({ scoreState, setScoreState, playState, setPlayState }) {

  const [showFrame, setShowFrame] = useState(true);

  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== "object") return;

      // ★ iframe を消す（＝WebGL を破棄）
      const destroyIframe = async () => {
        console.log("[Game1] iframe を削除して WebGL を破棄します");

        if (window.unityInstance) {
          try {
            await window.unityInstance.Quit();
            console.log("[Game1] Unity Quit 完了");
          } catch (e) {
            console.warn("[Game1] Unity Quit 失敗:", e);
          }
          window.unityInstance = null;
        }

        const frame = document.querySelector('iframe[title="UnityGame1"]');
        if (frame) {
          frame.src = "about:blank";
        }

        setShowFrame(false);
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
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={styles.gameContainer}>
      {showFrame && (
        <iframe
          key="unity1"
          src="/unity1/index.html"
          className={styles.unityCanvas}
          title="UnityGame1"
          allow="autoplay; fullscreen"
        />
      )}
    </div>
  );
}

export default Game1;
