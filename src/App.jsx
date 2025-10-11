import './App.css'
import React, { useState } from 'react';
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
import Playing from './pages/Playing'
import Game1 from './components/Games/Game1'
import Game2 from './components/Games/Game2'
import Game3 from './components/Games/Game3'
import GameOver from './components/Games/GameOver'
import TargetCamera from './components/TargetCamera/TargetCamera';
import Timer from './components/Timer/Timer';
import Score from './components/Score/Score'



function App() {

  const [gameState, setGameState] = useState('Intro');
  const [scoreState, setScoreState] = useState(2);
  const [introStep, setIntroStep] = useState(0);
  // playStateは何の電子ゲームをやってるか？という処理と
  // 電子ゲームかカメラか？という処理を兼ねている
  // playStateが０ならカメラ、その他n（何らかの数字）
  // だったらn番目のゲーム
  const [playState, setPlayState] = useState(0);
  const totalKeys = 10; // 鍵の総数

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
          <Game1 playState={playState} setPlayState={setPlayState} />,
          <Game2 playState={playState} setPlayState={setPlayState} />,
          <Game3 playState={playState} setPlayState={setPlayState} />,
        ];
        return (
          <dev className="w-full max-w-sm h-[80vh]">
            
            <Timer gameState={gameState} setGameState={setGameState}/>
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

          </ dev>
        );

      case 'Finished':
        // スコアが閾値以上かどうかで表示する終了画面を変える
        if (scoreState >= SCORE_THRESHOLD) {
          return (
            <EndScreen
              title="素晴らしい！"
              message="見事な結果です！おめでとうございます！"
              score={score}
              onRetry={handleRetry}
            />
          );
        } else {
          return (
            <EndScreen
              title="残念！"
              message="あと一歩でした。もう一度挑戦してみましょう！"
              score={score}
              onRetry={handleRetry}
            />
          );
        }

      default:
        return null;
    }
  };


  return (
    <>
      {renderContent()}
      <BrowserRouter>
        <Routes>
          <Route path='/intro-1' element={<Intro1 />} />
          <Route path='/intro-2' element={<Intro2 />} />
          <Route path='/intro-3' element={<Intro3 />} />
          <Route path='/intro-4' element={<Intro4 />} />
          <Route path='/intro-5' element={<Intro5 />} />
          <Route path='/intro-6' element={<Intro6 />} />
          <Route path='/intro-7' element={<Intro7 />} />
          <Route path='/intro-8' element={<Intro8 />} />
          <Route path='/intro-9' element={<Intro9 />} />
          <Route path='/Playing' element={<Playing />} />
          <Route path='/Game1' element={<Game1 />} />
          <Route path='/Game2' element={<Game2 />} />
          <Route path='/Game3' element={<Game3 />} />
          <Route path='/GameOver' element={<GameOver />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
