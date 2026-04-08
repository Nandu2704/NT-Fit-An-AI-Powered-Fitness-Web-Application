import os
import shutil
import random

dataset_path = "../dataset"   # IMPORTANT (correct path)

classes = ['fit', 'average', 'overweight']

for cls in classes:
    src = os.path.join(dataset_path, cls)

    images = os.listdir(src)
    random.shuffle(images)

    split = int(0.8 * len(images))

    train = images[:split]
    test = images[split:]

    for img in train:
        dst = os.path.join(dataset_path, "train", cls)
        os.makedirs(dst, exist_ok=True)
        shutil.copy(os.path.join(src, img), os.path.join(dst, img))

    for img in test:
        dst = os.path.join(dataset_path, "test", cls)
        os.makedirs(dst, exist_ok=True)
        shutil.copy(os.path.join(src, img), os.path.join(dst, img))

print("Dataset split completed!")