import React, { useRef, useState } from "react";

const Analysis = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  // 📁 Upload
  const handleUpload = (e: any) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) return alert("Upload image first");

    const formData = new FormData();
    formData.append("file", image);

    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  // 🎥 Start Camera
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // 📸 Capture
  const captureFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx?.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    }, "image/jpeg");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>AI Body Analysis</h1>

      {/* Upload */}
      <h2>Upload Image</h2>
      <input type="file" onChange={handleUpload} />
      <br /><br />
      <button onClick={uploadImage}>Predict Image</button>

      <hr style={{ margin: "30px 0" }} />

      {/* Camera */}
      <h2>Live AI Detection</h2>

      {/* ✅ IMPORTANT FIX */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "400px",
          height: "300px",
          backgroundColor: "black",
          borderRadius: "10px"
        }}
      />

      <br /><br />

      {/* ✅ BUTTON FIX */}
      <button onClick={startCamera} style={{ marginRight: "10px" }}>
        Start Camera
      </button>

      <button onClick={captureFrame}>
        Capture & Predict
      </button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Result */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Prediction: {result.prediction}</h2>
          <h3>Confidence: {(result.confidence * 100).toFixed(2)}%</h3>
        </div>
      )}
    </div>
  );
};

export default Analysis;