import React, { useEffect, useRef } from 'react';
import styles from "./TargetCamera.module.css";
import jsQR from "jsqr";

function TargetCamera({ playState, setPlayState }) {

  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  // ★ 修正点1: width, heightの強制指定を削除し、カメラ本来の解像度で取得する
  const constraints = {
    audio: false,
    video: {
      facingMode: 'environment', 
      // width: 400, height: 700 はデバイスによって歪む原因になるため削除
    }
  };

  // jsQRの処理を軽くするための最大サイズ
  const MAX_CANVAS_SIZE = 600;

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

        // JS による処理用 OffscreenCanvas (初期サイズは後で上書きするため適当でOK)
        const canvas = new OffscreenCanvas(1, 1);
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        const loop = () => {
          if (!videoRef.current) return;
          const currentVideo = videoRef.current;

          // ★ 修正点2: videoのデータが十分に読み込まれるまで待機
          if (currentVideo.readyState !== currentVideo.HAVE_ENOUGH_DATA) {
            animationId = requestAnimationFrame(loop);
            return;
          }

          // カメラの本来の解像度を取得
          const videoWidth = currentVideo.videoWidth;
          const videoHeight = currentVideo.videoHeight;

          // ★ 修正点3: アスペクト比を保ったまま、長辺がMAX_CANVAS_SIZEになるように縮小率を計算
          const scale = Math.min(MAX_CANVAS_SIZE / Math.max(videoWidth, videoHeight), 1);
          const processW = Math.floor(videoWidth * scale);
          const processH = Math.floor(videoHeight * scale);

          // Canvasのサイズを動的に更新（ここでアスペクト比の歪みがなくなります）
          if (canvas.width !== processW || canvas.height !== processH) {
            canvas.width = processW;
            canvas.height = processH;
          }

          // 描画（正しいアスペクト比のまま低解像度化）
          ctx.drawImage(currentVideo, 0, 0, processW, processH);
          const imageData = ctx.getImageData(0, 0, processW, processH);

          // jsQR で解析 (反転チェックを省くことでさらに高速化)
          const code = jsQR(imageData.data, processW, processH, {
            inversionAttempts: "dontInvert",
          });

          if (code) {
            const resultText = code.data;

            if (resultText !== lastCode) {
              lastCode = resultText;

              // ★ 修正点4: Canvasサイズから元のvideoサイズへ戻すためのスケール係数を計算
              const scaleX = videoWidth / processW;
              const scaleY = videoHeight / processH;

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
  }, [setPlayState]);

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
