import React from 'react'
import unlockedKeyImageSrc from '../../assets/Key.png';
import lockedKeyImageSrc from '../../assets/KeyShadow.png';
import styles from "./Score.module.css"

const UnlockedKeyIcon = () => (
  <img src={unlockedKeyImageSrc} width="50" height="60" alt="Unlocked Key" className="w-12 h-12 object-contain justify-center" />
);

// LOCKED KEY COMPONENT
// スコアがまだ達成されていない状態の鍵アイコン（シルエット）
const LockedKeyIcon = () => (
  <img src={lockedKeyImageSrc} width="50" height="60" alt="Locked Key" className="w-12 h-12 object-contain justify-center" />
);

export default function Score({ score, total }) {
  return (
    <div className={styles.KeyBar}>
      {/* totalの数だけループして鍵アイコンを生成 */}
      {Array.from({ length: total }).map((_, index) => {
        // インデックスが現在のスコアより小さい場合はアンロックされた鍵を表示
        if (index < score) {
          return <UnlockedKeyIcon key={index} />;
        }
        // そうでなければロックされた鍵（シルエット）を表示
        return <LockedKeyIcon key={index} />;
      })}
    </div>
  )
}
