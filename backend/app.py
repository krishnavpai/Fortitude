import sys
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
import json
from predict import predict_stress


app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(request.data)
    text = data['text']
    ans = predict_stress(text)
    return jsonify({'sentiment': ans})


# app.run()
if __name__ == "__main__":
    app.run(debug=True)
