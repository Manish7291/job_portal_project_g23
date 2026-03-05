const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Job title is required'], trim: true },
  company: { type: String, required: [true, 'Company name is required'] },
  location: { type: String, required: [true, 'Location is required'] },
  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 }
  },
  experience: { type: String, default: 'Fresher' },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'contract'],
    default: 'full-time'
  },
  skillsRequired: [{ type: String }],
  description: { 
    type: String, 
    required: [function() { return !this.jdFile; }, 'Job description or JD file is required'] 
  },
  jdFile: { type: String },
  deadline: { type: Date },
  workMode: {
    type: String,
    enum: ['remote', 'on-site', 'hybrid'],
    default: 'on-site'
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicantsCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Text index for search
jobSchema.index({ title: 'text', company: 'text', location: 'text', description: 'text' });

module.exports = mongoose.model('Job', jobSchema);
