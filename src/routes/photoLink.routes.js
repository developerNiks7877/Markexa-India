const express = require("express");
const router = express.Router();

const {
  createPhotoLink,
  getPhotoLinks
} = require("../controllers/photoLink.controller");

router.post("/", createPhotoLink);
router.get("/", getPhotoLinks);

module.exports = router;