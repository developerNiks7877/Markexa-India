
const Photo = require("../models/Photo");

// POST - Add Photo
const createPhoto = async (req, res) => {
  try {
    const { title, description } = req.body || {};

    // Check required fields
    if (!title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title and image are required",
      });
    }

    // Upload image to Cloudinary
    const cloudinary = require("../config/cloudinary.config");

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "markexa/photos",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    // Save Cloudinary details in MongoDB
    const photo = await Photo.create({
      title,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Photo uploaded and saved successfully",
      data: photo,
    });

  } catch (error) {
    console.error("Create photo error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload and save photo",
    });
  }
};

// GET - Fetch Photos
const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({ isActive: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Photos fetched successfully",
      count: photos.length,
      data: photos,
    });

  }catch (error) {
    console.error("PHOTO UPLOAD ERROR:", error);

    return res.status(500).json({
        success: false,
        message: error.message
    });
}
};

module.exports = {
  createPhoto,
  getPhotos,
};
