# 🚗 Driver Behavior Detection

A real-time driver behavior detection app using a webcam feed in the browser and a TensorFlow CNN model served via a Flask API.

## 📦 Tech Stack

- 🧠 TensorFlow (MobileNetV2, CNN)
- 🧪 Flask (image classification API)
- 💻 Next.js 14 (App Router)
- 🎥 WebRTC + Canvas (webcam frame capture)
- 🎨 Tailwind CSS + shadcn/ui (UI components)

## ⚙️ How It Works

1. User opens the web app and allows webcam access.
2. Frames are captured from the webcam every second.
3. Each frame is sent to the Flask API (`/predict`).
4. The model predicts the driver behavior:
   - `safe_driving`, `talking_phone`, `texting_phone`, etc.
5. The predicted class and confidence are shown live.

## 🚀 Getting Started

### 1. Backend (Flask + Model)

```bash
cd api
python3 -m venv tf-env
source tf-env/bin/activate
pip install -r requirements.txt
python driver_behavior_model.py
python app.py
```

- Make sure `driver_behavior_model.h5` is in the `api/` folder.

### 2. Frontend (Next.js)

```bash
cd ui
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and watch real-time predictions.

## 📁 Dataset

Model trained on a custom dataset with 5 behavior classes:

- `safe_driving`
- `texting_phone`
- `talking_phone`
- `turning`
- `other_activities`

## 🛡️ Notes

- Only JPEG/PNG images are accepted
- CORS enabled for `http://localhost:3000`
- Prediction runs every 1 second from browser
