const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Payment = require('../models/Payment');
const StudentProfile = require('../models/StudentProfile');
const RecruiterProfile = require('../models/RecruiterProfile');

// @desc    Get admin analytics
// @route   GET /api/admin/analytics
exports.getAnalytics = asyncHandler(async (req, res) => {
  const [totalStudents, totalRecruiters, totalJobs, totalApplications, totalPayments, pendingRecruiters] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'recruiter' }),
    Job.countDocuments(),
    Application.countDocuments(),
    Payment.countDocuments({ status: 'paid' }),
    User.countDocuments({ role: 'recruiter', isApproved: false })
  ]);
  const revenue = await Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
  res.json({ success: true, analytics: { totalStudents, totalRecruiters, totalJobs, totalApplications, totalPayments, pendingRecruiters, totalRevenue: revenue[0]?.total || 0 } });
});

// @desc    Get all students
// @route   GET /api/admin/students
exports.getStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const total = await User.countDocuments({ role: 'student' });
  const students = await User.find({ role: 'student' }).select('-password').skip((page - 1) * limit).limit(parseInt(limit)).sort({ createdAt: -1 });
  res.json({ success: true, students, total, pages: Math.ceil(total / limit) });
});

// @desc    Get all recruiters
// @route   GET /api/admin/recruiters
exports.getRecruiters = asyncHandler(async (req, res) => {
  const recruiters = await User.find({ role: 'recruiter' }).select('-password').sort({ createdAt: -1 });
  const profiles = await RecruiterProfile.find();
  const merged = recruiters.map(r => {
    const profile = profiles.find(p => p.user.toString() === r._id.toString());
    return { ...r.toObject(), profile };
  });
  res.json({ success: true, recruiters: merged });
});

// @desc    Approve recruiter
// @route   PUT /api/admin/approve-recruiter/:id
exports.approveRecruiter = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role !== 'recruiter') throw new AppError('Recruiter not found', 404);
  user.isApproved = true;
  await user.save({ validateBeforeSave: false });
  res.json({ success: true, message: 'Recruiter approved' });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  if (user.role === 'admin') throw new AppError('Cannot delete admin', 400);
  await User.findByIdAndDelete(req.params.id);
  if (user.role === 'student') await StudentProfile.findOneAndDelete({ user: req.params.id });
  if (user.role === 'recruiter') await RecruiterProfile.findOneAndDelete({ user: req.params.id });
  res.json({ success: true, message: 'User deleted' });
});

// @desc    Remove a job (admin)
// @route   DELETE /api/admin/jobs/:id
exports.removeJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) throw new AppError('Job not found', 404);
  res.json({ success: true, message: 'Job removed' });
});

// @desc    Get all payments
// @route   GET /api/admin/payments
exports.getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, payments });
});
