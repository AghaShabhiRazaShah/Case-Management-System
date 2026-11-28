const express = require('express');
const router = express.Router();

// 1. Controller se functions import karein (getMe naya add kiya hai)
const { registerUser, loginUser, getMe } = require('../controllers/authController');

// 2. Middleware se protect function import karein (Ye hamara Security Guard hai)
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/register - Naya user register karega
router.post('/register', registerUser);

// POST /api/auth/login - User login karega
router.post('/login', loginUser);

// GET /api/auth/me - Sirf tab chalega jab user ke paas sahi Token ho (protect middleware ke zariye)
router.get('/me', protect, getMe);

module.exports = router;