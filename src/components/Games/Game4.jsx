import React, { useEffect, useCallback } from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./Game.module.css";
// Tusk

function Game4({ scoreState, setScoreState, playState, setPlayState }) {

    const {
        unityProvider,
        loadingProgression,
        isLoaded,
        unload      // ← これを取得
    } = useUnityContext({
        loaderUrl: "/unity4/Build/Gamedayo.loader.js",
        dataUrl: "/unity4/Build/Gamedayo.data",
        frameworkUrl: "/unity4/Build/Gamedayo.framework.js",
        codeUrl: "/unity4/Build/Gamedayo.wasm",
    });

    const loadingPercentage = Math.round(loadingProgression * 100);

    // もどるボタン
    const BackButton = useCallback(() => {
        setPlayState(0);
        unload();              // ← Unity を即アンロード
    }, []);

    // クリア後のつぎへ
    const ClearButton = useCallback(() => {
        setScoreState(scoreState + 1);
        setPlayState(0);
        unload();              // ← Unity を即アンロード
    }, []);

    useEffect(() => {
        window.NextButton = ClearButton;
        window.BackButton = BackButton;

        return () => {
            delete window.NextButton;
            delete window.BackButton;

            // ページ離脱時にも破棄（保険）
            if (unload) unload();
        };
    }, [ClearButton, BackButton, unload]);

    return (
        <div className={styles.gameContainer}>
            {isLoaded === false && (
                <div className={styles.loadingOverlay}>
                    <p>読み込み中... ({loadingPercentage}%)</p>
                </div>
            )}

            <Unity
                unityProvider={unityProvider}
                className={styles.unityCanvas}
            />
        </div>
    )
}

export default Game4;
