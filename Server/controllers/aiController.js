import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const detectIngredients = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageBytes = fs.readFileSync(req.file.path);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // ✅ verified working
    });

    const prompt =
      "Identify the visible food ingredients in this image. Return ONLY a JSON array like [\"onion\", \"cheese\", \"tomato\"]. No explanation.";

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: imageBytes.toString("base64"),
        },
      },
      prompt,
    ]);

    let text = result.response.text();

    // ✅ Ensure valid JSON array returned
    const ingredients = JSON.parse(text);
    console.log(ingredients)

    res.json({ ingredients });
  } catch (err) {
    console.error("AI Detection Error:", err);
    res.status(500).json({ error: "AI ingredient detection failed" });
  }
};
