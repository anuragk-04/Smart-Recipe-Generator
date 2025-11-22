import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );

      // Save token for authenticated requests
      localStorage.setItem("token", res.data.token);

      // Redirect user to homepage
      navigate("/home");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.message || "Login failed. Try again!"
      );
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #E3F2FD 0%, #EDE7F6 100%)",
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
          Welcome Back
        </Typography>

        <Typography
          textAlign="center"
          mb={4}
          color="text.secondary"
          sx={{ fontSize: "0.95rem" }}
        >
          Login to continue exploring smart recipes
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
            {errorMsg}
          </Alert>
        )}

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
          onSubmit={handleLogin}
        >
          {/* Email */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
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
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>

        <Typography
          mt={2}
          textAlign="right"
          color="primary"
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot Password?
        </Typography>

        <Typography mt={3} textAlign="center" variant="body2">
          Don’t have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{
              cursor: "pointer",
              fontWeight: 700,
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
