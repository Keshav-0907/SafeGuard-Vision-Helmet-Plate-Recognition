import cv2
import numpy as np
import easyocr

frameWidth = 640    # Frame Width
frameHeight = 480   # Frame Height

plateCascade = cv2.CascadeClassifier("./haarcascade_russian_plate_number.xml")
minArea = 500

cap = cv2.VideoCapture(0)
cap.set(3, frameWidth)
cap.set(4, frameHeight)
cap.set(10, 150)
count = 0

reader = easyocr.Reader(['en'])  # Initialize EasyOCR for English text

skip_frames = 10  # Process every 10th frame
frame_counter = 0

detected_plates = []  # Array to store detected plates

while True:
    success, img = cap.read()
    frame_counter += 1

    if frame_counter % skip_frames != 0:
        continue  # Skip frames to reduce processing frequency

    if not success:
        break

    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    numberPlates = plateCascade.detectMultiScale(imgGray, 1.1, 4)

    for (x, y, w, h) in numberPlates:
        area = w * h
        if area > minArea:
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            imgRoi = img[y:y + h, x:x + w]

            # Perform OCR on the number plate region
            result = reader.readtext(cv2.cvtColor(imgRoi, cv2.COLOR_BGR2RGB))

            if result:
                text = result[0][1]  # Extracting text from the result
                print("Detected Plate Number:", text)

                # Check if the detected plate is not already present in the array
                if text not in detected_plates:
                    detected_plates.append("Number Plate" : text)
                    # Add your further actions here for the newly detected plate
                    # For example, displaying the plate on the image
                    cv2.putText(img, text, (x, y - 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Result", img)
    key = cv2.waitKey(1)
    if key & 0xFF == ord('s'):
        cv2.imwrite("./" + str(count) + ".jpg", imgRoi)
        count += 1
    elif key & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()