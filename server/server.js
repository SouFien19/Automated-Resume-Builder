const express = require("express");
const connectDB = require("./config/db");
const Userauth = require("./routes/auth");
const resumeRoutes = require("./routes/resumeRoutes");
require("dotenv").config();

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", Userauth);
app.use("/api/resumes", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
