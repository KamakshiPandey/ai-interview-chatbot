import fs from 'fs';
import pdfParse from 'pdf-parse';

/**
 * Extract text content from a PDF resume.
 * @param {string} filePath - Path to the uploaded resume PDF.
 * @returns {Promise<string>} - Parsed plain text from resume.
 */
export const extractTextFromPDF = async (filePath) => {
  const pdfBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(pdfBuffer);
  return data.text;
};

/**
 * Analyze resume text to generate mock interview questions.
 * @param {string} resumeText - Extracted plain text from resume.
 * @returns {Array<string>} - List of interview questions based on resume content.
 */
export const generateInterviewQuestions = (resumeText) => {
  const questions = [];

  // Simple heuristics (You can improve with NLP/regex)
  if (resumeText.toLowerCase().includes('react'))
    questions.push('Tell me about a project where you used React.');

  if (resumeText.toLowerCase().includes('node'))
    questions.push('What challenges have you faced using Node.js?');

  if (resumeText.toLowerCase().includes('machine learning'))
    questions.push('Describe a machine learning project you’ve worked on.');

  if (resumeText.toLowerCase().includes('internship'))
    questions.push('Can you elaborate on the role and responsibilities during your internship?');

  if (resumeText.toLowerCase().includes('lead') || resumeText.toLowerCase().includes('team'))
    questions.push('How do you handle working in a team or leading one?');

  // Default questions
  if (questions.length < 3) {
    questions.push('Walk me through your resume.');
    questions.push('What is your greatest strength and how have you applied it?');
    questions.push('What are you looking to gain from this opportunity?');
  }

  return questions;
};
