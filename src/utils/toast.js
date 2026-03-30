import toast from 'react-hot-toast';

const base = {
  duration: 3500,
  style: {
    background: 'rgba(4,51,88,0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#F0F6FF',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '14px',
    borderRadius: '14px',
    padding: '12px 16px',
  },
};

export const notify = {
  success: (msg) => toast.success(msg, { ...base, iconTheme: { primary: '#2ECC71', secondary: '#021A2C' } }),
  error: (msg) => toast.error(msg, { ...base, iconTheme: { primary: '#FF6B35', secondary: '#021A2C' } }),
  loading: (msg) => toast.loading(msg, base),
  dismiss: toast.dismiss,
};
