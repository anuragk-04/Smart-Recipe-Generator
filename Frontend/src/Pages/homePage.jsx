import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import api from "../api/axiosInstance";
import RecipeCard from "../Components/recipeCard";

const HomePage = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [dietFilter, setDietFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  // Load recommended recipes on page mount
  useEffect(() => {
    const fetchHomeRecipes = async () => {
      try {
        const res = await api.get("/api/recipes/recommended");
        setRecipes(res.data.recipes || []);
      } catch (err) {
        console.error("Failed to fetch home recipes:", err);
      }
      setLoading(false);
    };

    fetchHomeRecipes();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #E3F2FD, #E8EAF6)",
        pb: 10,
      }}
    >
      <Navbar />

      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            background: "linear-gradient(45deg, #1e88e5, #6a1b9a)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 2,
          }}
        >
          Welcome to Apni Kitchen 🍽️
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: "700px",
            mx: "auto",
            lineHeight: 1.6,
            mb: 4,
          }}
        >
          Explore personalized recipes based on your tastes 🌟
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<CameraAltIcon />}
          sx={{
            px: 4,
            py: 1.6,
            borderRadius: "14px",
            textTransform: "none",
            fontSize: "1.1rem",
          }}
          onClick={() => navigate("/generateRecipe")}
        >
          Generate Recipe
        </Button>
      </Container>

      {/* ---------------------------- Filters Section ---------------------------- */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Filters
        </Typography>

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", mb: 4 }}>
          
          <ToggleButtonGroup
            value={dietFilter}
            exclusive
            onChange={(e, v) => setDietFilter(v)}
            sx={{ flexWrap: "wrap" }}
          >
            <ToggleButton value="">All Diets</ToggleButton>
            <ToggleButton value="Vegetarian">Vegetarian</ToggleButton>
            <ToggleButton value="Vegan">Vegan</ToggleButton>
            <ToggleButton value="Gluten-Free">Gluten-Free</ToggleButton>
            <ToggleButton value="Dairy-Free">Dairy-Free</ToggleButton>
            <ToggleButton value="Keto">Keto</ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={difficultyFilter}
            exclusive
            onChange={(e, v) => setDifficultyFilter(v)}
            sx={{ flexWrap: "wrap" }}
          >
            <ToggleButton value="">All Levels</ToggleButton>
            <ToggleButton value="Easy">Easy</ToggleButton>
            <ToggleButton value="Medium">Medium</ToggleButton>
            <ToggleButton value="Hard">Hard</ToggleButton>
          </ToggleButtonGroup>

        </Box>

        {/* ---------------------------- Recommended Recipes ---------------------------- */}
        <Typography variant="h4" fontWeight={700} color="primary" mb={3}>
          Recommended for You 🍳
        </Typography>

        {/* Loader */}
        {loading && (
          <Box textAlign="center" mt={5}>
            <CircularProgress size={45} />
          </Box>
        )}

        {!loading && recipes.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {recipes
              .filter((r) =>
                dietFilter ? r.dietPreference === dietFilter : true
              )
              .filter((r) =>
                difficultyFilter ? r.difficulty === difficultyFilter : true
              )
              .map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  onClick={() => navigate(`/recipe/${recipe._id}`)}
                />
              ))}
          </Box>
        )}

        {!loading && recipes.length === 0 && (
          <Typography variant="h6" color="text.secondary" mt={3}>
            No recipes available yet — be the first to create one!
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
