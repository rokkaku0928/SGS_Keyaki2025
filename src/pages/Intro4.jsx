import React from 'react'

export default function Intro4({introStep, setIntroStep }) {
  return (
    <>
      <h1>intro4</h1>
      <p>打ち抜いた標的のデータをハッキングで引っこ抜く特別仕様だ。</p>
      <p>さて、目の前に大量の的が見えるな...</p>
      <p>あぁそう、今回はあれを狙う。</p>
      <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
      <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}