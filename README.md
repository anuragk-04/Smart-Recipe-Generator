# 🍽️ Apni Kitchen 
### Personalized Recipe Recommendation Platform_

Apni Kitchen is a full-stack MERN application that helps users discover, generate, and publish recipes using AI-powered ingredient detection and a personalized recommendation system. It provides dynamic ingredient scaling, nutrition calculation, favorites, ratings, and smart recipe filtering based on user preferences.

---

## Live Link
https://smart-recipe-generator-1-7i69.onrender.com

---

## 🚀 Features

### **1. AI Ingredient Detection**
- Upload an image of your ingredients.
- AI identifies items automatically.
- Auto-fills the recipe generator.

### **2. Smart Recipe Generation**
- Enter ingredients manually or through AI.
- Apply filters:  
  - Diet preference  
  - Difficulty level  
- Recipes are scored and sorted using a weighted algorithm.

### **3. Personalized Recommendation Engine**
- Learns user taste from:
  - Favorite recipes  
  - Rated recipes  
  - Ingredient history  
  - Diet & difficulty habits  
- Generates highly relevant suggestions.

### **4. Publish Your Own Recipes**
- Add name, ingredients (with amount & units), instructions, nutrition, serving size.
- Upload photos (stored on Cloudinary).
- Recipes become available to all users.

### **5. Additional Features**
- Dynamic ingredient scaling based on serving size.
- Nutrition adjusts automatically per serving.
- Favorite & rate recipes.
- Auto-updating average ratings.

---

## 🧠 Recommendation Engine — Approach

### **Ingredient Weight Mapping**
Each ingredient is assigned a score based on user interactions:

| User Action | Weight |
|------------|--------|
| Ingredient appears in a favorite recipe | +6 |
| Ingredient appears in a 4★+ rated recipe | +3 |
| Ingredient matches search query | Strong boost |

This creates a personalized taste profile.

### **Diet & Difficulty Preferences**
The engine boosts recipes matching the user's usual diet pattern and preferred difficulty.

### **Final Scoring Formula**
score =
ingredientWeight
dietPreferenceWeight
(averageRating * 4)
(favoriteCount * 2)
favoriteBonus (if user favorited)


Recipes with the highest score appear on top.

---

## 🧠 Smart Recipe Generation — Approach
1. Normalize all ingredient names.
2. Filter recipes by:
   - Ingredient overlap  
   - (Optional) Diet preference  
   - (Optional) Difficulty level  
3. Score using the same weighted engine.
4. Sort & return best results.

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- Material UI
- Axios

### **Backend**
- Node.js  
- Express.js  
- JWT Authentication  
- Cloudinary (image uploads)

### **Database**
- MongoDB Atlas (Mongoose ODM)

---

## 📦 Installation & Setup

### **1. Clone**
```bash
git clone <repo-url>
cd smart-recipe-generator
```

### **2. Backend**
```bash
cd server
npm install
```

### **3. Create.env**
```bash
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

### **4. Run Backend**
```bash
npm start
```

### **5. Frontend**
```bash
cd client
npm install
npm run dev
```

