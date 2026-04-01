import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import useSocket from '../../hooks/useSocket';
import API from '../../services/api';

const Applications = () => {
  const { user } = useSelector(state => state.auth);
  const { joinRoom, leaveRoom, listenToEvent, unlistenFromEvent } = useSocket();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/applications/my');
      setApplications(data.applications);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();

    // Join room for real-time updates on my applications
    if (user?._id) {
      joinRoom('student:joinApplications', user._id);

      // Listen for real-time status updates
      listenToEvent('application:statusUpdated', (data) => {
        console.log('Application status updated:', data);
        // Update the application status in real-time
        setApplications(prev =>
          prev.map(app =>
            app._id === data.applicationId
              ? { ...app, status: data.status }
              : app
          )
        );
        toast.success(`Your application for "${data.jobTitle}" has been ${data.status}! 🎉`);
      });
    }

    return () => {
      if (user?._id) {
        leaveRoom('student:leaveApplications', user._id);
        unlistenFromEvent('application:statusUpdated');
      }
    };
  }, [user?._id, joinRoom, leaveRoom, listenToEvent, unlistenFromEvent]);

  const getStatusColor = (status) => {
    const colors = {
      'viewed': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
      'shortlisted': 'bg-green-500/20 text-green-300 border border-green-500/30',
      'interview': 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
      'rejected': 'bg-red-500/20 text-red-300 border border-red-500/30',
      'selected': 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'viewed': '👁️',
      'shortlisted': '⭐',
      'interview': '📞',
      'rejected': '❌',
      'selected': '✅'
    };
    return icons[status] || '📋';
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading your applications...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="section-title">My Applications</h1>

      {applications.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-400">You haven't applied to any jobs yet</div>
      ) : (
        <div className="space-y-4">
          {applications.map(application => (
            <div key={application._id} className="glass-card p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white">{application.job?.title}</h3>
                  <p className="text-gray-400 text-sm">{application.job?.company}</p>
                  <p className="text-gray-400 text-sm">{application.job?.location}</p>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-2xl">{getStatusIcon(application.status)}</span>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Applied: {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-400">
                    {typeof application.job?.salary === 'object' 
                      ? `₹${application.job.salary.min?.toLocaleString()}-${application.job.salary.max?.toLocaleString()}`
                      : `₹${application.job?.salary?.toLocaleString()}`
                    }
                  </p>
                  <p className="text-sm text-gray-400">{application.job?.jobType}</p>
                </div>
              </div>

              {application.status === 'interview' && (
                <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                  <p className="text-purple-300 text-sm">
                    📞 Interview scheduled! Check your email for details.
                  </p>
                </div>
              )}

              {application.status === 'selected' && (
                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded">
                  <p className="text-emerald-300 text-sm font-semibold">
                    🎉 Congratulations! You've been selected!
                  </p>
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                  <p className="text-red-300 text-sm">
                    Don't worry! Keep applying to other opportunities.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
