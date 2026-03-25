const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const { validationResult } = require('express-validator');
const Job = require('../models/Job');
const { parseResumePDF } = require('../services/resumeParser');

// @desc    Create a new job
// @route   POST /api/jobs
exports.createJob = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError(errors.array().map(e => e.msg).join(', '), 400);

  req.body.recruiter = req.user._id;
  req.body.company = req.body.company || req.user.name;

  if (req.file) {
    req.body.jdFile = `/uploads/jds/${req.file.filename}`;
    // Extract text from PDF to use as description if empty, or append if description exists
    try {
      const pdfData = await parseResumePDF(req.file.path);
      if (!req.body.description) {
        req.body.description = pdfData.text;
      } else {
        req.body.description += `\n\n--- Extracted from uploaded JD ---\n\n${pdfData.text}`;
      }
    } catch (error) {
      console.error('Error parsing JD PDF:', error);
      if (!req.body.description) {
        throw new AppError('Failed to parse JD file, please provide a written description', 400);
      }
    }
  }

  const job = await Job.create(req.body);
  res.status(201).json({ success: true, job });
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
exports.updateJob = asyncHandler(async (req, res) => {
  let job = await Job.findById(req.params.id);
  if (!job) throw new AppError('Job not found', 404);
  if (job.recruiter.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to update this job', 403);
  }
  job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json({ success: true, job });
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
exports.deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) throw new AppError('Job not found', 404);
  if (job.recruiter.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to delete this job', 403);
  }
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Job deleted' });
});

// @desc    Get all jobs (with filters, search, pagination)
// @route   GET /api/jobs
exports.getJobs = asyncHandler(async (req, res) => {
  const { search, location, jobType, workMode, experience, minSalary, maxSalary, page = 1, limit = 10 } = req.query;
  const query = { isActive: true };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { skillsRequired: { $regex: search, $options: 'i' } }
    ];
  }
  if (location) query.location = { $regex: location, $options: 'i' };
  if (jobType) query.jobType = jobType;
  if (workMode) query.workMode = workMode;
  if (experience) query.experience = { $regex: experience, $options: 'i' };
  if (minSalary) query['salary.min'] = { $gte: parseInt(minSalary) };
  if (maxSalary) query['salary.max'] = { $lte: parseInt(maxSalary) };

  const total = await Job.countDocuments(query);
  const jobs = await Job.find(query)
    .populate('recruiter', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({ success: true, jobs, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate('recruiter', 'name email');
  if (!job) throw new AppError('Job not found', 404);
  res.json({ success: true, job });
});

// @desc    Get recruiter's jobs
// @route   GET /api/jobs/my-jobs
exports.getMyJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ recruiter: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, jobs });
});

// @desc    Get salary insights
// @route   GET /api/jobs/salary-insights
exports.getSalaryInsights = asyncHandler(async (req, res) => {
  const byRole = await Job.aggregate([
    { $match: { isActive: true, 'salary.min': { $gt: 0 } } },
    { $group: { _id: '$title', avgSalary: { $avg: { $avg: ['$salary.min', '$salary.max'] } }, count: { $sum: 1 } } },
    { $sort: { avgSalary: -1 } },
    { $limit: 10 }
  ]);

  const byLocation = await Job.aggregate([
    { $match: { isActive: true, 'salary.min': { $gt: 0 } } },
    { $group: { _id: '$location', avgSalary: { $avg: { $avg: ['$salary.min', '$salary.max'] } }, count: { $sum: 1 } } },
    { $sort: { avgSalary: -1 } },
    { $limit: 10 }
  ]);

  const byType = await Job.aggregate([
    { $match: { isActive: true, 'salary.min': { $gt: 0 } } },
    { $group: { _id: '$jobType', avgSalary: { $avg: { $avg: ['$salary.min', '$salary.max'] } }, count: { $sum: 1 } } },
    { $sort: { avgSalary: -1 } }
  ]);

  res.json({ success: true, insights: { byRole, byLocation, byType } });
});
