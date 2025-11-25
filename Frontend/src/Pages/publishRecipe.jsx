import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Chip,
  Typography,
  Container,
  Paper,
  MenuItem,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import axios from "axios";

const difficulties = ["Easy", "Medium", "Hard"];
const diets = ["Vegetarian", "Vegan", "Non-Vegetarian", "Keto", "Gluten-Free"];

const PublishRecipe = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [instructionInput, setInstructionInput] = useState("");
  const [instructions, setInstructions] = useState([]);

  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [dietPreference, setDietPreference] = useState("");

  const [nutrition, setNutrition] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, []);

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    setIngredients((prev) => [...prev, ingredientInput.trim()]);
    setIngredientInput("");
  };

  const addInstruction = () => {
    if (!instructionInput.trim()) return;
    setInstructions((prev) => [...prev, instructionInput.trim()]);
    setInstructionInput("");
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewImg(URL.createObjectURL(file));
  };

  const handlePublish = async () => {
    if (!name || !imageFile || ingredients.length === 0 || instructions.length === 0) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("instructions", JSON.stringify(instructions));
      formData.append("cookingTime", cookingTime);
      formData.append("difficulty", difficulty);
      formData.append("dietPreference", dietPreference);
      formData.append("nutrition", JSON.stringify(nutrition));

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/publish`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to publish recipe");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#dfe9f3,#ffffff)" }}>
      <Navbar />

      <Container sx={{ mt: 10, mb: 7, maxWidth: "1100px" }}>
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: "28px",
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={900}
            textAlign="center"
            sx={{
              background: "linear-gradient(45deg,#1e88e5,#6a1b9a)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 5,
            }}
          >
            Publish Your Own Recipe ✨
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 5,
            }}
          >
            <Box>
              <TextField
                label="Recipe Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
              />

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  py: 1.4,
                  borderRadius: "16px",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Upload Dish Image
                <input type="file" accept="image/*" hidden onChange={handleImageSelect} />
              </Button>

              {previewImg && (
                <Box
                  sx={{
                    height: 240,
                    borderRadius: "18px",
                    overflow: "hidden",
                    mb: 3,
                    boxShadow: "0px 6px 25px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src={previewImg}
                    alt="Recipe Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              )}

              <TextField
                label="Cooking Time (mins)"
                fullWidth
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                select
                label="Difficulty"
                fullWidth
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                sx={{ mb: 3 }}
              >
                {difficulties.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Diet Preference"
                fullWidth
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value)}
              >
                {diets.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>

              <Divider sx={{ my: 3 }} />

              <Typography fontWeight={700} mb={1}>
                Nutrition (per serving)
              </Typography>

              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                {["calories", "protein", "carbs", "fat"].map((field) => (
                  <TextField
                    key={field}
                    label={field}
                    type="number"
                    value={nutrition[field]}
                    onChange={(e) =>
                      setNutrition({ ...nutrition, [field]: e.target.value })
                    }
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography fontWeight={700} mb={1}>
                Ingredients
              </Typography>

              <Box display="flex" gap={2} mb={2}>
                <TextField
                  fullWidth
                  label="Add Ingredient"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                />
                <Button variant="contained" onClick={addIngredient}>
                  Add
                </Button>
              </Box>

              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                {ingredients.map((ing, i) => (
                  <Chip
                    key={i}
                    label={ing}
                    onDelete={() => setIngredients(ingredients.filter((_, x) => x !== i))}
                    color="primary"
                  />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography fontWeight={700} mb={1}>
                Instructions — Step by Step
              </Typography>

              <Box display="flex" gap={2} mb={2}>
                <TextField
                  fullWidth
                  label="Add Instruction"
                  value={instructionInput}
                  onChange={(e) => setInstructionInput(e.target.value)}
                />
                <Button variant="outlined" onClick={addInstruction}>
                  Add
                </Button>
              </Box>

              <Box display="flex" flexDirection="column" gap={1.5} mb={4}>
                {instructions.map((step, i) => (
                  <Paper
                    key={i}
                    sx={{
                      p: 1.5,
                      borderRadius: "14px",
                      background: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <strong>Step {i + 1}:</strong> {step}
                  </Paper>
                ))}
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: 1.4,
                  fontSize: "1.1rem",
                  borderRadius: "16px",
                  textTransform: "none",
                  fontWeight: 700,
                  background: "linear-gradient(45deg,#1e88e5,#6a1b9a)",
                }}
                onClick={handlePublish}
                disabled={loading}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : " Publish Recipe"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PublishRecipe;
