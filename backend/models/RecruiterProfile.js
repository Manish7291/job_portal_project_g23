const mongoose = require('mongoose');

const recruiterProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: { type: String, required: true },
  companyWebsite: { type: String, default: '' },
  companyDescription: { type: String, default: '' },
  industry: { type: String, default: '' },
  companySize: { type: String, default: '' },
  location: { type: String, default: '' },
  phone: { type: String, default: '' },
  totalHires: { type: Number, default: 0 },
  responseRate: { type: Number, default: 0 },
  avgResponseTime: { type: Number, default: 0 } // in hours
}, { timestamps: true });

module.exports = mongoose.model('RecruiterProfile', recruiterProfileSchema);
