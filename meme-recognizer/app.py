from flask import Flask
from flask import request

import os
import io
import PIL
import base64
import json
import torch
import tarfile
from torchvision import transforms
import torch.nn.functional as F

app = Flask(__name__)

cwd = os.getcwd()
UPLOAD_FOLDER = os.path.join(cwd, 'static')
MODEL = None 
CLASSES = None

preprocess = transforms.Compose([
    transforms.Resize(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def load_model():
    tar = tarfile.open(os.path.join(cwd, "model_artifacts/model.tar.gz"), mode="r:gz")
    for member in tar.getmembers():
        if member.name.endswith(".txt"):
            # print("Classes file is :", member.name)
            f=tar.extractfile(member)
            CLASSES = f.read().decode('utf-8').splitlines()
            # print(CLASSES)
        if member.name.endswith(".pth"):
            # print("Model file is :", member.name)
            f=tar.extractfile(member)
            # print("Loading PyTorch model")
            MODEL = torch.jit.load((io.BytesIO(f.read())), map_location=torch.device('cpu')).eval()
    return MODEL, CLASSES

def get_pred(img_path, model):
    img = PIL.Image.open(img_path)
    img_tensor = preprocess(img)
    img_tensor = img_tensor.unsqueeze(0)
    preds = F.softmax(model(img_tensor), dim=1)
    conf_score, indx = torch.max(preds, dim=1) 
    return conf_score.item(), indx 

@app.route("/", methods=["GET", "POST"])
def predict_api():
    response = {"status": "Failed!"}
    if request.method == "POST":
        image_file = request.files['file']
        if image_file:
            image_location = os.path.join(
                UPLOAD_FOLDER, 
                'img.jpg'
            )
            image_file.save(image_location)
            conf_score, pred = get_pred(image_location, MODEL)
            response['status'] = "Success!"
            response["pred"] = CLASSES[pred]
            response['conf_score'] = conf_score
            
            return {
                "body": json.dumps(response)
            }
    return response

if __name__=="__main__":
    MODEL, CLASSES = load_model()
    app.run(debug=True)
    predict_api()