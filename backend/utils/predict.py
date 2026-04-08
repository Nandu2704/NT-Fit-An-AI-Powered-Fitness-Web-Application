import numpy as np
import cv2
from tensorflow.keras.models import load_model

model = load_model("model/body_model.h5")

classes = ['fit', 'average', 'overweight']

def predict_image(frame):
    img = cv2.resize(frame, (224, 224))
    img = img / 255.0
    img = np.reshape(img, (1, 224, 224, 3))

    pred = model.predict(img)
    idx = np.argmax(pred)

    return classes[idx], float(np.max(pred))