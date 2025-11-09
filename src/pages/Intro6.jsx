import React from 'react'

export default function Intro6({introStep, setIntroStep }) {
  return (
    <>
      <h1>Intro6</h1>
      <p>こいつらの中にあるカギは</p>
      <p>銃のハッキングでしか取れないうえに</p>
      <p>セキュリティでガッチンガチンに守られてる</p>
      <p>取り出しには相応の手間を取ると考えていい。</p>
      <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
      <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
          
    </>
  )
}
