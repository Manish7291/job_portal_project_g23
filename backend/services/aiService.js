const axios = require('axios');

/**
 * Call Gemini API to simplify job description
 * @param {string} text - The complex job description
 * @returns {Promise<string>} Simplified version
 */
const simplifyWithGemini = async (text) => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Return fallback if no API key is provided
  if (!apiKey || apiKey.includes('your_') || apiKey.includes('AIzaSy')) {
    return _generateMockSimplification(text);
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: `Simplify this complex job description into 3-4 bullet points that are easy for a student to understand. Keep it highly professional but jargon-free. Here is the description:\n\n${text}`
          }]
        }]
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    return _generateMockSimplification(text); // Fallback on error
  }
};

const _generateMockSimplification = (text) => {
  return `(Mock AI Response - Add valid API Key)\n• You will work on this company's core software products.\n• The role requires technical problem solving and coding daily.\n• You will collaborate closely with other engineers and product managers.\n• Expected to write clean, maintainable code.`;
}

module.exports = {
  simplifyWithGemini
};
