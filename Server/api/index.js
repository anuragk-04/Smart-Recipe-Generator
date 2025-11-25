import dotenv from "dotenv";
dotenv.config();

import app from "../app.js";
import connectDB from "../config/db.js";
import serverless from "serverless-http";

connectDB();

export default serverless(app);
