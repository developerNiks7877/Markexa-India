const TeamMember = require("../models/TeamMember");

// POST - Add Team Member
const createTeamMember = async (req, res) => {
  try {
    const { name, designation, imageUrl, description } = req.body;

    if (!name || !designation) {
      return res.status(400).json({
        success: false,
        message: "Name and designation are required"
      });
    }

    const teamMember = await TeamMember.create({
      name,
      designation,
      imageUrl,
      description
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