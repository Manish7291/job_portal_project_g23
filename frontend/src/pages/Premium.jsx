import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';
import { HiOutlineSparkles, HiOutlineCheck } from 'react-icons/hi';

const plans = [
  {
    name: 'Monthly', price: '₹499', period: '/month', plan: 'monthly',
    features: ['Unlimited job applications', 'Advanced resume analytics', 'ATS deep insights', 'Priority applicant badge', 'Early job notifications', 'Performance analytics']
  },
  {
    name: 'Yearly', price: '₹3,999', period: '/year', plan: 'yearly', popular: true,
    features: ['Everything in Monthly', 'Save 33% annually', 'Exclusive webinar access', 'Direct recruiter connect', 'Profile boost', '1-on-1 career guidance']
  }
];

export default function Premium() {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleBuy = async (plan) => {
    if (!user) return navigate('/login');
    try {
      const { data } = await API.post('/payments/create-order', { plan });
      // For mock payments
      if (data.order.id.startsWith('order_mock_')) {
        await API.post('/payments/verify', { razorpayOrderId: data.order.id, razorpayPaymentId: 'mock', razorpaySignature: 'mock', paymentId: data.payment });
        toast.success('Premium activated!');
        return;
      }
      // Real Razorpay
      const options = {
        key: data.key, amount: data.order.amount, currency: 'INR', name: 'JOBFLUX Premium', description: `${plan} Plan`,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            await API.post('/payments/verify', { razorpayOrderId: response.razorpay_order_id, razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature, paymentId: data.payment });
            toast.success('Premium activated!');
          } catch { toast.error('Payment verification failed'); }
        },
        theme: { color: '#3b82f6' }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) { toast.error(err.response?.data?.message || 'Payment failed'); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
          <HiOutlineSparkles className="w-4 h-4" /> Premium Membership
        </div>
        <h1 className="text-4xl font-bold mb-3">Upgrade to <span className="text-gradient">Premium</span></h1>
        <p className="text-gray-400 text-lg">Unlock powerful features to accelerate your career</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.map((p, i) => (
          <div key={i} className={`glass-card p-8 relative ${p.popular ? 'border-primary-500/50 ring-1 ring-primary-500/20' : ''}`}>
            {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
            <h3 className="text-xl font-bold mb-1">{p.name}</h3>
            <div className="mb-6"><span className="text-4xl font-extrabold text-gradient">{p.price}</span><span className="text-gray-500">{p.period}</span></div>
            <ul className="space-y-3 mb-8">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                  <HiOutlineCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => handleBuy(p.plan)} className={p.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}>
              Get {p.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
