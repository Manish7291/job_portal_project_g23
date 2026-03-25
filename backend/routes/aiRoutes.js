const router = require('express').Router();
const { simplifyJobDescription } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/simplify-jd', protect, simplifyJobDescription);

module.exports = router;
