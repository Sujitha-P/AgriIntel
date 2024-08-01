import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle

try:
    # Load your data
    data = pd.read_csv('crop_yield.csv').drop(['Production', 'Crop_Year', 'Pesticide', 'Annual_Rainfall', 'Fertilizer'], axis=1)
    print("Data loaded successfully")

    # Get unique values for each categorical column
    unique_crops = data['Crop'].unique().tolist()
    unique_seasons = data['Season'].unique().tolist()
    unique_states = data['State'].unique().tolist()

    # Initialize OneHotEncoder with actual categories from your dataset
    encoder = OneHotEncoder(sparse_output=False, categories=[unique_crops, unique_seasons, unique_states])
    print("Encoder initialized with categories")

    # Encode the features
    X_encoded = encoder.fit_transform(data[['Crop', 'Season', 'State']])
    X_encoded_df = pd.DataFrame(X_encoded, columns=encoder.get_feature_names_out(['Crop', 'Season', 'State']))
    print("Features encoded successfully")

    # Combine with 'Area' column
    X_final = pd.concat([X_encoded_df, data[['Area']].reset_index(drop=True)], axis=1)

    # Define target variable
    Y = data['Yield']

    # Split the data into training and testing sets
    X_train, X_test, Y_train, Y_test = train_test_split(X_final, Y, test_size=0.3)

    # Initialize and train the model
    model = RandomForestRegressor(n_estimators=100, random_state=2)
    model.fit(X_train, Y_train)
    print("Model trained successfully")

    # Save the model and encoder to a file
    with open('model.pkl', 'wb') as model_file:
        pickle.dump(model, model_file)
    with open('encoder.pkl', 'wb') as encoder_file:
        pickle.dump(encoder, encoder_file)
    print("Model and encoder saved successfully")

except Exception as e:
    print(f"Error: {e}")
