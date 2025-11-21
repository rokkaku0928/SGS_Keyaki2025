import React from 'react'

export default function Intro9(props) {
  const {
    introStep,
    setIntroStep,
    gameState,
    setGameState
  } = props;
  return (
    <>
        <h1>Are You Ready?</h1>
        <p>これよりカメラを起動する</p>
        <p>ミッションはマークの破壊とセキュリティの突破だ</p>
        <p>残りの時間制限はこちらからカメラ画面に表示する</p>
        <p>諸君の健闘を祈る</p>
        <button onClick={() => setGameState('Playing')} >突入！！</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}