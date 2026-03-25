const router = require('express').Router();
const { createOrder, verifyPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect, requireRole } = require('../middleware/authMiddleware');

router.post('/create-order', protect, requireRole('student'), createOrder);
router.post('/verify', protect, requireRole('student'), verifyPayment);
router.get('/history', protect, getPaymentHistory);

module.exports = router;
