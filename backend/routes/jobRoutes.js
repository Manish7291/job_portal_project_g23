const router = require('express').Router();
const { createJob, updateJob, deleteJob, getJobs, getJob, getMyJobs, getSalaryInsights } = require('../controllers/jobController');
const { protect, requireRole } = require('../middleware/authMiddleware');
const { jobValidator } = require('../validators/jobValidator');
const { uploadJD } = require('../middleware/upload');

router.get('/', getJobs);
router.get('/salary-insights', getSalaryInsights);
router.get('/my-jobs', protect, requireRole('recruiter'), getMyJobs);
router.get('/:id', getJob);
router.post('/', protect, requireRole('recruiter'), uploadJD.single('jdFile'), jobValidator, createJob);
router.put('/:id', protect, requireRole('recruiter'), updateJob);
router.delete('/:id', protect, requireRole('recruiter', 'admin'), deleteJob);

module.exports = router;
