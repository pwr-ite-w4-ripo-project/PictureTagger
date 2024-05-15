# forces tf to not log anything
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# from tensorflow import _logging
# _logging.disable()

import sys
from ModelWrappers.DoModelWrapper import D0ModelWrapper
from MediaHandlers.ImageHandler import ImageHandler
from FrameHandlers.ObjectDetector import ObjectDetector
from typeAliases import RgbImage
import firebase_admin
from firebase_admin import credentials, storage
from tensorflow import io, keras
from numpy import array

if len(sys.argv) < 7:
    raise Exception("Insufficient number of cli arguments.")

BUCKET = "picturetagger-94c93.appspot.com"

mime = sys.argv[1]
inputFile = sys.argv[2]
firebaseCredentials = sys.argv[3]
outputFile = sys.argv[4]
modelPath = sys.argv[5]
treshold = float(sys.argv[6])

print(f"ofile: {outputFile}")

cred = credentials.Certificate(firebaseCredentials)
firebase_admin.initialize_app(cred, { "storageBucket" : BUCKET})
def loadFromFirebase(path: str) -> RgbImage:
    bucket = storage.bucket()
    blob = bucket.blob(path)
    return array(
            io.decode_image(
                array(blob.download_as_bytes()), channels=3
            ), 
            dtype="uint8"
        )

def writeToFirebase(path: str, file):
    bucket = storage.bucket()
    blob = bucket.blob(path)
    blob.upload_from_string(file)

modelWrapper = D0ModelWrapper(modelPath)
frameHandler = ObjectDetector(modelWrapper, treshold)
mediaHandler = ImageHandler(frameHandler) if mime == "image" else None
labels = mediaHandler.handle(loadFromFirebase(inputFile))
print(labels)

fileContents = ""
for label in labels:
    fileContents += f"{label}\n"
# writeToFirebase(outputFile, fileContents)
with open(outputFile, "a") as ofile:
    ofile.write(fileContents)