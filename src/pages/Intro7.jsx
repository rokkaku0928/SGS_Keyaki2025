import React from 'react'
import { Link } from 'react-router-dom'

export default function Intro7() {
  return (
    <>
        <h1>Intro7</h1>
        <p>読み取り用のカメラはこちらで用意する</p>
        <p>起動の合図はこちらで送るので心配しないでほしい。</p>
        <Link to='/intro-8'>次へ</Link>
        <Link to='/intro-6'>戻る</Link>
    </>
  )
}