const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController"); // but above file is a router — adjust

// if you used the above router implementation directly:
// require the file path correctly
module.exports = require("../controllers/imageController");
