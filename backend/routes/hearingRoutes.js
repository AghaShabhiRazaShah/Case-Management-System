const express = require('express');
const router = express.Router();

// Controller se functions import karein
const { 
  createHearing, 
  getHearingsByCase, 
  updateHearing, 
  deleteHearing 
} = require('../controllers/hearingController');

// Middleware (Security Guard) import karein
const { protect } = require('../middleware/authMiddleware');

// Routes define karein

// POST /api/hearings - Nayi hearing add karega (Sirf logged in user)
router.post('/', protect, createHearing);

// GET /api/hearings/case/:caseId - Kisi specific case ki saari hearings layega
// Example: /api/hearings/case/64f123...
router.get('/case/:caseId', protect, getHearingsByCase);

// PUT /api/hearings/:id - Hearing update karega
router.put('/:id', protect, updateHearing);

// DELETE /api/hearings/:id - Hearing delete karega
router.delete('/:id', protect, deleteHearing);

module.exports = router;