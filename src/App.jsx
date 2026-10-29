import './App.css';
import React, { useEffect, useState } from 'react';

import Intro1 from './pages/Intro1';
import Intro2 from './pages/Intro2';
import Intro3 from './pages/Intro3';

import Game1 from './components/Games/Game1';
import Game2 from './components/Games/Game2';
import Game3 from './components/Games/Game3';
import Game4 from './components/Games/Game4';
import Game5 from './components/Games/Game5';
import Game6 from './components/Games/Game6';
import Game7 from './components/Games/Game7';
import Game8 from './components/Games/Game8';
import Game9 from './components/Games/Game9';

import TargetCamera from './components/TargetCamera/TargetCamera';
import Timer from './components/Timer/Timer';
import Score from './components/Score/Score';
import EndScreen from './pages/EndScreen';

function App() {
  // 獲得した鍵の番号を保存する
  // 例：[1, 2, 1] なら、鍵1・鍵2・鍵1の順で獲得
  const [collectedKeys, setCollectedKeys] = useState(() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem('collectedKeys') || '[]'
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [introStep, setIntroStep] = useState(0);
  const [timerState, setTimerState] = useState(false);

  // スコアを保存データから読み込む
  const [scoreState, setScoreState] = useState(() => {
    const savedScore = sessionStorage.getItem('gameScore');
    return savedScore !== null ? Number(savedScore) : 0;
  });

  // playStateが0ならカメラ、1～9なら各ゲーム
  const [playState, setPlayState] = useState(() => {
    const saved = sessionStorage.getItem('playState');
    return saved !== null ? Number(saved) : 0;
  });

  const totalKeys = 8;

  // ゲーム状態を保存データから読み込む
  const [gameState, setGameState] = useState(() => {
    return sessionStorage.getItem('gameState') || 'Intro';
  });

  // 状態が変わるたびに保存
  useEffect(() => {
    sessionStorage.setItem('gameState', gameState);
  }, [gameState]);

  useEffect(() => {
    sessionStorage.setItem('gameScore', String(scoreState));
  }, [scoreState]);

  useEffect(() => {
    sessionStorage.setItem('playState', String(playState));
  }, [playState]);

  useEffect(() => {
    sessionStorage.setItem(
      'collectedKeys',
      JSON.stringify(collectedKeys)
    );
  }, [collectedKeys]);

  // タイマーを浮かせて表示するゲーム番号
  useEffect(() => {
    const floatingTimerGames = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setTimerState(floatingTimerGames.has(playState));
  }, [playState]);

  const renderContent = () => {
    switch (gameState) {
      case 'Intro': {
        const Intros = [
          <Intro1
            key="intro1"
            introStep={introStep}
            setIntroStep={setIntroStep}
          />,
          <Intro2
            key="intro2"
            introStep={introStep}
            setIntroStep={setIntroStep}
          />,
          <Intro3
            key="intro3"
            introStep={introStep}
            setIntroStep={setIntroStep}
            gameState={gameState}
            setGameState={setGameState}
          />,
        ];

        return Intros[introStep] ?? null;
      }

      case 'Playing': {
        const gameProps = {
          scoreState,
          setScoreState,
          setPlayState,
          playState,
        };

        const Games = [
          <Game1 key="game1" {...gameProps} />,
          <Game2 key="game2" {...gameProps} />,
          <Game3 key="game3" {...gameProps} />,
          <Game4 key="game4" {...gameProps} />,
          <Game5 key="game5" {...gameProps} />,
          <Game6 key="game6" {...gameProps} />,
          <Game7 key="game7" {...gameProps} />,
          <Game8 key="game8" {...gameProps} />,
          <Game9 key="game9" {...gameProps} />,
        ];

        return (
          <>
            <Timer
              gameState={gameState}
              setGameState={setGameState}
              timerState={timerState}
              setTimerState={setTimerState}
            />

            {playState === 0 ? (
              <div className="grid grid-rows-2 h-full w-full">
                <div className="row-span-1">
                  <TargetCamera
                    playState={playState}
                    setPlayState={setPlayState}
                  />
                </div>

                <div className="row-span-1 flex flex-col items-center justify-center w-full">
                  <Score
                    score={scoreState}
                    total={totalKeys}
                    collectedKeys={collectedKeys}
                  />
                </div>
              </div>
            ) : (
              Games[playState - 1] ?? null
            )}
          </>
        );
      }

      case 'Finished': {
        if (scoreState === 0) {
          return (
            <EndScreen
              title="残念だ..."
              message="依頼料だ。受け取ってくれ"
              score={scoreState}
              design="minimal"
            />
          );
        }

        if (scoreState <= 2) {
          return (
            <EndScreen
              title="まずまずだ"
              message="君の協力に感謝する"
              score={scoreState}
              design="modern"
            />
          );
        }

        if (scoreState <= 5) {
          return (
            <EndScreen
              title="よくやった！！"
              message="大助かりだ！！！"
              score={scoreState}
              design="retro"
            />
          );
        }

        if (scoreState <= 8) {
          return (
            <EndScreen
              title="素晴らしい！"
              message="おめでとう！！！"
              score={scoreState}
              design="steampunk"
            />
          );
        }

        return (
          <EndScreen
            title="素晴らしい！"
            message="見事な結果だ！おめでとう！！！"
            score={scoreState}
            design="playful"
          />
        );
      }

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
}

export default App;
