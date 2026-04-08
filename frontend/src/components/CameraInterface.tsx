import React, { useState } from "react";

const CameraInterface = () => {
  const [result, setResult] = useState("");

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <h2>Prediction: {result}</h2>
    </div>
  );
};

export default CameraInterface;