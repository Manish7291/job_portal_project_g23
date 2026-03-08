import { HiOutlineExclamation } from 'react-icons/hi';

export function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4" />
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}

export function SkeletonCard({ count = 3, height = 'h-28' }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`skeleton ${height} rounded-2xl`} />
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, message, action }) {
  return (
    <div className="glass-card p-12 text-center">
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title || 'Nothing here yet'}</h3>
      <p className="text-gray-500 text-sm mb-4">{message}</p>
      {action}
    </div>
  );
}

export function Badge({ variant = 'primary', children }) {
  const variants = {
    primary: 'badge-primary',
    green: 'badge-green',
    yellow: 'badge-yellow',
    red: 'badge-red',
    purple: 'badge-purple'
  };
  return <span className={variants[variant] || variants.primary}>{children}</span>;
}

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || 'Confirm'}>
      <p className="text-gray-400 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="btn-secondary py-2 px-4">Cancel</button>
        <button onClick={() => { onConfirm(); onClose(); }} className="btn-danger py-2 px-4">Confirm</button>
      </div>
    </Modal>
  );
}

export function StatCard({ icon: Icon, label, value, color = 'text-primary-400' }) {
  return (
    <div className="stat-card">
      {Icon && <Icon className={`w-8 h-8 ${color}`} />}
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

export function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}
        className="w-10 h-10 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30">
        ←
      </button>
      {[...Array(Math.min(pages, 7))].map((_, i) => {
        const p = i + 1;
        return (
          <button key={p} onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${page === p ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {p}
          </button>
        );
      })}
      <button onClick={() => onPageChange(Math.min(pages, page + 1))} disabled={page === pages}
        className="w-10 h-10 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30">
        →
      </button>
    </div>
  );
}
