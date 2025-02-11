const CoverLetter = require("../models/CoverLetter");

// Ajouter une lettre de motivation
exports.addCoverLetter = async (req, res) => {
  try {
    const { title, company, jobPosition, content } = req.body;

    const coverLetter = new CoverLetter({
      userId: req.user.id,
      title,
      company,
      jobPosition,
      content
    });

    await coverLetter.save();
    res.status(201).json(coverLetter);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir toutes les lettres de motivation de l'utilisateur
exports.getCoverLetters = async (req, res) => {
  try {
    const coverLetters = await CoverLetter.find({ userId: req.user.id });
    res.json(coverLetters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une lettre de motivation
exports.updateCoverLetter = async (req, res) => {
  try {
    const { coverLetterId } = req.params;
    const updateData = req.body;

    const coverLetter = await CoverLetter.findOneAndUpdate(
      { _id: coverLetterId, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!coverLetter) {
      return res.status(404).json({ message: "Lettre de motivation non trouvée ou accès refusé" });
    }

    res.json(coverLetter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une lettre de motivation
exports.deleteCoverLetter = async (req, res) => {
  try {
    const { coverLetterId } = req.params;

    const coverLetter = await CoverLetter.findOneAndDelete({ _id: coverLetterId, userId: req.user.id });

    if (!coverLetter) {
      return res.status(404).json({ message: "Lettre de motivation non trouvée ou accès refusé" });
    }

    res.json({ message: "Lettre de motivation supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
