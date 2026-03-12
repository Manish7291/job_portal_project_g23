import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../services/api';
import toast from 'react-hot-toast';
import { HiOutlineLocationMarker, HiOutlineCurrencyRupee, HiOutlineClock, HiOutlineBookmark } from 'react-icons/hi';

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    API.get(`/jobs/${id}`).then(({ data }) => setJob(data.job)).catch(() => toast.error('Job not found')).finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    if (!user) return toast.error('Please login to apply');
    setApplying(true);
    try {
      await API.post(`/applications/${id}`);
      toast.success('Application submitted!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to apply'); }
    setApplying(false);
  };

  const handleSave = async () => {
    if (!user) return toast.error('Please login');
    try {
      await API.post(`/students/save-job/${id}`);
      toast.success('Job saved!');
    } catch (err) { toast.error('Failed to save job'); }
  };
  
  const handleSimplify = async () => {
    if (!job?.description) return;
    setAiLoading(true);
    try {
      const { data } = await API.post('/ai/simplify-jd', { description: job.description });
      if (data.success) {
        setAiResult(data.result);
        if (data.note) toast(data.note, { icon: 'ℹ️' });
      }
    } catch (err) {
      toast.error('Failed to analyze job description');
    }
    setAiLoading(false);
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-12"><div className="skeleton h-64 rounded-2xl mb-4" /><div className="skeleton h-32 rounded-2xl" /></div>;
  if (!job) return <div className="text-center py-20 text-gray-500">Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="glass-card p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <p className="text-xl text-primary-400">{job.company}</p>
          </div>
          <div className="flex gap-3">
            {user?.role === 'student' && (
              <>
                <button onClick={handleSave} className="btn-secondary py-2 px-4 flex items-center gap-2"><HiOutlineBookmark className="w-5 h-5" /> Save</button>
                <button onClick={handleApply} className="btn-primary py-2 px-4" disabled={applying}>{applying ? 'Applying...' : 'Apply Now'}</button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <HiOutlineLocationMarker className="w-5 h-5 mx-auto mb-1 text-primary-400" />
            <p className="text-sm text-gray-400">{job.location}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <HiOutlineCurrencyRupee className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
            <p className="text-sm text-gray-400">{job.salary?.min > 0 ? `₹${(job.salary.min/100000).toFixed(1)}L - ₹${(job.salary.max/100000).toFixed(1)}L` : 'Not disclosed'}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <HiOutlineClock className="w-5 h-5 mx-auto mb-1 text-amber-400" />
            <p className="text-sm text-gray-400 capitalize">{job.jobType}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <span className="text-lg">🏢</span>
            <p className="text-sm text-gray-400 capitalize">{job.workMode}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Experience Required</h3>
          <p className="text-gray-400">{job.experience}</p>
        </div>

        {job.skillsRequired?.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((s, i) => <span key={i} className="badge-primary">{s}</span>)}
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Description</h3>
            {user?.role === 'student' && (
              <button 
                onClick={handleSimplify}
                disabled={aiLoading}
                className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1"
              >
                ✨ {aiLoading ? 'Simplifying...' : 'Simplify with AI'}
              </button>
            )}
          </div>
          
          {aiResult && (
            <div className="mb-6 p-4 rounded-xl bg-purple-500/5 text-purple-100 border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">✨ AI Simplified Requirements</h4>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-medium text-purple-300 block mb-1">Key Responsibilities:</span>
                  <ul className="list-disc pl-5 space-y-1">
                    {aiResult.responsibilities?.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-purple-300 block mb-1">Required Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {aiResult.requiredSkills?.map((skill, i) => (
                        <span key={i} className="bg-purple-500/20 px-2 py-0.5 rounded text-xs">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-purple-300 block mb-1">Experience Level:</span>
                    <p>{aiResult.experienceRequired}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-gray-400 whitespace-pre-line">{job.description}</p>
        </div>

        {job.jdFile && (
          <div className="mb-6">
            <a href={`http://localhost:5000${job.jdFile}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 bg-primary-400/10 px-4 py-2 rounded-xl transition-colors">
              📄 View Original JD Document
            </a>
          </div>
        )}

        {job.deadline && (
          <div className="text-sm text-gray-500">Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
        )}
      </div>

      <Link to="/jobs" className="text-primary-400 hover:text-primary-300 text-sm">← Back to Jobs</Link>
    </div>
  );
}
