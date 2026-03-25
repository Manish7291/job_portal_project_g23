const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const InterviewExperience = require('../models/InterviewExperience');

// @desc    Create interview experience
// @route   POST /api/interviews
exports.createExperience = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  const experience = await InterviewExperience.create(req.body);
  res.status(201).json({ success: true, experience });
});

// @desc    Get all interview experiences
// @route   GET /api/interviews
exports.getExperiences = asyncHandler(async (req, res) => {
  const { company, role, difficulty, page = 1, limit = 10 } = req.query;
  const query = {};
  if (company) query.companyName = { $regex: company, $options: 'i' };
  if (role) query.role = { $regex: role, $options: 'i' };
  if (difficulty) query.difficulty = difficulty;

  const total = await InterviewExperience.countDocuments(query);
  const experiences = await InterviewExperience.find(query)
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json({ success: true, experiences, total, pages: Math.ceil(total / limit) });
});

// @desc    Get single experience
// @route   GET /api/interviews/:id
exports.getExperience = asyncHandler(async (req, res) => {
  const experience = await InterviewExperience.findById(req.params.id).populate('user', 'name');
  if (!experience) throw new AppError('Experience not found', 404);
  res.json({ success: true, experience });
});

// @desc    Delete my experience
// @route   DELETE /api/interviews/:id
exports.deleteExperience = asyncHandler(async (req, res) => {
  const experience = await InterviewExperience.findById(req.params.id);
  if (!experience) throw new AppError('Experience not found', 404);
  if (experience.user.toString() !== req.user._id.toString()) throw new AppError('Not authorized', 403);
  await InterviewExperience.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
});
