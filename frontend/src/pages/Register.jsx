import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

export default function Register() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: searchParams.get('role') || 'student', companyName: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(state => state.auth);

  useEffect(() => { if (error) { toast.error(error); dispatch(clearError()); } }, [error]);
  useEffect(() => { if (user) navigate(`/${user.role}/dashboard`); }, [user]);

  const handleSubmit = (e) => { e.preventDefault(); dispatch(register(form)); };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Create Account</h1>
          <p className="text-gray-400">Join JOBFLUX today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-3">
            {['student', 'recruiter'].map(r => (
              <button key={r} type="button" onClick={() => setForm({...form, role: r})}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${form.role === r ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
            <input type="text" className="input-field" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Password</label>
            <input type="password" className="input-field" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength={6} />
          </div>
          {form.role === 'recruiter' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Company Name</label>
              <input type="text" className="input-field" placeholder="Acme Corp" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} required />
            </div>
          )}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
