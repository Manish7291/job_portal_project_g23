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
      'viewed': 'bg-blue-100 text-blue-800',
      'shortlisted': 'bg-green-100 text-green-800',
      'interview': 'bg-purple-100 text-purple-800',
      'rejected': 'bg-red-100 text-red-800',
      'selected': 'bg-emerald-100 text-emerald-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
    return <div className="text-center py-8">Loading your applications...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet</p>
      ) : (
        <div className="space-y-4">
          {applications.map(application => (
            <div key={application._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{application.job?.title}</h3>
                  <p className="text-gray-600 text-sm">{application.job?.company}</p>
                  <p className="text-gray-500 text-sm">{application.job?.location}</p>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-2xl">{getStatusIcon(application.status)}</span>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Applied: {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    ${application.job?.salary?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">{application.job?.jobType}</p>
                </div>
              </div>

              {application.status === 'interview' && (
                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded">
                  <p className="text-purple-700 text-sm">
                    📞 Interview scheduled! Check your email for details.
                  </p>
                </div>
              )}

              {application.status === 'selected' && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded">
                  <p className="text-emerald-700 text-sm font-semibold">
                    🎉 Congratulations! You've been selected!
                  </p>
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-700 text-sm">
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
