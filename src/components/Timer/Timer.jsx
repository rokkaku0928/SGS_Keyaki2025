import React, { useRef, useState, useEffect } from "react";
import styles from "./Timer.module.css"

const ONE_HOURS = 3600000;
const ONE_MINUTES = 60000;
const ONE_SECONDS = 1000;

function Timer(props) {
    // Limit＿Timeが制限時間を定義してる
    const Limit_Time = 120000;
    const [timerCount, setTimerCount] = useState(Limit_Time);
    const [timerState,setTimerState] = useState('active')
    const timerIdRef = useRef(null);
    const {
        gameState,
        setGameState
    } = props;
    
    useEffect(() => {

        //タイマーのカウントが0を超えているときタイマーをスタート
        if ( timerCount > 0) {
            //setIntervalで1秒(1000ms)おきに、タイマーのカウントを減らす
            //setIntervalのIDをRefに保持しておく
            timerIdRef.current = setInterval(() => {
            setTimerCount((prevVal) => prevVal - ONE_SECONDS);
            }, ONE_SECONDS);
        } else {
            //タイマーカウントが0になったら、clearIntervalでタイマーを止め、タイマーの状態をEndにする。
            clearInterval(timerIdRef.current);
            setTimerState("end");
            setGameState('Finished');
        }

        //クリーンアップ関数 useEffectが再実行される前や、コンポーネントのアンマウント時に呼び出され、古いタイマーを停止する。
        //これがないと、ストップやリセットボタンを押しても、タイマーが止まらない。
        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
            }
        };
    }, [timerCount]);

    function Format(timerCount) {
        const mm = Math.floor((timerCount % ONE_HOURS)/ONE_MINUTES)
        const ss = Math.floor((timerCount % ONE_MINUTES)/ONE_SECONDS)
        return [mm,ss].map((val)=>String(val)).join(':')
    }

    return(
        <>
            <a className={styles.flame}><font size="9">{Format(timerCount)}</font></a>
        </>
    )
}

export default Timer