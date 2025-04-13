
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from openai import OpenAI
load_dotenv()
# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests
# API Keys
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")  # OpenRouter API Key
NUTRITION_API_URL = "https://api.api-ninjas.com/v1/nutrition"
NUTRITION_API_KEY = os.getenv("NUTRITION_API_KEY")

# DeepSeek AI Client (using OpenAI API format)
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)
# User data storage (in-memory for simplicity)
user_data = {
    "total_calories": 0,
    "daily_limit": 2000  # Default daily calorie limit
}

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

# Find closest nutritional values in the dataset
def find_closest_nutrition(scaled_values, scaler, dataset, nutritional_columns):
    original_values = scaler.inverse_transform([scaled_values])  # Convert scaled to original
    closest_values = {}

    for col, original_value in zip(nutritional_columns, original_values[0]):
        closest_value = dataset[col].iloc[(dataset[col] - original_value).abs().idxmin()]
        closest_values[col] = int(round(closest_value))  # Ensure integer output

    return closest_values

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

    # Nutritional column names
    nutritional_columns = ['calories', 'fat', 'carbohydrates', 'protein', 'cholesterol', 'sodium', 'fiber']

    # Format the output
    recommendations = []
    for _, row in top_recipes.iterrows():
        # Find the closest integer values for nutrition in the dataset
        scaled_nutrition = [row[col] for col in nutritional_columns]
        nutrition = find_closest_nutrition(scaled_nutrition, scaler, dataset, nutritional_columns)
        
        recommendations.append({
            'recipe_name': row['recipe_name'],
            'image_url': row['image_url'],
            'ingredients_list': row['ingredients_list'],
            'ingredient_quantity_list': row['ingredient_quantity_list'],
            'nutrition': nutrition  # Include nearest integer nutritional values
        })

    return recommendations

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



# ✅ *Exercise Recommendation (Using DeepSeek AI)*
@app.route("/recommend_exercise", methods=["POST"])
def recommend_exercise():
    data = request.get_json()
    excess_calories = data.get("excess_calories", 300)  # Default 300 kcal

    try:
        response = client.chat.completions.create(
            model="deepseek/deepseek-r1:free",
            messages=[{"role": "user", "content": f"Suggest an exercise routine to burn {excess_calories} kcal."}]
        )

        if response.choices:
            return jsonify({"exercise": response.choices[0].message.content})
        else:
            return jsonify({"error": "No response from DeepSeek AI"}), 500

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

# ✅ *Healthy Recipe Suggestion (Using DeepSeek AI)*
@app.route('/suggest_recipe', methods=['POST'])
def suggest_recipe():
    try:
        data = request.json
        preference = data.get("preference", "healthy")

        response = client.chat.completions.create(
            model="deepseek/deepseek-r1:free",
            messages=[{"role": "user", "content": f"Suggest a {preference} recipe"}]
        )

        if response.choices:
            return jsonify({"recipe": response.choices[0].message.content})
        else:
            return jsonify({"error": "No response from DeepSeek AI"}), 500

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)