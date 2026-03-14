import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function ResumeAnalytics() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    API.get('/resume/analysis').then(({ data }) => setAnalysis(data.analysis)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const { data } = await API.post('/resume/analyze');
      setAnalysis(data.analysis); toast.success('Resume analyzed!');
    } catch (err) { toast.error(err.response?.data?.message || 'Analysis failed'); }
    setAnalyzing(false);
  };

  const scoreColor = (s) => s >= 80 ? 'text-emerald-400' : s >= 50 ? 'text-amber-400' : 'text-red-400';

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title">Resume Analytics</h2>
        <button onClick={handleAnalyze} className="btn-primary" disabled={analyzing}>{analyzing ? 'Analyzing...' : analysis ? 'Re-Analyze' : 'Analyze Resume'}</button>
      </div>

      {!analysis ? (
        <div className="glass-card p-12 text-center">
          <p className="text-4xl mb-4">📄</p>
          <p className="text-gray-400 mb-2">No analysis yet</p>
          <p className="text-sm text-gray-500">Upload your resume in Profile, then click Analyze</p>
        </div>
      ) : (
        <>
          {/* Score card */}
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-gray-400 mb-2">Resume Score</p>
            <p className={`text-6xl font-extrabold ${scoreColor(analysis.score)}`}>{analysis.score}<span className="text-2xl text-gray-500">/100</span></p>
            <p className="text-sm text-gray-400 mt-2">ATS Score: <span className={scoreColor(analysis.atsScore)}>{analysis.atsScore}/100</span></p>
            <div className="w-full bg-white/5 rounded-full h-3 mt-4 max-w-md mx-auto">
              <div className={`h-3 rounded-full transition-all duration-700 ${analysis.score >= 80 ? 'bg-emerald-500' : analysis.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${analysis.score}%` }} />
            </div>
          </div>

          {/* Sections found */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Resume Sections</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(analysis.sections || {}).map(([key, val]) => (
                <div key={key} className={`rounded-xl p-3 text-center text-sm ${val.found ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {val.found ? '✓' : '✗'} {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-3 text-emerald-400">Keywords Found ({analysis.keywordsFound?.length || 0})</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.keywordsFound?.map((kw, i) => <span key={i} className="badge-green">{kw}</span>)}
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-3 text-red-400">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords?.map((kw, i) => <span key={i} className="badge-red">{kw}</span>)}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">💡 Suggestions</h3>
            <ul className="space-y-2">
              {analysis.suggestions?.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-primary-400 flex-shrink-0">→</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
