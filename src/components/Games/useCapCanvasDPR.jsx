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
      const cw = canvas.clientWidth || canvas.width || 0;
      const ch = canvas.clientHeight || canvas.height || 0;
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
    };

    // 最初とリサイズ時に調整
    adjust();
    window.addEventListener('resize', adjust);
    // 少し遅らせて再調整（Unityロード直後のリサイズに備える）
    const t = setTimeout(adjust, 500);

    return () => {
      window.removeEventListener('resize', adjust);
      clearTimeout(t);
    };
  }, [cap, maxPx]);
}
// ...existing code...