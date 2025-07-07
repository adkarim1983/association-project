const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Obtenir tous les projets
router.get("/", async (req, res) => {
  const projets = await Project.find();
  res.json(projets);
});

// Ajouter un projet
router.post("/", async (req, res) => {
  const nouveauProjet = new Project(req.body);
  await nouveauProjet.save();
  res.status(201).json(nouveauProjet);
});
 
module.exports = router;