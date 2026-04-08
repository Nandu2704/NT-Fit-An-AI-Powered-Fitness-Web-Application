from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet50 import preprocess_input
import shutil
import os

# ✅ Create FastAPI app
app = FastAPI()

# ✅ ENABLE CORS (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load trained model
model = load_model("model/body_model.h5")

# ✅ Class labels (must match training order)
classes = ['fit', 'average', 'overweight']


# ✅ Image preprocessing function
def preprocess_image(path):
    img = cv2.imread(path)

    if img is None:
        raise ValueError("Image not loaded properly")

    img = cv2.resize(img, (224, 224))

    # 🔥 IMPORTANT FIX
    img = preprocess_input(img)

    img = np.expand_dims(img, axis=0)

    return img


# ✅ API endpoint
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Save uploaded image
        file_path = "temp.jpg"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Preprocess
        img = preprocess_image(file_path)

        # Predict
        pred = model.predict(img)

        print("Raw Prediction:", pred)

        # Get label + confidence
        label = classes[np.argmax(pred)]
        confidence = float(np.max(pred))

        return {
            "prediction": label,
            "confidence": confidence
        }

    except Exception as e:
        return {"error": str(e)}