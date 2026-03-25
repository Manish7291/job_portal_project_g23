const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const RecruiterProfile = require('../models/RecruiterProfile');
const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

// @desc    Get recruiter profile
// @route   GET /api/recruiters/profile
exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await RecruiterProfile.findOne({ user: req.user._id });
  if (!profile) throw new AppError('Profile not found', 404);
  const user = await User.findById(req.user._id);
  res.json({ success: true, profile, user: { name: user.name, email: user.email, profilePhoto: user.profilePhoto } });
});

// @desc    Update recruiter profile
// @route   PUT /api/recruiters/profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const fields = ['companyName', 'companyWebsite', 'companyDescription', 'industry', 'companySize', 'location', 'phone'];
  const profile = await RecruiterProfile.findOne({ user: req.user._id });
  if (!profile) throw new AppError('Profile not found', 404);
  fields.forEach(f => { if (req.body[f] !== undefined) profile[f] = req.body[f]; });
  await profile.save();
  res.json({ success: true, profile });
});

// @desc    Get recruiter transparency metrics
// @route   GET /api/recruiters/metrics/:recruiterId
exports.getMetrics = asyncHandler(async (req, res) => {
  const profile = await RecruiterProfile.findOne({ user: req.params.recruiterId });
  if (!profile) throw new AppError('Recruiter not found', 404);
  const activeJobs = await Job.countDocuments({ recruiter: req.params.recruiterId, isActive: true });
  const totalApps = await Application.countDocuments({ job: { $in: await Job.find({ recruiter: req.params.recruiterId }).select('_id') } });
  const responded = await Application.countDocuments({
    job: { $in: await Job.find({ recruiter: req.params.recruiterId }).select('_id') },
    status: { $ne: 'applied' }
  });

  res.json({
    success: true,
    metrics: {
      companyName: profile.companyName,
      activeJobs,
      totalHires: profile.totalHires,
      responseRate: totalApps > 0 ? Math.round((responded / totalApps) * 100) : 0,
      avgResponseTime: profile.avgResponseTime || 24
    }
  });
});
