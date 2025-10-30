import React from 'react'

export default function Intro7({introStep, setIntroStep }) {
  return (
    <>
        <h1>Intro7</h1>
        <p>読み取り用のカメラはこちらで用意する</p>
        <p>起動の合図はこちらで送るので心配しないでほしい。</p>
        <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}