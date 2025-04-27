"use client";

import DarkMode from "@/components/dark-mode";
import { TableData } from "@/components/table-data";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prediction, setPrediction] = useState<{
    class: string;
    confidence: number;
  } | null>(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    });
  }, []);

  const captureAndSend = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, 128, 128);
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      const res = await fetch("http://localhost:4000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data, "data");
      setPrediction(data);
    }, "image/jpeg");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (streaming) captureAndSend();
    }, 1000);

    return () => clearInterval(interval);
  }, [streaming]);

  return (
    <div className="p-8 w-full h-full items-center justify-center text-center space-y-4 relative">
      <DarkMode />
      <div>
        <h1 className="text-xl font-normal font-mono mb-4">
          Live Driver Behavior Detector
        </h1>
        <video
          ref={videoRef}
          width={512}
          height={512}
          className="mx-auto rounded-md border-2 border-accent shadow-md"
        />
        <canvas ref={canvasRef} width={128} height={128} className="hidden" />
        {prediction && (
          <TableData
            classBehavior={prediction.class}
            confidence={prediction.confidence}
          />
        )}
      </div>
    </div>
  );
}
