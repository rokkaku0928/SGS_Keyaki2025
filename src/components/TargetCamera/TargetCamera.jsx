import React, { useEffect, useRef } from 'react';
import styles from "./TargetCamera.module.css";
import { useNavigate } from 'react-router-dom';
import jsQR from "jsqr";

function TargetCamera() {

  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();


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
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();

        const { width, height } = constraints.video;
        const canvas = new OffscreenCanvas(width, height);
        const context = canvas.getContext('2d');

        const timer = setInterval(() => {
          context.drawImage(video, 0, 0, width, height);
          const imageData = context.getImageData(0, 0, width, height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          const resultEl = document.querySelector('#result');

          if (code) {
            drawRect(code.location.topLeftCorner, code.location.bottomRightCorner);
            resultEl.textContent = code.data;
          } else if (code && code.data === 'game-2') {
            drawRect(code.location.topLeftCorner, code.location.bottomRightCorner);
            navigate("/Game2", { replace: true});
          } else if (code && code.data === "game-3") {
            drawRect(code.location.topLeftCorner, code.location.bottomRightCorner);
            navigate("/Game3", { replace: true});
          } else if (code && code.data === 'game-1') {
            drawRect(code.location.topLeftCorner, code.location.bottomRightCorner);
            navigate("/Game1", { replace: true});
          } else {
            resultEl.textContent = '';
          }
        }, 300);
      } catch (error) {
        console.log('load error', error);
      }
    })();
  }, []);


  return (
    <>
      <div id="result" style={{ minHeight: '20px' }}></div>
      <div>
        <div className={styles.CameraPosition}>
          <video ref={videoRef} style={{ position: 'absolute' }}></video>
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