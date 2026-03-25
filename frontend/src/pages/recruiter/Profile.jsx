import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function RecruiterProfile() {
  const [form, setForm] = useState({ companyName: '', companyWebsite: '', companyDescription: '', industry: '', companySize: '', location: '', phone: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/recruiters/profile').then(({ data }) => {
      const p = data.profile;
      setForm({ companyName: p.companyName || '', companyWebsite: p.companyWebsite || '', companyDescription: p.companyDescription || '', industry: p.industry || '', companySize: p.companySize || '', location: p.location || '', phone: p.phone || '' });
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try { await API.put('/recruiters/profile', form); toast.success('Profile updated!'); } catch { toast.error('Failed to update'); }
  };

  if (loading) return <div className="skeleton h-64 rounded-2xl" />;

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="section-title">Company Profile</h2>
      <form onSubmit={handleSave} className="glass-card p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-400 mb-1">Company Name</label><input className="input-field" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} required /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Website</label><input className="input-field" value={form.companyWebsite} onChange={e => setForm({...form, companyWebsite: e.target.value})} /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Industry</label><input className="input-field" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Company Size</label><input className="input-field" placeholder="50-100" value={form.companySize} onChange={e => setForm({...form, companySize: e.target.value})} /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Location</label><input className="input-field" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Phone</label><input className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
        </div>
        <div><label className="block text-sm text-gray-400 mb-1">Company Description</label><textarea className="input-field" rows="4" value={form.companyDescription} onChange={e => setForm({...form, companyDescription: e.target.value})} /></div>
        <button type="submit" className="btn-primary">Save Profile</button>
      </form>
    </div>
  );
}
