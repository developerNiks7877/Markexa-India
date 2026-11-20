
const mongoose = require("mongoose");

const photoLinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    linkUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PhotoLink", photoLinkSchema);
