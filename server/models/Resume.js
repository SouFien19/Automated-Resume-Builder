const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  summary: { type: String, default: "" },
  contact: { type: String, default: "" },
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
  }],
  skills: [{ type: String }], // Liste de compétences
  experiences: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
  }],
  projects: [{
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
  }],
  languages: [{
    language: { type: String, required: true },
    proficiency: { type: String, required: true } // Ex: Débutant, Intermédiaire, Avancé
  }],
  customSections: [{ // Section personnalisée (non obligatoire)
    sectionName: { type: String, required: true },
    content: { type: String, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Resume", ResumeSchema);