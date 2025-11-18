// ...existing code...
import { useEffect } from 'react';

/**
 * canvas の実ピクセルサイズを devicePixelRatio の上限で制限する
 * cap: 最大DPR（例: 2）
 */
export default function useCapCanvasDPR(cap = 2, maxPx = 4096) {
  useEffect(() => {
    const adjust = () => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      // 親コンテナのサイズ（CSS上のサイズ）を使う
      const rect = canvas.getBoundingClientRect();
      const cw = Math.max(1, Math.round(rect.width));
      const ch = Math.max(1, Math.round(rect.height));
      if (cw === 0 || ch === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, cap);
      const targetW = Math.round(cw * dpr);
      const targetH = Math.round(ch * dpr);
      // 上限を掛けて巨大化を防ぐ
      const finalW = Math.min(targetW, maxPx);
      const finalH = Math.min(targetH, maxPx);
      if (canvas.width !== finalW || canvas.height !== finalH) {
        canvas.width = finalW;
        canvas.height = finalH;
      }
      // CSS サイズは親コンテナに合わせておく（アスペクト比を保って縮小表示される）
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
    };

    // 最初とリサイズ時に調整
    adjust();
    window.addEventListener('resize', adjust);
    // Unityロード直後の変化に備える
    const t = setTimeout(adjust, 500);

    return () => {
      window.removeEventListener('resize', adjust);
      clearTimeout(t);
    };
  }, [cap, maxPx]);
}
// ...existing code...