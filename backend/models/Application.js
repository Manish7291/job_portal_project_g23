const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['applied', 'viewed', 'shortlisted', 'interview', 'rejected', 'selected'],
    default: 'applied'
  },
  resumeFile: { type: String },
  coverLetter: { type: String, default: '' },
  appliedAt: { type: Date, default: Date.now },
  statusUpdatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure one application per job per user
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
