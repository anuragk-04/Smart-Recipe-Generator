import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // loads .env

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: "Say hello in one sentence." }],
        },
      ],
    });

    console.log("✅ Gemini Response:\n", result.response.text());
  } catch (err) {
    console.error("❌ API Error:\n", err);
  }
}

testGemini();
