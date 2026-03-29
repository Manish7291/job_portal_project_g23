const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const Application = require('../models/Application');
const Job = require('../models/Job');
const Notification = require('../models/Notification');
const StudentProfile = require('../models/StudentProfile');
const { emitApplicationStatusUpdate, emitNewApplication } = require('../services/socketService');

// @desc    Apply to a job
// @route   POST /api/applications/:jobId
exports.applyToJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) throw new AppError('Job not found', 404);
  if (!job.isActive) throw new AppError('This job is no longer accepting applications', 400);

  // Check premium for unlimited applications
  const profile = await StudentProfile.findOne({ user: req.user._id });
  if (!profile.isPremium) {
    const appCount = await Application.countDocuments({ applicant: req.user._id });
    if (appCount >= 10) throw new AppError('Free users can apply to max 10 jobs. Upgrade to Premium!', 403);
  }

  const existing = await Application.findOne({ job: req.params.jobId, applicant: req.user._id });
  if (existing) throw new AppError('Already applied to this job', 400);

  const application = await Application.create({
    job: req.params.jobId,
    applicant: req.user._id,
    resumeFile: profile.resumeFile,
    coverLetter: req.body.coverLetter || ''
  });

  job.applicantsCount += 1;
  await job.save();

  // Notification for recruiter
  await Notification.create({
    user: job.recruiter,
    type: 'application_submitted',
    title: 'New Application',
    message: `${req.user.name} applied to ${job.title}`,
    link: `/recruiter/jobs/${job._id}/applicants`
  });

  // Emit real-time socket event for new application
  const io = req.app.get('io');
  if (io) {
    emitNewApplication(io, {
      jobId: job._id.toString(),
      applicantName: req.user.name,
      applicantId: req.user._id.toString()
    });
  }

  res.status(201).json({ success: true, application });
});

// @desc    Get my applications (student)
// @route   GET /api/applications/my
exports.getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ applicant: req.user._id })
    .populate('job', 'title company location salary jobType')
    .sort({ createdAt: -1 });
  res.json({ success: true, applications });
});

// @desc    Get applicants for a job (recruiter)
// @route   GET /api/applications/job/:jobId
exports.getJobApplicants = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) throw new AppError('Job not found', 404);
  if (job.recruiter.toString() !== req.user._id.toString()) throw new AppError('Not authorized', 403);

  const applications = await Application.find({ job: req.params.jobId })
    .populate('applicant', 'name email profilePhoto')
    .sort({ createdAt: -1 });
  res.json({ success: true, applications });
});

// @desc    Update application status (recruiter)
// @route   PUT /api/applications/:id/status
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['viewed', 'shortlisted', 'interview', 'rejected', 'selected'];
  if (!validStatuses.includes(status)) throw new AppError('Invalid status', 400);

  const application = await Application.findById(req.params.id).populate('job');
  if (!application) throw new AppError('Application not found', 404);
  if (application.job.recruiter.toString() !== req.user._id.toString()) throw new AppError('Not authorized', 403);

  application.status = status;
  application.statusUpdatedAt = Date.now();
  await application.save();

  // Notify student
  await Notification.create({
    user: application.applicant,
    type: 'status_changed',
    title: 'Application Update',
    message: `Your application for ${application.job.title} has been ${status}`,
    link: '/student/applications'
  });

  // Emit real-time socket event for status update
  const io = req.app.get('io');
  if (io) {
    emitApplicationStatusUpdate(io, {
      applicationId: application._id.toString(),
      jobId: application.job._id.toString(),
      studentId: application.applicant.toString(),
      status: status,
      applicantName: req.user.name,
      jobTitle: application.job.title
    });
  }

  res.json({ success: true, application });
});
