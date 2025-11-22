import React, { useEffect, useRef } from 'react';
import styles from "./TargetCamera.module.css";
import jsQR from "jsqr";

function TargetCamera({ playState, setPlayState }) {

  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  // ★ カメラは高解像度のまま（表示用）
  const constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
      width: 1080,
      height: 1920,
    }
  };

  // ---- 低解像度で QR 処理（高速化のコア） ----
  const PROCESS_W = 640;
  const PROCESS_H = 360;

  // 直近に読み取ったコード（連続反応防止）
  let lastCode = null;

  // ---- 描画用の枠表示（位置補正済み） ----
  const drawRect = (topLeft, bottomRight, scaleX, scaleY) => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.style.left = `${topLeft.x * scaleX}px`;
    overlay.style.top = `${topLeft.y * scaleY}px`;
    overlay.style.width = `${(bottomRight.x - topLeft.x) * scaleX}px`;
    overlay.style.height = `${(bottomRight.y - topLeft.y) * scaleY}px`;
  };

  useEffect(() => {
    let stream;
    let animationId;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = videoRef.current;
        
        if (!video) return;

        video.srcObject = stream;
        await video.play();

        // JS による処理用 OffscreenCanvas（低解像度）
        const canvas = new OffscreenCanvas(PROCESS_W, PROCESS_H);
        const ctx = canvas.getContext("2d");

        const loop = () => {
          if (!videoRef.current) return;

          // 描画（低解像度）
          ctx.drawImage(video, 0, 0, PROCESS_W, PROCESS_H);
          const imageData = ctx.getImageData(0, 0, PROCESS_W, PROCESS_H);

          // jsQR で解析
          const code = jsQR(imageData.data, PROCESS_W, PROCESS_H);

          if (code) {
            const resultText = code.data;

            // 同じコード連続読み取り防止
            if (resultText !== lastCode) {
              lastCode = resultText;

              // 表示解像度への補正係数
              const scaleX = video.videoWidth / PROCESS_W;
              const scaleY = video.videoHeight / PROCESS_H;

              drawRect(code.location.topLeftCorner, code.location.bottomRightCorner, scaleX, scaleY);

              // state 遷移
              if (resultText.startsWith("game-")) {
                const num = Number(resultText.split("-")[1]);
                if (num >= 1 && num <= 8) {
                  setPlayState(num);
                }
              }
            }
          }

          // ★ 高速ループ（FPS改善）
          animationId = requestAnimationFrame(loop);
        };

        loop();

      } catch (err) {
        console.log("camera error", err);
      }
    })();

    // ---- クリーンアップ ----
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (stream) stream.getTracks().forEach(t => t.stop());
      console.log("カメラと処理を停止しました");
    };
  }, []);

  return (
    <>
      <div className={styles.CameraPosition}>
        <video ref={videoRef} playsInline autoPlay muted style={{ position: "absolute", zIndex: 3 }}></video>
        <div id="overlay" ref={overlayRef} className={styles.CameraAim}></div>
      </div>
    </>
  );
}

export default TargetCamera;
