import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, ShieldAlert, Trash2, Check, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';

interface AccountSettingsProps {
  currentUser: UserProfile | null;
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
}

export default function AccountSettings({ currentUser, onUpdateProfile, onLogout }: AccountSettingsProps) {
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [copiedKey, setCopiedKey] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      fullName,
      email,
    });
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 2000);
  };

  const handleResetData = () => {
    if (confirm('WARNING: This will completely erase all custom email signatures and reset application data back to default templates. Proceed?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-12 px-6 text-[#F5F5F5]">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-sans font-black uppercase text-white tracking-tight">Account Settings</h1>
          <p className="text-xs font-mono text-white/40 mt-1">Manage your active identity credentials, security variables, and workspace options.</p>
        </div>

        {/* Update Success Toast banner */}
        {updateSuccess && (
          <div className="bg-green-950/20 border border-green-900/50 text-green-400 text-xs rounded-none p-4 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400 font-bold" />
            <span>Success! Personal Information credentials have been securely updated.</span>
          </div>
        )}

        {/* Form panel */}
        <div className="bg-[#111] border border-white/10 rounded-none p-6 sm:p-8 space-y-8">
          
          <form onSubmit={handleUpdate} className="space-y-6">
            <h3 className="text-xs font-mono text-[#FF3E00] uppercase tracking-widest font-black">Personal Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase font-black">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="settings-input-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-white/10 bg-[#0A0A0A] text-white focus:bg-[#111] text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase font-black">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="settings-input-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-white/10 bg-[#0A0A0A] text-white focus:bg-[#111] text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
              <button
                id="settings-btn-logout"
                type="button"
                onClick={onLogout}
                className="px-5 py-2.5 bg-transparent border border-white/10 hover:bg-white/5 text-white/60 hover:text-white rounded-none text-xs font-black uppercase tracking-widest transition-all"
              >
                Log Out of Account
              </button>
              <button
                id="settings-btn-save"
                type="submit"
                className="px-5 py-2.5 bg-[#FF3E00] hover:bg-[#e63800] text-black rounded-none text-xs font-black uppercase tracking-widest transition-all shadow-sm"
              >
                Save Profile Changes
              </button>
            </div>
          </form>

        </div>

        {/* Danger Zone */}
        <div className="bg-red-950/10 border border-red-900/40 rounded-none p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-red-400">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <h3 className="text-xs font-mono uppercase tracking-widest font-black">Danger Zone</h3>
          </div>
          
          <p className="text-xs text-red-300 leading-relaxed font-light">
            Erase your account data, remove synchronized signatures, and flush persistent cache records from this device. This operation is irreversible.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              id="settings-btn-reset"
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-900/50 bg-transparent hover:bg-red-950/20 text-red-400 text-xs font-black uppercase tracking-widest rounded-none transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Application Cache</span>
            </button>
            
            <button
              id="settings-btn-delete"
              onClick={() => {
                if (confirm('Are you sure you want to permanently delete your account? All signatures will be removed.')) {
                  localStorage.clear();
                  onLogout();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest rounded-none transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
