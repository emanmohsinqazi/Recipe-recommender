from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load and preprocess dataset
file_path = 'cleaned_dataset.csv'  # Update with your dataset path
dataset = pd.read_csv(file_path)

def preprocess_data(dataset):
    nutritional_columns = ['calories', 'fat', 'carbohydrates', 'protein', 'cholesterol', 'sodium', 'fiber']
    scaler = StandardScaler()
    dataset[nutritional_columns] = scaler.fit_transform(dataset[nutritional_columns])
    dataset['ingredients_list'] = dataset['ingredients_list'].apply(lambda x: x.split(', '))
    dataset['ingredient_quantity_list'] = dataset['ingredient_quantity_list'].apply(
        lambda x: [item.strip() for item in x.split(',')]  # Split and clean up quantities
    )
    return dataset, scaler

processed_dataset, scaler = preprocess_data(dataset)

# Create ingredient map
ingredient_index_map = {ingredient: idx for idx, ingredient in enumerate(
    set(ingredient for ingredients in processed_dataset['ingredients_list'] for ingredient in ingredients)
)}

# Vectorize ingredients
def vectorize_ingredients(ingredients, ingredient_index_map):
    vector = np.zeros(len(ingredient_index_map), dtype=np.float32)
    for ingredient in ingredients:
        if ingredient in ingredient_index_map:
            vector[ingredient_index_map[ingredient]] = 1
    return vector

# Recommendation function
def recommend_recipes(input_ingredients, input_nutri, dataset, scaler, ingredient_index_map):
    # Vectorize input ingredients and nutrition data
    input_vector = vectorize_ingredients(input_ingredients, ingredient_index_map)
    input_nutri_scaled = scaler.transform([input_nutri])
    input_features = np.hstack([input_vector, input_nutri_scaled.flatten()])

    def contains_all_ingredients(row, input_ingredients):
        return all(ingredient in row['ingredients_list'] for ingredient in input_ingredients)

    filtered_recipes = dataset[dataset.apply(lambda row: contains_all_ingredients(row, input_ingredients), axis=1)]

    if filtered_recipes.empty:
        return []

    # Add scores for ranking
    filtered_recipes['score'] = filtered_recipes.apply(
        lambda row: np.dot(input_features, np.hstack([
            vectorize_ingredients(row['ingredients_list'], ingredient_index_map),
            scaler.transform([[row['calories'], row['fat'], row['carbohydrates'], row['protein'], row['cholesterol'], row['sodium'], row['fiber']]])[0]
        ])),
        axis=1
    )

    top_recipes = filtered_recipes.sort_values('score', ascending=False).head(5)
    return top_recipes[['recipe_name', 'image_url', 'ingredients_list', 'ingredient_quantity_list']].to_dict('records')

# API endpoint
@app.route('/api/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        input_ingredients = data.get('ingredients', [])
        input_nutri = [
            data.get('calories', 0),
            data.get('fat', 0),
            data.get('carbohydrates', 0),
            data.get('protein', 0),
            data.get('cholesterol', 0),
            data.get('sodium', 0),
            data.get('fiber', 0)
        ]
        recommendations = recommend_recipes(input_ingredients, input_nutri, processed_dataset, scaler, ingredient_index_map)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)