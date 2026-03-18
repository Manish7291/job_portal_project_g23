import { useState, useEffect } from 'react';
import API from '../../services/api';

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { API.get('/admin/payments').then(({ data }) => setPayments(data.payments || [])).finally(() => setLoading(false)); }, []);

  if (loading) return <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <h2 className="section-title">Payment History ({payments.length})</h2>
      <div className="glass-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-left text-gray-400"><th className="p-4">User</th><th className="p-4">Plan</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4">Date</th></tr></thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 font-medium">{p.user?.name || 'Unknown'}</td>
                <td className="p-4 text-gray-400 capitalize">{p.plan}</td>
                <td className="p-4 text-gray-400">₹{(p.amount / 100).toLocaleString()}</td>
                <td className="p-4"><span className={p.status === 'paid' ? 'badge-green' : p.status === 'failed' ? 'badge-red' : 'badge-yellow'}>{p.status}</span></td>
                <td className="p-4 text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && <p className="text-center py-8 text-gray-500">No payments yet</p>}
      </div>
    </div>
  );
}
