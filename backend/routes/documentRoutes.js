const express = require('express');
const router = express.Router();

// Controller aur Multer config import karein
const { uploadDocument, getDocumentsByCase } = require('../controllers/documentController');
const upload = require('../config/multerConfig');
const { protect } = require('../middleware/authMiddleware');

// Routes define karein

// POST /api/documents - File upload karega (Sirf logged in user)
// Note: Yahan hum 'upload.single('document')' use kar rahe hain. 
// Frontend se file hamesha 'document' naam ke field mein aayegi.
router.post('/', protect, upload.single('document'), uploadDocument);

// GET /api/documents/case/:caseId - Kisi case ke saare documents layega
router.get('/case/:caseId', protect, getDocumentsByCase);

module.exports = router;