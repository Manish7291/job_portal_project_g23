const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const StudentProfile = require('../models/StudentProfile');
const Notification = require('../models/Notification');

const PLANS = {
  monthly: { amount: 49900, duration: 30 },  // ₹499
  yearly: { amount: 399900, duration: 365 }   // ₹3999
};

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
exports.createOrder = asyncHandler(async (req, res) => {
  const { plan } = req.body;
  if (!plan || !PLANS[plan]) throw new AppError('Invalid plan. Choose monthly or yearly.', 400);

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || keyId === 'your_razorpay_key_id') {
    // Mock order for demo
    const mockOrderId = 'order_mock_' + Date.now();
    const payment = await Payment.create({
      user: req.user._id, razorpayOrderId: mockOrderId, amount: PLANS[plan].amount, plan
    });
    return res.json({
      success: true, order: { id: mockOrderId, amount: PLANS[plan].amount, currency: 'INR' },
      key: 'mock_key', payment: payment._id,
      note: 'Razorpay not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'
    });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  const order = await razorpay.orders.create({
    amount: PLANS[plan].amount, currency: 'INR',
    receipt: `receipt_${req.user._id}_${Date.now()}`
  });

  const payment = await Payment.create({
    user: req.user._id, razorpayOrderId: order.id, amount: PLANS[plan].amount, plan
  });

  res.json({ success: true, order, key: keyId, payment: payment._id });
});

// @desc    Verify payment
// @route   POST /api/payments/verify
exports.verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId } = req.body;

  const payment = await Payment.findById(paymentId);
  if (!payment) throw new AppError('Payment record not found', 404);

  // For mock payments
  if (razorpayOrderId.startsWith('order_mock_')) {
    payment.razorpayPaymentId = 'pay_mock_' + Date.now();
    payment.status = 'paid';
    await payment.save();
  } else {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const sign = crypto.createHmac('sha256', keySecret)
      .update(razorpayOrderId + '|' + razorpayPaymentId).digest('hex');

    if (sign !== razorpaySignature) {
      payment.status = 'failed';
      await payment.save();
      throw new AppError('Payment verification failed', 400);
    }
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    payment.status = 'paid';
    await payment.save();
  }

  // Activate premium
  const plan = PLANS[payment.plan];
  const profile = await StudentProfile.findOne({ user: req.user._id });
  profile.isPremium = true;
  profile.premiumExpiry = new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000);
  await profile.save();

  await Notification.create({
    user: req.user._id, type: 'premium_activated', title: 'Premium Activated!',
    message: `Your ${payment.plan} premium plan is now active.`, link: '/student/dashboard'
  });

  res.json({ success: true, message: 'Payment verified. Premium activated!' });
});

// @desc    Get payment history
// @route   GET /api/payments/history
exports.getPaymentHistory = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, payments });
});
