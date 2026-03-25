import { useState } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { HiOutlineSparkles } from 'react-icons/hi';

export default function AISimplifier() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimplify = async (e) => {
    e.preventDefault(); if (!description.trim()) return;
    setLoading(true);
    try {
      const { data } = await API.post('/ai/simplify-jd', { description });
      setResult(data.result);
      if (data.note) toast(data.note, { icon: 'ℹ️' });
    } catch (err) { toast.error('Failed to analyze'); }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <HiOutlineSparkles className="w-8 h-8 text-accent-400" />
        <h2 className="section-title">AI Job Description Simplifier</h2>
      </div>
      <form onSubmit={handleSimplify} className="glass-card p-6 space-y-4">
        <textarea className="input-field" rows="8" placeholder="Paste any job description here..." value={description} onChange={e => setDescription(e.target.value)} required />
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Simplify with AI'}</button>
      </form>

      {result && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-emerald-400 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">{result.requiredSkills?.map((s, i) => <span key={i} className="badge-green">{s}</span>)}</div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold text-primary-400 mb-3">Key Responsibilities</h3>
            <ul className="space-y-2">{result.responsibilities?.map((r, i) => <li key={i} className="text-sm text-gray-300 flex gap-2"><span className="text-primary-400">→</span> {r}</li>)}</ul>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold text-amber-400 mb-3">Eligibility</h3>
            <ul className="space-y-2">{result.eligibility?.map((e, i) => <li key={i} className="text-sm text-gray-300 flex gap-2"><span className="text-amber-400">•</span> {e}</li>)}</ul>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold text-accent-400 mb-3">Experience Required</h3>
            <p className="text-gray-300">{result.experienceRequired}</p>
          </div>
        </div>
      )}
    </div>
  );
}
