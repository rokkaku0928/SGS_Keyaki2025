import React from 'react'

export default function Intro6({introStep, setIntroStep }) {
  return (
    <>
        <h1>Intro6</h1>
        <p>君にはそのセキュリティを突破し、システムをハッキングしてもらいたい。</p>
        <p>おっと、忘れてた！QRを読み取るためにスマホのカメラを起動する必要はない</p>
        <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
          
    </>
  )
}
