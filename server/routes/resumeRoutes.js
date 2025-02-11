const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { addResume, getResumes, updateResume, deleteResume } = require("../controllers/resumeController");

/**
 * @swagger
 * /resumes/addResume:
 *   post:
 *     description: Add a resume for the authenticated user
 *     tags:
 *       - Resumes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               summary:
 *                 type: string
 *               contact:
 *                 type: object
 *               education:
 *                 type: object
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               experiences:
 *                 type: array
 *                 items:
 *                   type: string
 *               projects:
 *                 type: array
 *                 items:
 *                   type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               customSections:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Resume created successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /resumes:
 *   get:
 *     description: Get all resumes of the authenticated user
 *     tags:
 *       - Resumes
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of resumes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   resumeId:
 *                     type: string
 *                   summary:
 *                     type: string
 *                   contact:
 *                     type: object
 *                   education:
 *                     type: object
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 *                   experiences:
 *                     type: array
 *                     items:
 *                       type: string
 *                   projects:
 *                     type: array
 *                     items:
 *                       type: string
 *                   languages:
 *                     type: array
 *                     items:
 *                       type: string
 *                   customSections:
 *                     type: array
 *                     items:
 *                       type: string
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /resumes/{resumeId}:
 *   put:
 *     description: Update a specific resume of the authenticated user
 *     tags:
 *       - Resumes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
 *         required: true
 *         description: The ID of the resume to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               summary:
 *                 type: string
 *               contact:
 *                 type: object
 *               education:
 *                 type: object
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               experiences:
 *                 type: array
 *                 items:
 *                   type: string
 *               projects:
 *                 type: array
 *                 items:
 *                   type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               customSections:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /resumes/{resumeId}:
 *   delete:
 *     description: Delete a specific resume of the authenticated user
 *     tags:
 *       - Resumes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
 *         required: true
 *         description: The ID of the resume to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume deleted successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Internal server error
 */

router.post('/addResume', authMiddleware, addResume);
router.get("/", authMiddleware, getResumes);      
router.put("/:resumeId", authMiddleware, updateResume);  
router.delete("/:resumeId", authMiddleware, deleteResume); 

module.exports = router;
