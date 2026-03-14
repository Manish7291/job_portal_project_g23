import { useState, useEffect } from 'react';
import API from '../../services/api';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    API.get('/applications/my').then(({ data }) => setApplications(data.applications || [])).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter);
  const statuses = ['all', 'applied', 'viewed', 'shortlisted', 'interview', 'rejected', 'selected'];
  const statusColors = { applied: 'badge-primary', viewed: 'badge-yellow', shortlisted: 'badge-purple', interview: 'badge-primary', rejected: 'badge-red', selected: 'badge-green' };

  if (loading) return <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <h2 className="section-title">My Applications</h2>
      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === s ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            {s !== 'all' && <span className="ml-1 text-xs">({applications.filter(a => a.status === s).length})</span>}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No applications found</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(app => (
            <div key={app._id} className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h4 className="font-semibold">{app.job?.title || 'Job removed'}</h4>
                <p className="text-sm text-gray-400">{app.job?.company} • {app.job?.location}</p>
                <p className="text-xs text-gray-500 mt-1">Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={statusColors[app.status] || 'badge-primary'}>{app.status}</span>
                {app.statusUpdatedAt && <span className="text-xs text-gray-500">Updated {new Date(app.statusUpdatedAt).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
