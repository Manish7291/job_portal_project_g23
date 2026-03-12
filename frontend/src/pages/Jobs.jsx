import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { HiOutlineSearch, HiOutlineLocationMarker, HiOutlineCurrencyRupee, HiOutlineBookmark } from 'react-icons/hi';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', location: '', jobType: '', workMode: '', page: 1 });
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
      const { data } = await API.get(`/jobs?${params}`);
      setJobs(data.jobs); setTotal(data.total); setPages(data.pages);
    } catch (err) { console.error(err); }
    setLoading(false);
  }, [filters]);

  useEffect(() => { const timer = setTimeout(fetchJobs, 300); return () => clearTimeout(timer); }, [fetchJobs]);

  const statusColors = { 'full-time': 'badge-green', 'part-time': 'badge-yellow', 'internship': 'badge-purple', 'contract': 'badge-primary' };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Find Your <span className="text-gradient">Perfect Job</span></h1>
        <p className="text-gray-400">Browse {total} active opportunities</p>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <HiOutlineSearch className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
            <input className="input-field pl-10" placeholder="Search jobs, companies, skills..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value, page: 1})} />
          </div>
          <input className="input-field md:w-48" placeholder="Location" value={filters.location} onChange={e => setFilters({...filters, location: e.target.value, page: 1})} />
          <select className="input-field md:w-40" value={filters.jobType} onChange={e => setFilters({...filters, jobType: e.target.value, page: 1})}>
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
          <select className="input-field md:w-40" value={filters.workMode} onChange={e => setFilters({...filters, workMode: e.target.value, page: 1})}>
            <option value="">All Modes</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Job List */}
      {loading ? (
        <div className="grid gap-4">{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20"><p className="text-gray-500 text-lg">No jobs found matching your criteria</p></div>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <Link key={job._id} to={`/jobs/${job._id}`} className="glass-card-hover p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <span className={statusColors[job.jobType] || 'badge-primary'}>{job.jobType}</span>
                  <span className="badge bg-white/5 text-gray-400 capitalize">{job.workMode}</span>
                </div>
                <p className="text-gray-400 text-sm">{job.company}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><HiOutlineLocationMarker className="w-4 h-4" /> {job.location}</span>
                  {job.salary?.min > 0 && <span className="flex items-center gap-1"><HiOutlineCurrencyRupee className="w-4 h-4" /> {(job.salary.min/100000).toFixed(1)}L - {(job.salary.max/100000).toFixed(1)}L</span>}
                  <span>{job.experience}</span>
                </div>
                {job.skillsRequired?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skillsRequired.slice(0, 5).map((skill, i) => <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded-lg text-gray-400">{skill}</span>)}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(pages)].map((_, i) => (
            <button key={i} onClick={() => setFilters({...filters, page: i + 1})}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${filters.page === i + 1 ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
