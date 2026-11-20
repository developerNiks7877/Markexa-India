
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email"
      ]
    },

    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: 100
    },

    services: {
      type: [
        {
          type: String,
          enum: [
            "brand-identity",
            "web-design-development",
            "app-development",
            "graphic-design",
            "video-editing-motion",
            "social-media-marketing",
            "not-sure-yet"
          ]
        }
      ],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one service must be selected"
      }
    },

    budget: {
      type: String,
      enum: [
        "prefer-not-to-say",
        "under-1-lakh",
        "1-3-lakh",
        "3-10-lakh",
        "10-lakh-plus",
        "not-sure-yet"
      ],
      default: "prefer-not-to-say"
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000
    },

    timeline: {
      type: String,
      trim: true,
      default: "",
      maxlength: 50
    },

    status: {
      type: String,
      enum: ["new", "in_progress", "closed"],
      default: "new"
    },

    adminNotes: {
      type: String,
      trim: true,
      default: "",
      maxlength: 2000
    },

    emailStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;
