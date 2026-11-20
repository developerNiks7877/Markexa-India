const mongoose = require("mongoose");
const Photo = require("../models/Photo");
const Service = require("../models/Service");
const cloudinary = require("../config/cloudinary.config");

// POST - Add Photo
const createPhoto = async (req, res) => {
  let uploadedPublicId = null;

  try {
    const { title, description, serviceId, section, alt } = req.body;

    // Check required fields
    if (!title || !serviceId || !section || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title and image are required",
        received: {
          title: !!title,
          serviceId: !!serviceId,
          section: !!section,
          file: !!req.file,
        },
      });
    }

    // Validate Service ID
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    // Validate section
    const allowedSections = ["hero", "gallery", "team", "portfolio"];

    if (!allowedSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid section",
      });
    }

    // Validate image type
    if (!req.file.mimetype?.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed",
      });
    }

    // Check image size (5 MB)
    const maxFileSize = 5 * 1024 * 1024;

    if (req.file.size > maxFileSize) {
      return res.status(400).json({
        success: false,
        message: "Image size must not exceed 5 MB",
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `markexa/photos/services/${service.slug}/${section}`,
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

    uploadedPublicId = result.public_id;

    // Save Cloudinary details in MongoDB
    const photo = await Photo.create({
      title,
      alt,
      description,
      serviceId,
      section,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    return res.status(201).json({
      success: true,
      message: "Photo uploaded and saved successfully",
      data: photo,
    });
  } catch (error) {
    console.error("Create photo error:", error.message);

    // Delete Cloudinary image if MongoDB save fails
    if (uploadedPublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedPublicId, {
          resource_type: "image",
        });
      } catch (deleteError) {
        console.error("Cloudinary cleanup error:", deleteError.message);
      }
    }

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
      .populate("serviceId", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Photos fetched successfully",
      count: photos.length,
      data: photos,
    });
  } catch (error) {
    console.error("Fetch photos error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch photos",
    });
  }
};

module.exports = {
  createPhoto,
  getPhotos,
};
