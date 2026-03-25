import { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import API from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: '#94a3b8' } } },
  scales: { x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } } }
};

export default function SalaryInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/jobs/salary-insights').then(({ data }) => setInsights(data.insights)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-12"><div className="skeleton h-96 rounded-2xl" /></div>;

  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#f97316', '#6366f1', '#14b8a6'];

  const roleData = {
    labels: insights?.byRole?.map(r => r._id) || [],
    datasets: [{ label: 'Avg Salary (₹)', data: insights?.byRole?.map(r => Math.round(r.avgSalary)) || [], backgroundColor: colors }]
  };

  const locationData = {
    labels: insights?.byLocation?.map(r => r._id) || [],
    datasets: [{ label: 'Avg Salary (₹)', data: insights?.byLocation?.map(r => Math.round(r.avgSalary)) || [], backgroundColor: colors }]
  };

  const typeData = {
    labels: insights?.byType?.map(r => r._id) || [],
    datasets: [{ data: insights?.byType?.map(r => Math.round(r.avgSalary)) || [], backgroundColor: colors, borderWidth: 0 }]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Salary <span className="text-gradient">Insights</span></h1>
        <p className="text-gray-400">Real-time salary analytics from job data</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Average Salary by Role</h3>
          {roleData.labels.length > 0 ? <Bar data={roleData} options={chartOptions} /> : <p className="text-gray-500 text-center py-10">No data available</p>}
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Average Salary by Location</h3>
          {locationData.labels.length > 0 ? <Bar data={locationData} options={chartOptions} /> : <p className="text-gray-500 text-center py-10">No data available</p>}
        </div>
        <div className="glass-card p-6 lg:col-span-2 max-w-md mx-auto w-full">
          <h3 className="text-lg font-semibold mb-4 text-center">Average Salary by Job Type</h3>
          {typeData.labels.length > 0 ? <Doughnut data={typeData} options={{ ...chartOptions, scales: undefined }} /> : <p className="text-gray-500 text-center py-10">No data available</p>}
        </div>
      </div>
    </div>
  );
}
