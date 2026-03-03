const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const { AppError } = require('./errorHandler');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies first, then Authorization header
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Not authorized. Please log in.', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      throw new AppError('User not found.', 401);
    }
    next();
  } catch (error) {
    throw new AppError('Not authorized. Token invalid.', 401);
  }
});

// Role-based access control
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(`Access denied. Required role: ${roles.join(' or ')}`, 403);
    }
    next();
  };
};

module.exports = { protect, requireRole };
