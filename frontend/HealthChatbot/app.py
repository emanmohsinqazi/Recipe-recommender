from flask import Flask, render_template, request, make_response, session
from flask_session import Session
from dotenv import load_dotenv
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain_core.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from src.helper import download_hugging_face_embeddings
from src.prompt import *
import os
import json
import re
from bson import ObjectId 
from pymongo import MongoClient
from datetime import datetime
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from openai import OpenAI

# === Setup === #
load_dotenv()
# MongoDB Connection
MONGO_URI = os.getenv("DATABASE_URI", "mongodb+srv://muhammadusman01645:Usman586..@cluster0.q1z7epv.mongodb.net/SRG")
client = MongoClient(MONGO_URI)
db = client['SRG']  
chat_collection = db['chatbotchats']  # You can name this anything
app = Flask(__name__)
CORS(app, supports_credentials=True)

# Flask session
app.secret_key = "mysecretkey12345"
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# === API Keys === #

os.environ["PINECONE_API_KEY"] = os.getenv("PINECONE_API_KEY")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# === Load and preprocess dataset === #
dataset = pd.read_csv("cleaned_dataset.csv")

def preprocess_data(dataset):
    nutritional_columns = ['calories', 'fat', 'carbohydrates', 'protein', 'cholesterol', 'sodium', 'fiber']
    scaler = StandardScaler()
    dataset[nutritional_columns] = scaler.fit_transform(dataset[nutritional_columns])
    dataset['ingredients_list'] = dataset['ingredients_list'].apply(lambda x: x.split(', '))
    dataset['ingredient_quantity_list'] = dataset['ingredient_quantity_list'].apply(lambda x: [item.strip() for item in x.split(',')])
    return dataset, scaler

processed_dataset, scaler = preprocess_data(dataset)

ingredient_index_map = {
    ingredient: idx for idx, ingredient in enumerate(
        set(ingredient for ingredients in processed_dataset['ingredients_list'] for ingredient in ingredients)
    )
}

def vectorize_ingredients(ingredients, ingredient_index_map):
    vector = np.zeros(len(ingredient_index_map), dtype=np.float32)
    for ingredient in ingredients:
        if ingredient in ingredient_index_map:
            vector[ingredient_index_map[ingredient]] = 1
    return vector

def find_closest_nutrition(scaled_values, scaler, dataset, nutritional_columns):
    original_values = scaler.inverse_transform([scaled_values])
    closest_values = {}
    for col, original_value in zip(nutritional_columns, original_values[0]):
        closest_value = dataset[col].iloc[(dataset[col] - original_value).abs().idxmin()]
        closest_values[col] = int(round(closest_value))
    return closest_values

def recommend_recipes(input_ingredients, input_nutri, dataset, scaler, ingredient_index_map):
    input_vector = vectorize_ingredients(input_ingredients, ingredient_index_map)
    input_nutri_scaled = scaler.transform([input_nutri])
    input_features = np.hstack([input_vector, input_nutri_scaled.flatten()])

    def contains_all_ingredients(row, input_ingredients):
        return all(ingredient in row['ingredients_list'] for ingredient in input_ingredients)

    filtered_recipes = dataset[dataset.apply(lambda row: contains_all_ingredients(row, input_ingredients), axis=1)]

    if filtered_recipes.empty:
        return []

    filtered_recipes['score'] = filtered_recipes.apply(
        lambda row: np.dot(input_features, np.hstack([
            vectorize_ingredients(row['ingredients_list'], ingredient_index_map),
            scaler.transform([[row['calories'], row['fat'], row['carbohydrates'], row['protein'], row['cholesterol'], row['sodium'], row['fiber']]])[0]
        ])), axis=1
    )

    top_recipes = filtered_recipes.sort_values('score', ascending=False).head(5)

    nutritional_columns = ['calories', 'fat', 'carbohydrates', 'protein', 'cholesterol', 'sodium', 'fiber']
    recommendations = []
    for _, row in top_recipes.iterrows():
        scaled_nutrition = [row[col] for col in nutritional_columns]
        nutrition = find_closest_nutrition(scaled_nutrition, scaler, dataset, nutritional_columns)
        recommendations.append({
            'recipe_name': row['recipe_name'],
            'image_url': row['image_url'],
            'ingredients_list': row['ingredients_list'],
            'ingredient_quantity_list': row['ingredient_quantity_list'],
            'nutrition': nutrition
        })

    return recommendations

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

embeddings = download_hugging_face_embeddings()
index_name = "medicalbot"
docsearch = PineconeVectorStore.from_existing_index(index_name=index_name, embedding=embeddings)
retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})

llm = ChatOpenAI(
    temperature=0.4,
    max_tokens=500
)

memory_store = {}

def get_memory(userid):
    if userid not in memory_store:
        memory_store[userid] = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    return memory_store[userid]

