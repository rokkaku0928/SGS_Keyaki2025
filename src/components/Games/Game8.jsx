import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";

function Game8({ scoreState, setScoreState, playState, setPlayState }) {

  const [showFrame, setShowFrame] = useState(true);

  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== "object") return;

      // ★ iframe を消す（＝WebGL を破棄）
      const destroyIframe = async () => {
        console.log("[Game8] iframe を削除して WebGL を破棄します");

        if (window.unityInstance) {
          try {
            await window.unityInstance.Quit();
            console.log("[Game8] Unity Quit 完了");
          } catch (e) {
            console.warn("[Game8] Unity Quit 失敗:", e);
          }
          window.unityInstance = null;
        }

        const frame = document.querySelector('iframe[title="UnityGame8"]');
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
    <div className={styles.WidegameContainer}>
      {showFrame && (
        <iframe
          key="unity8"
          src="/unity8/index.html"
          className={styles.WideCanvas}
          title="UnityGame8"
          allow="autoplay; fullscreen"
        />
      )}
    </div>
  );
}

export default Game8;