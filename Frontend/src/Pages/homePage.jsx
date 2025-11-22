import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
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

  // ✅ Redirect if user isn’t logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  // ✅ Fetch all recipes sorted: favorites → rating → newest
  useEffect(() => {
    const fetchHomeRecipes = async () => {
      try {
        const res = await api.get("/api/recipes/recommended");
        console.log(res);
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

      {/* HERO SECTION */}
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
          Welcome to SmartRecipe 🍽️
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
          Explore every recipe — starting with your favorites, top-rated dishes,
          and exciting new finds 🎯
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

      {/* ALL RECIPES SECTION */}
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={3}>
          All Recipes — Personalized Order 🍳
        </Typography>

        {/* Loading Spinner */}
        {loading && (
          <Box textAlign="center" mt={5}>
            <CircularProgress size={45} />
          </Box>
        )}

        {/* Recipes Grid */}
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
              maxWidth: "100%",
            }}
          >
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onClick={() => navigate(`/recipe/${recipe._id}`)}
              />
            ))}
          </Box>
        )}

        {/* Empty state */}
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
