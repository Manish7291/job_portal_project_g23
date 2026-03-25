const router = require('express').Router();
const { analyzeResume, getAnalysis } = require('../controllers/resumeController');
const { protect, requireRole } = require('../middleware/authMiddleware');

router.post('/analyze', protect, requireRole('student'), analyzeResume);
router.get('/analysis', protect, requireRole('student'), getAnalysis);

module.exports = router;
