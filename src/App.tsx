import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, Settings } from 'lucide-react';
import { Signature, TemplateType } from './types';
import { getStoredSignatures, setStoredSignatures } from './utils';

// Views
import LandingPage from './pages/LandingPage';
import TemplatePicker from './pages/TemplatePicker';
import SignatureEditor from './pages/SignatureEditor';
import InstallSteps from './pages/InstallSteps';

type ActiveView = 'landing' | 'templates' | 'editor' | 'install-steps';

import { Toaster } from 'react-hot-toast';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getActiveView = (): ActiveView => {
    const path = location.pathname;
    if (path === '/' || path === '') return 'landing';
    return path.substring(1) as ActiveView;
  };
  const activeView = getActiveView();

  // Initialize data on mount
  useEffect(() => {
    // Load custom signatures from local storage
    const storedSignatures = getStoredSignatures();
    setSignatures(storedSignatures);
  }, []);

  // Update localStorage when signatures state changes
  const handleUpdateSignaturesState = (updatedList: Signature[]) => {
    setSignatures(updatedList);
    setStoredSignatures(updatedList);
  };

  const handleSelectTemplate = (templateId: TemplateType) => {
    navigate(`/editor/new?template=${templateId}`);
  };

  const handleEditSignatureLaunch = (sig: Signature) => {
    navigate(`/editor/${sig.id}`);
  };

  const handleDeleteSignature = (id: string) => {
    setSignatures((prev) => {
      const updated = prev.filter(s => s.id !== id);
      setStoredSignatures(updated);
      return updated;
    });
  };

  const handleSaveSignature = (savedSig: Signature) => {
    setSignatures((prev) => {
      const exists = prev.some(s => s.id === savedSig.id);
      let updated: Signature[];

      if (exists) {
        updated = prev.map(s => s.id === savedSig.id ? savedSig : s);
      } else {
        updated = [savedSig, ...prev];
      }
      setStoredSignatures(updated);
      return updated;
    });
  };

  const handleViewChange = (view: string, state?: any) => {
    if (view === 'landing') navigate('/', { state });
    else navigate(`/${view}`, { state });
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-[#f0f0f5] font-sans antialiased selection:bg-[#b04090]/20 selection:text-[#b04090] border-8 border-[#111118]">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111118',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '14px',
            padding: '16px 24px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          },
          success: {
            iconTheme: {
              primary: '#b04090',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* XERO STYLE NAVIGATION BAR */}
      <nav className="xero-nav sticky top-0 bg-[#0a0a0f]/95 backdrop-blur-md" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 0, paddingBottom: 16 }}>
        <span className="nav-logo" onClick={() => handleViewChange('landing')} style={{ cursor: 'pointer' }}>MailESign</span>
        
        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('landing'); }}>Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('templates'); }}>Templates</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('install-steps'); }}>Installation Guide</a></li>
          </ul>
          <div className="nav-actions">
            <a href="/templates" className="btn-signup" onClick={(e) => { e.preventDefault(); handleViewChange('templates'); }}>Get Started</a>
          </div>
        </div>

        <button 
          className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => {
            const newState = !mobileMenuOpen;
            setMobileMenuOpen(newState);
            document.body.style.overflow = newState ? 'hidden' : '';
          }}
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* CORE WORKSPACE CONTENT AREA WITH SLIDE TRANSITIONS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* @ts-expect-error React 19 types issue with react-router-dom Routes */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <LandingPage onNavigate={handleViewChange} />
              </motion.div>
            } />
            <Route path="/templates" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <TemplatePicker onSelect={handleSelectTemplate} onNavigate={handleViewChange} />
              </motion.div>
            } />
            <Route path="/editor/:id" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <SignatureEditor signatures={signatures} onSave={handleSaveSignature} onNavigate={handleViewChange} />
              </motion.div>
            } />
            <Route path="/editor/new" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <SignatureEditor signatures={signatures} onSave={handleSaveSignature} onNavigate={handleViewChange} />
              </motion.div>
            } />
            <Route path="/install-steps" element={
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                <InstallSteps signatures={signatures} onEdit={handleEditSignatureLaunch} onDelete={handleDeleteSignature} />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="bg-[#111118] border-t border-white/5 py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-white/40">
          <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-white font-black uppercase tracking-tighter">
              <div className="w-5 h-5 bg-[#b04090] text-white rounded-2xl flex items-center justify-center text-[10px]">
                M
              </div>
              <span>MailESign</span>
            </div>
            <p className="text-xs leading-relaxed text-white/60">
              Meticulously designed, inline-styled email signatures built to establish your professional presence. All assets hosted over secure SSL CDNs.
            </p>
            <div className="text-[10px] font-mono text-[#b04090] uppercase tracking-widest font-bold">
              © 2026 MailESign Corp. All rights reserved.
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">Application</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => handleViewChange('install-steps')} className="hover:text-white text-left transition-colors">Saved Signatures</button>
              <button onClick={() => handleViewChange('templates')} className="hover:text-white text-left transition-colors">Format templates</button>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">Setup Guides</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => handleViewChange('install-steps')} className="hover:text-white text-left transition-colors">Gmail Setup Guide</button>
              <button onClick={() => handleViewChange('install-steps')} className="hover:text-white text-left transition-colors">Outlook Integration</button>
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
