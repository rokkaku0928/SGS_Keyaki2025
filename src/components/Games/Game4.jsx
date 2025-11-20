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

    const ClearButton = useCallback(async () => {

        // ---- Unity を完全破棄 ----
        try {
            await unload();
            console.log("[Game4] unload 完了");
        } catch (e) {
            console.warn("[Game4] unload failed", e);
        }

        // ---- スマホ用クールダウン（重要） ----
        setTimeout(() => {
            setScoreState(scoreState + 1);
            setPlayState(0);
        }, 1500);

    }, [unload, scoreState, setScoreState, setPlayState]);


    const BackButton = useCallback(async () => {

        try {
            await unload();
        } catch (e) {
            console.warn("[Game4] unload failed", e);
        }

        setTimeout(() => {
            setPlayState(0);
        }, 1500);

    }, [unload, setPlayState]);


    // Unity → JS の登録
    useEffect(() => {
        window.NextButton = ClearButton;
        window.BackButton = BackButton;

        return () => {
            delete window.NextButton;
            delete window.BackButton;
        };
    }, [ClearButton, BackButton]);


    return (
        <div className={styles.gameContainer}>
            {!isLoaded && (
                <div className={styles.loadingOverlay}>
                    <p>読み込み中... ({Math.round(loadingProgression * 100)}%)</p>
                </div>
            )}

            <Unity
                unityProvider={unityProvider}
                className={styles.unityCanvas}
            />
        </div>
    );
}

export default Game4;
