const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

// Optional Google Vision usage
const useVision = process.env.USE_GOOGLE_VISION === "true";
let visionClient = null;
if (useVision) {
  try {
    const vision = require("@google-cloud/vision");
    visionClient = new vision.ImageAnnotatorClient();
  } catch (err) {
    console.warn("Google Vision not installed or configured. Falling back to mock detection.");
  }
}

// simple keyword label list for fallback
const LABELS = [
  "tomato","onion","potato","garlic","ginger","spinach","carrot","apple","banana","mango",
  "chicken","egg","paneer","tofu","rice","bread","cheese", "milk"
];

const detectWithVision = async (filePath) => {
  const [result] = await visionClient.labelDetection(filePath);
  const labels = result.labelAnnotations || [];
  const found = labels.map(l => l.description.toLowerCase());
  return LABELS.filter(lbl => found.includes(lbl));
};

const mockDetect = async (filePath) => {
  const fname = filePath.toLowerCase();
  const found = LABELS.filter(lbl => fname.includes(lbl));
  if (found.length) return found;
  return LABELS.slice(0, 5).filter((_, i) => Math.random() > 0.4).slice(0,3);
};

router.post("/detect-ingredients", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No image uploaded" });

    const filePath = file.path;

    let ingredients = [];
    if (useVision && visionClient) {
      try {
        ingredients = await detectWithVision(filePath);
      } catch (err) {
        console.error("Vision error:", err);
        ingredients = await mockDetect(filePath);
      }
    } else {
      ingredients = await mockDetect(filePath);
    }

    setTimeout(() => {
      try { fs.unlinkSync(filePath); } catch(e){/*ignore*/ }
    }, 60 * 1000);

    res.json({ ingredients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
