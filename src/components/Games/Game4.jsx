import React, { useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./Game.module.css";

function Game4({ scoreState, setScoreState, playState, setPlayState }) {
    const { unityProvider, loadingProgression, isLoaded, unload } = useUnityContext({
        loaderUrl: "/unity4/Build/Gamedayo.loader.js",
        dataUrl: "/unity4/Build/Gamedayo.data",
        frameworkUrl: "/unity4/Build/Gamedayo.framework.js",
        codeUrl: "/unity4/Build/Gamedayo.wasm",
    });

    // --- Unity破棄後にスコア加算 ---
    const ClearButton = useCallback(async () => {
        try {
            await unload(); // 完全破棄を待つ
            console.log("[Game4] unload 完了");

            // スマホ用クールダウン
            setTimeout(() => {
                setScoreState(prev => prev + 1);
                setPlayState(0);
            }, 300); // 短めの遅延
        } catch (e) {
            console.warn("[Game4] unload failed", e);
        }
    }, [unload, setScoreState, setPlayState]);

    // --- Unity破棄後に戻るだけ ---
    const BackButton = useCallback(async () => {
        try {
            await unload();
        } catch (e) {
            console.warn("[Game4] unload failed", e);
        }

        setTimeout(() => {
            setPlayState(0);
        }, 300);
    }, [unload, setPlayState]);

    // --- Unity → JS のボタン登録 ---
    useEffect(() => {
        window.NextButton = ClearButton;
        window.BackButton = BackButton;

        return () => {
            if (window.NextButton === ClearButton) delete window.NextButton;
            if (window.BackButton === BackButton) delete window.BackButton;
        };
    }, [ClearButton, BackButton]);

    return (
        <div className={styles.gameContainer}>
            {!isLoaded && (
                <div className={styles.loadingOverlay}>
                    <p>読み込み中... ({Math.round(loadingProgression * 100)}%)</p>
                </div>
            )}

            {/* playState が 1 のときのみ Unity 表示 */}
            {playState !== 0 && (
                <Unity
                    unityProvider={unityProvider}
                    className={styles.unityCanvas}
                />
            )}
        </div>
    );
}

export default Game4;
