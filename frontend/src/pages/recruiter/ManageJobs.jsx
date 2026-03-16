import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { API.get('/jobs/my-jobs').then(({ data }) => setJobs(data.jobs || [])).finally(() => setLoading(false)); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    try { await API.delete(`/jobs/${id}`); setJobs(jobs.filter(j => j._id !== id)); toast.success('Job deleted'); } catch { toast.error('Failed to delete'); }
  };

  if (loading) return <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title">Manage Jobs</h2>
        <Link to="/recruiter/post-job" className="btn-primary">+ Post New</Link>
      </div>
      {jobs.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-500">No jobs posted yet</div>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <div key={job._id} className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold">{job.title}</h4>
                <p className="text-sm text-gray-400">{job.company} • {job.location} • {job.applicantsCount} applicants</p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/recruiter/jobs/${job._id}/applicants`} className="btn-secondary text-sm py-1.5 px-3">Applicants</Link>
                <button onClick={() => handleDelete(job._id)} className="btn-danger text-sm py-1.5 px-3">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
