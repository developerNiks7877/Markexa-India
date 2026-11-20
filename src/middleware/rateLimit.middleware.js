
const rateLimit = require("express-rate-limit");

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,

  statusCode: 429,

  message: {
    success: false,
    message: "Too many enquiries. Please try again after 15 minutes."
  },

  standardHeaders: true,
  legacyHeaders: false
});

module.exports = enquiryLimiter;
