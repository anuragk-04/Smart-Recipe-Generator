import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

const app = express();

// Security & Performance Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(
  cors({

    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://apni-kitchen.netlify.app",
        "https://smart-recipe-generator-1-7i69.onrender.com",
        "https://smart-recipe-generator-u12o.onrender.com"
      ];

      if (process.env.FRONTEND_URL) {
        allowedOrigins.push(...process.env.FRONTEND_URL.split(",").map(u => u.trim()));
      }

      // Allow non-browser requests (e.g. curl, server-to-server) where origin is undefined
      if (!origin) return callback(null, true);

      const normalized = origin.replace(/\/$/, "");
      if (allowedOrigins.some(allowed => normalized === allowed.replace(/\/$/, ""))) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin); // Log blocked origins for debugging
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running", dbStatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" });
});

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/rate", ratingRoutes);
app.use("/api", aiRoutes);

export default app;
