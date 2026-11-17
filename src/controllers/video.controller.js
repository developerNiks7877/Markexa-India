
const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary.config");

// POST - Upload video and save details
const createVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl } = req.body || {};

    if (!title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title and video file are required"
      });
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

    // Save video details in MongoDB
    const video = await Video.create({
      title,
      description,
      videoUrl: result.secure_url,
      publicId: result.public_id,
      thumbnailUrl: thumbnailUrl || ""
    });

    return res.status(201).json({
      success: true,
      message: "Video uploaded and saved successfully",
      data: video
    });

  } catch (error) {
    console.error("Create video error:", error);

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
    console.error("Get videos error:", error);

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
