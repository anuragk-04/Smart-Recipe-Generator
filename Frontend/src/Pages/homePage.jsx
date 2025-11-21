import React from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";

const HomePage = ({ recommendedRecipes = [] }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        background: "linear-gradient(135deg, #E3F2FD, #E8EAF6)",
        pb: 10,
      }}
    >
      {/* NAVBAR */}
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
          Discover Recipes Tailored to You
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
          Personalized recipe suggestions based on your liked recipes,
          ingredients, and preferences — powered by smart matching.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
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
        </Box>
      </Container>

      {/* SECTION HEADER */}
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={3}>
          Your Personalized Picks
        </Typography>

        {recommendedRecipes.length > 0 ? (
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
              overflowX: "hidden",
            }}
          >
            {recommendedRecipes.map((recipe) => (
              <Paper
                key={recipe.id}
                elevation={4}
                sx={{
                  p: 2,
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "transform 0.25s ease",
                  transform: "translateZ(0)",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "18px",
                  }}
                />

                <Typography variant="h6" fontWeight={700} mt={2}>
                  {recipe.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {recipe.cookingTime} mins • {recipe.difficulty}
                </Typography>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography variant="h6" color="text.secondary" mt={3}>
            Add recipes to your favorites to get personalized recommendations!
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
