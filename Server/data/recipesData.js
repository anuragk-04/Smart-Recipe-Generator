export const recipesData = [
  {
    name: "Margherita Pizza",
    image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Pizza dough", amount: 1, unit: "sheet" },
      { name: "Tomato sauce", amount: 0.5, unit: "cup" },
      { name: "Mozzarella", amount: 150, unit: "g" },
      { name: "Basil", amount: 5, unit: "leaves" },
      { name: "Olive oil", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    instructions: [
      "Preheat oven to 250°C.",
      "Spread tomato sauce on dough.",
      "Top with mozzarella and basil.",
      "Bake for 10–12 minutes."
    ],
    cookingTime: 20,
    difficulty: "Easy",
    dietPreference: "Vegetarian",
    nutrition: { calories: 270, protein: 12, carbs: 32, fat: 10 },
    author: "Chef Luca Romano"
  },
  {
    name: "Butter Chicken",
    image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Chicken", amount: 300, unit: "g" },
      { name: "Tomatoes", amount: 3, unit: "pcs" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Cream", amount: 0.5, unit: "cup" },
      { name: "Spices", amount: 2, unit: "tbsp" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tbsp" }
    ],
    instructions: [
      "Marinate chicken with spices and yogurt.",
      "Cook tomatoes with butter, garlic and blend.",
      "Simmer sauce with cream and add chicken."
    ],
    cookingTime: 40,
    difficulty: "Medium",
    dietPreference: "Non-Vegetarian",
    nutrition: { calories: 420, protein: 28, carbs: 14, fat: 28 },
    author: "Aarav Singh"
  },
  {
    name: "Masala Dosa",
    image: "https://www.themealdb.com/images/media/meals/vytypw1468253146.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Dosa batter", amount: 1, unit: "cup" },
      { name: "Potatoes", amount: 2, unit: "pcs" },
      { name: "Onion", amount: 1, unit: "pcs" },
      { name: "Turmeric", amount: 0.5, unit: "tsp" },
      { name: "Curry leaves", amount: 5, unit: "leaves" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    instructions: [
      "Cook spiced potatoes.",
      "Spread dosa batter on hot tawa.",
      "Add filling and fold."
    ],
    cookingTime: 25,
    difficulty: "Medium",
    dietPreference: "Vegetarian",
    nutrition: { calories: 310, protein: 6, carbs: 52, fat: 8 },
    author: "Priya Nair"
  },
  {
    name: "Guacamole",
    image: "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Avocado", amount: 2, unit: "pcs" },
      { name: "Onion", amount: 0.25, unit: "cup" },
      { name: "Tomato", amount: 1, unit: "pcs" },
      { name: "Lime", amount: 1, unit: "pcs" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Cilantro", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Mash avocado.",
      "Mix chopped vegetables.",
      "Add lime and salt, serve."
    ],
    cookingTime: 10,
    difficulty: "Easy",
    dietPreference: "Vegan",
    nutrition: { calories: 160, protein: 2, carbs: 9, fat: 14 },
    author: "Carlos Rivera"
  },
  {
    name: "Chicken Biryani",
    image: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Rice", amount: 1, unit: "cup" },
      { name: "Chicken", amount: 300, unit: "g" },
      { name: "Yogurt", amount: 0.5, unit: "cup" },
      { name: "Spices", amount: 2, unit: "tbsp" },
      { name: "Onion", amount: 2, unit: "pcs" },
      { name: "Mint", amount: 0.25, unit: "cup" }
    ],
    instructions: [
      "Marinate chicken in spices.",
      "Partially cook rice.",
      "Layer rice and chicken, steam cook."
    ],
    cookingTime: 60,
    difficulty: "Hard",
    dietPreference: "Non-Vegetarian",
    nutrition: { calories: 520, protein: 32, carbs: 56, fat: 18 },
    author: "Mohammed Arif"
  },
  {
    name: "Greek Salad",
    image: "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Cucumber", amount: 1, unit: "pcs" },
      { name: "Tomato", amount: 2, unit: "pcs" },
      { name: "Feta", amount: 0.5, unit: "cup" },
      { name: "Olives", amount: 0.25, unit: "cup" },
      { name: "Onion", amount: 1, unit: "pcs" },
      { name: "Olive oil", amount: 1, unit: "tbsp" }
    ],
    instructions: [
      "Chop vegetables.",
      "Add feta and olives.",
      "Dress with olive oil."
    ],
    cookingTime: 8,
    difficulty: "Easy",
    dietPreference: "Vegetarian",
    nutrition: { calories: 180, protein: 5, carbs: 12, fat: 13 },
    author: "Elena Papas"
  },
  {
    name: "Sushi Rolls",
    image: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Rice", amount: 1, unit: "cup" },
      { name: "Nori", amount: 2, unit: "sheets" },
      { name: "Salmon", amount: 150, unit: "g" },
      { name: "Avocado", amount: 1, unit: "pcs" },
      { name: "Cucumber", amount: 1, unit: "pcs" }
    ],
    instructions: [
      "Prepare sushi rice.",
      "Spread on nori sheet.",
      "Roll tightly and slice."
    ],
    cookingTime: 35,
    difficulty: "Medium",
    dietPreference: "Pescatarian",
    nutrition: { calories: 290, protein: 14, carbs: 40, fat: 8 },
    author: "Hana Takahashi"
  },
  {
    name: "Pancakes",
    image: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Flour", amount: 1, unit: "cup" },
      { name: "Milk", amount: 1, unit: "cup" },
      { name: "Eggs", amount: 2, unit: "pcs" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Butter", amount: 1, unit: "tbsp" }
    ],
    instructions: ["Mix batter.", "Pour onto hot skillet.", "Flip and serve."],
    cookingTime: 15,
    difficulty: "Easy",
    dietPreference: "Vegetarian",
    nutrition: { calories: 220, protein: 6, carbs: 28, fat: 9 },
    author: "Emily Carter"
  },
  {
    name: "Chole Bhature",
    image: "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Chickpeas", amount: 1, unit: "cup" },
      { name: "Flour", amount: 1.5, unit: "cup" },
      { name: "Tomato", amount: 2, unit: "pcs" },
      { name: "Spices", amount: 2, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Cook chickpeas in gravy.",
      "Prepare bhatura dough.",
      "Deep fry and serve."
    ],
    cookingTime: 45,
    difficulty: "Medium",
    dietPreference: "Vegetarian",
    nutrition: { calories: 480, protein: 14, carbs: 62, fat: 18 },
    author: "Harleen Kaur"
  },
  {
    name: "Beef Tacos",
    image: "https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Tortillas", amount: 3, unit: "pcs" },
      { name: "Ground beef", amount: 200, unit: "g" },
      { name: "Lettuce", amount: 0.5, unit: "cup" },
      { name: "Tomato", amount: 1, unit: "pcs" },
      { name: "Cheese", amount: 0.25, unit: "cup" }
    ],
    instructions: ["Cook seasoned beef.", "Fill tortillas.", "Top and serve."],
    cookingTime: 20,
    difficulty: "Easy",
    dietPreference: "Non-Vegetarian",
    nutrition: { calories: 350, protein: 22, carbs: 28, fat: 18 },
    author: "Miguel Santos"
  },

  {
    name: "Veg Fried Rice",
    image: "https://www.themealdb.com/images/media/meals/1529444830.jpg",
    servingSize: 1,
    ingredients: [
      { name: "Rice", amount: 1, unit: "cup" },
      { name: "Carrots", amount: 0.5, unit: "cup" },
      { name: "Peas", amount: 0.5, unit: "cup" },
      { name: "Soy sauce", amount: 1, unit: "tbsp" },
      { name: "Spring onion", amount: 0.25, unit: "cup" }
    ],
    instructions: ["Sauté vegetables.", "Add rice and sauce.", "Toss on high flame."],
    cookingTime: 18,
    difficulty: "Easy",
    dietPreference: "Vegan",
    nutrition: { calories: 260, protein: 5, carbs: 46, fat: 5 },
    author: "Neha Sharma"
  },
  {
  name: "Shahi Paneer",
  image: "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Paneer", amount: 200, unit: "g" },
    { name: "Cream", amount: 0.25, unit: "cup" },
    { name: "Cashews", amount: 10, unit: "pcs" },
    { name: "Tomatoes", amount: 2, unit: "pcs" },
    { name: "Spices", amount: 1, unit: "tbsp" }
  ],
  instructions: [
    "Make rich cashew gravy.",
    "Add paneer cubes.",
    "Simmer and serve."
  ],
  cookingTime: 30,
  difficulty: "Medium",
  dietPreference: "Vegetarian",
  nutrition: { calories: 410, protein: 16, carbs: 18, fat: 32 },
  author: "Ritika Malhotra"
},

