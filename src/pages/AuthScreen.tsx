import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Lock, User, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (view: string) => void;
}

export default function AuthScreen({ onLoginSuccess, onNavigate }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignUp && !fullName)) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate network latency
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        fullName: isSignUp ? fullName : (email.split('@')[0].toUpperCase()),
        email: email,
      };
      
      // Save user profile to storage
      localStorage.setItem('inkstamp_user', JSON.stringify(user));
      onLoginSuccess(user);
    }, 800);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        fullName: 'Alexander Mercer',
        email: 'alex.mercer@gmail.com',
      };
      localStorage.setItem('inkstamp_user', JSON.stringify(user));
      onLoginSuccess(user);
    }, 650);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4 py-12 text-[#F5F5F5]">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-none shadow-2xl overflow-hidden p-8 sm:p-10"
      >
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="w-12 h-12 bg-[#FF3E00]/10 border border-[#FF3E00]/20 rounded-none flex items-center justify-center text-[#FF3E00] mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-sans font-black text-white uppercase tracking-tight">
            {isSignUp ? 'ESTABLISH PRESENCE' : 'SIGN IN'}
          </h2>
          <p className="text-xs text-white/40 max-w-[280px] font-light">
            {isSignUp ? 'Create a secure profile to organize your branding templates.' : 'Access your professional email signature repository.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-950/20 border border-red-900/50 text-red-400 text-xs rounded-none p-3 mb-6 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Continue with Google */}
          <button
            id="auth-google-btn"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 bg-[#0A0A0A] hover:bg-white/5 text-white rounded-none font-bold text-xs uppercase tracking-wider transition-all duration-200 disabled:opacity-50"
          >
            {/* Simple Google G Logo vector */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-[1px] bg-white/10 flex-1" />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">or email address</span>
            <div className="h-[1px] bg-white/10 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="auth-input-fullname"
                    type="text"
                    required
                    placeholder="E.g. Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-white/10 bg-[#0A0A0A] focus:bg-[#111] text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] text-white placeholder:text-white/20 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="auth-input-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-white/10 bg-[#0A0A0A] focus:bg-[#111] text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] text-white placeholder:text-white/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Password</label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => setError("Password reset is simulated. Use google sign in for instant access.")}
                    className="text-[10px] font-mono text-[#FF3E00] hover:underline uppercase"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="auth-input-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-white/10 bg-[#0A0A0A] focus:bg-[#111] text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] text-white placeholder:text-white/20 transition-all"
                />
              </div>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#FF3E00] hover:bg-[#e63800] text-black rounded-none font-black uppercase text-xs tracking-widest transition-all duration-200 mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing...</span>
                </span>
              ) : (
                <span>{isSignUp ? 'Establish Presence' : 'Sign In'}</span>
              )}
            </button>
          </form>

          <div className="text-center pt-4 text-xs">
            <span className="text-white/40">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            </span>
            <button
              id="auth-toggle-btn"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#FF3E00] font-bold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
