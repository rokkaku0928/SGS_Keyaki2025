import React from 'react'
import { Link } from 'react-router-dom'

export default function Intro4() {
  return (
    <>
            <h1>intro4</h1>
            <p>マークが壊れると裏からQRコードが露出する（はず）</p>
            <p>そのQRコードがやってほしいことの二つ目になる</p>
            <Link to='/intro-5'>次へ</Link>
            <Link to='/intro-3'>戻る</Link>
        
        
    </>
  )
}