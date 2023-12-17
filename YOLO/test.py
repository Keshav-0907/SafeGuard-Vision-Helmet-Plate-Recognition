import cv2
from inference import Stream
import supervision as sv
import numpy as np
import easyocr
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import base64
from datetime import datetime

annotator = sv.BoxAnnotator()

cred = credentials.Certificate('./number-plate-31b93-firebase-adminsdk-hrqbg-0b72e0925f.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://number-plate-31b93-default-rtdb.firebaseio.com'
})

frameWidth = 640
frameHeight = 480

plateCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_russian_plate_number.xml')
minArea = 500

cap = cv2.VideoCapture(0)
cap.set(3, frameWidth)
cap.set(4, frameHeight)
cap.set(10, 150)
count = 0

reader = easyocr.Reader(['en'])

detected_plates = []

ref = db.reference('/detected_helmets')

def render(predictions, image):
    success, img = cap.read()

    if not success:
        return

    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    numberPlates = plateCascade.detectMultiScale(imgGray, 1.1, 4)

    for (x, y, w, h) in numberPlates:
        area = w * h
        if area > minArea:
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            imgRoi = img[y:y + h, x:x + w]

            result = reader.readtext(cv2.cvtColor(imgRoi, cv2.COLOR_BGR2RGB))

            if result:
                text = result[0][1]
                print("Detected Plate Number:", text)

                if text not in detected_plates:
                    _, img_encoded = cv2.imencode('.jpg', imgRoi)
                    img_base64 = base64.b64encode(img_encoded).decode('utf-8')

                    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                    detected_plates.append({
                        "Number Plate": text,
                        "Image": img_base64,
                        "Timestamp": current_time
                    })
                    ref.set(detected_plates)

                    cv2.putText(img, text, (x, y - 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    if predictions:
        for prediction in predictions.get('predictions', []):
            if prediction.get('class') == 'no_helmet':
                print("Detected 'no_helmet' class in predictions!")

    image = annotator.annotate(
        scene=image, detections=sv.Detections.from_roboflow(predictions)
    )

    cv2.imshow("Prediction", image)
    cv2.waitKey(1)

Stream(
    source="rtsp://[2401:4900:81e7:53e3::a8]:8080/h264_opus.sdp", 
    model="bike-helmet-89gsl/3",
    output_channel_order="BGR",
    use_main_thread=True,
    on_prediction=render,
    api_key="cuHytvxamVfmFanYQzFp",
)
