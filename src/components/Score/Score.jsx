
import React from "react";

import key1 from "../../assets/key/key1.png";
import key2 from "../../assets/key/key2.png";
import key3 from "../../assets/key/key3.png";
import key4 from "../../assets/key/key4.png";
import key5 from "../../assets/key/key5.png";
import key6 from "../../assets/key/key6.png";
import key7 from "../../assets/key/key7.png";
import key8 from "../../assets/key/key8.png";
import key9 from "../../assets/key/key9.png";

import lockedKeyImageSrc from "../../assets/KeyShadow.png";
import styles from "./Score.module.css";

const keyImages = {
  1: key1,
  2: key2,
  3: key3,
  4: key4,
  5: key5,
  6: key6,
  7: key7,
  8: key8,
  9: key9,
};

export default function Score({ collectedKeys = [] }) {
  // 空欄は獲得回数に応じて減らす
  const remainingKeys = Math.max(
    0,
    9 - collectedKeys.length
  );

  return (
    <div className={styles.KeyBar}>
      {/* 獲得した鍵をすべて表示。重複もOK */}
      {collectedKeys.map((keyNumber, index) => {
        const image = keyImages[keyNumber];

        if (!image) return null;

        return (
          <img
            key={`collected-${index}`}
            src={image}
            width="50"
            height="60"
            alt={`鍵${keyNumber}`}
            className="w-12 h-12 object-contain"
          />
        );
      })}

      {/* 未獲得の鍵の空欄を表示 */}
      {Array.from({ length: remainingKeys }).map(
        (_, index) => (
          <img
            key={`locked-${index}`}
            src={lockedKeyImageSrc}
            width="50"
            height="60"
            alt="未取得の鍵"
            className="w-12 h-12 object-contain"
          />
        )
      )}
    </div>
  );
}
