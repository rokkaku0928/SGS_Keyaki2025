import React from 'react'

export default function Intro8({introStep, setIntroStep }) {
  return (
    <>
        <h1>Intro8</h1>
        <p>お菓子を８つすべてする、</p>
        <p>または時間制限がきて画面が切り替わったら</p>
        <p>手に入れたカギの数だけお菓子を贈呈します</p>
        <p>お気軽にスタッフにお声かけください</p>
        <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}