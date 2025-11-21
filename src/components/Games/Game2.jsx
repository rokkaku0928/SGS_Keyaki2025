import React ,{  useEffect, useCallback} from 'react'
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
        setPlayState(playState = 0);
    }, []); // 依存配列は空でOK

    useEffect(() => {
        // C#側で指定する関数名 'NextButton' で登録
        window.NextButton = ClearButton

        // コンポーネントが不要になったら登録解除（クリーンアップ）
        return () => {
            delete window.NextButton;
            // 🟥 Unity WebGL メモリ完全解放
            unload();
        };
    }, [ClearButton]);

    
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
export default Game2