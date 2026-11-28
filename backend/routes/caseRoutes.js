const express = require('express');
const router = express.Router();

// Controller se functions import karein
const { 
  createCase, 
  getCases, 
  getCaseById, 
  updateCase, 
  deleteCase 
} = require('../controllers/caseController');

// Middleware (Security Guard) import karein
const { protect } = require('../middleware/authMiddleware');

// Routes define karein
// Note: 'protect' middleware ko har route mein beech mein lagaya gaya hai.
// Matlab pehle token check hoga, phir controller ka function chalega.

// POST /api/cases - Naya case banayega (Sirf logged in user)
router.post('/', protect, createCase);

// GET /api/cases - Sab cases ki list layega (Sirf logged in user)
router.get('/', protect, getCases);

// GET /api/cases/:id - Ek specific case ki details layega
router.get('/:id', protect, getCaseById);

// PUT /api/cases/:id - Case ki details update karega
router.put('/:id', protect, updateCase);

// DELETE /api/cases/:id - Case ko delete karega
router.delete('/:id', protect, deleteCase);

module.exports = router;