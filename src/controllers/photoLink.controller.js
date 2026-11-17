const PhotoLink = require("../models/PhotoLink");

// POST - Add Photo Link
const createPhotoLink = async (req, res) => {
  try {
    const { title, linkUrl, description } = req.body;

    if (!title || !linkUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and link URL are required"
      });
    }

    const photoLink = await PhotoLink.create({
      title,
      linkUrl,
      description
    });

    return res.status(201).json({
      success: true,
      message: "Photo link added successfully",
      data: photoLink
    });

  } catch (error) {
    console.error("Create photo link error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to add photo link"
    });
  }
};

// GET - Fetch Photo Links
const getPhotoLinks = async (req, res) => {
  try {
    const photoLinks = await PhotoLink.find({ isActive: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Photo links fetched successfully",
      count: photoLinks.length,
      data: photoLinks
    });

  } catch (error) {
    console.error("Get photo links error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch photo links"
    });
  }
};

module.exports = {
  createPhotoLink,
  getPhotoLinks
};