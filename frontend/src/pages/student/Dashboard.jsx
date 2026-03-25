import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { HiOutlineClipboardList, HiOutlineBookmark, HiOutlineDocumentText, HiOutlineSparkles, HiOutlineTrendingUp } from 'react-icons/hi';

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/students/profile').catch(() => ({ data: { profile: null } })),
      API.get('/applications/my').catch(() => ({ data: { applications: [] } }))
    ]).then(([profileRes, appsRes]) => {
      setProfile(profileRes.data.profile);
      setApplications(appsRes.data.applications || []);
    }).finally(() => setLoading(false));
  }, []);

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1; return acc;
  }, {});

  const stats = [
    { label: 'Applications', value: applications.length, icon: HiOutlineClipboardList, color: 'text-primary-400' },
    { label: 'Shortlisted', value: statusCounts.shortlisted || 0, icon: HiOutlineTrendingUp, color: 'text-emerald-400' },
    { label: 'Saved Jobs', value: profile?.savedJobs?.length || 0, icon: HiOutlineBookmark, color: 'text-amber-400' },
    { label: 'Resume Score', value: `${profile?.resumeScore || 0}/100`, icon: HiOutlineDocumentText, color: 'text-accent-400' }
  ];

  if (loading) return <div className="grid md:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}</div>;

  return (
    <div className="space-y-6">
      {/* Profile Strength */}
      {profile && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Profile Strength</h3>
            <span className="text-2xl font-bold text-gradient">{profile.profileStrength}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-3">
            <div className="h-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500" style={{ width: `${profile.profileStrength}%` }} />
          </div>
          {profile.profileStrength < 100 && <p className="text-xs text-gray-500 mt-2">Complete your profile to improve visibility</p>}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <s.icon className={`w-8 h-8 ${s.color}`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Premium badge */}
      {profile?.isPremium && (
        <div className="glass-card p-4 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border-amber-500/20 flex items-center gap-3">
          <HiOutlineSparkles className="w-6 h-6 text-amber-400" />
          <div><p className="font-semibold text-amber-300">Premium Member</p><p className="text-xs text-gray-400">Expires {new Date(profile.premiumExpiry).toLocaleDateString()}</p></div>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/jobs" className="glass-card-hover p-5 text-center"><p className="text-lg font-semibold mb-1">Browse Jobs</p><p className="text-sm text-gray-400">Find your next opportunity</p></Link>
        <Link to="/student/resume-analytics" className="glass-card-hover p-5 text-center"><p className="text-lg font-semibold mb-1">Resume Analytics</p><p className="text-sm text-gray-400">Analyze & improve your resume</p></Link>
        <Link to="/student/profile" className="glass-card-hover p-5 text-center"><p className="text-lg font-semibold mb-1">Edit Profile</p><p className="text-sm text-gray-400">Update your details</p></Link>
      </div>

      {/* Recent applications */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Recent Applications</h3>
          <Link to="/student/applications" className="text-sm text-primary-400 hover:text-primary-300">View All</Link>
        </div>
        {applications.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No applications yet. Start applying!</p>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map(app => (
              <div key={app._id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <p className="font-medium">{app.job?.title || 'Unknown'}</p>
                  <p className="text-sm text-gray-400">{app.job?.company}</p>
                </div>
                <span className={`badge ${app.status === 'selected' ? 'badge-green' : app.status === 'rejected' ? 'badge-red' : app.status === 'shortlisted' ? 'badge-purple' : 'badge-primary'}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
