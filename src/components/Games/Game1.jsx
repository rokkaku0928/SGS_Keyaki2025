import React ,{  useEffect, useCallback } from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "./Game.module.css";

function Game1({scoreState, setScoreState , playState, setPlayState}) {

    const { unityProvider, sendMessage, isLoaded } = useUnityContext({
        loaderUrl: "/unity1/Build/unity1.loader.js",
        dataUrl: "/unity1/Build/unity1.data.br",
        frameworkUrl: "/unity1/Build/unity1.framework.js.br",
        codeUrl: "/unity1/Build/unity1.wasm.br",
    });

    // ゲーム中の"もどる"ボタン
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
        <div className={styles.gameContainer}>
            <Unity 
                unityProvider={unityProvider} 
                className={styles.unityCanvas}
            />
        </ div>
    )
}

export default Game1
