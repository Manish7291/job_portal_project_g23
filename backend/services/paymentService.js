const Razorpay = require('razorpay');

/**
 * Initialize Razorpay instance
 * Returns null if keys are not provided (for mock mode)
 */
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_ID.includes('your_')) {
    return null;
  }
  
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

/**
 * Verify Razorpay payment signature
 */
const verifySignature = (orderId, paymentId, signature) => {
  if (!process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET.includes('your_')) {
    // If running in mock mode, automatically verify
    return true;
  }

  const crypto = require('crypto');
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
    
  return expectedSignature === signature;
};

module.exports = {
  getRazorpayInstance,
  verifySignature
};
