
const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  createPhoto,
  getPhotos
} = require("../controllers/photo.controller");

// Store image temporarily in memory
const storage = multer.memoryStorage();

// Allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Configure Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  fileFilter: fileFilter
});

// POST - Upload and save photo
router.post("/", upload.single("file"), createPhoto);

// GET - Fetch photos
router.get("/", getPhotos);

module.exports = router;
