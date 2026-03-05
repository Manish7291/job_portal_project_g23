const mongoose = require('mongoose');

const interviewExperienceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  rounds: { type: Number, default: 1 },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  questions: [{ type: String }],
  experience: { type: String, required: true },
  timeline: { type: String },
  result: {
    type: String,
    enum: ['selected', 'rejected', 'pending'],
    default: 'pending'
  },
  tips: { type: String, default: '' }
}, { timestamps: true });

interviewExperienceSchema.index({ companyName: 'text', role: 'text' });

module.exports = mongoose.model('InterviewExperience', interviewExperienceSchema);
