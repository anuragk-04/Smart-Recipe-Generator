import React, { useEffect, useState } from "react";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import Navbar from "../Components/navbar";
import api from "../api/axiosInstance";
import RecipeCard from "../Components/recipeCard";
import { useNavigate } from "react-router-dom";

const FavouritePage = () => {
  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/api/favorites");
      console.log("Favorite response:", res.data);

      setFavorites(res.data.recipes || []);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) navigate("/");
    else fetchFavorites();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#E3F2FD,#E8EAF6)",
      }}
    >
      <Navbar />

      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={3}>
          Your Favorites ❤️
        </Typography>

        {loading && (
          <Box textAlign="center" mt={5}>
            <CircularProgress size={45} />
          </Box>
        )}

        {!loading && favorites.length > 0 && (
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
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onClick={() => navigate(`/recipe/${recipe._id}`)}
              />
            ))}
          </Box>
        )}

        {!loading && favorites.length === 0 && (
          <Typography variant="h6" color="text.secondary" mt={3}>
            You haven’t added any favorites yet — explore and save recipes ✨
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default FavouritePage;
