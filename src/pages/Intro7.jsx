import React from 'react'

export default function Intro7({introStep, setIntroStep }) {
  return (
    <>
        <h1>Intro7</h1>
        <p>セキュリティの</p>
        <p>解除にお前の力を貸してくれ！</p>
        <p>さて、ここまで読んでいただいてすみませんが</p>
        <p>銃のトラブルによりQRコードは直接読んでいただきたいです</p>
        <p>QRコードは教室内にあります</p>
        <p>ご不便おかけし申し訳ございません</p>
        <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
    </>
  )
}