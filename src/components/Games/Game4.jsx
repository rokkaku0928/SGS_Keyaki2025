import React, { useEffect } from "react";
import styles from "./Game.module.css";

function Game4() {
  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== "object") return;

      const { type } = event.data;

      if (type !== "BackButton" && type !== "NextButton") {
        return;
      }

      if (type === "NextButton") {
        // 既存の獲得履歴を読み込む
        let collectedKeys = [];

        try {
          collectedKeys = JSON.parse(
            sessionStorage.getItem("collectedKeys") || "[]"
          );

          if (!Array.isArray(collectedKeys)) {
            collectedKeys = [];
          }
        } catch {
          collectedKeys = [];
        }

        // Game4の鍵を追加。重複も許可
        collectedKeys.push(4);

        sessionStorage.setItem(
          "collectedKeys",
          JSON.stringify(collectedKeys)
        );

        // スコアを1加算
        const newScore =
          Number(sessionStorage.getItem("gameScore") || "0") + 1;

        sessionStorage.setItem("gameScore", String(newScore));
      }

      // カメラ画面へ戻る
      sessionStorage.setItem("gameState", "Playing");
      sessionStorage.setItem("playState", "0");

      window.location.reload();
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={styles.PortraitGame}>
      <iframe
        key="unity4"
        src="/unity4/index.html"
        className={styles.unityCanvas}
        title="UnityGame4"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}

export default Game4;
