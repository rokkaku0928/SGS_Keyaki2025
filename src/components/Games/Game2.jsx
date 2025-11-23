import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";

function Game2({ scoreState, setScoreState, playState, setPlayState }) {

  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== "object") return;

      const reloadApp = () => {
        // 次回の起動時のために必要な情報を保存する
        // (App.jsxで読み込めるようにキー名を合わせる)
        sessionStorage.setItem("gameState", "Playing"); // ゲームモードを維持
        sessionStorage.setItem("playState", 0);         // カメラ画面に戻す
        
        // ページを強制リロード（これでメモリが完全に解放される）
        window.location.reload();
      };

      if (event.data.type === "BackButton") {
        // スコアは変えずにリロード
        reloadApp();
      }

      if (event.data.type === "NextButton") {
        // ★ここでスコアを加算して保存してからリロード
        const newScore = scoreState + 1;
        sessionStorage.setItem("gameScore", newScore);
        
        reloadApp();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={styles.gameContainer}>
      <iframe
        key="unity2"
        src="/unity2/index.html"
        className={styles.unityCanvas}
        title="UnityGame2"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}

export default Game2;