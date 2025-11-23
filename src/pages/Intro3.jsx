import React from 'react'

export default function Intro3(props) {

  const {
    introStep,
    setIntroStep,
    gameState,
    setGameState
  } = props;

  return (
    <>
      <h1>Are You Ready?</h1>
      <p>これよりカメラを<ruby>起動<rt>きどう</rt></ruby>する</p>
      <p>ミッションはマークの<ruby>破壊<rt>はかい</rt></ruby>とセキュリティの<ruby>突破<rt>とっぱ</rt></ruby>だ</p>
      <p><ruby>残<rt>のこ</rt></ruby>りの<ruby>時間制限<rt>じかんせいげん</rt></ruby>はこちらからカメラ<ruby>画面<rt>がめん</rt></ruby>に<ruby>表示<rt>ひょうじ</rt></ruby>する</p>
      <p><ruby>諸君<rt>しょくん</rt></ruby>の<ruby>健闘<rt>けんとう</rt></ruby>を<ruby>祈<rt>いの</rt></ruby>る</p>
      <button onClick={() => setGameState('Playing')} ><ruby>突入<rt>とつにゅう</rt></ruby>！！</button>
      <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}
