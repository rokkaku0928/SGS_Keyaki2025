import React from 'react'

export default function Intro4({introStep, setIntroStep }) {
  return (
    <>
            <h1>intro4</h1>
            <p>マークが壊れると裏からQRコードが露出する（はず）</p>
            <p>そのQRコードがやってほしいことの二つ目になる</p>
            <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
            <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
        
        
    </>
  )
}