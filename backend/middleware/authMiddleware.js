const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  
   {
    try {  
      const token = req.headers.authorization;
      
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decoded stores id in it
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

};

module.exports = { protect };
