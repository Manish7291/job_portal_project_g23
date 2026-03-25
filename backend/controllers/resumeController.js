const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const StudentProfile = require('../models/StudentProfile');

// ATS keywords by common job categories
const ATS_KEYWORDS = [
  'javascript', 'python', 'java', 'react', 'node', 'angular', 'vue', 'typescript',
  'sql', 'mongodb', 'aws', 'docker', 'kubernetes', 'git', 'agile', 'scrum',
  'rest', 'api', 'html', 'css', 'linux', 'ci/cd', 'machine learning',
  'data structures', 'algorithms', 'communication', 'leadership', 'teamwork',
  'problem solving', 'project management', 'testing', 'debugging', 'deployment'
];

const SECTION_PATTERNS = {
  education: /education|academic|university|college|degree|bachelor|master/i,
  experience: /experience|work|employment|internship|job/i,
  skills: /skills|technologies|tools|competencies|proficiency/i,
  projects: /projects|portfolio|personal projects|academic projects/i,
  certifications: /certifications|certificates|courses|training/i,
  contact: /email|phone|linkedin|github|contact|address/i
};

function analyzeResume(text) {
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  const lowerText = text.toLowerCase();

  // Section detection
  const sections = {};
  for (const [section, pattern] of Object.entries(SECTION_PATTERNS)) {
    const found = pattern.test(text);
    sections[section] = { found, score: found ? 15 : 0 };
  }

  // Keyword matching
  const keywordsFound = ATS_KEYWORDS.filter(kw => lowerText.includes(kw));
  const missingKeywords = ATS_KEYWORDS.filter(kw => !lowerText.includes(kw)).slice(0, 10);

  // Scoring
  let score = 0;
  // Word count score (max 15)
  if (wordCount >= 300) score += 15;
  else if (wordCount >= 150) score += 10;
  else score += 5;

  // Section scores (max 60)
  score += Object.values(sections).reduce((sum, s) => sum + (s.found ? 10 : 0), 0);

  // Keyword density (max 25)
  const keywordScore = Math.min(25, Math.round((keywordsFound.length / ATS_KEYWORDS.length) * 25));
  score += keywordScore;

  // Cap at 100
  score = Math.min(100, score);

  // Suggestions
  const suggestions = [];
  if (wordCount < 200) suggestions.push('Resume is too short. Add more details about your experience and projects.');
  if (!sections.experience.found) suggestions.push('Add a clear Work Experience or Internship section.');
  if (!sections.projects.found) suggestions.push('Include a Projects section with technical details.');
  if (!sections.skills.found) suggestions.push('Add a dedicated Skills section with relevant technologies.');
  if (!sections.education.found) suggestions.push('Include your Education details.');
  if (keywordsFound.length < 5) suggestions.push('Add more industry-relevant keywords for better ATS matching.');
  if (wordCount > 1000) suggestions.push('Consider shortening your resume to be more concise (1-2 pages).');
  suggestions.push('Add measurable achievements (e.g., "Improved performance by 40%").');
  if (!lowerText.includes('github') && !lowerText.includes('linkedin')) {
    suggestions.push('Include links to your GitHub and LinkedIn profiles.');
  }

  return {
    score,
    wordCount,
    sections,
    keywordsFound,
    missingKeywords,
    suggestions: suggestions.slice(0, 8),
    atsScore: keywordScore * 4 // scale to 100
  };
}

// @desc    Analyze uploaded resume
// @route   POST /api/resume/analyze
exports.analyzeResume = asyncHandler(async (req, res) => {
  const profile = await StudentProfile.findOne({ user: req.user._id });
  if (!profile || !profile.resumeFile) throw new AppError('Please upload a resume first', 400);

  const filePath = path.resolve(profile.resumeFile);
  if (!fs.existsSync(filePath)) throw new AppError('Resume file not found on server', 404);

  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  const analysis = analyzeResume(pdfData.text);

  // Save or update analysis
  let resumeAnalysis = await ResumeAnalysis.findOne({ user: req.user._id });
  if (resumeAnalysis) {
    Object.assign(resumeAnalysis, { ...analysis, fileName: path.basename(profile.resumeFile) });
  } else {
    resumeAnalysis = new ResumeAnalysis({ user: req.user._id, fileName: path.basename(profile.resumeFile), ...analysis });
  }
  await resumeAnalysis.save();

  // Update profile score
  profile.resumeScore = analysis.score;
  await profile.save();

  res.json({ success: true, analysis: resumeAnalysis });
});

// @desc    Get resume analysis
// @route   GET /api/resume/analysis
exports.getAnalysis = asyncHandler(async (req, res) => {
  const analysis = await ResumeAnalysis.findOne({ user: req.user._id });
  if (!analysis) throw new AppError('No analysis found. Please analyze your resume first.', 404);
  res.json({ success: true, analysis });
});
