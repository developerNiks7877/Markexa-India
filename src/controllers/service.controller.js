
const Service = require("../models/Service");

// Create Service
const createService = async (req, res) => {
  try {
    const { name, slug } = req.body;

    // Check required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof slug !== "string" ||
      !slug.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required",
      });
    }

    // Validate slug format
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    if (!slugPattern.test(slug.trim())) {
      return res.status(400).json({
        success: false,
        message: "Slug must contain lowercase letters, numbers and hyphens only",
      });
    }

    // Check duplicate slug
    const existingService = await Service.findOne({
      slug: slug.trim(),
    });

    if (existingService) {
      return res.status(409).json({
        success: false,
        message: "Service with this slug already exists",
      });
    }

    const service = await Service.create({
      name: name.trim(),
      slug: slug.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("Create service error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
};

// Get Services
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

module.exports = {
  createService,
  getServices,
};
