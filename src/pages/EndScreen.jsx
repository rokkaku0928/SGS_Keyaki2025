import React from 'react'
import styles from './EndScreen.module.css'

function EndScreen({ title, message, score, design }) {
// design prop ('modern', 'retro'など) を styles オブジェクトから動的に取得
  // ${styles.endscreenContainer} と ${styles[design]} の2つのクラスを適用
  const containerClass = `${styles.endscreenContainer} ${styles[design]}`;
  return (
    <div className={containerClass}>
      <div className={styles.endscreenContent}>
        <h1 className={styles.endscreenTitle}>{title}</h1>
        <p className={styles.endscreenScore}>
          Score: <span>{score}</span>
        </p>
        <p className={styles.endscreenMessage}>{message}</p>
      </div>
    </div>
  )
}

export default EndScreen