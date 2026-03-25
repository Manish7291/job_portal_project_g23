/**
 * Resume Analyzer Service
 * Analyzes resume text for ATS compatibility, section detection, and scoring
 */

// Common ATS keywords organized by category
const ATS_KEYWORDS = {
  technical: [
    'javascript', 'python', 'java', 'react', 'node.js', 'angular', 'vue', 'typescript',
    'sql', 'mongodb', 'postgresql', 'aws', 'docker', 'kubernetes', 'git', 'github',
    'rest api', 'graphql', 'html', 'css', 'sass', 'linux', 'ci/cd', 'jenkins',
    'redis', 'elasticsearch', 'firebase', 'azure', 'gcp', 'terraform', 'webpack',
    'next.js', 'express', 'django', 'flask', 'spring boot', 'microservices'
  ],
  softSkills: [
    'communication', 'leadership', 'teamwork', 'problem solving', 'analytical',
    'project management', 'agile', 'scrum', 'collaboration', 'mentoring',
    'time management', 'critical thinking', 'adaptability', 'creativity'
  ],
  dataScience: [
    'machine learning', 'deep learning', 'data structures', 'algorithms',
    'tensorflow', 'pytorch', 'pandas', 'numpy', 'data analysis', 'statistics',
    'natural language processing', 'computer vision', 'big data', 'tableau'
  ]
};

const SECTION_PATTERNS = {
  education: /education|academic|university|college|degree|bachelor|master|b\.tech|m\.tech|bsc|msc|phd/i,
  experience: /experience|work history|employment|internship|professional|job history|career/i,
  skills: /skills|technologies|tools|competencies|proficiency|technical skills|core competencies/i,
  projects: /projects|portfolio|personal projects|academic projects|key projects/i,
  certifications: /certifications|certificates|courses|training|credentials|licenses/i,
  contact: /email|phone|linkedin|github|contact|address|mobile|portfolio/i,
  summary: /summary|objective|about|profile|professional summary|career objective/i,
  achievements: /achievements|awards|honors|accomplishments|recognition/i
};

/**
 * Analyze resume text and generate comprehensive score
 * @param {string} text - Extracted text from resume PDF
 * @returns {object} Analysis result with score, sections, keywords, and suggestions
 */
const analyzeResumeText = (text) => {
  const lowerText = text.toLowerCase();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // ─── Section Detection (max 40 points) ───
  const sections = {};
  let sectionScore = 0;
  for (const [section, pattern] of Object.entries(SECTION_PATTERNS)) {
    const found = pattern.test(text);
    const points = found ? 5 : 0;
    sections[section] = { found, score: points };
    sectionScore += points;
  }
  sectionScore = Math.min(40, sectionScore);

  // ─── Keyword Analysis (max 30 points) ───
  const allKeywords = [...ATS_KEYWORDS.technical, ...ATS_KEYWORDS.softSkills, ...ATS_KEYWORDS.dataScience];
  const keywordsFound = allKeywords.filter(kw => lowerText.includes(kw));
  const missingKeywords = ATS_KEYWORDS.technical.filter(kw => !lowerText.includes(kw)).slice(0, 10);
  const keywordScore = Math.min(30, Math.round((keywordsFound.length / 15) * 30));

  // ─── Content Quality (max 15 points) ───
  let contentScore = 0;
  if (wordCount >= 300) contentScore += 5;
  else if (wordCount >= 150) contentScore += 3;
  if (wordCount <= 1200) contentScore += 3; // Not too long
  // Check for quantified achievements (numbers + %)
  const hasQuantified = /\d+%|\d+\+|increased|improved|reduced|achieved|delivered/i.test(text);
  if (hasQuantified) contentScore += 4;
  // Check for action verbs
  const actionVerbs = /developed|implemented|designed|managed|led|built|created|optimized|deployed|automated/i;
  if (actionVerbs.test(text)) contentScore += 3;

  // ─── Format Quality (max 15 points) ───
  let formatScore = 0;
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  if (lines.length >= 20) formatScore += 5; // Good amount of content
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /(\+?\d[\d\s-]{8,}\d)/.test(text);
  if (hasEmail) formatScore += 3;
  if (hasPhone) formatScore += 3;
  const hasLinks = /(github|linkedin|portfolio|http)/i.test(text);
  if (hasLinks) formatScore += 4;

  // ─── Total Score ───
  const score = Math.min(100, sectionScore + keywordScore + contentScore + formatScore);

  // ─── ATS Score (keyword-focused) ───
  const atsScore = Math.min(100, Math.round((keywordsFound.length / 10) * 40) + (sectionScore) + (hasQuantified ? 10 : 0) + (sections.skills?.found ? 10 : 0));

  // ─── Generate Suggestions ───
  const suggestions = [];
  if (wordCount < 200) suggestions.push('Your resume is too short. Aim for 300-600 words for maximum impact.');
  if (wordCount > 1200) suggestions.push('Consider making your resume more concise. 1-2 pages is ideal.');
  if (!sections.experience?.found) suggestions.push('Add a clear "Work Experience" or "Internship" section with detailed descriptions.');
  if (!sections.projects?.found) suggestions.push('Include a "Projects" section showcasing technical skills with links to GitHub repos.');
  if (!sections.skills?.found) suggestions.push('Add a dedicated "Skills" section listing technologies and tools you know.');
  if (!sections.education?.found) suggestions.push('Include your "Education" section with degree, college, and graduation year.');
  if (!sections.summary?.found) suggestions.push('Add a "Professional Summary" at the top — a 2-3 line elevator pitch.');
  if (!sections.achievements?.found) suggestions.push('Add an "Achievements" section to highlight awards, certifications, or recognition.');
  if (!hasQuantified) suggestions.push('Add measurable achievements (e.g., "Improved performance by 40%", "Managed team of 5").');
  if (keywordsFound.length < 5) suggestions.push('Include more industry-specific keywords for better ATS matching.');
  if (!hasEmail) suggestions.push('Add your email address for contact information.');
  if (!hasLinks) suggestions.push('Include links to your GitHub profile, LinkedIn, or portfolio website.');
  if (!actionVerbs.test(text)) suggestions.push('Use strong action verbs like "Developed", "Implemented", "Designed", "Optimized".');

  return {
    score,
    wordCount,
    sections,
    keywordsFound,
    missingKeywords,
    suggestions: suggestions.slice(0, 10),
    atsScore,
    breakdown: {
      sectionScore,
      keywordScore,
      contentScore,
      formatScore
    }
  };
};

module.exports = { analyzeResumeText, ATS_KEYWORDS };
