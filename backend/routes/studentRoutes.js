const router = require('express').Router();
const { getProfile, updateProfile, updateName, uploadPhoto, uploadResume, toggleSaveJob, getSavedJobs } = require('../controllers/studentController');
const { protect, requireRole } = require('../middleware/authMiddleware');
const { uploadResume: multerResume, uploadPhoto: multerPhoto } = require('../middleware/upload');

router.use(protect, requireRole('student'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/update-name', updateName);
router.post('/photo', multerPhoto.single('photo'), uploadPhoto);
router.post('/resume', multerResume.single('resume'), uploadResume);
router.post('/save-job/:jobId', toggleSaveJob);
router.get('/saved-jobs', getSavedJobs);

module.exports = router;