{
  name: "Caesar Salad",
  image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Lettuce", amount: 2, unit: "cups" },
    { name: "Croutons", amount: 0.5, unit: "cup" },
    { name: "Parmesan", amount: 0.25, unit: "cup" },
    { name: "Caesar dressing", amount: 2, unit: "tbsp" }
  ],
  instructions: [
    "Chop lettuce.",
    "Toss with dressing.",
    "Top with croutons."
  ],
  cookingTime: 7,
  difficulty: "Easy",
  dietPreference: "Vegetarian",
  nutrition: { calories: 190, protein: 6, carbs: 14, fat: 12 },
  author: "Mark Johnson"
},

{
  name: "Ramen Bowl",
  image: "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Ramen noodles", amount: 1, unit: "pack" },
    { name: "Broth", amount: 2, unit: "cups" },
    { name: "Egg", amount: 1, unit: "pcs" },
    { name: "Pork", amount: 150, unit: "g" },
    { name: "Soy sauce", amount: 1, unit: "tbsp" }
  ],
  instructions: [
    "Boil noodles.",
    "Prepare broth.",
    "Assemble bowl and serve."
  ],
  cookingTime: 35,
  difficulty: "Medium",
  dietPreference: "Non-Vegetarian",
  nutrition: { calories: 450, protein: 24, carbs: 52, fat: 16 },
  author: "Yuki Nakamura"
},

