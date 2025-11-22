export const recipesData = [
  // ---------- 1 ----------
  {
    name: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1601050690597-7f6f8b8d1973",
    ingredients: [
      "Paneer", "Tomatoes", "Onions", "Butter", "Cream",
      "Garam masala", "Red chili powder", "Salt", "Oil"
    ],
    instructions: [
      "Heat butter in a pan and sauté chopped onions until golden.",
      "Add tomato puree and cook for 5–6 minutes.",
      "Mix in spices, salt, and cream. Stir well.",
      "Add paneer cubes and simmer for 3 minutes.",
      "Serve hot with naan or steamed rice."
    ],
    cookingTime: 25,
    difficulty: "Medium",
    dietPreference: "Vegetarian",
    nutrition: { calories: 380, protein: 16, carbs: 18, fat: 28 }
  },

  // ---------- 2 ----------
  {
    name: "Masala Dosa",
    image: "https://images.unsplash.com/photo-1633945274405-b8fef1912f31",
    ingredients: [
      "Dosa batter", "Potatoes", "Onions", "Green chilies",
      "Mustard seeds", "Turmeric", "Oil", "Salt"
    ],
    instructions: [
      "Boil potatoes and mash with turmeric and salt.",
      "Sauté onions, mustard seeds, and chilies.",
      "Mix sautéed mixture with potatoes.",
      "Spread dosa batter on a hot tawa.",
      "Place potato filling, fold and serve with chutney."
    ],
    cookingTime: 30,
    difficulty: "Medium",
    dietPreference: "Vegetarian",
    nutrition: { calories: 310, protein: 7, carbs: 50, fat: 9 }
  },

  // ---------- 3 ----------
  {
    name: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1603898037225-87ea8ef66a46",
    ingredients: [
      "Basmati rice", "Chicken", "Yogurt", "Onions",
      "Ginger garlic paste", "Biryani masala", "Saffron", "Ghee", "Salt"
    ],
    instructions: [
      "Marinate chicken with yogurt and spices for 1 hour.",
      "Fry onions until golden and crispy.",
      "Cook rice until 70% done.",
      "Layer chicken, onions, and rice in a pot.",
      "Cover and cook on low flame for 20 minutes."
    ],
    cookingTime: 60,
    difficulty: "Hard",
    dietPreference: "Non-Vegetarian",
    nutrition: { calories: 520, protein: 32, carbs: 55, fat: 18 }
  },

  // ---------- 4 ----------
  {
    name: "Veg Fried Rice",
    image: "https://images.unsplash.com/photo-1621996346565-a5b1e0a0b5e6",
    ingredients: [
      "Cooked rice", "Carrots", "Beans", "Capsicum",
      "Soy sauce", "Pepper", "Oil", "Salt"
    ],
    instructions: [
      "Heat oil and sauté chopped vegetables on high flame.",
      "Add soy sauce, pepper, and salt.",
      "Mix in cooked rice and toss for 2 minutes.",
      "Serve hot."
    ],
    cookingTime: 20,
    difficulty: "Easy",
    dietPreference: "Vegan",
    nutrition: { calories: 260, protein: 5, carbs: 42, fat: 6 }
  },

  // ---------- 5 ----------
  {
    name: "Chole Bhature",
    image: "https://images.unsplash.com/photo-1604909053115-d4b4dc93a8bc",
    ingredients: [
      "Chickpeas", "Tomatoes", "Onions",
      "Chole masala", "Flour", "Yogurt", "Oil", "Salt"
    ],
    instructions: [
      "Pressure cook chickpeas until soft.",
      "Prepare onion-tomato gravy with spices.",
      "Add chickpeas and simmer for 10 minutes.",
      "Knead dough using flour and yogurt.",
      "Roll and deep fry bhature until golden."
    ],
    cookingTime: 45,
    difficulty: "Medium",
    dietPreference: "Vegetarian",
    nutrition: { calories: 480, protein: 14, carbs: 60, fat: 18 }
  },

  // ---------- 6 ----------
  {
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1548365328-860eee694d7b",
    ingredients: [
      "Pizza dough", "Tomato sauce", "Mozzarella",
      "Basil", "Olive oil", "Salt"
    ],
    instructions: [
      "Spread tomato sauce over rolled dough.",
      "Top with mozzarella and basil leaves.",
      "Bake in a preheated oven at 250°C for 10–12 minutes.",
      "Drizzle with olive oil before serving."
    ],
    cookingTime: 20,
    difficulty: "Easy",
    dietPreference: "Vegetarian",
    nutrition: { calories: 300, protein: 12, carbs: 32, fat: 14 }
  },

  // ---------- 7 ----------
  {
    name: "Pasta Alfredo",
    image: "https://images.unsplash.com/photo-1589308078055-7a121c7d1b57",
    ingredients: [
      "Pasta", "Butter", "Cream", "Parmesan cheese", "Garlic", "Salt"
    ],
    instructions: [
      "Boil pasta until al dente and drain.",
      "Melt butter and sauté garlic briefly.",
      "Add cream and parmesan, stir until smooth.",
      "Mix in pasta and simmer for 1 minute.",
      "Serve warm."
    ],
    cookingTime: 22,
    difficulty: "Easy",
    dietPreference: "Vegetarian",
    nutrition: { calories: 420, protein: 10, carbs: 36, fat: 26 }
  },

  // ---------- 8 ----------
  {
    name: "Egg Curry",
    image: "https://images.unsplash.com/photo-1605478370747-4e88eaa6053a",
    ingredients: [
      "Boiled eggs", "Onions", "Tomatoes",
      "Turmeric", "Cumin", "Oil", "Salt"
    ],
    instructions: [
      "Sauté onions until golden brown.",
      "Add tomatoes, turmeric, cumin, and salt.",
      "Cook until oil separates.",
      "Add boiled eggs and simmer for 5 minutes."
    ],
    cookingTime: 25,
    difficulty: "Easy",
    dietPreference: "Eggetarian",
    nutrition: { calories: 250, protein: 12, carbs: 10, fat: 18 }
  },

  // ---------- ADDITIONAL 22 RECIPES BELOW ----------
  {
    name: "Hummus Wrap",
    image: "https://images.unsplash.com/photo-1601924572483-3eab81b08af0",
    ingredients: ["Tortilla", "Hummus", "Lettuce", "Tomato", "Cucumber"],
    instructions: [
      "Spread hummus over tortilla.",
      "Add sliced vegetables.",
      "Roll tightly and slice in half."
    ],
    cookingTime: 10,
    difficulty: "Easy",
    dietPreference: "Vegan",
    nutrition: { calories: 220, protein: 6, carbs: 32, fat: 8 }
  },
  {
    name: "Rajma Chawal",
    image: "https://images.unsplash.com/photo-1626354825459-501e2e6ce6d0",
    ingredients: ["Kidney beans", "Onions", "Tomatoes", "Rice", "Spices"],
    instructions: [
      "Soak rajma overnight and pressure cook.",
      "Prepare onion-tomato gravy with spices.",
      "Add rajma and simmer 15 minutes.",
      "Serve with steamed rice."
    ],
    cookingTime: 50,
    difficulty: "Medium",
    dietPreference: "Vegetarian",
    nutrition: { calories: 410, protein: 15, carbs: 68, fat: 6 }
  },
  {
    name: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1569058242264-edaeb403ccc1",
    ingredients: [
      "Lettuce", "Croutons", "Parmesan", "Caesar dressing", "Pepper"
    ],
    instructions: [
      "Chop lettuce and add to bowl.",
      "Top with dressing, parmesan and croutons.",
      "Toss and serve fresh."
    ],
    cookingTime: 8,
    difficulty: "Easy",
    dietPreference: "Vegetarian",
    nutrition: { calories: 180, protein: 5, carbs: 12, fat: 14 }
  },
  {
    name: "Fish Tacos",
    image: "https://images.unsplash.com/photo-1617196035525-3c692b0bc572",
    ingredients: [
      "Tortillas", "White fish", "Cabbage", "Lime", "Sour cream", "Spices"
    ],
    instructions: [
      "Season and grill fish.",
      "Place fish in tortilla.",
      "Top with cabbage and lime crema."
    ],
    cookingTime: 18,
    difficulty: "Easy",
    dietPreference: "Non-Vegetarian",
    nutrition: { calories: 310, protein: 22, carbs: 28, fat: 12 }
  },
  {
    name: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    ingredients: [
      "Bread", "Avocado", "Salt", "Lemon", "Chili flakes"
    ],
    instructions: [
      "Toast bread slices.",
      "Mash avocado with salt and lemon.",
      "Spread on toast and top with chili flakes."
    ],
    cookingTime: 6,
    difficulty: "Easy",
    dietPreference: "Vegan",
    nutrition: { calories: 260, protein: 6, carbs: 24, fat: 16 }
  },
  {
    name: "Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1603133872878-684f6a33ce6b",
    ingredients: [
      "Arborio rice", "Mushrooms", "Garlic",
      "Parmesan", "Butter", "Broth"
    ],
    instructions: [
      "Sauté mushrooms and garlic.",
      "Add rice and toast for a minute.",
      "Add broth gradually while stirring.",
      "Mix in parmesan and butter."
    ],
    cookingTime: 35,
    difficulty: "Hard",
    dietPreference: "Vegetarian",
    nutrition: { calories: 470, protein: 12, carbs: 62, fat: 18 }
  },
  {
    name: "Chocolate Brownies",
    image: "https://images.unsplash.com/photo-1534430480872-270a71b7481e",
    ingredients: [
      "Flour", "Sugar", "Butter", "Cocoa powder", "Eggs"
    ],
    instructions: [
      "Mix melted butter with sugar and eggs.",
      "Add flour and cocoa powder.",
      "Bake for 25 minutes."
    ],
    cookingTime: 30,
    difficulty: "Easy",
    dietPreference: "Vegetarian",
    nutrition: { calories: 420, protein: 5, carbs: 50, fat: 22 }
  },
  {
    name: "Greek Salad",
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28",
    ingredients: [
      "Cucumber", "Tomato", "Olives", "Feta", "Olive oil"
    ],
    instructions: [
      "Chop vegetables into chunks.",
      "Add feta and olives.",
      "Drizzle olive oil before serving."
    ],
    cookingTime: 7,
    difficulty: "Easy",
    dietPreference: "Vegetarian",
    nutrition: { calories: 200, protein: 7, carbs: 10, fat: 15 }
  },

];
