import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    API.get('/students/profile').then(({ data }) => {
      setProfile(data.profile); setUserData(data.user);
      setForm({
        phone: data.profile.phone || '', college: data.profile.college || '', branch: data.profile.branch || '',
        graduationYear: data.profile.graduationYear || '', skills: data.profile.skills?.join(', ') || '',
        githubLink: data.profile.githubLink || '', linkedinLink: data.profile.linkedinLink || ''
      });
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const { data } = await API.put('/students/profile', form);
      setProfile(data.profile); toast.success('Profile updated!');
    } catch (err) { toast.error('Failed to update'); }
    setSaving(false);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append('photo', file);
    try {
      const { data } = await API.post('/students/photo', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setUserData({ ...userData, profilePhoto: data.profilePhoto }); toast.success('Photo uploaded!');
    } catch (err) { toast.error('Photo upload failed'); }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append('resume', file);
    try {
      const { data } = await API.post('/students/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setProfile({ ...profile, resumeFile: data.resumeFile }); toast.success('Resume uploaded!');
    } catch (err) { toast.error('Resume upload failed'); }
  };

  if (loading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="section-title">Edit Profile</h2>

      {/* Photo & Resume */}
      <div className="glass-card p-6 flex flex-col md:flex-row gap-6">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-3xl font-bold mx-auto mb-3 overflow-hidden">
            {userData?.profilePhoto ? <img src={`/${userData.profilePhoto}`} alt="" className="w-full h-full object-cover" /> : userData?.name?.charAt(0).toUpperCase()}
          </div>
          <label className="btn-secondary text-xs py-1.5 px-3 cursor-pointer">
            Upload Photo <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2">Resume</p>
          {profile?.resumeFile ? (
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
              <span className="text-sm text-emerald-400">✓ Resume uploaded</span>
              <label className="text-sm text-primary-400 cursor-pointer hover:text-primary-300">
                Replace <input type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} />
              </label>
            </div>
          ) : (
            <label className="btn-primary text-sm cursor-pointer inline-block">
              Upload Resume (PDF) <input type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} />
            </label>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="glass-card p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-400 mb-1">Phone</label>
            <input className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="9876543210" /></div>
          <div><label className="block text-sm text-gray-400 mb-1">College</label>
            <input className="input-field" value={form.college} onChange={e => setForm({...form, college: e.target.value})} placeholder="IIT Delhi" /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Branch</label>
            <input className="input-field" value={form.branch} onChange={e => setForm({...form, branch: e.target.value})} placeholder="Computer Science" /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Graduation Year</label>
            <input className="input-field" type="number" value={form.graduationYear} onChange={e => setForm({...form, graduationYear: e.target.value})} placeholder="2025" /></div>
        </div>
        <div><label className="block text-sm text-gray-400 mb-1">Skills (comma-separated)</label>
          <input className="input-field" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder="React, Node.js, MongoDB" /></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-400 mb-1">GitHub</label>
            <input className="input-field" value={form.githubLink} onChange={e => setForm({...form, githubLink: e.target.value})} placeholder="https://github.com/username" /></div>
          <div><label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
            <input className="input-field" value={form.linkedinLink} onChange={e => setForm({...form, linkedinLink: e.target.value})} placeholder="https://linkedin.com/in/username" /></div>
        </div>
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
      </form>
    </div>
  );
}
