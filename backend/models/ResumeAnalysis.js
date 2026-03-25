const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: { type: String },
  score: { type: Number, default: 0 },
  wordCount: { type: Number, default: 0 },
  sections: {
    education: { found: Boolean, score: Number },
    experience: { found: Boolean, score: Number },
    skills: { found: Boolean, score: Number },
    projects: { found: Boolean, score: Number },
    certifications: { found: Boolean, score: Number },
    contact: { found: Boolean, score: Number }
  },
  keywordsFound: [String],
  missingKeywords: [String],
  suggestions: [String],
  atsScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
