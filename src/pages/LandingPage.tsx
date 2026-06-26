import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, MousePointerClick, ShieldCheck, Database, FileCode, Landmark, Terminal, Zap, CheckCircle } from 'lucide-react';
import { Signature } from '../types';
import { generateSignatureHTML } from '../utils';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  isLoggedIn: boolean;
}

export default function LandingPage({ onNavigate, isLoggedIn }: LandingPageProps) {
  // Demo Signature state
  const [demoSig, setDemoSig] = useState<Signature>({
    id: 'demo-sig',
    name: 'Demo Executive',
    fullName: 'Sophia Alistair',
    jobTitle: 'Director of Brand Communications',
    companyName: 'Lumina Digital Group',
    phone: '+1 (415) 883-9021',
    email: 'sophia@lumina.co',
    website: 'www.lumina.co',
    brandColor: '#b20028',
    logoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250',
    socials: {
      linkedin: 'linkedin.com/in/sophiaalistair',
      twitter: 'twitter.com/sophia_lumina',
      instagram: 'instagram.com/sophia_lumina',
    },
    templateId: 'executive-modern',
    status: 'Installed',
    updatedAt: '2026-06-25',
    clicksCount: 240,
  });

  const [copied, setCopied] = useState(false);

  const handleCopyDemoHTML = () => {
    const html = generateSignatureHTML(demoSig);
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden bg-[#0A0A0A] text-[#F5F5F5] min-h-screen">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#111] border border-white/10 px-3.5 py-1.5 rounded-none text-[10px] font-bold text-[#FF3E00] tracking-[0.25em] uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Now supporting dynamic click analytics</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[76px] font-sans font-black text-white leading-[0.85] tracking-tighter uppercase mb-4"
            >
              BUILD A FREE<br />
              <span className="text-[#FF3E00]">EMAIL FOOTER</span><br />
              IN MINUTES.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-white/60 max-w-xl font-sans leading-relaxed font-light"
            >
              Elevate your professional correspondence with meticulously designed, dynamically updating email signatures. No coding required. Compatible with all major email clients.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                id="hero-cta-create"
                onClick={() => onNavigate(isLoggedIn ? 'templates' : 'auth')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF3E00] hover:bg-[#e63800] text-black font-black uppercase text-xs tracking-widest rounded-none transition-all duration-200"
              >
                <span>Create your signature</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-cta-explore"
                onClick={() => {
                  const el = document.getElementById('features-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 bg-transparent hover:bg-white/5 text-white font-black uppercase text-xs tracking-widest rounded-none transition-all duration-200"
              >
                <span>Explore Features</span>
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-6 pt-4 text-xs font-mono text-white/40"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#FF3E00]" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#FF3E00]" />
                Full client compatibility
              </div>
            </motion.div>
          </div>

          {/* Hero Right Mockup / Live Sandbox */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-[#111] rounded-none border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Mock Browser Header */}
              <div className="bg-[#0A0A0A] border-b border-white/5 px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] font-mono text-white/40 truncate bg-[#111] px-4 py-1 border border-white/5">
                  sophia@lumina.co - Signature Preview
                </div>
                <div className="w-4" />
              </div>

              {/* Email Envelope Workspace */}
              <div className="p-6 space-y-4">
                <div className="space-y-2 pb-4 border-b border-white/5 text-xs font-sans text-white/40">
                  <div><span className="font-semibold text-white">To:</span> client@example.com</div>
                  <div><span className="font-semibold text-white">Subject:</span> Re: Final Design Revisions</div>
                </div>

                <div className="space-y-3 font-sans text-sm text-white/80 py-2">
                  <p className="font-medium text-white">Hi team,</p>
                  <p className="text-white/60 leading-relaxed font-light">
                    I have thoroughly reviewed the updated brand handbook and applied the requested crimson highlights. 
                    Let me know if we are good to lock these in for the launch tomorrow.
                  </p>
                  <p className="text-white/40 italic">Best regards,</p>
                </div>

                {/* Render Signature Live */}
                <div className="pt-4 border-t border-white/5 overflow-x-auto">
                  <div className="min-w-[320px] bg-white text-black transition-all duration-300 p-2">
                    <table cellPadding="0" cellSpacing="0" border="0" className="font-sans max-w-[480px] border border-[#e5e2e1] p-4 bg-white mx-auto">
                      <tbody>
                        <tr>
                          <td valign="top" className="pr-4 border-r border-[#e5e2e1] w-10 text-center">
                            <table cellPadding="0" cellSpacing="0" border="0">
                              <tbody>
                                <tr>
                                  <td align="center" className="pb-2">
                                    <span className="text-sm font-bold text-[#FF3E00]">⚓</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" className="text-[10px] font-mono text-[#5f5e5e] leading-relaxed">
                                    <span className="font-bold text-[#5f5e5e] block">in</span>
                                    <span className="font-bold text-[#5f5e5e] block mt-1">tw</span>
                                    <span className="font-bold text-[#5f5e5e] block mt-1">ig</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td valign="top" className="pl-4">
                            <table cellPadding="0" cellSpacing="0" border="0">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">
                                      {demoSig.companyName}
                                    </div>
                                    <div className="text-base font-bold text-[#1a1c1c] mt-1 mb-0.5">
                                      {demoSig.fullName} <span className="text-[#FF3E00]">✔</span>
                                    </div>
                                    <div className="text-xs text-[#5f5e5e] italic mb-2">
                                      {demoSig.jobTitle}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="pt-2 border-t border-[#f3f3f4] text-[11px] text-[#656464] leading-normal">
                                    <div><b>T:</b> {demoSig.phone}</div>
                                    <div><b>E:</b> <span className="text-[#1a1c1c] font-medium">{demoSig.email}</span></div>
                                    <div><b>W:</b> <span className="text-[#1a1c1c] font-medium">{demoSig.website}</span></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td valign="middle" className="pl-4 text-center">
                            <img src={demoSig.logoUrl} alt={demoSig.fullName} className="w-16 h-16 object-cover border border-[#e5e2e1]" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
                  <button
                    id="demo-action-copy"
                    onClick={handleCopyDemoHTML}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#0A0A0A] hover:bg-white/5 border border-white/10 text-white rounded-none transition-all"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        <span>Copied HTML!</span>
                      </>
                    ) : (
                      <>
                        <FileCode className="w-3.5 h-3.5" />
                        <span>Copy Signature HTML</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Accent Absolute Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#111] border border-white/10 rounded-none p-4 shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF3E00]/10 rounded-none flex items-center justify-center text-[#FF3E00]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">Templates</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">6 Pro Formats</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Features Grid Section */}
      <section id="features-section" className="bg-[#0A0A0A] border-t border-white/5 py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <h2 className="text-[10px] font-mono text-[#FF3E00] uppercase tracking-[0.3em] font-bold">Comprehensive Toolset</h2>
            <p className="text-3xl sm:text-4xl font-sans font-black text-white uppercase tracking-tight">Designed to amplify your digital presence.</p>
            <p className="text-white/60 text-sm font-light">Say goodbye to broken layouts, unhosted images, or fragile templates. Get everything precision-engineered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-white/5 p-10 rounded-none bg-[#111] hover:border-[#FF3E00]/30 transition-all">
              <div className="w-12 h-12 bg-[#FF3E00]/10 rounded-none flex items-center justify-center text-[#FF3E00] mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">6 Designer Formats</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Choose from minimalist layouts, grid brutalist architectures, portrait models, or heavy typographies to matching your custom branding style.
              </p>
            </div>

            <div className="border border-white/5 p-10 rounded-none bg-[#111] hover:border-[#FF3E00]/30 transition-all">
              <div className="w-12 h-12 bg-[#FF3E00]/10 rounded-none flex items-center justify-center text-[#FF3E00] mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Self-Hosted Assets</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                We host your logo assets and profile avatars. Your receivers will always see your photo cleanly loaded on SSL certificates without broken link frames.
              </p>
            </div>

            <div className="border border-white/5 p-10 rounded-none bg-[#111] hover:border-[#FF3E00]/30 transition-all">
              <div className="w-12 h-12 bg-[#FF3E00]/10 rounded-none flex items-center justify-center text-[#FF3E00] mb-6">
                <MousePointerClick className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Click Analytics</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Track how many clicks your phone numbers, company website links, or social accounts gather directly from the email footer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Callout Grid */}
      <section className="bg-[#111] border-t border-white/5 py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Bento Card 1 */}
            <div className="lg:col-span-8 border border-white/10 bg-[#0A0A0A] rounded-none p-10 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#FF3E00]/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-white/10 text-[9px] font-mono text-white/60 uppercase rounded-none mb-6">
                  <Terminal className="w-3.5 h-3.5 text-[#FF3E00]" />
                  <span>Inline HTML Cleanliness</span>
                </div>
                <h3 className="text-2xl font-sans font-black text-white uppercase tracking-tight mb-3">Precision Engineered Code</h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xl font-light">
                  Most modern systems wrap signatures in nested divs or complex templates which render poorly in Gmail, Yahoo, or Outlook Desktop. 
                  Ink & Stamp exports atomic standard HTML Tables with fully inline CSS to ensure maximum layout fidelity on every screen size.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Supported:</span>
                <div className="flex gap-2 text-[10px] font-mono text-white">
                  <span className="bg-[#111] px-2.5 py-1 border border-white/10">GMAIL</span>
                  <span className="bg-[#111] px-2.5 py-1 border border-white/10">APPLE MAIL</span>
                  <span className="bg-[#111] px-2.5 py-1 border border-white/10">OUTLOOK</span>
                  <span className="bg-[#111] px-2.5 py-1 border border-white/10">YAHOO</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="lg:col-span-4 border border-white/10 bg-[#0A0A0A] rounded-none p-10 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=400&h=400)' }} />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-white/10 text-[9px] font-mono text-white/60 uppercase rounded-none mb-6">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF3E00]" />
                  <span>Enterprise Scale</span>
                </div>
                <h3 className="text-2xl font-sans font-black text-white uppercase tracking-tight mb-3">CSV Bulk Import</h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  Need to generate 100+ signatures for your sales, customer success, or executive teams? 
                  Import a CSV list of employee info to generate signatures with matching styles in seconds.
                </p>
              </div>

              <button
                id="bento-cta-bulk"
                onClick={() => onNavigate(isLoggedIn ? 'bulk-import' : 'auth')}
                className="mt-8 inline-flex items-center justify-between px-4 py-2.5 bg-[#FF3E00] hover:bg-[#e63800] text-black rounded-none text-xs font-black uppercase tracking-widest transition-all"
              >
                <span>Launch CSV Processor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#0A0A0A] border-t border-white/5 py-24 text-center px-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white uppercase tracking-tight">Establish your professional identity.</h2>
          <p className="text-sm text-white/60 max-w-xl mx-auto leading-relaxed font-light">
            Create beautifully stylized templates matching your signature profile, and copy clean CSS-inline styled HTML structures into your favorite client.
          </p>
          <div className="pt-4">
            <button
              id="bottom-cta-create"
              onClick={() => onNavigate(isLoggedIn ? 'templates' : 'auth')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF3E00] hover:bg-[#e63800] text-black rounded-none font-black uppercase text-xs tracking-widest transition-all shadow-md"
            >
              <span>Build Signature Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
