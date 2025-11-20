import React, { useCallback, useEffect } from 'react';
import { useOrientation } from './useOrientation';
import { Unity, useUnityContext } from 'react-unity-webgl';
import useCapCanvasDPR from './useCapCanvasDPR';
import styles from './Game.module.css';

function Game3({ scoreState, setScoreState, playState, setPlayState }) {
  const orientation = useOrientation();
  const isPortrait = orientation === "portrait";

  useCapCanvasDPR(2, 4096);

  const { unityProvider } = useUnityContext({
    loaderUrl: "/unity3/Build/Downloads.loader.js",
    dataUrl: "/unity3/Build/Downloads.data",
    frameworkUrl: "/unity3/Build/Downloads.framework.js",
    codeUrl: "/unity3/Build/Downloads.wasm",
  });

  useEffect(() => {
    window.NextButton = () => {
      setScoreState(prev => prev + 1);
      setPlayState(0);
    };
    window.BackButton = () => setPlayState(0);

    return () => {
      delete window.NextButton;
      delete window.BackButton;
    };
  }, []);

  if (orientation === null) return null;

  return (
    <>
      {/* ① portraitWrapper を縦向きのときだけ追加 */}
      <div className={`${styles.gameContainer} ${isPortrait ? styles.portraitWrapper : ""}`}>
        
        {/* ② Unity に portraitScale を縦向きだけ追加 */}
        <Unity
          unityProvider={unityProvider}
          className={`${styles.unityCanvas} ${isPortrait ? styles.portraitScale : ""}`}
        />

      </div>
    </>
  );
}

export default Game3;

