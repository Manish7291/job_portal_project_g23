const router = require('express').Router();
const { getAnalytics, getStudents, getRecruiters, approveRecruiter, deleteUser, removeJob, getPayments } = require('../controllers/adminController');
const { protect, requireRole } = require('../middleware/authMiddleware');

router.use(protect, requireRole('admin'));

router.get('/analytics', getAnalytics);
router.get('/students', getStudents);
router.get('/recruiters', getRecruiters);
router.put('/approve-recruiter/:id', approveRecruiter);
router.delete('/users/:id', deleteUser);
router.delete('/jobs/:id', removeJob);
router.get('/payments', getPayments);

module.exports = router;
