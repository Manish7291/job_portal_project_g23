import { Link } from 'react-router-dom';
import { HiOutlineBriefcase, HiOutlineSparkles, HiOutlineChartBar, HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineDocumentText } from 'react-icons/hi';

const features = [
  { icon: HiOutlineBriefcase, title: 'Smart Job Matching', desc: 'Browse thousands of curated jobs with intelligent filtering and search.' },
  { icon: HiOutlineDocumentText, title: 'Resume Analytics', desc: 'AI-powered resume scoring with ATS optimization suggestions.' },
  { icon: HiOutlineSparkles, title: 'AI Integration', desc: 'Simplify job descriptions and get structured insights instantly.' },
  { icon: HiOutlineChartBar, title: 'Salary Insights', desc: 'Real-time salary data analytics across roles and locations.' },
  { icon: HiOutlineShieldCheck, title: 'Application Tracking', desc: 'Track every application from submission to selection.' },
  { icon: HiOutlineLightningBolt, title: 'Premium Features', desc: 'Unlimited applies, deep ATS insights, and priority badges.' }
];

const stats = [
  { value: '10K+', label: 'Active Jobs' },
  { value: '50K+', label: 'Students' },
  { value: '5K+', label: 'Companies' },
  { value: '95%', label: 'Satisfaction' }
];

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
            <HiOutlineSparkles className="w-4 h-4" /> AI-Powered Job Portal
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Find Your <span className="text-gradient">Dream Job</span>
            <br />with <span className="text-gradient">JOBFLUX</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Smart job portal powered by AI. Analyze resumes, track applications, and discover salary insights — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">Get Started Free</Link>
            <Link to="/jobs" className="btn-secondary text-lg px-8 py-3">Browse Jobs</Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You <span className="text-gradient">Need</span></h2>
            <p className="text-gray-400 text-lg">Powerful tools to accelerate your career</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card-hover p-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Your <span className="text-gradient">Journey</span>?</h2>
              <p className="text-gray-400 mb-8">Join thousands of students and recruiters on JOBFLUX</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register?role=student" className="btn-primary px-8 py-3">I'm a Student</Link>
                <Link to="/register?role=recruiter" className="btn-secondary px-8 py-3">I'm a Recruiter</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
