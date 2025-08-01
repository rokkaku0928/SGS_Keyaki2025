import React from 'react'
import { Link } from 'react-router-dom'

export default function Intro9() {
  return (
    <>
        <h1>Are You Ready?</h1>
        <p>これよりかカメラを起動する</p>
        <p>ミッションはマークの破壊とセキュリティの突破だ</p>
        <p>残りの時間制限はこちらからカメラ画面に表示する</p>
        <p>諸君の健闘を祈る</p>
        <Link to='/Playing'>突入！！</Link>
        <Link to='/intro-8'>戻る</Link>
    </>
  )
}