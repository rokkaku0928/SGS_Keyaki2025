import React, {useCallback, useEffect} from 'react'
import { useOrientation } from './useOrientation'; // 上記で作成したフックをインポート
import { Unity, useUnityContext } from "react-unity-webgl";
import useCapCanvasDPR from './useCapCanvasDPR';
// H.T

/**
 * 縦画面時に表示する警告コンポーネント
 */
const PortraitWarning = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
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

function Game3({scoreState, setScoreState , playState, setPlayState}) {

  useCapCanvasDPR(2, 4096); // DPR を最大2に制限し、幅高さの上限を4096pxにする
  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
      loaderUrl: "/unity3/Build/Downloads.loader.js",
      dataUrl: "/unity3/Build/Downloads.data",
      frameworkUrl: "/unity3/Build/Downloads.framework.js",
      codeUrl: "/unity3/Build/Downloads.wasm",
  });

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

      // コンポーネントが不要になったら登録解除（クリーンアップ）
      return () => {
          delete window.NextButton;
      };
  }, [ClearButton, BackButton]);

  return (
    <OrientationChecker>
      <Unity
        unityProvider={unityProvider}
      />
    </OrientationChecker>
  )
}

export default Game3