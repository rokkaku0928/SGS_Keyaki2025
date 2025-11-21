import React ,{  useEffect, useCallback } from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./Game.module.css";
// Tusk

function Game4({scoreState, setScoreState , playState, setPlayState}) {

    const { unityProvider, loadingProgression, isLoaded, unload } = useUnityContext({
        loaderUrl: "/unity4/Build/Gamedayo.loader.js",
        dataUrl: "/unity4/Build/Gamedayo.data",
        frameworkUrl: "/unity4/Build/Gamedayo.framework.js",
        codeUrl: "/unity4/Build/Gamedayo.wasm",
    });

    const loadingPercentage = Math.round(loadingProgression * 100);

    // ゲーム中の"もどる"ボタン
    const BackButton = useCallback(() => {
        setPlayState(playState = 0);
    }, []); // 依存配列は空でOK

    // ゲームクリア後の"つぎへ"ボタン
    const ClearButton = useCallback(() => {
        setScoreState(scoreState + 1);
        setPlayState(playState = 0);
    }, []); // 依存配列は空でOK

    useEffect(() => {
        // C#側で指定する関数名 'NextButton' で登録
        window.NextButton = ClearButton

        window.BackButton = BackButton

        // コンポーネントが不要になったら登録解除（クリーンアップ）
        return () => {
            delete window.NextButton;
            delete window.BackButton;

            unload();
        };
    }, [ClearButton, BackButton]);

    
    return (
        <div className={styles.gameContainer}>
            {isLoaded === false && (
                // We'll conditionally render the loading overlay if the Unity
                // Application is not loaded.
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

export default Game4