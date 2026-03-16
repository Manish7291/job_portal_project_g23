import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function Applicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { API.get(`/applications/job/${jobId}`).then(({ data }) => setApplicants(data.applications || [])).finally(() => setLoading(false)); }, [jobId]);

  const updateStatus = async (appId, status) => {
    try {
      await API.put(`/applications/${appId}/status`, { status });
      setApplicants(applicants.map(a => a._id === appId ? { ...a, status } : a));
      toast.success(`Status updated to ${status}`);
    } catch (err) { toast.error('Failed to update'); }
  };

  const statusColors = { applied: 'badge-primary', viewed: 'badge-yellow', shortlisted: 'badge-purple', interview: 'badge-primary', rejected: 'badge-red', selected: 'badge-green' };

  if (loading) return <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <h2 className="section-title">Applicants ({applicants.length})</h2>
      {applicants.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-500">No applicants yet</div>
      ) : (
        <div className="space-y-3">
          {applicants.map(app => (
            <div key={app._id} className="glass-card p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center font-bold text-sm">
                    {app.applicant?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{app.applicant?.name}</p>
                    <p className="text-sm text-gray-400">{app.applicant?.email}</p>
                  </div>
                  <span className={statusColors[app.status]}>{app.status}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['viewed', 'shortlisted', 'interview', 'selected', 'rejected'].map(s => (
                    <button key={s} onClick={() => updateStatus(app._id, s)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-all ${app.status === s ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
