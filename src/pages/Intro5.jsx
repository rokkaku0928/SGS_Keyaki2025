import React from 'react'

export default function Intro5({introStep, setIntroStep }) {
  return (
    <>
            <h1>Intro5</h1>
            <p>QRコードを読むとシステムが侵入者を検知、</p>
            <p>即座にセキュリティが発動する</p>
            <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
            <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
        
        
    </>
  )
}