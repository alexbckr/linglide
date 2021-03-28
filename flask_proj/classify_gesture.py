import keras
from cv2 import cv2
import numpy as np
from keras.preprocessing.image import img_to_array
import imutils
import os
from scipy.stats import mode
import requests
from ximilar.client import RecognitionClient
import time
import random

font = cv2.FONT_HERSHEY_SIMPLEX

frame = 0
results = []
result = "/"

def classify_gesture(img):
    img = cv2.flip(img, 1)
    top, right, bottom, left = 75, 350, 300, 590
    roi = img[top:bottom, right:left]
    cv2.imwrite('imageSubject.png', roi)

    client = RecognitionClient(token='683411a7267ab8328c925eb0ea8e7d0767f5e2c2')

    task, status = client.get_task(task_id='3a234e5c-9a1b-4e53-b4d6-dae7c18a19d4')

    # you can send image in _file, _url or _base64 format
    # the _file format is intenally converted to _base64 as rgb image
    result = task.classify([{'_file': 'imageSubject.png'}])

    # the result is in json/dictionary format and you can access it in following way:
    best_label = result['records'][0]['best_label']
    name = best_label["name"]
    prob = best_label["prob"]
    if prob > 0.5 and name != 'negative':
        cv2.imwrite('croppeds/' + str(random.randint(1111,9999)) + '_' + name + '.png', roi)
        return name
    return None

    
    