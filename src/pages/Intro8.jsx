import React from 'react'
import { Link } from 'react-router-dom'

export default function Intro8() {
  return (
    <>
        <h1>Intro8</h1>
        <p>何せセキュリティが多いものでな...</p>
        <p>破壊した数に応じて報酬をだそう</p>
        <p>そうそう、部屋には時間制限がある</p>
        <p>それを超えるとゲームオーバーとなるので</p>
        <p>必ず時間制限内に部屋から脱出してくれ</p>
        <Link to='/intro-9'>次へ</Link>
        <Link to='/intro-7'>戻る</Link>
    </>
  )
}