{
  name: "Falafel Wrap",
  image: "https://www.themealdb.com/images/media/meals/kcv6hj1598733479.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Chickpeas", amount: 1, unit: "cup" },
    { name: "Herbs", amount: 2, unit: "tbsp" },
    { name: "Pita", amount: 1, unit: "pcs" },
    { name: "Tahini", amount: 1, unit: "tbsp" },
    { name: "Lettuce", amount: 0.5, unit: "cup" }
  ],
  instructions: [
    "Blend chickpeas.",
    "Fry falafel.",
    "Wrap with veggies."
  ],
  cookingTime: 28,
  difficulty: "Medium",
  dietPreference: "Vegan",
  nutrition: { calories: 330, protein: 10, carbs: 42, fat: 12 },
  author: "Layla Hassan"
},

{
  name: "Fish and Chips",
  image: "https://www.themealdb.com/images/media/meals/2xcar91683202804.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Fish", amount: 200, unit: "g" },
    { name: "Potatoes", amount: 2, unit: "pcs" },
    { name: "Flour", amount: 0.5, unit: "cup" },
    { name: "Oil", amount: 2, unit: "cup" },
    { name: "Salt", amount: 1, unit: "tsp" }
  ],
  instructions: [
    "Batter and fry fish.",
    "Fry potatoes.",
    "Serve hot."
  ],
  cookingTime: 30,
  difficulty: "Medium",
  dietPreference: "Pescatarian",
  nutrition: { calories: 530, protein: 25, carbs: 48, fat: 28 },
  author: "James Walker"
},

{
  name: "Hummus",
  image: "https://www.themealdb.com/images/media/meals/ctg8jd1585563097.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Chickpeas", amount: 1, unit: "cup" },
    { name: "Tahini", amount: 2, unit: "tbsp" },
    { name: "Garlic", amount: 2, unit: "cloves" },
    { name: "Lemon", amount: 1, unit: "pcs" },
    { name: "Olive oil", amount: 1, unit: "tbsp" }
  ],
  instructions: [
    "Blend ingredients.",
    "Adjust seasoning.",
    "Serve."
  ],
  cookingTime: 12,
  difficulty: "Easy",
  dietPreference: "Vegan",
  nutrition: { calories: 180, protein: 6, carbs: 15, fat: 10 },
  author: "Sahar Youssef"
},

{
  name: "Chocolate Brownies",
  image: "https://www.themealdb.com/images/media/meals/twspvx1511784937.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Chocolate", amount: 150, unit: "g" },
    { name: "Butter", amount: 0.25, unit: "cup" },
    { name: "Sugar", amount: 0.5, unit: "cup" },
    { name: "Eggs", amount: 2, unit: "pcs" },
    { name: "Flour", amount: 0.75, unit: "cup" }
  ],
  instructions: ["Melt chocolate.", "Mix batter.", "Bake."],
  cookingTime: 35,
  difficulty: "Easy",
  dietPreference: "Vegetarian",
  nutrition: { calories: 320, protein: 4, carbs: 42, fat: 16 },
  author: "Sophia Martinez"
},

{
  name: "Thai Green Curry",
  image: "https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Coconut milk", amount: 1, unit: "cup" },
    { name: "Green curry paste", amount: 2, unit: "tbsp" },
    { name: "Chicken", amount: 250, unit: "g" },
    { name: "Vegetables", amount: 1, unit: "cup" }
  ],
  instructions: [
    "Cook curry paste in oil.",
    "Add coconut milk.",
    "Add chicken and veggies."
  ],
  cookingTime: 30,
  difficulty: "Medium",
  dietPreference: "Non-Vegetarian",
  nutrition: { calories: 390, protein: 22, carbs: 18, fat: 28 },
  author: "Natcha Wong"
},

{
  name: "Pasta Alfredo",
  image: "https://www.themealdb.com/images/media/meals/0jv5gx1661040808.jpg",
  servingSize: 1,
  ingredients: [
    { name: "Pasta", amount: 1, unit: "cup" },
    { name: "Cream", amount: 0.5, unit: "cup" },
    { name: "Butter", amount: 2, unit: "tbsp" },
    { name: "Parmesan", amount: 0.25, unit: "cup" },
    { name: "Garlic", amount: 2, unit: "cloves" }
  ],
  instructions: [
    "Boil pasta.",
    "Make creamy sauce.",
    "Combine and serve."
  ],
  cookingTime: 22,
  difficulty: "Easy",
  dietPreference: "Vegetarian",
  nutrition: { calories: 440, protein: 12, carbs: 56, fat: 18 },
  author: "Giovanni Russo"
},
];
