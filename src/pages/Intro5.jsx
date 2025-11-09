import React from 'react'

export default function Intro5({introStep, setIntroStep }) {
  return (
    <>
      <h1>Intro5</h1>
      <p>数は全部で１０、</p>
      <p>打ち抜く分にはそう難しくはない。</p>
      <p>やっかいなのは中身の "カギ" だ</p>
      <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
      <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>    
    </>
  )
}