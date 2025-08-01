import React from 'react'
import { Link } from 'react-router-dom'

export default function Intro5() {
  return (
    <>
            <h1>Intro5</h1>
            <p>QRコードを読むとシステムが侵入者を検知、</p>
            <p>即座にセキュリティが発動する</p>
            <Link to='/intro-6'>次へ</Link>
            <Link to='/intro-4'>戻る</Link>
        
        
    </>
  )
}