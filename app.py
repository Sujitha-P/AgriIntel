from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load the trained model and encoder
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
    
with open('encoder.pkl', 'rb') as encoder_file:
    encoder = pickle.load(encoder_file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    crop = data.get('crop')
    season = data.get('season')
    state = data.get('state')
    area = data.get('area')

    # Encode the input data
    input_df = pd.DataFrame([[crop, season, state]], columns=['Crop', 'Season', 'State'])
    input_encoded = encoder.transform(input_df)
    input_final = np.concatenate([input_encoded, [[area]]], axis=1)

    # Predict the yield
    prediction = model.predict(input_final)

    return jsonify({'predicted_yield': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
