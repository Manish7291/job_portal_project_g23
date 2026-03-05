const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  phone: { type: String, default: '' },
  college: { type: String, default: '' },
  branch: { type: String, default: '' },
  graduationYear: { type: Number },
  skills: [{ type: String }],
  projects: [{
    title: String,
    description: String,
    techStack: [String],
    link: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: Number
  }],
  githubLink: { type: String, default: '' },
  linkedinLink: { type: String, default: '' },
  resumeFile: { type: String, default: '' },
  resumeScore: { type: Number, default: 0 },
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  isPremium: { type: Boolean, default: false },
  premiumExpiry: { type: Date },
  profileStrength: { type: Number, default: 0 }
}, { timestamps: true });

// Calculate profile strength
studentProfileSchema.methods.calculateStrength = function(user) {
  let score = 0;
  const fields = {
    profilePhoto: user.profilePhoto ? 15 : 0,
    skills: this.skills.length > 0 ? 15 : 0,
    projects: this.projects.length > 0 ? 15 : 0,
    certifications: this.certifications.length > 0 ? 10 : 0,
    resume: this.resumeFile ? 20 : 0,
    github: this.githubLink ? 10 : 0,
    linkedin: this.linkedinLink ? 15 : 0
  };
  score = Object.values(fields).reduce((a, b) => a + b, 0);
  this.profileStrength = score;
  return score;
};

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
