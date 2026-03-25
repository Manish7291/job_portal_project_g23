import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { API.get('/admin/students').then(({ data }) => setStudents(data.students || [])).finally(() => setLoading(false)); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this student?')) return;
    try { await API.delete(`/admin/users/${id}`); setStudents(students.filter(s => s._id !== id)); toast.success('Student removed'); } catch { toast.error('Failed'); }
  };

  if (loading) return <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      <h2 className="section-title">Manage Students ({students.length})</h2>
      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-left text-gray-400"><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Joined</th><th className="p-4">Action</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4 text-gray-400">{s.email}</td>
                <td className="p-4 text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                <td className="p-4"><button onClick={() => handleDelete(s._id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
