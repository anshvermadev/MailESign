import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit3, Trash2, Code, Copy, CheckCircle, ExternalLink, Activity, LayoutGrid, Check } from 'lucide-react';
import { Signature } from '../types';
import { generateSignatureHTML, copyHtmlToClipboard } from '../utils';
import SignaturePreview from '../components/SignaturePreview';

interface DashboardProps {
  signatures: Signature[];
  onEdit: (sig: Signature) => void;
  onDelete: (id: string) => void;
  onNavigate: (view: string) => void;
}

export default function Dashboard({ signatures, onEdit, onDelete, onNavigate }: DashboardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyHTML = async (sig: Signature) => {
    const html = generateSignatureHTML(sig);
    await copyHtmlToClipboard(html);
    setCopiedId(sig.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#0a0a0f] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Welcome Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-sans font-black uppercase text-white tracking-tight">YOUR FOOTERS</h1>
            <p className="text-xs text-white/40 mt-1 font-light">Manage, update, and deploy your brand identities across email platforms.</p>
          </div>
          <button
            id="dashboard-btn-create-new"
            onClick={() => onNavigate('templates')}
            className="inline-flex items-center gap-2 bg-[#b04090] hover:bg-[#903070] text-black px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Signature</span>
          </button>
        </div>

        {/* Quick Statistics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#111118] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Active Signatures</div>
              <div className="text-2xl font-mono font-black text-white mt-1">{signatures.length}</div>
            </div>
            <div className="w-10 h-10 bg-[#b04090]/10 border border-[#b04090]/20 rounded-2xl flex items-center justify-center text-[#b04090]">
              <LayoutGrid className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-[#111118] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Total Click-throughs</div>
              <div className="text-2xl font-mono font-black text-white mt-1">
                {signatures.reduce((sum, sig) => sum + (sig.clicksCount || 0), 0).toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-[#111118] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Deployments Verified</div>
              <div className="text-2xl font-mono font-black text-white mt-1">
                {signatures.filter(s => s.status === 'Installed').length} / {signatures.length}
              </div>
            </div>
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* List of Signatures */}
        <div className="space-y-6">
          <h2 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold">Active Repositories</h2>

          {signatures.length === 0 ? (
            <div className="bg-[#111118] border border-white/10 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-[#b04090]/10 border border-[#b04090]/20 rounded-2xl flex items-center justify-center text-[#b04090] mx-auto">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-sans font-bold text-white uppercase">No signatures found</h3>
              <p className="text-xs text-white/40 font-light">Create your very first professional email signature using our custom design templates.</p>
              <button
                id="empty-dashboard-create"
                onClick={() => onNavigate('templates')}
                className="inline-flex items-center gap-2 bg-[#b04090] hover:bg-[#903070] text-black px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
              >
                <span>Launch Templates</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {signatures.map((sig) => (
                <motion.div
                  key={sig.id}
                  layoutId={`sig-card-${sig.id}`}
                  className="bg-[#111118] border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-[#b04090]/30 transition-all flex flex-col justify-between"
                >
                  
                  {/* Signature preview header */}
                  <div className="bg-[#0a0a0f] border-b border-white/5 px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${sig.status === 'Installed' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'}`} />
                      <span className="text-xs font-mono font-bold text-white tracking-wide uppercase">{sig.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-white/40">Updated {sig.updatedAt}</span>
                    </div>
                  </div>

                  {/* Body preview of actual inline HTML signature */}
                  <SignaturePreview signature={sig} />

                  {/* Bottom bar with action elements */}
                  <div className="bg-[#0a0a0f] border-t border-white/5 px-5 py-4 flex flex-wrap gap-2 items-center justify-between">
                    
                    {/* Secondary metadata display */}
                    <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
                      <div>CLICKS: <span className="text-[#b04090] font-black">{sig.clicksCount || 0}</span></div>
                      <div>THEME: <span className="text-white font-black uppercase text-[9px]">{sig.templateId.replace('-', ' ')}</span></div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`sig-copy-${sig.id}`}
                        onClick={() => handleCopyHTML(sig)}
                        title="Copy Inline HTML for Email"
                        className="p-2 bg-[#111118] border border-white/10 hover:bg-white/5 text-white rounded-2xl transition-all flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide"
                      >
                        {copiedId === sig.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#b04090]" />
                            <span>Copy HTML</span>
                          </>
                        )}
                      </button>

                      <button
                        id={`sig-edit-${sig.id}`}
                        onClick={() => onEdit(sig)}
                        title="Edit Signature"
                        className="p-2 bg-[#111118] border border-white/10 hover:bg-white/5 text-white rounded-2xl transition-all flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#b04090]" />
                        <span>Edit</span>
                      </button>

                      <button
                        id={`sig-delete-${sig.id}`}
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this signature?')) {
                            onDelete(sig.id);
                          }
                        }}
                        title="Delete Signature"
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-2xl transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
