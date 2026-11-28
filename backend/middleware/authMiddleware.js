const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware function jo request ko check karega
const protect = async (req, res, next) => {
  let token;

  // 1. Check karein ke header mein token hai ya nahi
  // Token hamesha "Bearer <token_string>" ki shakal mein aata hai
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token ko 'Bearer xyz...' se alag kar ke sirf 'xyz...' lein
      token = req.headers.authorization.split(' ')[1];

      // Token ko verify karein aur usme se user ki ID nikalein
      // (Wahi JWT_SECRET use ho raha hai jo login ke waqt use hua tha)
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_super_secret_key_123');

      // Database se user dhundhein (password ko chhor kar, taake security rahe)
      req.user = await User.findById(decoded.id).select('-password');

      // Agar sab theek hai, to agle step (Controller) par bhej dein
      next(); 
      
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // Agar token nahi mila
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };