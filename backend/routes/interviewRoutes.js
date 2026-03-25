const router = require('express').Router();
const { createExperience, getExperiences, getExperience, deleteExperience } = require('../controllers/interviewController');
const { protect, requireRole } = require('../middleware/authMiddleware');

router.get('/', getExperiences);
router.get('/:id', getExperience);
router.post('/', protect, requireRole('student'), createExperience);
router.delete('/:id', protect, requireRole('student'), deleteExperience);

module.exports = router;
