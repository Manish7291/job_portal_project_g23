const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const fs = require('fs');
const path = require('path');

// @desc    Get student profile
// @route   GET /api/students/profile
exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findOne({ user: req.user._id }).populate('savedJobs');
  if (!profile) throw new AppError('Profile not found', 404);
  const user = await User.findById(req.user._id);
  res.json({ success: true, profile, user: { name: user.name, email: user.email, profilePhoto: user.profilePhoto } });
});

// @desc    Update student profile
// @route   PUT /api/students/profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { phone, college, branch, graduationYear, skills, projects, certifications, githubLink, linkedinLink } = req.body;
  const profile = await StudentProfile.findOne({ user: req.user._id });
  if (!profile) throw new AppError('Profile not found', 404);

  if (phone !== undefined) profile.phone = phone;
  if (college !== undefined) profile.college = college;
  if (branch !== undefined) profile.branch = branch;
  if (graduationYear !== undefined) profile.graduationYear = graduationYear;
  if (skills !== undefined) profile.skills = typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills;
  if (projects !== undefined) profile.projects = projects;
  if (certifications !== undefined) profile.certifications = certifications;
  if (githubLink !== undefined) profile.githubLink = githubLink;
  if (linkedinLink !== undefined) profile.linkedinLink = linkedinLink;

  const user = await User.findById(req.user._id);
  profile.calculateStrength(user);
  await profile.save();
  res.json({ success: true, profile });
});

// @desc    Update profile name
// @route   PUT /api/students/update-name
exports.updateName = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new AppError('Name is required', 400);
  const user = await User.findByIdAndUpdate(req.user._id, { name }, { new: true });
  res.json({ success: true, user: { name: user.name, email: user.email } });
});

// @desc    Upload profile photo
// @route   POST /api/students/photo
exports.uploadPhoto = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('Please upload a photo', 400);
  const user = await User.findById(req.user._id);
  // Remove old photo
  if (user.profilePhoto && fs.existsSync(user.profilePhoto)) {
    fs.unlinkSync(user.profilePhoto);
  }
  user.profilePhoto = req.file.path.replace(/\\/g, '/');
  await user.save({ validateBeforeSave: false });

  // Recalculate strength
  const profile = await StudentProfile.findOne({ user: req.user._id });
  if (profile) { profile.calculateStrength(user); await profile.save(); }

  res.json({ success: true, profilePhoto: user.profilePhoto });
});

// @desc    Upload resume
// @route   POST /api/students/resume
exports.uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('Please upload a PDF resume', 400);
  const profile = await StudentProfile.findOne({ user: req.user._id });
  if (!profile) throw new AppError('Profile not found', 404);

  // Remove old resume
  if (profile.resumeFile && fs.existsSync(profile.resumeFile)) {
    fs.unlinkSync(profile.resumeFile);
  }
  profile.resumeFile = req.file.path.replace(/\\/g, '/');
  const user = await User.findById(req.user._id);
  profile.calculateStrength(user);
  await profile.save();
  res.json({ success: true, resumeFile: profile.resumeFile });
});

// @desc    Save/unsave a job
// @route   POST /api/students/save-job/:jobId
exports.toggleSaveJob = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findOne({ user: req.user._id });
  if (!profile) throw new AppError('Profile not found', 404);

  const jobIndex = profile.savedJobs.indexOf(req.params.jobId);
  if (jobIndex > -1) {
    profile.savedJobs.splice(jobIndex, 1);
  } else {
    profile.savedJobs.push(req.params.jobId);
  }
  await profile.save();
  res.json({ success: true, savedJobs: profile.savedJobs });
});

// @desc    Get saved jobs
// @route   GET /api/students/saved-jobs
exports.getSavedJobs = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findOne({ user: req.user._id }).populate('savedJobs');
  res.json({ success: true, savedJobs: profile ? profile.savedJobs : [] });
});
