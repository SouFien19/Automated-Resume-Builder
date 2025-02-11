const Resume = require("../models/Resume");

// Ajouter un CV
exports.addResume = async (req, res) => {
    try {
        const { summary, contact, education, skills, experiences, projects, languages, customSections } = req.body;

        // Vérifier si l'utilisateur est bien connecté
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Utilisateur non authentifié. Veuillez vous connecter." });
        }

        const resume = new Resume({
            userId: req.user.id, // Associer le CV à l'utilisateur connecté
            summary,
            contact,
            education,
            skills,
            experiences,
            projects,
            languages,
            customSections
        });

        await resume.save();
        res.status(201).json(resume);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir tous les CV de l'utilisateur connecté
exports.getResumes = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Utilisateur non authentifié. Veuillez vous connecter." });
        }

        const resumes = await Resume.find({ userId: req.user.id });
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un CV
exports.updateResume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const updateData = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Utilisateur non authentifié. Veuillez vous connecter." });
        }

        const resume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId: req.user.id }, // Vérification que l'utilisateur possède ce CV
            updateData,
            { new: true, runValidators: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "CV non trouvé ou accès refusé" });
        }

        res.json(resume);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un CV
exports.deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Utilisateur non authentifié. Veuillez vous connecter." });
        }

        const resume = await Resume.findOneAndDelete({ _id: resumeId, userId: req.user.id });

        if (!resume) {
            return res.status(404).json({ message: "CV non trouvé ou accès refusé" });
        }

        res.json({ message: "CV supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
