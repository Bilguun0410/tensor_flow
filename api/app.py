from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

model = load_model("driver_behavior_model.h5")

# Match your dataset class names
CLASS_NAMES = ['other_activities', 'safe_driving', 'talking_phone', 'texting_phone', 'turning']

def preprocess_image(img_bytes):
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize((128, 128))
    img_array = image.img_to_array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    img_bytes = request.files['file'].read()
    img_tensor = preprocess_image(img_bytes)

    preds = model.predict(img_tensor)[0]
    pred_idx = np.argmax(preds)
    
    result = {
        "class": CLASS_NAMES[pred_idx],
        "confidence": round(float(preds[pred_idx]), 4)
    }
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)