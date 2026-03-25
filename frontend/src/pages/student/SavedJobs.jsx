import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { API.get('/students/saved-jobs').then(({ data }) => setJobs(data.savedJobs || [])).finally(() => setLoading(false)); }, []);

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <h2 className="section-title">Saved Jobs</h2>
      {jobs.length === 0 ? (
        <div className="glass-card p-12 text-center"><p className="text-gray-500">No saved jobs yet</p><Link to="/jobs" className="text-primary-400 text-sm mt-2 inline-block">Browse Jobs →</Link></div>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <Link key={job._id} to={`/jobs/${job._id}`} className="glass-card-hover p-5 flex items-center justify-between">
              <div><h4 className="font-semibold">{job.title}</h4><p className="text-sm text-gray-400">{job.company} • {job.location}</p></div>
              <span className="badge-primary capitalize">{job.jobType}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
