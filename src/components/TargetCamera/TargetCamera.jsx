import React, { useEffect, useRef } from 'react';
import styles from "./TargetCamera.module.css";
import jsQR from "jsqr";

function TargetCamera({playState, setPlayState }) {

  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  const constraints = {
    audio: false, 
    video: {
      facingMode: 'environment', 
      width: 400, 
      height: 700, 
    }
  };

  const drawRect = (topLeft, bottomRight) => {
    const { x: x1, y: y1 } = topLeft;
    const { x: x2, y: y2 }= bottomRight;

    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.left = `${x1}px`;
      overlay.style.top = `${y1}px`;
      overlay.style.width = `${x2 - x1}px`;
      overlay.style.height = `${y2 - y1}px`;
    }
  };


  useEffect(() => {

    let stream; // クリーンアップ関数でアクセスできるようにするため、外で宣言
    let timer;  // こちらも同様

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints); // 変数に代入
        const video = videoRef.current;
        
        if (video) {
          video.srcObject = stream;
          await video.play();

          const { width, height } = constraints.video;
          const canvas = new OffscreenCanvas(width, height);
          const context = canvas.getContext('2d');

          timer = setInterval(() => { // 変数に代入
            if (!videoRef.current) return; // 念のためチェック

            context.drawImage(video, 0, 0, width, height);
            const imageData = context.getImageData(0, 0, width, height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            const resultEl = document.querySelector('#result');

            if (code) {
              if (resultEl) { // 要素が存在するかチェックしてから操作する
                drawRect(code.location.topLeftCorner, code.location.bottomRightCorner);
                resultEl.textContent = code.data;
              }

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
                case 'game-5':
                  setPlayState(5);
                  break;
                case 'game-7':
                  setPlayState(7);
                  break;
                default:
                  break;
              }
            } else {
              if (resultEl) { // 要素が存在するかチェックしてから操作する
                resultEl.textContent = 'No QR code detected';
              }
            }
          }, 300);
        }
      } catch (error) {
        console.log('load error', error);
      }
    })();

    // --- ここがクリーンアップ関数です ---
    // コンポーネントがアンマウントされる（画面から消える）時に実行されます
    return () => {
      console.log("カメラとタイマーをクリーンアップします。");
      if (timer) {
        clearInterval(timer); // タイマーを停止
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // カメラストリームを停止
      }
    };
  }, []);

  return (
    <>
      <div id="result" style={{ minHeight: '20px' }}></div>
      <div>
        <div className={styles.CameraPosition}>
          <video ref={videoRef} style={{ position: 'absolute', zIndex: 3 }} playsInline autoPlay muted></video>
          <div
            id="overlay"
            ref={overlayRef}
            className={styles.CameraAim}
          ></div>
        </div>
      </div>
    </>
  )
}

export default TargetCamera