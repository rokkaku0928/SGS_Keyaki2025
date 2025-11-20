import React ,{ useEffect, useCallback } from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./Game.module.css";
// S.Y

function Game2({scoreState, setScoreState , playState, setPlayState}) {

    const { unityProvider, loadingProgression, isLoaded, unload } = useUnityContext({
        loaderUrl: "/unity2/Build/DoorGame_2.loader.js",
        dataUrl: "/unity2/Build/DoorGame_2.data",
        frameworkUrl: "/unity2/Build/DoorGame_2.framework.js",
        codeUrl: "/unity2/Build/DoorGame_2.wasm",
    });

    const loadingPercentage = Math.round(loadingProgression * 100);

    // ゲームクリア後の"つぎへ"ボタン
    const ClearButton = useCallback(() => {
        setScoreState(scoreState + 1);
        setPlayState(0);
    }, []);

    useEffect(() => {
        // C# 側から呼んでもらう JS 関数を登録
        window.NextButton = ClearButton;

        // クリーンアップ
        return () => {
            delete window.NextButton;

            // 勝手にいじりました、デバックした感じは大丈夫そうです
            try {
                unload();
            } catch(e) {
                console.warn("unload failed", e);
            }
        };
    }, [ClearButton, unload]);

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
        </ div>
    )
}

export default Game2;
