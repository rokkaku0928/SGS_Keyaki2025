import React, { useEffect, useCallback, useState } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./Game.module.css";

function Game4({ scoreState, setScoreState, playState, setPlayState }) {
    const { unityProvider, loadingProgression, isLoaded, unload } = useUnityContext({
        loaderUrl: "/unity4/Build/Gamedayo.loader.js",
        dataUrl: "/unity4/Build/Gamedayo.data",
        frameworkUrl: "/unity4/Build/Gamedayo.framework.js",
        codeUrl: "/unity4/Build/Gamedayo.wasm",
    });

    // 再生成フラグで安全に Unity を再レンダリング
    const [reloadFlag, setReloadFlag] = useState(false);

    const ClearButton = useCallback(async () => {
        try {
            await unload();

            // Canvas を削除してメモリ解放
            const canvas = document.querySelector("canvas");
            if (canvas) canvas.remove();

            // Safari 用クールダウン
            setTimeout(() => {
                setScoreState(prev => prev + 1);
                setPlayState(0);
                // 再レンダリングフラグを更新して新しい Unity を生成
                setReloadFlag(prev => !prev);
            }, 300);

        } catch (e) {
            console.warn("[Game4] unload failed", e);
        }
    }, [unload, setScoreState, setPlayState]);

    const BackButton = useCallback(async () => {
        try {
            await unload();

            const canvas = document.querySelector("canvas");
            if (canvas) canvas.remove();

            setTimeout(() => {
                setPlayState(0);
                setReloadFlag(prev => !prev);
            }, 300);
        } catch (e) {
            console.warn("[Game4] unload failed", e);
        }
    }, [unload, setPlayState]);

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

            {playState !== 0 && reloadFlag !== null && (
                <Unity
                    key={reloadFlag} // key を変えることで新しい Unity を生成
                    unityProvider={unityProvider}
                    className={styles.unityCanvas}
                />
            )}
        </div>
    );
}

export default Game4;
