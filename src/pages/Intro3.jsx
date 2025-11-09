import React from 'react'

export default function Intro3({introStep, setIntroStep }) {
  return (
    <>
      <h1>intro3</h1>
      <p>まずテーブルにおかれた銃をとってくれ</p>
      <p>仕様は銃身ｘ、装弾数∞、重さｘの特注品。</p>
      <p>だが、それだけじゃない</p>
      <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
      <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}
