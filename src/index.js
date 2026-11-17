const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const healthRoutes = require("./routes/health.routes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const contactRouter = require("./routes/contact.routes");
const videoRoutes = require("./routes/video.routes");
const photoRoutes = require("./routes/photo.routes");
const photoLinkRoutes = require("./routes/photoLink.routes");
const teamMemberRoutes = require("./routes/teamMember.routes");
const mediaRoutes = require("./routes/media.routes");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());


app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRouter);
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
