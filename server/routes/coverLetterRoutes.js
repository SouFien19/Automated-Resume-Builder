const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { addCoverLetter, getCoverLetters, updateCoverLetter, deleteCoverLetter } = require("../controllers/coverLetterController");

// Routes protégées par le middleware d'authentification
router.post("/", authMiddleware, addCoverLetter);       
router.get("/", authMiddleware, getCoverLetters);     
router.put("/:coverLetterId", authMiddleware, updateCoverLetter);  
router.delete("/:coverLetterId", authMiddleware, deleteCoverLetter); 

module.exports = router;
