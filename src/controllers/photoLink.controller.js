const PhotoLink = require("../models/PhotoLink");

// POST - Add Photo Link
const createPhotoLink = async (req, res) => {
  try {
    const { title, linkUrl, description } = req.body;

    // Check required fields
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof linkUrl !== "string" ||
      !linkUrl.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and link URL are required"
      });
    }

    // Validate URL
    let parsedUrl;

    try {
      parsedUrl = new URL(linkUrl.trim());
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL"
      });
    }

    // Allow only HTTP and HTTPS
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        success: false,
        message: "Only HTTP and HTTPS URLs are allowed"
      });
    }

    const photoLink = await PhotoLink.create({
      title: title.trim(),
      linkUrl: linkUrl.trim(),
      description: typeof description === "string"
        ? description.trim()
        : ""
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
