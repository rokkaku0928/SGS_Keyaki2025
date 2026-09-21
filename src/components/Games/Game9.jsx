import React, { useEffect } from "react";
import styles from "./Game.module.css";

function Game9({ scoreState, setScoreState, playState, setPlayState }) {

  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== "object") return;

      const reloadApp = () => {
        sessionStorage.setItem("gameState", "Playing");
        sessionStorage.setItem("playState", 0);
        window.location.reload();
      };

      if (event.data.type === "BackButton") {
        reloadApp();
      }

      if (event.data.type === "NextButton") {
        const newScore = scoreState + 1;
        sessionStorage.setItem("gameScore", newScore);
        reloadApp();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [scoreState]);

  return (
      <div className={styles.PortraitGame}>
        <iframe
          key="unity9"
          src="/unity9/index.html"
          className={styles.unityCanvas}
          title="UnityGame9"
          allow="autoplay; fullscreen"
        />
      </div>
    );
  }

export default Game9;