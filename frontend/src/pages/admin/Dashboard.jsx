import { useState, useEffect } from 'react';
import API from '../../services/api';
import { HiOutlineUsers, HiOutlineBriefcase, HiOutlineCreditCard, HiOutlineClipboardList, HiOutlineCurrencyRupee, HiOutlineClock } from 'react-icons/hi';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { API.get('/admin/analytics').then(({ data }) => setAnalytics(data.analytics)).finally(() => setLoading(false)); }, []);

  if (loading) return <div className="grid md:grid-cols-3 gap-4">{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}</div>;
  if (!analytics) return <div className="text-center py-20 text-gray-500">Failed to load analytics</div>;

  const stats = [
    { label: 'Total Students', value: analytics.totalStudents, icon: HiOutlineUsers, color: 'text-primary-400' },
    { label: 'Total Recruiters', value: analytics.totalRecruiters, icon: HiOutlineBriefcase, color: 'text-emerald-400' },
    { label: 'Total Jobs', value: analytics.totalJobs, icon: HiOutlineClipboardList, color: 'text-amber-400' },
    { label: 'Applications', value: analytics.totalApplications, icon: HiOutlineClipboardList, color: 'text-accent-400' },
    { label: 'Payments', value: analytics.totalPayments, icon: HiOutlineCreditCard, color: 'text-emerald-400' },
    { label: 'Revenue', value: `₹${(analytics.totalRevenue / 100).toLocaleString()}`, icon: HiOutlineCurrencyRupee, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card"><s.icon className={`w-8 h-8 ${s.color}`} /><p className="text-2xl font-bold">{s.value}</p><p className="text-sm text-gray-400">{s.label}</p></div>
        ))}
      </div>
      {analytics.pendingRecruiters > 0 && (
        <div className="glass-card p-4 bg-amber-500/10 border-amber-500/20 flex items-center gap-3">
          <HiOutlineClock className="w-6 h-6 text-amber-400" />
          <p className="text-amber-300 font-medium">{analytics.pendingRecruiters} recruiter(s) pending approval</p>
        </div>
      )}
    </div>
  );
}
