
import React, { useEffect, useRef } from 'react';
import styles from "./TargetCamera.module.css";
import jsQR from "jsqr";
import cameraBgm from "../../assets/Project_261018_test2.mp3";

function TargetCamera({ playState, setPlayState }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const audioRef = useRef(null);

  // カメラ設定
  const constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
    }
  };

  // QRコード解析用の最大サイズ
  const MAX_CANVAS_SIZE = 600;

  // 直近に読み取ったコード（連続反応防止）
  let lastCode = null;

  // ---- BGM再生処理 ----
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;

    audio.play().catch((err) => {
      console.log("BGMを再生できませんでした", err);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // ---- 描画用の枠表示 ----
  const drawRect = (topLeft, bottomRight, scaleX, scaleY) => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.style.left = `${topLeft.x * scaleX}px`;
    overlay.style.top = `${topLeft.y * scaleY}px`;
    overlay.style.width =
      `${(bottomRight.x - topLeft.x) * scaleX}px`;
    overlay.style.height =
      `${(bottomRight.y - topLeft.y) * scaleY}px`;
  };

  // ---- カメラ・QRコード読み取り処理 ----
  useEffect(() => {
    let stream;
    let animationId;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = videoRef.current;

        if (!video) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        video.srcObject = stream;
        await video.play();

        const canvas = new OffscreenCanvas(1, 1);
        const ctx = canvas.getContext("2d", {
          willReadFrequently: true
        });

        const loop = () => {
          if (!videoRef.current) return;

          const currentVideo = videoRef.current;

          if (
            currentVideo.readyState !==
            currentVideo.HAVE_ENOUGH_DATA
          ) {
            animationId = requestAnimationFrame(loop);
            return;
          }

          const videoWidth = currentVideo.videoWidth;
          const videoHeight = currentVideo.videoHeight;

          const scale = Math.min(
            MAX_CANVAS_SIZE /
              Math.max(videoWidth, videoHeight),
            1
          );

          const processW = Math.floor(videoWidth * scale);
          const processH = Math.floor(videoHeight * scale);

          if (
            canvas.width !== processW ||
            canvas.height !== processH
          ) {
            canvas.width = processW;
            canvas.height = processH;
          }

          ctx.drawImage(
            currentVideo,
            0,
            0,
            processW,
            processH
          );

          const imageData = ctx.getImageData(
            0,
            0,
            processW,
            processH
          );

          const code = jsQR(
            imageData.data,
            processW,
            processH,
            {
              inversionAttempts: "dontInvert",
            }
          );

          if (code) {
            const resultText = code.data;

            if (resultText !== lastCode) {
              lastCode = resultText;

              const scaleX = videoWidth / processW;
              const scaleY = videoHeight / processH;

              drawRect(
                code.location.topLeftCorner,
                code.location.bottomRightCorner,
                scaleX,
                scaleY
              );

              // ゲーム画面への状態遷移
              if (resultText.startsWith("game-")) {
                const num = Number(
                  resultText.split("-")[1]
                );

                if (num >= 1 && num <= 9) {
                  setPlayState(num);
                }
              }
            }
          }

          animationId = requestAnimationFrame(loop);
        };

        loop();

      } catch (err) {
        console.log("camera error", err);
      }
    })();

    // クリーンアップ
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      console.log("カメラと処理を停止しました");
    };
  }, [setPlayState]);

  return (
    <>
      {/* カメラ画面表示中のBGM */}
      <audio
        ref={audioRef}
        src={cameraBgm}
        loop
        preload="auto"
      />

      <div className={styles.CameraPosition}>
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          style={{
            position: "absolute",
            zIndex: 3
          }}
        />

        <div
          id="overlay"
          ref={overlayRef}
          className={styles.CameraAim}
        />
      </div>
    </>
  );
}

export default TargetCamera;
