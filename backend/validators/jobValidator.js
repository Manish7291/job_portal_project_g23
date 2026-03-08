const { body } = require('express-validator');

const jobValidator = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('description').trim().notEmpty().withMessage('Job description is required'),
  body('jobType').optional().isIn(['full-time', 'part-time', 'internship', 'contract']),
  body('workMode').optional().isIn(['remote', 'on-site', 'hybrid']),
  body('skillsRequired').optional().isArray()
];

module.exports = { jobValidator };
