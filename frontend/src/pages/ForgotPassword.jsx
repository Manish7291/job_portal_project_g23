import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/forgot-password', { email });
      setSent(true);
      toast.success('Reset email sent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset email');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="glass-card p-8 w-full max-w-md text-center">
        {sent ? (
          <>
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✉️</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
            <p className="text-gray-400 mb-6">We've sent a password reset link to {email}</p>
            <Link to="/login" className="text-primary-400 hover:text-primary-300">Back to Login</Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gradient mb-2">Reset Password</h1>
            <p className="text-gray-400 mb-6">Enter your email to receive a reset link</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="email" className="input-field" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
            </form>
            <Link to="/login" className="block mt-4 text-sm text-gray-400 hover:text-white">Back to Login</Link>
          </>
        )}
      </div>
    </div>
  );
}
