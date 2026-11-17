
const express = require("express");
const multer = require("multer");

const router = express.Router();

const { uploadMedia } = require("../controllers/media.controller");

// Store uploaded file temporarily in memory
const storage = multer.memoryStorage();

// Allow only images and videos
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/", "video/"];

    const isAllowed = allowedTypes.some(type =>
        file.mimetype.startsWith(type)
    );

    if (!isAllowed) {
        return cb(new Error("Only image and video files are allowed"));
    }

    cb(null, true);
};

// Configure Multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20 MB
    },
    fileFilter: fileFilter
});

// Upload API
router.post("/upload", upload.single("file"), uploadMedia);

module.exports = router;
