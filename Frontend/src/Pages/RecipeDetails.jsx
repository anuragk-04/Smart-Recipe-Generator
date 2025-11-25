import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Rating,
  TextField,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/navbar";
import api from "../api/axiosInstance";
import fallbackImg from "../assets/Recipes-Fallback.png";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(null);

  // Serving system
  const [currentServings, setCurrentServings] = useState(1);
  const [baseIngredients, setBaseIngredients] = useState([]);
  const [baseNutrition, setBaseNutrition] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/api/recipes/${id}`);
      const recipeData = res.data.recipe;

      setRecipe(recipeData);
      setIsFavorite(res.data.isFavorite);

      // Servings + ingredients
      setCurrentServings(recipeData.servingSize || 1);
      setBaseIngredients(recipeData.ingredients || []);
      setBaseNutrition(recipeData.nutrition || null);

      // User rating
      const userId = localStorage.getItem("userId");
      const ratingObj = recipeData.ratings?.find((r) => {
        if (!r?.user) return false;
        const ratingUserId = typeof r.user === "string" ? r.user : r.user._id;
        return ratingUserId?.toString() === userId;
      });

      setUserRating(ratingObj ? ratingObj.rating : null);
    } catch (err) {
      console.error("Failed to fetch recipe details", err);
      navigate("/home");
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    else fetchRecipe();
  }, [id]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImg;
  };

  const handleFavorite = async () => {
    try {
      await api.post(`/api/favorites/${id}`);
      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const handleRating = async (newValue) => {
    if (newValue === userRating) return;

    setUserRating(newValue);
    try {
      await api.post(`/api/rate/${id}`, { rating: newValue });
      fetchRecipe();
    } catch (err) {
      console.error("Failed to rate recipe:", err);
    }
  };

  // Scale Ingredient Amounts
  const getScaledIngredients = () => {
    if (!recipe?.servingSize || baseIngredients.length === 0)
      return baseIngredients;

    const factor = currentServings / recipe.servingSize;

    return baseIngredients.map((ing) => ({
      ...ing,
      amount: Math.round(ing.amount * factor * 100) / 100,
    }));
  };

  // Scale Nutrition
  const getScaledNutrition = () => {
    if (!recipe?.servingSize || !baseNutrition)
      return baseNutrition;

    const factor = currentServings / recipe.servingSize;

    return {
      calories: Math.round(baseNutrition.calories * factor),
      protein: Math.round(baseNutrition.protein * factor),
      carbs: Math.round(baseNutrition.carbs * factor),
      fat: Math.round(baseNutrition.fat * factor),
    };
  };

  if (loading)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );

  if (!recipe) return null;

  const scaledIngredients = getScaledIngredients();
  const scaledNutrition = getScaledNutrition();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#E3F2FD,#E8EAF6)",
      }}
    >
      <Navbar />

      <Container sx={{ mt: 10, mb: 6 }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: "22px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* IMAGE */}
          <img
            src={recipe.image}
            alt={recipe.name}
            onError={handleImageError}
            style={{ width: "100%", height: "350px", objectFit: "cover" }}
          />

          <Box sx={{ p: 4 }}>
            {/* HEADER */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  {recipe.name}
                </Typography>
                <Typography fontSize="1rem" color="text.secondary" mt={0.5}>
                  👨‍🍳 By {recipe.author || "Unknown Chef"}
                </Typography>
              </Box>

              {/* FAVORITE + RATING */}
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Button
                  onClick={handleFavorite}
                  startIcon={
                    isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                  }
                  sx={{
                    color: isFavorite ? "red" : "#333",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    transition: "0.25s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </Button>

                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Rating
                    value={userRating || 0}
                    onChange={(e, v) => handleRating(v)}
                    precision={0.5}
                  />
                  <Typography fontWeight={600}>
                    {userRating ? userRating.toFixed(1) : "0.0"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* META */}
            <Typography mt={1} fontSize="1rem" color="text.secondary">
              ⭐ {recipe.averageRating?.toFixed(1) ?? "0.0"} (
              {recipe.ratings?.length || 0} ratings)
            </Typography>

            <Typography mt={2} color="text.secondary">
              ⏳ {recipe.cookingTime} mins • 🍽️ {recipe.difficulty} • 🥗{" "}
              {recipe.dietPreference}
            </Typography>

            {/* SERVINGS */}
            <Box mt={3}>
              <Typography variant="h6" fontWeight={700}>
                Serving Size
              </Typography>
              <TextField
                type="number"
                value={currentServings}
                onChange={(e) => setCurrentServings(Number(e.target.value))}
                sx={{ width: 120, mt: 1 }}
                inputProps={{ min: 1 }}
              />
            </Box>

            {/* NUTRITION */}
            {scaledNutrition && (
              <>
                <Typography variant="h6" mt={4} fontWeight={700}>
                  Nutrition (for {currentServings} serving(s))
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <Chip label={`Calories: ${scaledNutrition.calories}`} color="secondary" />
                  <Chip label={`Protein: ${scaledNutrition.protein}g`} color="primary" />
                  <Chip label={`Carbs: ${scaledNutrition.carbs}g`} color="success" />
                  <Chip label={`Fat: ${scaledNutrition.fat}g`} color="warning" />
                </Box>
              </>
            )}

            {/* INGREDIENTS PREMIUM */}
            <Typography variant="h6" mt={4} fontWeight={700}>
              Ingredients
            </Typography>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {scaledIngredients.map((ing, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 600, color: "#333", fontSize: "1rem" }}
                  >
                    {ing.name}
                  </Typography>

                  <Typography
                    sx={{ fontWeight: 700, color: "#6a1b9a", fontSize: "1rem" }}
                  >
                    {ing.amount} {ing.unit}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* INSTRUCTIONS */}
            <Typography variant="h6" mt={4} fontWeight={700}>
              Instructions
            </Typography>

            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.8 }}>
              {recipe.instructions.map((step, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    background: "rgba(255,255,255,0.6)",
                    p: 1.5,
                    borderRadius: "12px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <strong>Step {index + 1}:</strong> {step}
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RecipeDetails;
