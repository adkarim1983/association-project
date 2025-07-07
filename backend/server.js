const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "association" })
  .then(() => {
    console.log("MongoDB connected to 'association' database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
 
  //Endpoint for Creating Project
app.post("/api/projects", async (req, res) => {
  try {
    const Project = require("./models/Project");
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project" });
  }
});

// Endpoint for Fetching All Projects
app.get("/api/projects", async (req, res) => {
  try {
    const Project = require("./models/Project");
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Routes
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);
