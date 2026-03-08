const router = require('express').Router();
const { applyToJob, getMyApplications, getJobApplicants, updateStatus } = require('../controllers/applicationController');
const { protect, requireRole } = require('../middleware/authMiddleware');

router.post('/:jobId', protect, requireRole('student'), applyToJob);
router.get('/my', protect, requireRole('student'), getMyApplications);
router.get('/job/:jobId', protect, requireRole('recruiter'), getJobApplicants);
router.put('/:id/status', protect, requireRole('recruiter'), updateStatus);

module.exports = router;
