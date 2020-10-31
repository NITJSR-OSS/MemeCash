import numpy as np
import flask
from flask import Flask, render_template, request, send_from_directory
from keras.models import load_model
import cv2
import keras
# from gevent.pywsgi import WSGIServer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten
from tensorflow.keras.layers import Conv2D, MaxPooling2D

COUNT = 0
IMG_SIZE = 255 
CATEGORIES = ["meme", "not_meme"]

# Model Creation
model = Sequential()
model.add(Conv2D(256, kernel_size=(5, 5), strides=(2,2), input_shape=(IMG_SIZE, IMG_SIZE,1)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(4, 4)))
model.add(Conv2D(256, kernel_size=(5, 5), strides=(2,2)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(4, 4)))
model.add(Dropout(0.5))
model.add(Flatten())
# model.add(Dropout(0.5))
model.add(Dense(64))
# model.add(Dropout(0.5))
model.add(Dense(1))
model.add(Activation('sigmoid'))
model.compile(loss='binary_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

model.load_weights('static/model.h5')


app = Flask(__name__)
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 1

def img_preprocess(filepath):
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)  
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE)) 
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1) 


@app.route('/')
def man():
    return render_template('index.html')


@app.route('/home', methods=['POST'])
def home():
    global COUNT
    img = request.files['image']
    img.save('static/{}.jpg'.format(COUNT))

    img_path= 'static/{}.jpg'.format(COUNT)
    img_arr = [img_preprocess(img_path)]
    prediction = model.predict(img_arr)
    preds = CATEGORIES[int(prediction[0][0])]

    COUNT += 1
    return render_template('prediction.html', data=preds)

@app.route('/prediction', methods=['POST'])
def predict():
    global COUNT
    img = request.files['image']
    img.save('static/{}.jpg'.format(COUNT))

    img_path= 'static/{}.jpg'.format(COUNT)
    img_arr = [img_preprocess(img_path)]
    prediction = model.predict(img_arr)
    preds = CATEGORIES[int(prediction[0][0])]

    COUNT += 1
    return preds


@app.route('/load_img')
def load_img():
    global COUNT
    return send_from_directory('static', "{}.jpg".format(COUNT-1))


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="5000")

# If uncommenting following production code then add "gevent==20.9.0" to requirements.txt

    # http_server = WSGIServer(('', 5000), app)
    # http_server.serve_forever()