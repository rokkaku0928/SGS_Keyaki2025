import React, { useRef, useState, useEffect } from "react";
import styles from "./Timer.module.css";

const ONE_HOURS = 3600000;
const ONE_MINUTES = 60000;
const ONE_SECONDS = 1000;

function Timer(props) {
  const Limit_Time = 480000;

  const [timerCount, setTimerCount] = useState(() => {
    const savedTime = sessionStorage.getItem("timerCount");
    return savedTime !== null ? Number(savedTime) : Limit_Time;
  });

  const timerIdRef = useRef(null);

  const {
    gameState,
    setGameState,
    timerState,
    setTimerState,
  } = props;

  useEffect(() => {
    sessionStorage.setItem("timerCount", timerCount);
  }, [timerCount]);

  useEffect(() => {
    if (timerCount > 0) {
      timerIdRef.current = setInterval(() => {
        setTimerCount((prevVal) =>
          Math.max(0, prevVal - ONE_SECONDS)
        );
      }, ONE_SECONDS);
    } else {
      clearInterval(timerIdRef.current);
      setTimerState("end");
      setGameState("Finished");
    }

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [timerCount, setGameState, setTimerState]);

  function Format(time) {
    const mm = Math.floor((time % ONE_HOURS) / ONE_MINUTES);
    const ss = Math.floor((time % ONE_MINUTES) / ONE_SECONDS);

    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  }

  const currentStyle = timerState
    ? `${styles.timerContainer} ${styles.floatingStyle}`
    : `${styles.timerContainer} ${styles.headerStyle}`;

  return (
    <div className={currentStyle}>
      <span className={styles.timerLabel}>TIME</span>
      <span>{Format(timerCount)}</span>
    </div>
  );
}

export default Timer;
