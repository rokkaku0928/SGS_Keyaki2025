import React, { useCallback, useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import useCapCanvasDPR from './useCapCanvasDPR';
import styles from './Game.module.css';

function Game3({ scoreState, setScoreState, playState, setPlayState }) {

  const isPortrait = true;
  useCapCanvasDPR(2, 4096);

  const { unityProvider, loadingProgression, isLoaded, unload } = useUnityContext({
    loaderUrl: "/unity3/Build/Downloads.loader.js",
    dataUrl: "/unity3/Build/Downloads.data",
    frameworkUrl: "/unity3/Build/Downloads.framework.js",
    codeUrl: "/unity3/Build/Downloads.wasm",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

  useEffect(() => {
    window.NextButton = () => {
      setScoreState(prev => prev + 1);
      setPlayState(0);
    };
    window.BackButton = () => setPlayState(0);

    return () => {
      delete window.NextButton;
      delete window.BackButton;

      unload();
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.gameContainer} ${isPortrait ? styles.portraitWrapper : ""}`}
      >

        {isLoaded === false && (
          <div className={styles.loadingOverlay}>
            <p>読み込み中... ({loadingPercentage}%)</p>
          </div>
        )}

        <Unity
          unityProvider={unityProvider}
          className={`${styles.unityCanvas} ${isPortrait ? styles.portraitScale : ""}`}
        />

      </div>
    </>
  );
}

export default Game3;


