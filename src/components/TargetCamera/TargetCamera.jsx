import React, { useEffect, useRef } from 'react';
import styles from "./TargetCamera.module.css";
import jsQR from "jsqr";

function TargetCamera({ playState, setPlayState }) {

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  const constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
      // ここはブラウザに任せて最適な解像度を選ばせる（モバイルでの柔軟性のため）
      width: { ideal: 1280 },
      height: { ideal: 720 },
    }
  };

  const drawRect = (topLeft, bottomRight, canvasWidth, canvasHeight) => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!overlay || !video || !container) return;

    const vRect = video.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    const scaleX = vRect.width / canvasWidth;
    const scaleY = vRect.height / canvasHeight;

    const x1 = topLeft.x * scaleX + (vRect.left - cRect.left);
    const y1 = topLeft.y * scaleY + (vRect.top - cRect.top);
    const w = (bottomRight.x - topLeft.x) * scaleX;
    const h = (bottomRight.y - topLeft.y) * scaleY;

    overlay.style.left = `${x1}px`;
    overlay.style.top = `${y1}px`;
    overlay.style.width = `${w}px`;
    overlay.style.height = `${h}px`;
    overlay.style.display = 'block';
  };

  useEffect(() => {
    let stream = null;
    let timer = null;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = videoRef.current;
        if (!video) return;

        video.srcObject = stream;
        await video.play();

        // 動的キャンバス：実際のビデオ解像度に合わせる
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const setupCanvasSize = () => {
          // video.videoWidth/Height は再生開始後に正しい値になる
          const vw = video.videoWidth || video.clientWidth;
          const vh = video.videoHeight || video.clientHeight;
          canvas.width = vw;
          canvas.height = vh;
        };

        setupCanvasSize();

        // ウィンドウリサイズ時はキャンバス/オーバーレイをリセット
        const handleResize = () => {
          setupCanvasSize();
          const overlay = overlayRef.current;
          if (overlay) overlay.style.display = 'none';
        };
        window.addEventListener('resize', handleResize);

        timer = setInterval(() => {
          if (!video || video.readyState < 2) return;

          // canvasサイズが変わっていれば更新
          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            setupCanvasSize();
          }

          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          const resultEl = document.querySelector('#result');

          if (code) {
            if (resultEl) {
              resultEl.textContent = code.data;
            }
            drawRect(code.location.topLeftCorner, code.location.bottomRightCorner, canvas.width, canvas.height);

            switch (code.data) {
              case 'game-1':
                setPlayState(1);
                break;
              case 'game-2':
                setPlayState(2);
                break;
              case 'game-3':
                setPlayState(3);
                break;
              case 'game-4':
                setPlayState(4);
                break;
              default:
                break;
            }
          } else {
            if (resultEl) {
              resultEl.textContent = 'No QR code detected';
            }
            const overlay = overlayRef.current;
            if (overlay) overlay.style.display = 'none';
          }
        }, 300);

        // クリーンアップにリサイズリスナーも含める
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.log('load error', error);
      }
    })();

    return () => {
      if (timer) clearInterval(timer);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [setPlayState]);

  return (
    <>
      <div id="result" style={{ minHeight: '20px' }}></div>
      <div ref={containerRef} className={styles.CameraPosition}>
        <video
          ref={videoRef}
          className={styles.VideoElement}
          playsInline
          autoPlay
          muted
        />
        <div
          id="overlay"
          ref={overlayRef}
          className={styles.CameraAim}
          style={{ display: 'none' }}
        ></div>
      </div>
    </>
  );
}

export default TargetCamera;