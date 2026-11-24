import React, { useState } from 'react';
import { X, ShieldCheck, UserPlus, LogIn } from 'lucide-react';
import { apiRequest, setAuthToken } from '../lib/api';
import { Profile } from '../types';

interface AuthModalProps {
  initialMode?: 'login' | 'register' | 'admin';
  onClose: () => void;
  onSuccess: (profile: Profile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'admin'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [classNumber, setClassNumber] = useState<number>(9);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'register') {
        const res = await apiRequest<{ token: string; profile: Profile }>('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, classNumber }),
        });
        setAuthToken(res.token);
        onSuccess(res.profile);
      } else {
        const res = await apiRequest<{ token: string; profile: Profile }>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        if (mode === 'admin' && res.profile.role !== 'admin') {
          setError('This account does not have administrator privileges.');
          setLoading(false);
          return;
        }
        setAuthToken(res.token);
        onSuccess(res.profile);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#18232E]/65 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="w-full max-w-md rounded-xl border border-[#DED8CA] bg-[#FCFBF8] p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#EAE5D9] pb-4">
          <div>
            <h2 id="auth-modal-title" className="text-xl font-bold text-[#1E2A36]">
              {mode === 'register'
                ? 'Create Student Account'
                : mode === 'admin'
                  ? 'Administrator Sign In'
                  : 'Student Sign In'}
            </h2>
            <p className="mt-1 text-sm text-[#5A6773]">
              {mode === 'register'
                ? 'Save your test scores, track chapter progress, and join your class leaderboard.'
                : mode === 'admin'
                  ? 'Protected access for managing NCERT chapters, test sets, and verified MCQs.'
                  : 'Sign in to access your saved test history and progress analytics.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#64717D] transition-colors hover:bg-[#EFECE4] hover:text-[#1E2A36]"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="mt-5 grid grid-cols-3 gap-1 rounded-lg border border-[#DED8CA] bg-[#F0EDE4] p-1">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
              mode === 'login' ? 'bg-white text-[#1E2A36] shadow-xs' : 'text-[#52606D] hover:text-[#1E2A36]'
            }`}
          >
            <LogIn className="h-3.5 w-3.5" />
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
              mode === 'register' ? 'bg-white text-[#1E2A36] shadow-xs' : 'text-[#52606D] hover:text-[#1E2A36]'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" />
            Register
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('admin');
              setError(null);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
              mode === 'admin' ? 'bg-white text-[#1E2A36] shadow-xs' : 'text-[#52606D] hover:text-[#1E2A36]'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#334155]" htmlFor="auth-name">
                  Full Name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1.5 w-full rounded-lg border border-[#D7D1C4] bg-white px-3.5 py-2.5 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none focus:ring-2 focus:ring-[#355978]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#334155]" htmlFor="auth-class">
                  Select Your Class
                </label>
                <select
                  id="auth-class"
                  value={classNumber}
                  onChange={(e) => setClassNumber(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-lg border border-[#D7D1C4] bg-white px-3.5 py-2.5 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none focus:ring-2 focus:ring-[#355978]/20"
                >
                  <option value={6}>Class 6 (NCERT)</option>
                  <option value={7}>Class 7 (NCERT)</option>
                  <option value={8}>Class 8 (NCERT)</option>
                  <option value={9}>Class 9 (NEW NCERT 2026–27)</option>
                  <option value={10}>Class 10 (CBSE Board 2025–26)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-[#334155]" htmlFor="auth-email">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={mode === 'admin' ? 'admin@toppersadda.edu' : 'student@example.com'}
              className="mt-1.5 w-full rounded-lg border border-[#D7D1C4] bg-white px-3.5 py-2.5 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none focus:ring-2 focus:ring-[#355978]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#334155]" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'Minimum 6 characters' : 'Enter your password'}
              className="mt-1.5 w-full rounded-lg border border-[#D7D1C4] bg-white px-3.5 py-2.5 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none focus:ring-2 focus:ring-[#355978]/20"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-[#E0B0B0] bg-[#FCF2F2] px-3.5 py-2.5 text-sm text-[#7F2929]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1E2A36] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#355978] disabled:opacity-60"
          >
            {loading
              ? 'Please wait...'
              : mode === 'register'
                ? 'Create Account'
                : mode === 'admin'
                  ? 'Sign In as Administrator'
                  : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
