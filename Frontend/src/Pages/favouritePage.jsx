import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

import Navbar from "../Components/navbar";
import RecipeCard from "../Components/recipeCard";
import axios from "axios";

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch user's favorite recipes from backend
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/recipes/favorites"
        );
        setFavoriteRecipes(res.data.favorites || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E3F2FD, #E8EAF6)",
      }}
    >
      <Navbar />

      <Container sx={{ mt: 8 }}>
        {/* TITLE */}
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            background: "linear-gradient(45deg,#1e88e5,#6a1b9a)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 4,
            textAlign: "center",
          }}
        >
          Your Favorite Recipes
        </Typography>

        {/* LOADING */}
        {loading && (
          <Box textAlign="center" mt={4}>
            <CircularProgress size={40} />
          </Box>
        )}

        {/* EMPTY STATE */}
        {!loading && favoriteRecipes.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              mt: 6,
              color: "text.secondary",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/7079/7079383.png"
              alt="empty"
              width="160"
              style={{ opacity: 0.8 }}
            />
            <Typography variant="h6" mt={2} fontWeight={600}>
              No favorite recipes yet
            </Typography>
            <Typography>
              Explore recipes and mark the ones you love ❤️
            </Typography>
          </Box>
        )}

        {/* FAVORITES GRID */}
        {!loading && favoriteRecipes.length > 0 && (
          <Box
            sx={{
              mt: 4,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Favorites;
