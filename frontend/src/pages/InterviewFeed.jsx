import { useState, useEffect } from 'react';
import API from '../services/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function InterviewFeed() {
  const { user } = useSelector(state => state.auth);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ companyName: '', role: '', rounds: 1, difficulty: 'medium', questions: '', experience: '', timeline: '', result: 'pending', tips: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      API.get(`/interviews?company=${search}`).then(({ data }) => setExperiences(data.experiences)).finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, questions: form.questions.split('\n').filter(q => q.trim()) };
      const { data } = await API.post('/interviews', payload);
      setExperiences([data.experience, ...experiences]);
      setShowForm(false); setForm({ companyName: '', role: '', rounds: 1, difficulty: 'medium', questions: '', experience: '', timeline: '', result: 'pending', tips: '' });
      toast.success('Experience shared!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to submit'); }
  };

  const diffColors = { easy: 'badge-green', medium: 'badge-yellow', hard: 'badge-red' };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Interview <span className="text-gradient">Experiences</span></h1>
          <p className="text-gray-400">Learn from real interviews</p>
        </div>
        <div className="flex gap-3">
          <input className="input-field w-48" placeholder="Search company..." value={search} onChange={e => setSearch(e.target.value)} />
          {user?.role === 'student' && <button onClick={() => setShowForm(!showForm)} className="btn-primary whitespace-nowrap">{showForm ? 'Cancel' : 'Share Experience'}</button>}
        </div>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Share Your Interview Experience</h3>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Company Name" required value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />
            <input className="input-field" placeholder="Role" required value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
            <input className="input-field" type="number" min="1" placeholder="Rounds" value={form.rounds} onChange={e => setForm({...form, rounds: e.target.value})} />
            <select className="input-field" value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}>
              <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
            </select>
            <textarea className="input-field md:col-span-2" rows="3" placeholder="Interview questions (one per line)" value={form.questions} onChange={e => setForm({...form, questions: e.target.value})} />
            <textarea className="input-field md:col-span-2" rows="3" placeholder="Your experience..." required value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} />
            <input className="input-field" placeholder="Timeline (e.g., 2 weeks)" value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})} />
            <select className="input-field" value={form.result} onChange={e => setForm({...form, result: e.target.value})}>
              <option value="selected">Selected</option><option value="rejected">Rejected</option><option value="pending">Pending</option>
            </select>
            <textarea className="input-field md:col-span-2" rows="2" placeholder="Tips for future candidates" value={form.tips} onChange={e => setForm({...form, tips: e.target.value})} />
            <button type="submit" className="btn-primary md:col-span-2">Submit Experience</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}</div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No interview experiences found</div>
      ) : (
        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp._id} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold">{exp.companyName}</h3>
                <span className="badge-primary">{exp.role}</span>
                <span className={diffColors[exp.difficulty]}>{exp.difficulty}</span>
                <span className={exp.result === 'selected' ? 'badge-green' : exp.result === 'rejected' ? 'badge-red' : 'badge-yellow'}>{exp.result}</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{exp.experience}</p>
              {exp.questions?.length > 0 && (
                <div className="mb-3"><p className="text-xs text-gray-500 mb-1">Questions asked:</p>
                  <ul className="list-disc list-inside text-sm text-gray-400">{exp.questions.map((q, i) => <li key={i}>{q}</li>)}</ul>
                </div>
              )}
              <div className="flex gap-4 text-xs text-gray-500">
                <span>{exp.rounds} round(s)</span>
                {exp.timeline && <span>Timeline: {exp.timeline}</span>}
                <span>{new Date(exp.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