def is_follow_up(current_msg, chat_history):
    if not chat_history:
        return False
    follow_up_keywords = ["it", "that", "those", "they", "what about", "also", "and", "do you remember"]
    return any(word in current_msg.lower() for word in follow_up_keywords)

# Fact extraction function
def extract_fact(message, answer):
    facts = {}
    
    # Example fact extraction: Extracting dates
    date_pattern = r"\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b"
    dates = re.findall(date_pattern, answer)
    if dates:
        facts["dates"] = dates

    # Example fact extraction: Extracting any numeric quantities (like price, age, etc.)
    quantity_pattern = r"\b\d+\b"
    quantities = re.findall(quantity_pattern, answer)
    if quantities:
        facts["quantities"] = quantities

    # You can add more custom extractions as needed

    return facts

@app.route("/login", methods=["POST"])
def login():
    data = request.json

from flask import Flask, request, jsonify, session
from datetime import datetime
import os

@app.route("/Postmessage", methods=["POST"])
def chat():
    data = request.json
    msg = data.get("msg", "").strip()
    user_id = data.get("user_id", "").strip()  # Use frontend-passed user_id
    username = data.get("username", "").strip()

    if not msg:
        return jsonify({"error": "No message provided"}), 400
    if not user_id:
        return jsonify({"error": "No user_id provided"}), 400


    # Load memory for this user
    memory = get_memory(user_id)

    # Get last 20 chat messages for context
    chat_logs = list(chat_collection.find({"user_id": user_id}).sort("timestamp", -1).limit(20))
    chat_history = [{"message": c["message"], "response": c["response"]} for c in chat_logs]

    related = is_follow_up(msg, chat_history)

    context_message = ""
    if related and chat_history:
        for chat in chat_history:
            if any(word in msg.lower() for word in chat["message"].lower().split()):
                context_message = chat["message"]
                break

    # Formulate query to LLM
    if context_message:
        question = f"Based on earlier when I said '{context_message}', now {msg}"
    elif related:
        question = f"This is a follow-up to previous messages. {msg}"
    else:
        question = f"Ignore previous conversation. {msg}"

    # Get response from LLM
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory
    )
    response = qa_chain.invoke({"question": question})
    answer = response.get("answer", "Sorry, I couldn't find the answer.")

    # Save to MongoDB
    chat_document = {
        "user_id": user_id,
        "username": username,
        "message": msg,
        "response": answer,
        "timestamp": datetime.utcnow()
    }
    chat_collection.insert_one(chat_document)

    # Optional fact extraction
    facts = extract_fact(msg, answer)

    return jsonify({
        "message": answer,
        "context_used": context_message
    })
@app.route("/api/user-messages", methods=["GET"])
def get_user_messages():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    conversation = list(chat_collection.find(
        {"user_id": user_id},
        {"_id": 1, "message": 1, "response": 1, "timestamp": 1, "username": 1}
    ).sort("timestamp", 1))

    formatted_messages = []
    for msg in conversation:
        # Add user message
        if msg.get("message"):
            formatted_messages.append({
                "_id": str(msg["_id"]),
                "content": msg["message"],
                "timestamp": msg["timestamp"].isoformat(),
                "role": "user"
            })

        # Add bot response
        if msg.get("response"):
            formatted_messages.append({
                "_id": str(msg["_id"]) + "-bot",  # Unique ID for bot message
                "content": msg["response"],
                "timestamp": msg["timestamp"].isoformat(),  # Same timestamp for simplicity
                "role": "bot"
            })

    return jsonify(formatted_messages)

@app.route("/api/chat-history", methods=["GET"])
def get_chat_history():
    user_id = request.args.get("user_id")  # optional
    query = {}
    if user_id:
        query["user_id"] = user_id

    chats = list(db.chatHistory.find(query).sort("timestamp", -1))
    for chat in chats:
        chat["_id"] = str(chat["_id"])
        chat["timestamp"] = chat["timestamp"].isoformat()
    return jsonify(chats)

@app.route("/api/chat-history/paginated", methods=["GET"])
def get_paginated_chat():
    user_id = request.args.get("user_id")
    page = int(request.args.get("page", 1))
    page_size = 10
    skip = (page - 1) * page_size

    query = {}
    if user_id:
        query["user_id"] = user_id

    chats = list(db.chatHistory.find(query).sort("timestamp", -1).skip(skip).limit(page_size))
    for chat in chats:
        chat["_id"] = str(chat["_id"])
        chat["timestamp"] = chat["timestamp"].isoformat()
    return jsonify(chats)

@app.route("/api/chat-history/<chat_id>", methods=["DELETE"])
def delete_chat(chat_id):
    db.chatHistory.delete_one({"_id": ObjectId(chat_id)})
    return jsonify({"message": "Deleted"}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
