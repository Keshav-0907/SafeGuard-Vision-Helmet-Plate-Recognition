import cv2
import inference
import supervision as sv

annotator = sv.BoxAnnotator()

def render(predictions, image):
    for prediction in predictions.get('predictions', []):
        if prediction.get('class') == 'no_helmet':
            print("NO HELMET DETECTED")
            break
        if prediction.get('class') == 'helmet':
            print("Helmet Present")

    image = annotator.annotate(
        scene=image, detections=sv.Detections.from_roboflow(predictions)
    )

    cv2.imshow("Prediction", image)
    cv2.waitKey(1)

inference.Stream(
    source="rtsp://[2401:4900:81e7:53e3::4c]:8080/h264_opus.sdp", 
    model="bike-helmet-89gsl/3",
    output_channel_order="BGR",
    use_main_thread=True,
    on_prediction=render,
    api_key="cuHytvxamVfmFanYQzFp",
)
