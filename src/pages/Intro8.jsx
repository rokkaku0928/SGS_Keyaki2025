import React from 'react'

export default function Intro8({introStep, setIntroStep }) {
  return (
    <>
        <h1>Intro8</h1>
        <p>的を打ち抜くと銃についたパネルに</p>
        <p>QRコードが出現する</p>
        <p></p>
        <p>それを超えるとゲームオーバーとなるので</p>
        <p>必ず時間制限内に部屋から脱出してくれ</p>
        <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}