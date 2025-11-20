import React ,{ useEffect, useCallback, useState } from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./Game.module.css";

function Game4({ scoreState, setScoreState, playState, setPlayState }) {

    const { unityProvider, loadingProgression, isLoaded, unload } = useUnityContext({
        loaderUrl: "/unity4/Build/Gamedayo.loader.js",
        dataUrl: "/unity4/Build/Gamedayo.data",
        frameworkUrl: "/unity4/Build/Gamedayo.framework.js",
        codeUrl: "/unity4/Build/Gamedayo.wasm",
    });

    const [isDisposed, setIsDisposed] = useState(false);

    // ---- ボタン ----
    const BackButton = useCallback(() => {
        setPlayState(0);
    }, []);

    const ClearButton = useCallback(() => {
        setScoreState(scoreState + 1);
        setPlayState(0);
    }, []);

    // ---- Unity → JS の橋渡し ----
    useEffect(() => {
        window.NextButton = ClearButton;
        window.BackButton = BackButton;

        return () => {
            delete window.NextButton;
            delete window.BackButton;
        };
    }, [ClearButton, BackButton]);

    // ---- 🔥 ここ追加：Unity インスタンス破棄 + 待機 ----
    useEffect(() => {
        return () => {
            const dispose = async () => {
                try {
                    await unload();      // Unity を破棄
                    setIsDisposed(true); // 完全破棄された
                } catch (e) {
                    console.warn("unload failed:", e);
                }
            };
            dispose();
        };
    }, [unload]);

    // Unity が破棄されるまで待つ
    if (!isDisposed && playState === 0) {
        return <div className={styles.loadingOverlay}>終了処理中…</div>;
    }

    // ---- Unity 本体 ----
    return (
        <div className={styles.gameContainer}>
            {!isLoaded && 
                <div className={styles.loadingOverlay}>
                    <p>読み込み中... ({Math.round(loadingProgression * 100)}%)</p>
                </div>
            }
            <Unity unityProvider={unityProvider} className={styles.unityCanvas} />
        </div>
    );
}

export default Game4;
