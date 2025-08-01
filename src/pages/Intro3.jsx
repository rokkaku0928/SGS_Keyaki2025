import React from 'react'
import { Link } from 'react-router-dom'

export default function Intro3() {
  return (
    <>
            <h1>intro3</h1>
            <p>事前に細工をしてあるのでまぁ、簡単に壊れるはずだ</p>
            <p>ボールはこちらで支給する。かごの中に入ってるから好きにつかって欲しい</p>
            <Link to='/intro-4'>次へ</Link>
            <Link to='/intro-2'>戻る</Link>
        
        
    </>
  )
}
