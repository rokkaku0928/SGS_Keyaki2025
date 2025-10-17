import React from 'react'

export default function Intro3({introStep, setIntroStep }) {
  return (
    <>
            <h1>intro3</h1>
            <p>事前に細工をしてあるのでまぁ、簡単に壊れるはずだ</p>
            <p>ボールはこちらで支給する。かごの中に入ってるから好きにつかって欲しい</p>
            <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
            <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
        
        
    </>
  )
}
