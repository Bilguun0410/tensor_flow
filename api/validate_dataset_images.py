from PIL import Image
import os

DATASET_PATH = "dataset"
VALID_EXTS = (".jpg", ".jpeg", ".png", ".bmp", ".gif")

def is_valid_image(path):
    try:
        img = Image.open(path)
        img.verify()  # Check corruption
        return True
    except Exception:
        return False

def clean_dataset():
    removed = 0
    for root, _, files in os.walk(DATASET_PATH):
        for file in files:
            path = os.path.join(root, file)
            if not file.lower().endswith(VALID_EXTS) or not is_valid_image(path):
                print(f"❌ Removing invalid/corrupt file: {path}")
                os.remove(path)
                removed += 1
    print(f"✅ Done! Removed {removed} bad files.")

if __name__ == "__main__":
    clean_dataset()