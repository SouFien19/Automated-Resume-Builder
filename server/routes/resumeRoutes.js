const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { addResume, getResumes } = require("../controllers/resumeController"); 

// Routes protégées par le middleware d'authentification
router.post("/", authMiddleware, addResume); 
router.get("/", authMiddleware, getResumes); 

module.exports = router;