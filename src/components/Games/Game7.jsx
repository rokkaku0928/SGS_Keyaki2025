import React, {useCallback, useEffect} from 'react'
import { useOrientation } from './useOrientation'; // 上記で作成したフックをインポート
import { Unity, useUnityContext } from "react-unity-webgl";
import useCapCanvasDPR from './useCapCanvasDPR';
import styles from "./Game.module.css";
// Y.S(2)

/**
 * 縦画面時に表示する警告コンポーネント
 */
const PortraitWarning = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80vw',
    height: '80vh',
    textAlign: 'center',
    backgroundColor: '#333',
    color: 'white'
  }}>
    <h1>横画面にしてください</h1>
  </div>
);

const OrientationChecker = ({ children }) => {
  const orientation = useOrientation();

  // 1. 向きがまだ判定できていない場合 (初回レンダリング時)
  //    ハイドレーションエラーを防ぐため、何も表示しない (null を返す)
  if (orientation === null) {
    return null;
  }

  // 2. 縦画面の場合
  if (orientation === 'portrait') {
    return <PortraitWarning />;
  }

  // 3. 横画面の場合 (children を表示)
  return <>{children}</>;
};

function Game7({scoreState, setScoreState , playState, setPlayState}) {

  useCapCanvasDPR(2, 4096); // DPR を最大2に制限し、幅高さの上限を4096pxにする
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
      loaderUrl: "/unity7/Build/shootinggame.loader.js",
      dataUrl: "/unity7/Build/shootinggame.data",
      frameworkUrl: "/unity7/Build/shootinggame.framework.js",
      codeUrl: "/unity7/Build/shootinggame.wasm",
  });
  const loadingPercentage = Math.round(loadingProgression * 100);

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
      };
  }, [ClearButton, BackButton]);

  return (
    <OrientationChecker>
        {isLoaded === false && (
            // We'll conditionally render the loading overlay if the Unity
            // Application is not loaded.
            <div className={styles.loadingOverlay}>
                <p>読み込み中... ({loadingPercentage}%)</p>
            </div>
        )}


        <Unity
            unityProvider={unityProvider}
        />
    </OrientationChecker>
    
  )
}

export default Game7