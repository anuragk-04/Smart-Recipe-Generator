import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const RecipeCard = ({ recipe, onClick }) => {
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
  );
};

export default RecipeCard;
