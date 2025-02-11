const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resumeRoutes");
const coverLetterRoutes = require("./routes/coverLetterRoutes");

const app = express();

// 🔌 Connexion à la base de données
connectDB();

// 🛠️ Middlewares
app.use(cors()); 
app.use(express.json()); 

// 🌍 Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/cover-letters", coverLetterRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Route de test
app.get("/api/ping", (req, res) => {
    res.json({ message: "Le serveur fonctionne correctement !" });
});

// ⚠️ Middleware de gestion des erreurs global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Une erreur est survenue sur le serveur !" });
});

// 🚀 Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
