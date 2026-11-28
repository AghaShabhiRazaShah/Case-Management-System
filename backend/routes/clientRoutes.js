const express = require('express');
const router = express.Router();

// Controller se functions import karein
const { 
  createClient, 
  getClients, 
  getClientById, 
  updateClient, 
  deleteClient 
} = require('../controllers/clientController');

// Middleware (Security Guard) import karein
const { protect } = require('../middleware/authMiddleware');

// Routes define karein
// Note: 'protect' middleware ko har route mein beech mein lagaya gaya hai.

// POST /api/clients - Naya client banayega (Sirf logged in user)
router.post('/', protect, createClient);

// GET /api/clients - Sab clients ki list layega (Sirf logged in user)
router.get('/', protect, getClients);

// GET /api/clients/:id - Ek specific client ki details layega
router.get('/:id', protect, getClientById);

// PUT /api/clients/:id - Client ki details update karega
router.put('/:id', protect, updateClient);

// DELETE /api/clients/:id - Client ko delete karega
router.delete('/:id', protect, deleteClient);

module.exports = router;