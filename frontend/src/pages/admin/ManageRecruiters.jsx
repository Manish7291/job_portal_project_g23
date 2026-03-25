import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageRecruiters() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { API.get('/admin/recruiters').then(({ data }) => setRecruiters(data.recruiters || [])).finally(() => setLoading(false)); }, []);

  const handleApprove = async (id) => {
    try { await API.put(`/admin/approve-recruiter/${id}`); setRecruiters(recruiters.map(r => r._id === id ? { ...r, isApproved: true } : r)); toast.success('Recruiter approved'); } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this recruiter?')) return;
    try { await API.delete(`/admin/users/${id}`); setRecruiters(recruiters.filter(r => r._id !== id)); toast.success('Recruiter removed'); } catch { toast.error('Failed'); }
  };

  if (loading) return <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <h2 className="section-title">Manage Recruiters ({recruiters.length})</h2>
      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-left text-gray-400"><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Company</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
          <tbody>
            {recruiters.map(r => (
              <tr key={r._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 font-medium">{r.name}</td>
                <td className="p-4 text-gray-400">{r.email}</td>
                <td className="p-4 text-gray-400">{r.profile?.companyName || '-'}</td>
                <td className="p-4"><span className={r.isApproved ? 'badge-green' : 'badge-yellow'}>{r.isApproved ? 'Approved' : 'Pending'}</span></td>
                <td className="p-4 space-x-2">
                  {!r.isApproved && <button onClick={() => handleApprove(r._id)} className="text-emerald-400 hover:text-emerald-300 text-xs">Approve</button>}
                  <button onClick={() => handleDelete(r._id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
