
const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  createVideo,
  getVideos
} = require("../controllers/video.controller");

// Store video temporarily in memory
const storage = multer.memoryStorage();

// Allow only video files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024
  },
  fileFilter
});

router.post("/", upload.single("file"), createVideo);


router.get("/", getVideos);

module.exports = router;
