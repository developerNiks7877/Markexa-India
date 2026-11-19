const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const healthRoutes = require("./routes/health.routes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
// const enquiryLimiter = require("./middlewares/enquiryLimiter");
const contactRouter = require("./routes/contact.routes");
const videoRoutes = require("./routes/video.routes");
const photoRoutes = require("./routes/photo.routes");
const photoLinkRoutes = require("./routes/photoLink.routes");
const teamMemberRoutes = require("./routes/teamMember.routes");
const mediaRoutes = require("./routes/media.routes");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Rate Limiter
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: "10",
  message: {
    success: false,
    message: "Too many enquiries. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security Headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

// JSON Parser
app.use(express.json({ limit: "10kb" }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", limiter);

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL }));


app.use(express.json({ limit: "10kb" }));

//api router
app.use(express.json({ limit: "10kb" }));

// Contact API + Rate Limiter
app.use(
  "/api/contact",
  (req, res, next) => {
    console.log("Rate limiter middleware reached:", req.ip);
    next();
  },
  enquiryLimiter,
  contactRouter,
);
// app.use("/api/contact", enquiryLimiter);

app.use("/api/health", healthRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/photos-links", photoLinkRoutes);
app.use("/api/team", teamMemberRoutes);
app.use("/api/media", mediaRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
