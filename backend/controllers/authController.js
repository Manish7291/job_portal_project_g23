const crypto = require('crypto');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const RecruiterProfile = require('../models/RecruiterProfile');
const sendEmail = require('../utils/sendEmail');

// Helper: send token response with cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateToken();
  const cookieOptions = {
    expires: new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  const userData = { _id: user._id, name: user.name, email: user.email, role: user.role, profilePhoto: user.profilePhoto };
  res.status(statusCode).cookie('token', token, cookieOptions).json({ success: true, token, user: userData });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array().map(e => e.msg).join(', '), 400);
  }

  const { name, email, password, role, companyName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('Email already registered', 400);

  const user = await User.create({ name, email, password, role });

  // Create role-specific profile
  if (role === 'student') {
    await StudentProfile.create({ user: user._id });
  } else if (role === 'recruiter') {
    await RecruiterProfile.create({ user: user._id, companyName: companyName || name });
  }

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array().map(e => e.msg).join(', '), 400);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new AppError('Invalid credentials', 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError('Invalid credentials', 401);

  if (user.role === 'recruiter' && !user.isApproved) {
    throw new AppError('Your recruiter account is pending admin approval', 403);
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Logout
// @route   POST /api/auth/logout
exports.logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', { expires: new Date(Date.now() + 5000), httpOnly: true });
  res.json({ success: true, message: 'Logged out successfully' });
});

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, user });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new AppError('No account with that email', 404);

  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const html = `<h2>Password Reset</h2><p>Click the link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a><p>This link expires in 30 minutes.</p>`;

  const sent = await sendEmail({ to: user.email, subject: 'JOBFLUX Password Reset', html });
  if (!sent) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError('Email could not be sent', 500);
  }

  res.json({ success: true, message: 'Password reset email sent' });
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
exports.resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) throw new AppError('Invalid or expired reset token', 400);

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});
