const { z } = require("zod");

const enquirySchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),

  email: z.string()
    .trim()
    .email("Please enter a valid email"),

  company: z.string()
    .trim()
    .max(100, "Company cannot exceed 100 characters")
    .optional(),

  services: z.array(
    z.enum([
      "brand-identity",
      "web-design-development",
      "app-development",
      "graphic-design",
      "video-editing-motion",
      "social-media-marketing",
      "not-sure-yet"
    ])
  ).min(1, "Select at least one service"),

  budget: z.enum([
    "prefer-not-to-say",
    "under-1-lakh",
    "1-3-lakh",
    "3-10-lakh",
    "10-lakh-plus",
    "not-sure-yet"
  ]).optional(),

  message: z.string()
    .trim()
    .min(10, "Message must contain at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),

  timeline: z.string()
    .trim()
    .max(50, "Timeline cannot exceed 50 characters")
    .optional()
});

module.exports = enquirySchema;
