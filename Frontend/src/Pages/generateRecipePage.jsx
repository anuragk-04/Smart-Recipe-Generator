import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Modal,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";

import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../Components/navbar";
import RecipeCard from "../Components/recipeCard";
import { useNavigate } from "react-router-dom";

import {
  ingredientCategories,
  dietOptions as originalDietOptions,
} from "../constants/ingredients";

// ⭐ ADDED → Remove "halal"
const dietOptions = originalDietOptions.filter(
  (d) => d.toLowerCase() !== "halal"
);

const GenerateRecipe = () => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [dietPreference, setDietPreference] = useState(null);

  // ⭐ ADDED — Difficulty state
  const [difficultyPreference, setDifficultyPreference] = useState(null);

  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedListIngredients, setSelectedListIngredients] = useState([]);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  // LOGIN CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleAddIngredient = () => {
    if (!ingredientInput.trim()) return;
    const formatted = ingredientInput.trim().toLowerCase();
    setIngredients((prev) =>
      prev.includes(formatted) ? prev : [...prev, formatted]
    );
    setIngredientInput("");
  };

  const handleRemoveIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDietChange = (_, value) => {
    setDietPreference(value);
  };

  // ⭐ ADDED — Difficulty handler
  const handleDifficultyChange = (_, value) => {
    setDifficultyPreference(value);
  };

  // IMAGE UPLOAD + AI INGREDIENT DETECTION (UNCHANGED)
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setImageLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/detect-ingredients`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const found = (res.data.ingredients || []).map((ing) =>
        ing.toLowerCase()
      );

      setDetectedIngredients(found);

      setIngredients((prev) => [...new Set([...prev, ...found])]);

      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("AI Ingredient Detection Failed:", err);
    }

    setImageLoading(false);
  };

  // Modal ingredient adding
  const handleAddFromList = () => {
    const lowercased = selectedListIngredients.map((i) => i.toLowerCase());
    setIngredients((prev) => [...new Set([...prev, ...lowercased])]);
    setSelectedListIngredients([]);
    setOpenModal(false);
  };

  // ⭐ UPDATED — include difficultyPreference
  const handleGenerate = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setRecipes([]);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/generate-smart`,
        {
          ingredients,
          dietPreference,
          difficulty: difficultyPreference, 
        },
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {}
      );

      setRecipes((res.data.recipes || []).slice(0, 4));
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E3F2FD, #E8EAF6)",
      }}
    >
      <Navbar />

      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            background: "linear-gradient(45deg, #1e88e5, #6a1b9a)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 3,
          }}
        >
          Generate Recipes
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Add ingredients manually, choose from a list, or upload an image.
        </Typography>

        {/* INGREDIENT INPUT AREA — UNCHANGED */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mb: 3,
          }}
        >
          <TextField
            label="Add Ingredient"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") handleAddIngredient();
            }}
            sx={{
              width: { xs: "100%", sm: "350px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{ borderRadius: "14px" }}
            onClick={handleAddIngredient}
          >
            Add
          </Button>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ borderRadius: "14px" }}
            onClick={() => setOpenModal(true)}
          >
            Add from List
          </Button>
        </Box>

        {/* INGREDIENT CHIPS — UNCHANGED */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
            mb: 4,
          }}
        >
          {ingredients.map((ing, index) => (
            <Chip
              key={index}
              label={ing}
              color="primary"
              onDelete={() => handleRemoveIngredient(index)}
            />
          ))}
        </Box>

        {/* AI DETECTOR SECTION — FULLY RESTORED */}
        <Paper
          sx={{
            p: 4,
            borderRadius: "22px",
            maxWidth: 650,
            mx: "auto",
            mb: 5,
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(18px)",
            boxShadow: "0px 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              mb: 3,
              textAlign: "center",
              fontSize: "1.4rem",
              background: "linear-gradient(45deg,#1e88e5,#6a1b9a)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            AI Ingredient Detector
          </Typography>

          <Box
            onClick={() => fileInputRef.current.click()}
            sx={{
              borderRadius: "20px",
              p: 4,
              border: "2px solid rgba(30,136,229,0.25)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,240,255,0.6))",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <ImageIcon sx={{ fontSize: 70, color: "#1e88e5" }} />
            <Typography fontSize="1rem" mt={1} fontWeight={600}>
              Upload or Drag Image Here
            </Typography>
            <Typography color="text.secondary" fontSize="0.9rem">
              Supported formats: JPG, PNG
            </Typography>

            <input type="file" hidden ref={fileInputRef} onChange={handleImageUpload} />
          </Box>

          {selectedImage && (
            <Box
              sx={{
                mt: 3,
                borderRadius: "18px",
                overflow: "hidden",
                width: "100%",
                height: 180,
                mx: "auto",
                boxShadow: "0px 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={selectedImage}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}

          {imageLoading && (
            <Box mt={2} textAlign="center">
              <CircularProgress size={35} />
            </Box>
          )}

          {detectedIngredients.length > 0 && !imageLoading && (
            <Box sx={{ mt: 3 }}>
              <Typography
                fontWeight={700}
                mb={1}
                sx={{ textAlign: "center", fontSize: "1.1rem" }}
              >
                AI Detected Ingredients ({detectedIngredients.length})
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {detectedIngredients.map((ing, index) => (
                  <Chip key={index} label={ing} color="secondary" />
                ))}
              </Box>
            </Box>
          )}
        </Paper>

        {/* DIET PREFERENCE (Halal Removed) */}
        <Typography variant="h6" fontWeight={700} mt={3} mb={1}>
          Dietary Preference
        </Typography>

        <ToggleButtonGroup
          exclusive
          value={dietPreference}
          onChange={handleDietChange}
          sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1.5, mb: 4 }}
        >
          {dietOptions.map((opt) => (
            <ToggleButton
              key={opt}
              value={opt}
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: "12px",
                textTransform: "none",
                "&.Mui-selected": {
                  backgroundColor: "#1e88e5",
                  color: "white",
                },
              }}
            >
              {opt}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* ⭐ NEW — DIFFICULTY FILTER */}
        <Typography variant="h6" fontWeight={700} mt={3} mb={1}>
          Difficulty Level
        </Typography>

        <ToggleButtonGroup
          exclusive
          value={difficultyPreference}
          onChange={handleDifficultyChange}
          sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1.5, mb: 4 }}
        >
          {["low", "medium", "high"].map((level) => (
            <ToggleButton
              key={level}
              value={level}
              sx={{
                px: 2.5,
                py: 1,
                borderRadius: "12px",
                textTransform: "capitalize",
                "&.Mui-selected": {
                  backgroundColor: "#6a1b9a",
                  color: "white",
                },
              }}
            >
              {level}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* GENERATE */}
        <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
  <Button
    variant="contained"
    sx={{ px: 5, py: 1.4, fontSize: "1.1rem", borderRadius: "14px" }}
    onClick={handleGenerate}
  >
    Find Recipes
  </Button>
</Box>


        {/* LOADING */}
        {loading && (
          <Box mt={4}>
            <CircularProgress size={40} />
          </Box>
        )}

        {/* RESULTS */}
        {!loading && recipes.length > 0 && (
          <Box
            sx={{
              mt: 5,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id || recipe.id}
                recipe={recipe}
                onClick={() =>
                  navigate(`/recipe/${recipe._id || recipe.id}`)
                }
              />
            ))}
          </Box>
        )}

        {/* EMPTY */}
        {!loading && recipes.length === 0 && (
          <Typography mt={4} color="text.secondary">
            No recipes yet — try adding ingredients or uploading an image.
          </Typography>
        )}
      </Container>

      {/* MODAL (UNCHANGED) */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper
          sx={{
            p: 4,
            width: "90%",
            maxWidth: 500,
            mx: "auto",
            mt: 10,
            borderRadius: "18px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={2}>
            Choose Ingredients
          </Typography>

          {Object.entries(ingredientCategories).map(([category, items]) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} color="primary">
                {category}
              </Typography>

              {items.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={selectedListIngredients.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedListIngredients((prev) => [...prev, item]);
                        } else {
                          setSelectedListIngredients((prev) =>
                            prev.filter((x) => x !== item)
                          );
                        }
                      }}
                    />
                  }
                  label={item}
                />
              ))}

              <Divider sx={{ my: 2 }} />
            </Box>
          ))}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
            onClick={handleAddFromList}
          >
            Add Selected
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};

export default GenerateRecipe;
