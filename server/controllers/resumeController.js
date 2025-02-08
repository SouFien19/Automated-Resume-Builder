const Resume = require("../models/Resume");

// Ajouter un CV
exports.addResume = async (req, res) => {
  try {
    const { content } = req.body;
    const resume = new Resume({ 
      user: req.user.id,  // Utilisez le champ "user" (pas "userId")
      content 
    });
    
    await resume.save();
    res.status(201).json(resume);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir les CV de l'utilisateur
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });  // Correction du champ de recherche
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};