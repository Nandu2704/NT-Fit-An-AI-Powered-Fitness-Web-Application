import cv2
from utils.predict import predict_image

def generate_frames():
    cap = cv2.VideoCapture(0)

    while True:
        success, frame = cap.read()
        if not success:
            break

        label, conf = predict_image(frame)

        text = f"{label} ({conf:.2f})"

        cv2.putText(frame, text, (10, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1,
                    (0, 255, 0), 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')