import { useState, useEffect } from 'react';
import React, { useEffect, useState } from "react";
// 横画面ゲームに対応すべく、ゲーム開始前に画面の向きを判定するフック

/**
 * 画面の向き ('portrait' | 'landscape' | null) を返すカスタムフック
 * @returns {'portrait' | 'landscape' | null} 画面の向き (初期読み込み時は null)
 */
export function useOrientation() {
  // 初期値は null に設定し、クライアントサイドでのみ判定する
  const [orientation, setOrientation] = useState(null);

  useEffect(() => {
    // マウント時に実行される関数
    const checkOrientation = (event) => {
      // event.matches が true なら portrait (縦)
      if (event.matches) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };

    // (orientation: portrait) にマッチするかどうかを監視するオブジェクト
    const mql = window.matchMedia('(orientation: portrait)');

    // 初回チェック (mql オブジェクトを checkOrientation に渡す)
    // mql オブジェクト自体が event.matches と同じ 'matches' プロパティを持つため
    checkOrientation(mql); 

    // イベントリスナーを登録 (画面の向きが変わったときに checkOrientation を呼ぶ)
    mql.addEventListener('change', checkOrientation);

    // クリーンアップ関数: コンポーネントがアンマウントされた時にリスナーを解除
    return () => {
      mql.removeEventListener('change', checkOrientation);
    };
  }, []); // 空の配列を渡し、マウント時とアンマウント時にのみ実行

  return orientation;
}