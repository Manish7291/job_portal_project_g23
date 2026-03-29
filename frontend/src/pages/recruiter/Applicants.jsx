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
      'viewed': 'bg-blue-100 text-blue-800',
      'shortlisted': 'bg-green-100 text-green-800',
      'interview': 'bg-purple-100 text-purple-800',
      'rejected': 'bg-red-100 text-red-800',
      'selected': 'bg-emerald-100 text-emerald-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Loading applicants...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Job Applicants</h1>

      {applicants.length === 0 ? (
        <p className="text-gray-500">No applicants yet</p>
      ) : (
        <div className="space-y-4">
          {applicants.map(applicant => (
            <div key={applicant._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{applicant.applicant?.name}</h3>
                  <p className="text-gray-600">{applicant.applicant?.email}</p>
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(applicant.status)}`}>
                      {applicant.status}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Updated: {new Date(applicant.statusUpdatedAt || applicant.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <select
                    value={applicant.status}
                    onChange={(e) => updateApplicationStatus(applicant._id, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="viewed">Viewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interview">Interview</option>
                    <option value="rejected">Rejected</option>
                    <option value="selected">Selected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
