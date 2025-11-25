import dotenv from "dotenv";
dotenv.config();

import app from "../app.js";
import connectDB from "../config/db.js";
import serverless from "serverless-http";

// Connect to DB once on cold start
connectDB();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default serverless(app);
