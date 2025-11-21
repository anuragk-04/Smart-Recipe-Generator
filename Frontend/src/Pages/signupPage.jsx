import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #E3F2FD 0%, #EDE7F6 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: 420,
          borderRadius: "20px",
          p: 4,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.4)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          mb={3}
          sx={{
            background: "linear-gradient(45deg, #1e88e5, #6a1b9a)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Create Account
        </Typography>

        <Typography
          textAlign="center"
          mb={4}
          color="text.secondary"
          sx={{ fontSize: "0.95rem" }}
        >
          Join SmartRecipe to explore personalized meals & AI suggestions
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={3}>
          {/* Full Name */}
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              py: 1.4,
              fontSize: "1.05rem",
              borderRadius: "14px",
              textTransform: "none",
              background: "linear-gradient(45deg, #1e88e5, #6a1b9a)",
              "&:hover": {
                background: "linear-gradient(45deg, #1976d2, #5e35b1)",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography mt={3} textAlign="center" variant="body2">
          Already have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{
              cursor: "pointer",
              fontWeight: 700,
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/")}
          >
            Log In
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
