const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');

// @desc    Simplify job description using AI
// @route   POST /api/ai/simplify-jd
exports.simplifyJobDescription = asyncHandler(async (req, res) => {
  const { description } = req.body;
  if (!description) throw new AppError('Job description is required', 400);

  const apiKey = process.env.GEMINI_API_KEY;
  
  // If no API key, return mock analysis
  if (!apiKey || apiKey === 'your_gemini_api_key') {
    return res.json({
      success: true,
      result: generateMockAnalysis(description),
      note: 'Using local analysis. Set GEMINI_API_KEY for AI-powered results.'
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze this job description and return a JSON object with these keys:
              - requiredSkills: array of required skills
              - responsibilities: array of key responsibilities
              - eligibility: array of eligibility criteria
              - experienceRequired: string describing experience needed
              
              Job Description: ${description}`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Try to parse JSON from the response
    let result;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : generateMockAnalysis(description);
    } catch {
      result = generateMockAnalysis(description);
    }

    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: true, result: generateMockAnalysis(description), note: 'AI service unavailable, using local analysis.' });
  }
});

function generateMockAnalysis(description) {
  const text = description.toLowerCase();
  const commonSkills = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git', 'TypeScript', 'MongoDB', 'REST APIs', 'HTML/CSS', 'Agile'];
  const requiredSkills = commonSkills.filter(skill => text.includes(skill.toLowerCase()));
  if (requiredSkills.length === 0) requiredSkills.push('See full description for details');
  
  const sentences = description.split(/[.!?\n]/).filter(s => s.trim().length > 10);
  
  return {
    requiredSkills,
    responsibilities: sentences.slice(0, 5).map(s => s.trim()),
    eligibility: ['Bachelor\'s degree in relevant field', 'Strong communication skills'],
    experienceRequired: text.includes('senior') ? '5+ years' : text.includes('junior') ? '0-2 years' : '2-4 years'
  };
}
