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
      const raw = process.env.FRONTEND_URL || "http://localhost:5173,https://apni-kitchen.netlify.app";
      const allowed = raw.split(",").map((u) => u.trim().replace(/\/$/, ""));

      // Allow non-browser requests (e.g. curl, server-to-server) where origin is undefined
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, "");
      if (allowed.includes(normalized)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/rate", ratingRoutes);
app.use("/api", aiRoutes);

export default app;
