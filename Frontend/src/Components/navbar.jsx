import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favorites"); // if stored

    navigate("/"); // redirect to login
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <Box
        sx={{
          width: "100%",
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          bgcolor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{
            background: "linear-gradient(45deg, #3f51b5, #2196f3)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onClick={() => navigate("/home")}
        >
          SmartRecipe
        </Typography>

        {/* DESKTOP MENU */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<SparklesIcon />}
            onClick={() => navigate("/generateRecipe")}
            sx={{ textTransform: "none", fontSize: "1rem" }}
          >
            Generate Recipe
          </Button>

          <Button
            startIcon={<FavoriteIcon />}
            onClick={() => navigate("/favourite")}
            sx={{ textTransform: "none", fontSize: "1rem" }}
          >
            Favorites
          </Button>

          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}   // ✅ Logout function
            sx={{ textTransform: "none", fontSize: "1rem" }}
          >
            Logout
          </Button>
        </Box>

        {/* MOBILE MENU ICON */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 260,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              mb: 2,
              background: "linear-gradient(45deg, #3f51b5, #2196f3)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Menu
          </Typography>

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/generateRecipe")}>
                <SparklesIcon sx={{ mr: 1 }} />
                <ListItemText primary="Generate Recipe" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/favourite")}>
                <FavoriteIcon sx={{ mr: 1 }} />
                <ListItemText primary="Favorites" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
