import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Plus, Menu, X, LogOut, Settings, User, Layout, BarChart2, FileSpreadsheet, Download, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { Signature, UserProfile, TemplateType } from './types';
import { getStoredSignatures, setStoredSignatures, INITIAL_SIGNATURES } from './utils';

// Views
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import TemplatePicker from './components/TemplatePicker';
import SignatureEditor from './components/SignatureEditor';
import InstallSteps from './components/InstallSteps';
import AccountSettings from './components/AccountSettings';

type ActiveView = 'landing' | 'auth' | 'dashboard' | 'templates' | 'editor' | 'install-steps' | 'account-settings';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [selectedSignatureForEdit, setSelectedSignatureForEdit] = useState<Signature | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getActiveView = (): ActiveView => {
    const path = location.pathname;
    if (path === '/' || path === '') return 'landing';
    return path.substring(1) as ActiveView;
  };
  const activeView = getActiveView();

  // Initialize data on mount
  useEffect(() => {
    // Check for simulated logged in user
    const storedUser = localStorage.getItem('inkstamp_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        if (window.location.pathname === '/') {
          navigate('/dashboard'); // Route directly to dashboard if logged in on root
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Load custom signatures from local storage
    const storedSignatures = getStoredSignatures();
    setSignatures(storedSignatures);
  }, []);

  // Update localStorage when signatures state changes
  const handleUpdateSignaturesState = (updatedList: Signature[]) => {
    setSignatures(updatedList);
    setStoredSignatures(updatedList);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('inkstamp_user');
    navigate('/');
  };

  const handleSelectTemplate = (templateId: TemplateType) => {
    setSelectedTemplateId(templateId);
    setSelectedSignatureForEdit(null); // Clear editing profile since we are creating new
    navigate('/editor');
  };

  const handleEditSignatureLaunch = (sig: Signature) => {
    setSelectedSignatureForEdit(sig);
    setSelectedTemplateId(sig.templateId);
    navigate('/editor');
  };

  const handleDeleteSignature = (id: string) => {
    const updated = signatures.filter(s => s.id !== id);
    handleUpdateSignaturesState(updated);
  };

  const handleSaveSignature = (savedSig: Signature) => {
    const exists = signatures.some(s => s.id === savedSig.id);
    let updated: Signature[];

    if (exists) {
      updated = signatures.map(s => s.id === savedSig.id ? savedSig : s);
    } else {
      updated = [savedSig, ...signatures];
    }

    handleUpdateSignaturesState(updated);
  };

  const handleImportSignatures = (imported: Signature[]) => {
    const updated = [...imported, ...signatures];
    handleUpdateSignaturesState(updated);
  };

  const handleUpdateProfile = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('inkstamp_user', JSON.stringify(updatedUser));
  };

  const handleViewChange = (view: ActiveView) => {
    if (view === 'landing') navigate('/');
    else navigate(`/${view}`);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased selection:bg-[#FF3E00]/20 selection:text-[#FF3E00] border-8 border-[#1A1A1A]">
      
      {/* GLOBAL HIGH-END NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo brand */}
          <button 
            id="nav-logo"
            onClick={() => handleViewChange('landing')}
            className="flex items-center gap-2 text-xl font-sans font-black text-white tracking-tighter uppercase group"
          >
            <div className="w-8 h-8 bg-[#FF3E00] text-black rounded-none flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              ⚓
            </div>
            <span>Ink&Stamp</span>
          </button>

          {/* Desktop central links */}
          <div className="hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
            {currentUser && (
              <>
                <button
                  id="nav-btn-dashboard"
                  onClick={() => handleViewChange('dashboard')}
                  className={`px-3.5 py-1.5 transition-all border ${activeView === 'dashboard' ? 'text-[#FF3E00] bg-[#111] border-white/10' : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  Dashboard
                </button>
                <button
                  id="nav-btn-templates"
                  onClick={() => handleViewChange('templates')}
                  className={`px-3.5 py-1.5 transition-all border ${activeView === 'templates' ? 'text-[#FF3E00] bg-[#111] border-white/10' : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  Templates
                </button>
                <button
                  id="nav-btn-install"
                  onClick={() => handleViewChange('install-steps')}
                  className={`px-3.5 py-1.5 transition-all border ${activeView === 'install-steps' ? 'text-[#FF3E00] bg-[#111] border-white/10' : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  Install Guides
                </button>
              </>
            )}
            {!currentUser && (
              <>
                <button
                  id="nav-unauth-features"
                  onClick={() => {
                    const el = document.getElementById('features-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else handleViewChange('landing');
                  }}
                  className="px-3 py-2 hover:text-white transition-all"
                >
                  Features
                </button>
                <button
                  id="nav-unauth-templates"
                  onClick={() => handleViewChange('auth')}
                  className="px-3 py-2 hover:text-white transition-all"
                >
                  Templates Gallery
                </button>
                <a
                  href="https://google.com"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-3 py-2 hover:text-white transition-all flex items-center gap-1"
                >
                  <span>Resources</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </>
            )}
          </div>

          {/* Desktop Action Right Area */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-[#111] border border-white/10 pl-3.5 pr-2 py-1.5 rounded-none">
                <span className="text-xs font-bold text-white font-mono tracking-wide max-w-[120px] truncate">
                  {currentUser.fullName}
                </span>
                
                <button
                  id="nav-user-settings"
                  onClick={() => handleViewChange('account-settings')}
                  title="Account Settings"
                  className={`w-7 h-7 rounded-none flex items-center justify-center border transition-all ${
                    activeView === 'account-settings' ? 'bg-[#FF3E00] text-black border-[#FF3E00]' : 'bg-[#0A0A0A] hover:bg-[#111] border-white/10 text-white/60'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                <button
                  id="nav-btn-signin"
                  onClick={() => handleViewChange('auth')}
                  className="px-4.5 py-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all"
                >
                  Sign In
                </button>
                <button
                  id="nav-btn-create"
                  onClick={() => handleViewChange('auth')}
                  className="bg-[#FF3E00] hover:bg-[#e63800] text-black px-5 py-2.5 rounded-none text-xs font-black uppercase tracking-widest transition-all"
                >
                  Create Signature
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburguer toggle button */}
          <div className="md:hidden flex items-center gap-2">
            {!currentUser && (
              <button
                onClick={() => handleViewChange('auth')}
                className="bg-[#FF3E00] text-black px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-none"
              >
                Start
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/10 bg-[#111] text-white hover:bg-white/5 rounded-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE EXPANDABLE DRAWER */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-[#0A0A0A] border-b border-white/10 px-6 py-5 space-y-4 shadow-xl absolute top-[69px] left-0 w-full z-40 text-xs font-semibold uppercase tracking-wider"
        >
          {currentUser ? (
            <div className="space-y-3.5">
              <div className="text-white/40 font-mono py-1 border-b border-white/5 normal-case">
                User: <span className="text-white font-bold">{currentUser.fullName}</span>
              </div>
              <button onClick={() => handleViewChange('dashboard')} className="block w-full text-left py-1 text-white/60 hover:text-[#FF3E00]">Dashboard</button>
              <button onClick={() => handleViewChange('templates')} className="block w-full text-left py-1 text-white/60 hover:text-[#FF3E00]">Templates</button>
              <button onClick={() => handleViewChange('install-steps')} className="block w-full text-left py-1 text-white/60 hover:text-[#FF3E00]">Install Guides</button>
              <button onClick={() => handleViewChange('account-settings')} className="block w-full text-left py-1 text-white/60 hover:text-[#FF3E00]">Settings</button>
              <button onClick={handleLogout} className="block w-full text-left py-1 text-[#FF3E00] font-bold">Logout</button>
            </div>
          ) : (
            <div className="space-y-3.5">
              <button onClick={() => handleViewChange('landing')} className="block w-full text-left py-1 text-white/60 hover:text-white">Home</button>
              <button onClick={() => handleViewChange('auth')} className="block w-full text-left py-1 text-white/60 hover:text-white">Sign In</button>
              <button onClick={() => handleViewChange('auth')} className="block w-full text-left py-1.5 bg-[#FF3E00] text-black text-center font-black rounded-none">Build Signature</button>
            </div>
          )}
        </motion.div>
      )}

      {/* CORE WORKSPACE CONTENT AREA WITH SLIDE TRANSITIONS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* @ts-expect-error React 19 types issue with react-router-dom Routes */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <LandingPage onNavigate={handleViewChange} isLoggedIn={!!currentUser} />
              </motion.div>
            } />
            <Route path="/auth" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <AuthScreen onLoginSuccess={handleLoginSuccess} onNavigate={handleViewChange} />
              </motion.div>
            } />
            <Route path="/dashboard" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <Dashboard signatures={signatures} onEdit={handleEditSignatureLaunch} onDelete={handleDeleteSignature} onNavigate={handleViewChange} />
              </motion.div>
            } />
            <Route path="/templates" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <TemplatePicker onSelect={handleSelectTemplate} onNavigate={handleViewChange} />
              </motion.div>
            } />
            <Route path="/editor" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <SignatureEditor initialSignature={selectedSignatureForEdit} selectedTemplateId={selectedTemplateId} onSave={handleSaveSignature} onNavigate={handleViewChange} />
              </motion.div>
            } />
            <Route path="/install-steps" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <InstallSteps signatures={signatures} />
              </motion.div>
            } />
            <Route path="/account-settings" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <AccountSettings currentUser={currentUser} onUpdateProfile={handleUpdateProfile} onLogout={handleLogout} />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* GLOBAL HIGH-END DESIGN FOOTER */}
      <footer className="bg-[#111] text-white/40 py-16 px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          
          {/* Footer Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white text-lg font-sans font-black uppercase tracking-tighter">
              <span className="text-xl">⚓</span>
              <span>Ink&Stamp</span>
            </div>
            <p className="text-xs leading-relaxed text-white/60">
              Meticulously designed, inline-styled email signatures built to establish your professional presence. All assets hosted over secure SSL CDNs.
            </p>
            <div className="text-[10px] font-mono text-[#FF3E00] uppercase tracking-widest font-bold">
              © 2026 Ink&Stamp Corp. All rights reserved.
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">Application</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => handleViewChange(currentUser ? 'dashboard' : 'auth')} className="hover:text-white text-left transition-colors">Workspace Repository</button>
              <button onClick={() => handleViewChange(currentUser ? 'templates' : 'auth')} className="hover:text-white text-left transition-colors">Format templates</button>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">Setup Guides</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => handleViewChange(currentUser ? 'install-steps' : 'auth')} className="hover:text-white text-left transition-colors">Gmail Setup Guide</button>
              <button onClick={() => handleViewChange(currentUser ? 'install-steps' : 'auth')} className="hover:text-white text-left transition-colors">Outlook Integration</button>
            </div>
          </div>

          {/* Column 4 */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">Platform Trust</h4>
            <div className="text-xs leading-relaxed text-gray-400 space-y-2">
              <p>Certified inline HTML compatible with Outlook Desktop, Apple Mail, Gmail, and Thunderbird clients.</p>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-300">
                <span className="text-green-500 font-bold">●</span> SSL Hosted CDN delivery active
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
