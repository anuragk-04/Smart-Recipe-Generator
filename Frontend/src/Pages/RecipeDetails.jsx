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
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/navbar";
import api from "../api/axiosInstance";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(null);

  //  Fetch recipe details
  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/api/recipes/${id}`);

      setRecipe(res.data.recipe);
      setIsFavorite(res.data.isFavorite);

      const userId = localStorage.getItem("userId");
      const ratingObj = res.data.recipe.ratings?.find(
        (r) => r.user.toString() === userId
      );
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

  //  Toggle Favorite
  const handleFavorite = async () => {
    try {
      await api.patch(`/api/recipes/${id}/favorite`);
      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  //  Rate Recipe
  const handleRating = async (newValue) => {
    if (newValue === userRating) return;

    setUserRating(newValue);
    try {
      await api.patch(`/api/recipes/${id}/rate`, { rating: newValue });
      fetchRecipe();
    } catch (err) {
      console.error("Failed to rate recipe:", err);
    }
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

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#E3F2FD,#E8EAF6)" }}>
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
            style={{ width: "100%", height: "350px", objectFit: "cover" }}
          />

          <Box sx={{ p: 4 }}>
            {/* TITLE + FAVORITE BUTTON */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4" fontWeight={800}>
                {recipe.name}
              </Typography>

              <Button
                onClick={handleFavorite}
                startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
            </Box>

            {/* RATING */}
            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <Rating value={userRating || 0} onChange={(e, v) => handleRating(v)} />
              <Typography color="text.secondary">
                {recipe.averageRating
                  ? `(${recipe.averageRating.toFixed(1)})`
                  : "(No ratings yet)"}
              </Typography>
            </Box>

            {/* Cooking time + diet */}
            <Typography mt={2} color="text.secondary">
              ⏳ {recipe.cookingTime} mins • 🍽️ {recipe.difficulty} • 🥗{" "}
              {recipe.dietPreference}
            </Typography>

            {/*  NUTRITION SECTION */}
            {recipe.nutrition && (
              <>
                <Typography variant="h6" mt={4} fontWeight={700}>
                  Nutrition (per serving)
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <Chip label={`Calories: ${recipe.nutrition.calories}`} color="secondary" />
                  <Chip label={`Protein: ${recipe.nutrition.protein}g`} color="primary" />
                  <Chip label={`Carbs: ${recipe.nutrition.carbs}g`} color="success" />
                  <Chip label={`Fat: ${recipe.nutrition.fat}g`} color="warning" />
                </Box>
              </>
            )}

            {/* INGREDIENTS */}
            <Typography variant="h6" mt={4} fontWeight={700}>
              Ingredients
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {recipe.ingredients.map((ing, index) => (
                <Chip key={index} label={ing} color="primary" />
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
