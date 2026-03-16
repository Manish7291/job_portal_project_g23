import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { HiOutlineBriefcase, HiOutlineUsers, HiOutlineTrendingUp, HiOutlineClock } from 'react-icons/hi';

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/jobs/my-jobs').catch(() => ({ data: { jobs: [] } })),
      API.get('/recruiters/profile').catch(() => ({ data: { profile: null } }))
    ]).then(([jobsRes, profileRes]) => {
      setJobs(jobsRes.data.jobs || []);
      setProfile(profileRes.data.profile);
    }).finally(() => setLoading(false));
  }, []);

  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicantsCount || 0), 0);
  const stats = [
    { label: 'Active Jobs', value: jobs.filter(j => j.isActive).length, icon: HiOutlineBriefcase, color: 'text-primary-400' },
    { label: 'Total Applicants', value: totalApplicants, icon: HiOutlineUsers, color: 'text-emerald-400' },
    { label: 'Total Hires', value: profile?.totalHires || 0, icon: HiOutlineTrendingUp, color: 'text-amber-400' },
    { label: 'Avg Response', value: `${profile?.avgResponseTime || 24}h`, icon: HiOutlineClock, color: 'text-accent-400' }
  ];

  if (loading) return <div className="grid md:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card"><s.icon className={`w-8 h-8 ${s.color}`} /><p className="text-2xl font-bold">{s.value}</p><p className="text-sm text-gray-400">{s.label}</p></div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/recruiter/post-job" className="glass-card-hover p-6 text-center"><p className="text-lg font-semibold mb-1">Post New Job</p><p className="text-sm text-gray-400">Create a new job listing</p></Link>
        <Link to="/recruiter/ai-simplifier" className="glass-card-hover p-6 text-center"><p className="text-lg font-semibold mb-1">AI Job Simplifier</p><p className="text-sm text-gray-400">Simplify job descriptions with AI</p></Link>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Recent Jobs</h3>
          <Link to="/recruiter/manage-jobs" className="text-sm text-primary-400">View All</Link>
        </div>
        {jobs.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No jobs posted yet</p>
        ) : (
          <div className="space-y-3">
            {jobs.slice(0, 5).map(job => (
              <Link key={job._id} to={`/recruiter/jobs/${job._id}/applicants`} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <div><p className="font-medium">{job.title}</p><p className="text-sm text-gray-400">{job.company} • {job.applicantsCount} applicants</p></div>
                <span className={job.isActive ? 'badge-green' : 'badge-red'}>{job.isActive ? 'Active' : 'Closed'}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
