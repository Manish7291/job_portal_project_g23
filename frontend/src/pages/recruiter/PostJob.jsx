import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function PostJob() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ title: '', company: '', location: '', description: '', experience: 'Fresher', jobType: 'full-time', workMode: 'on-site', skillsRequired: '', salary: { min: '', max: '' }, deadline: '' });
  const [jdFile, setJdFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!form.description && !jdFile) {
      return toast.error('Please provide either a text description or upload a JD document');
    }
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('company', form.company);
      formData.append('location', form.location);
      if (form.description) formData.append('description', form.description);
      formData.append('experience', form.experience);
      formData.append('jobType', form.jobType);
      formData.append('workMode', form.workMode);
      formData.append('deadline', form.deadline);
      
      const skillsArray = form.skillsRequired.split(',').map(s => s.trim()).filter(Boolean);
      skillsArray.forEach(skill => formData.append('skillsRequired[]', skill));
      
      formData.append('salary[min]', parseInt(form.salary.min) || 0);
      formData.append('salary[max]', parseInt(form.salary.max) || 0);
      
      if (jdFile) {
        formData.append('jdFile', jdFile);
      }

      await API.post('/jobs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success('Job posted successfully!'); 
      navigate('/recruiter/manage-jobs');
    } catch (err) { 
      toast.error(err.response?.data?.message || 'Failed to post job'); 
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="section-title">Post New Job</h2>
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-400 mb-1">Job Title *</label><input className="input-field" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Company *</label><input className="input-field" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Location *</label><input className="input-field" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Experience</label><input className="input-field" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Job Type</label>
            <select className="input-field" value={form.jobType} onChange={e => setForm({...form, jobType: e.target.value})}>
              <option value="full-time">Full Time</option><option value="part-time">Part Time</option><option value="internship">Internship</option><option value="contract">Contract</option>
            </select></div>
          <div><label className="block text-sm text-gray-400 mb-1">Work Mode</label>
            <select className="input-field" value={form.workMode} onChange={e => setForm({...form, workMode: e.target.value})}>
              <option value="on-site">On-site</option><option value="remote">Remote</option><option value="hybrid">Hybrid</option>
            </select></div>
          <div><label className="block text-sm text-gray-400 mb-1">Min Salary (₹)</label><input className="input-field" type="number" value={form.salary.min} onChange={e => setForm({...form, salary: {...form.salary, min: e.target.value}})} /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Max Salary (₹)</label><input className="input-field" type="number" value={form.salary.max} onChange={e => setForm({...form, salary: {...form.salary, max: e.target.value}})} /></div>
        </div>
        <div><label className="block text-sm text-gray-400 mb-1">Skills Required (comma-separated)</label><input className="input-field" value={form.skillsRequired} onChange={e => setForm({...form, skillsRequired: e.target.value})} placeholder="React, Node.js, MongoDB" /></div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-400 mb-1">Deadline</label><input className="input-field" type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} /></div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Upload JD (PDF) — Optional</label>
            <input type="file" ref={fileInputRef} className="input-field" accept=".pdf" onChange={(e) => setJdFile(e.target.files[0])} />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Description {jdFile ? '(Optional since JD uploaded)' : '*'}</label>
          <textarea className="input-field" rows="6" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required={!jdFile} />
        </div>
        
        <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Posting...' : 'Post Job'}</button>
      </form>
    </div>
  );
}
