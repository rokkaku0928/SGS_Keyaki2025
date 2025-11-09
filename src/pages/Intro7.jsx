import React from 'react'

export default function Intro7({introStep, setIntroStep }) {
  return (
    <>
        <h1>Intro7</h1>
        <p>セキュリティの前までは俺がハッキングできる</p>
        <p>解除にお前の力を貸してくれ！</p>
        <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}