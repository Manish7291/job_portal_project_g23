const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

/**
 * Parse PDF file and extract text content
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<{text: string, pages: number, info: object}>}
 */
const parseResumePDF = async (filePath) => {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error('PDF file not found');
  }

  const dataBuffer = fs.readFileSync(absolutePath);
  const pdfData = await pdfParse(dataBuffer);

  return {
    text: pdfData.text,
    pages: pdfData.numpages,
    info: pdfData.info
  };
};

module.exports = { parseResumePDF };
