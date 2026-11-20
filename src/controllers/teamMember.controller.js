
const TeamMember = require("../models/TeamMember");

// POST - Add Team Member
const createTeamMember = async (req, res) => {
  try {
    const { name, designation, imageUrl, description } = req.body;

    // Check required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof designation !== "string" ||
      !designation.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name and designation are required"
      });
    }

    // Validate image URL if provided
    if (imageUrl) {
      try {
        const parsedUrl = new URL(imageUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid image URL"
        });
      }
    }

    const teamMember = await TeamMember.create({
      name: name.trim(),
      designation: designation.trim(),
      imageUrl: imageUrl?.trim() || "",
      description: typeof description === "string"
        ? description.trim()
        : ""
    });

    return res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: teamMember
    });

  } catch (error) {
    console.error("Create team member error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to add team member"
    });
  }
};

// GET - Fetch Team Members
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Team members fetched successfully",
      count: teamMembers.length,
      data: teamMembers
    });

  } catch (error) {
    console.error("Get team members error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch team members"
    });
  }
};

module.exports = {
  createTeamMember,
  getTeamMembers
};
