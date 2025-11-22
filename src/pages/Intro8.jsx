import React from 'react'

export default function Intro8({introStep, setIntroStep }) {
  return (
    <>
        <h1>Intro8</h1>
        <p>なお、破ったセキュリティに応じて</p>
        <p>ささやかながら景品が贈呈される</p>
        <p>まぁ、頑張ってくれ</p>
        <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}