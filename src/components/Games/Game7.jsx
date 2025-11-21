import React, { useCallback, useEffect, useState } from 'react';
import { useOrientation } from './useOrientation';
import { Unity, useUnityContext } from 'react-unity-webgl';
import useCapCanvasDPR from './useCapCanvasDPR';
import styles from './Game.module.css';

function Game7({ scoreState, setScoreState, playState, setPlayState }) {

  const isPortrait = true;
  useCapCanvasDPR(2, 4096);

  const { unityProvider, loadingProgression, isLoaded, unload } = useUnityContext({
    loaderUrl: "/unity7/Build/shootinggame.loader.js",
    dataUrl: "/unity7/Build/shootinggame.data",
    frameworkUrl: "/unity7/Build/shootinggame.framework.js",
    codeUrl: "/unity7/Build/shootinggame.wasm",
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
      {/* ① portraitWrapper を縦向きのときだけ追加 */}
      <div className={`${styles.gameContainer} ${isPortrait ? styles.portraitWrapper : ""}`}>
        
        {isLoaded === false && (
            <div className={styles.loadingOverlay}>
              <p>読み込み中... ({loadingPercentage}%)</p>
            </div>
        )}
        
        {/* ② Unity に portraitScale を縦向きだけ追加 */}
        <Unity
          unityProvider={unityProvider}
          className={`${styles.unityCanvas} ${isPortrait ? styles.portraitScale : ""}`}
        />

      </div>
    </>
  );
}

export default Game7;