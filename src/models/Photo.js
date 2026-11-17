const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    imageUrl: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Photo", photoSchema);