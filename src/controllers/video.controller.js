
const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary.config");

// POST - Upload video and save details
const createVideo = async (req, res) => {
  let uploadedPublicId = null;

  try {
    const { title, description, thumbnailUrl } = req.body || {};

    // Check required fields
    if (
      typeof title !== "string" ||
      !title.trim() ||
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and video file are required"
      });
    }

    // Validate video file type
    if (!req.file.mimetype?.startsWith("video/")) {
      return res.status(400).json({
        success: false,
        message: "Only video files are allowed"
      });
    }

    // Check video size (100 MB)
    const maxFileSize = 100 * 1024 * 1024;

    if (req.file.size > maxFileSize) {
      return res.status(400).json({
        success: false,
        message: "Video size must not exceed 100 MB"
      });
    }

    // Validate thumbnail URL if provided
    if (thumbnailUrl) {
      try {
        const parsedUrl = new URL(thumbnailUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid thumbnail URL"
        });
      }
    }

    // Upload video to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "markexa/videos",
          resource_type: "video"
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    uploadedPublicId = result.public_id;

    // Save video details in MongoDB
    const video = await Video.create({
      title: title.trim(),
      description: typeof description === "string"
        ? description.trim()
        : "",
      videoUrl: result.secure_url,
      publicId: result.public_id,
      thumbnailUrl: thumbnailUrl?.trim() || ""
    });

    return res.status(201).json({
      success: true,
      message: "Video uploaded and saved successfully",
      data: video
    });

  } catch (error) {
    console.error("Create video error:", error.message);

    // Delete Cloudinary video if MongoDB save fails
    if (uploadedPublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedPublicId, {
          resource_type: "video"
        });
      } catch (deleteError) {
        console.error("Cloudinary cleanup error:", deleteError.message);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Failed to upload and save video"
    });
  }
};

// GET - Fetch videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isActive: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Videos fetched successfully",
      count: videos.length,
      data: videos
    });

  } catch (error) {
    console.error("Get videos error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch videos"
    });
  }
};

module.exports = {
  createVideo,
  getVideos
};
