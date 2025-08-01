import React from 'react'
import { Link } from 'react-router-dom'

export default function Intro6() {
  return (
    <>
        <h1>Intro6</h1>
        <p>君にはそのセキュリティを突破し、システムをハッキングしてもらいたい。</p>
        <p>おっと、忘れてた！QRを読み取るためにスマホのカメラを起動する必要はない</p>
        <Link to='/intro-7'>次へ</Link>
        <Link to='/intro-5'>戻る</Link>
          
    </>
  )
}
