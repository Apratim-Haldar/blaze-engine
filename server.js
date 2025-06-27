// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Correctly require the routes from the @blaze-case-ai/blaze-engine package
const caseTypeRoute = require("./node_modules/@blaze-case-ai/blaze-engine/server/route/case-type-route");
const caseRoute = require("./node_modules/@blaze-case-ai/blaze-engine/server/route/case-route");
const componentRoute = require("./node_modules/@blaze-case-ai/blaze-engine/server/route/component-route");
const dataModelRoute = require('./node_modules/@blaze-case-ai/blaze-engine/server/route/data-model-route');

const authRoutes = require("./node_modules/@blaze-case-ai/blaze-engine/server/controller/auth-controller");
const requireAuth = require("./node_modules/@blaze-case-ai/blaze-engine/server/middleware/auth-middleware");


// MongoDB connection
const dbURI = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Serve static files from the "client/public" directory
app.use(express.static(path.join(__dirname, "client/public")));

// Serve node_modules from the root path
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Route for the root of your application
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

app.use("/src", express.static(path.join(__dirname, "client/src")));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api",  caseTypeRoute);
app.use("/api", caseRoute);
app.use("/api", componentRoute);
app.use("/api",  dataModelRoute);

// Enable CORS for http://localhost:5173

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});