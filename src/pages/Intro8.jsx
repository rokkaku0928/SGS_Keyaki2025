import React from 'react'

export default function Intro8({introStep, setIntroStep }) {
  return (
    <>
        <h1>Intro8</h1>
        <p>何せセキュリティが多いものでな...</p>
        <p>破壊した数に応じて報酬をだそう</p>
        <p>そうそう、部屋には時間制限がある</p>
        <p>それを超えるとゲームオーバーとなるので</p>
        <p>必ず時間制限内に部屋から脱出してくれ</p>
        <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}