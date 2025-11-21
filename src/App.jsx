import './App.css'
import React, {useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Intro1 from './pages/Intro1'
import Intro2 from './pages/Intro2'
import Intro3 from './pages/Intro3'
import Intro4 from './pages/Intro4'
import Intro5 from './pages/Intro5'
import Intro6 from './pages/Intro6'
import Intro7 from './pages/Intro7'
import Intro8 from './pages/Intro8'
import Intro9 from './pages/Intro9'
import Game1 from './components/Games/Game1'
import Game2 from './components/Games/Game2'
import Game3 from './components/Games/Game3'
import Game4 from './components/Games/Game4';
import Game5 from './components/Games/Game5';
import Game6 from './components/Games/Game6';
import Game7 from './components/Games/Game7';
import Game8 from './components/Games/Game8';
import GameOver from './components/Games/GameOver'
import TargetCamera from './components/TargetCamera/TargetCamera';
import Timer from './components/Timer/Timer';
import Score from './components/Score/Score'
import EndScreen from './pages/EndScreen';




function App() {

  const [gameState, setGameState] = useState('Intro');
  const [scoreState, setScoreState] = useState(0);
  const [introStep, setIntroStep] = useState(0);
  const [timerState, setTimerState] = useState(false);
  // playStateは何の電子ゲームをやってるか？という処理と
  // 電子ゲームかカメラか？という処理を兼ねている
  // playStateが０ならカメラ、その他n（何らかの数字）
  // だったらn番目のゲーム
  const [playState, setPlayState] = useState(0);
  const totalKeys = 10; // 鍵の総数
  useEffect(() => {
    // ここでは playState - 1 === 0 のときに timerState を true にする（必要なら条件を調整）
    setTimerState(playState - 1 === 0);
    setTimerState(playState - 1 === 2);
    setTimerState(playState - 1 === 6);
  }, [playState, setTimerState]);

  const renderContent = () => {
    switch (gameState) {
      case 'Intro':
        const Intros = [
          <Intro1 introStep={introStep} setIntroStep={setIntroStep} />,
          <Intro2 introStep={introStep} setIntroStep={setIntroStep} />,
          <Intro3 introStep={introStep} setIntroStep={setIntroStep} />,
          <Intro4 introStep={introStep} setIntroStep={setIntroStep} />,
          <Intro5 introStep={introStep} setIntroStep={setIntroStep} />,
          <Intro6 introStep={introStep} setIntroStep={setIntroStep} />,
          <Intro7 introStep={introStep} setIntroStep={setIntroStep} />,
          <Intro8 introStep={introStep} setIntroStep={setIntroStep} />,
          <Intro9 introStep={introStep} setIntroStep={setIntroStep} gameState={gameState} setGameState={setGameState} />,
        ];
        return (
          <>
            {Intros[introStep]}
          </>
        )
      case 'Playing':
        const Games = [
          <Game1 scoreState={scoreState} setScoreState={setScoreState} setPlayState={setPlayState} playState={playState} />,
          <Game2 scoreState={scoreState} setScoreState={setScoreState} setPlayState={setPlayState} playState={playState} />,
          <Game3 scoreState={scoreState} setScoreState={setScoreState} setPlayState={setPlayState} playState={playState} />,
          <Game4 scoreState={scoreState} setScoreState={setScoreState} setPlayState={setPlayState} playState={playState} />,
          <Game5 scoreState={scoreState} setScoreState={setScoreState} setPlayState={setPlayState} playState={playState} />,
          <Game6 scoreState={scoreState} setScoreState={setScoreState} setPlayState={setPlayState} playState={playState} />,
          <Game7 scoreState={scoreState} setScoreState={setScoreState} setPlayState={setPlayState} playState={playState} />,
          <Game8 scoreState={scoreState} setScoreState={setScoreState} setPlayState={setPlayState} playState={playState} />,
        ];
        return (
          <>
            
            <Timer gameState={gameState} setGameState={setGameState} timerState={timerState} setTimerState={setTimerState}/>
            {playState === 0 ? (
              <div className="grid grid-rows-2 h-full w-full">
                <div className="row-span-1">
                  <TargetCamera playState={playState} setPlayState={setPlayState} />
                </div>
                <div className="row-span-1 flex justify-center w-full">
                  <Score score={scoreState} total={totalKeys} className="w-full" />
                </div>
              </div>
            ) : (
              Games[playState - 1]
            )}

          </>
        );
      case 'Finished':
        // スコアが閾値以上かどうかで表示する終了画面を変える
        if ( 0 == scoreState ) {
          return (
            <EndScreen
              title="残念だ..."
              message="依頼料だ。受け取ってくれ"
              score={scoreState}
              design="minimal" // この 'modern' が styles.modern にマッピングされます
            />
          );
        } else if ( 1 <= scoreState && scoreState <= 2) {
          return (
            <EndScreen
              title="素晴らしい！"
              message="見事な結果です！おめでとうございます！"
              score={scoreState}
              design="modern" // この 'modern' が styles.modern にマッピングされます
            />
          );

        } else if (3 <= scoreState && scoreState <= 5) {
          return (
            <EndScreen
              title="よくやった！！"
              message="見事な結果です！おめでとうございます！"
              score={scoreState}
              design="retro" // この 'modern' が styles.modern にマッピングされます
            />
          );
        } else if (6 <= scoreState && scoreState <= 8) {
          return (
            <EndScreen
              title="素晴らしい！"
              message="見事な結果です！おめでとうございます！"
              score={scoreState}
              design="steampunk" // この 'modern' が styles.modern にマッピングされます
            />
          );
        } else if (9 <= scoreState && scoreState <= 10) {
            <EndScreen
              title="素晴らしい！"
              message="見事な結果です！おめでとうございます！"
              score={scoreState}
              design="playful" // この 'modern' が styles.modern にマッピングされます
            />
        }
      default:
        return null;
    }
  };


  return (
    <>
      {renderContent()}
    </>
  )
}

export default App
