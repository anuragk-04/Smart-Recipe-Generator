import React from "react";
import { Paper, Typography, Box, Rating } from "@mui/material";

import fallbackImg from "../assets/Recipes-Fallback.png";

const RecipeCard = ({ recipe, onClick }) => {

  // Replaces the recipe image with a fallback if the original fails to load
  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = fallbackImg;
  };

  return (
    <Paper
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
      onClick={onClick}
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        onError={handleImageError}
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

      <Box display="flex" alignItems="center" gap={0.7} mt={0.5}>
        <Rating
          value={recipe.averageRating || 0}
          readOnly
          precision={0.1}
          size="small"
        />
        <Typography variant="body2" fontWeight={600}>
          {recipe.averageRating ? recipe.averageRating.toFixed(1) : "0.0"}
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" mt={0.5}>
        {recipe.cookingTime} mins • {recipe.difficulty}
      </Typography>
    </Paper>
  );
};

export default RecipeCard;
