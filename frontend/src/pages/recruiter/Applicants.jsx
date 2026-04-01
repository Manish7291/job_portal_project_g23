import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useSocket from '../../hooks/useSocket';
import API from '../../services/api';

const Applicants = () => {
  const { jobId } = useParams();
  const { joinRoom, leaveRoom, listenToEvent, unlistenFromEvent } = useSocket();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applicants data
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/applications/job/${jobId}`);
      setApplicants(data.applications);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch applicants');
    } finally {
      setLoading(false);
    }
  };

  // Update application status
  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const { data } = await API.put(`/applications/${applicationId}/status`, { status: newStatus });
      toast.success(`Application marked as ${newStatus}`);
      // Update local state
      setApplicants(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  useEffect(() => {
    fetchApplicants();

    // Join room for this job's applicants
    if (jobId) {
      joinRoom('recruiter:joinApplicants', jobId);

      // Listen for real-time status updates
      listenToEvent('application:statusUpdated', (data) => {
        console.log('Status update received:', data);
        // Update the applicant status in real-time
        setApplicants(prev =>
          prev.map(app =>
            app._id === data.applicationId ? { ...app, status: data.status } : app
          )
        );
        toast.success(`Application updated to ${data.status}`);
      });

      // Listen for new applications
      listenToEvent('application:new', (data) => {
        console.log('New application received:', data);
        // Refetch applicants to show new one
        fetchApplicants();
        toast.success('New application received!');
      });
    }

    return () => {
      if (jobId) {
        leaveRoom('recruiter:leaveApplicants', jobId);
        unlistenFromEvent('application:statusUpdated');
        unlistenFromEvent('application:new');
      }
    };
  }, [jobId, joinRoom, leaveRoom, listenToEvent, unlistenFromEvent]);

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

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading applicants...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="section-title">Job Applicants</h1>

      {applicants.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-400">No applicants yet</div>
      ) : (
        <div className="space-y-3">
          {applicants.map(applicant => (
            <div key={applicant._id} className="glass-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{applicant.applicant?.name}</h3>
                <p className="text-gray-400 text-sm">{applicant.applicant?.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Updated: {new Date(applicant.statusUpdatedAt || applicant.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <select
                value={applicant.status}
                onChange={(e) => updateApplicationStatus(applicant._id, e.target.value)}
                className="px-3 py-2 bg-slate-700 border border-slate-600 text-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer hover:bg-slate-600 transition"
              >
                <option value="viewed">Viewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="selected">Selected</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
