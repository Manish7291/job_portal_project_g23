const router = require('express').Router();
const { getProfile, updateProfile, getMetrics } = require('../controllers/recruiterController');
const { protect, requireRole } = require('../middleware/authMiddleware');

router.get('/profile', protect, requireRole('recruiter'), getProfile);
router.put('/profile', protect, requireRole('recruiter'), updateProfile);
router.get('/metrics/:recruiterId', getMetrics);

module.exports = router;
