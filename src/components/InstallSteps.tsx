import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, Copy, AlertCircle, Info, Settings, Layout, ExternalLink, HelpCircle } from 'lucide-react';
import { Signature } from '../types';
import { generateSignatureHTML } from '../utils';

interface InstallStepsProps {
  signatures: Signature[];
}

type ClientType = 'gmail' | 'outlook-desktop' | 'outlook-web' | 'apple';

export default function InstallSteps({ signatures }: InstallStepsProps) {
  const [selectedSigId, setSelectedSigId] = useState<string>(signatures[0]?.id || '');
  const [activeClient, setActiveClient] = useState<ClientType>('gmail');
  const [copiedRich, setCopiedRich] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);

  const selectedSig = signatures.find(s => s.id === selectedSigId) || signatures[0];

  const handleCopyRichText = async () => {
    if (!selectedSig) return;
    const htmlString = generateSignatureHTML(selectedSig);

    try {
      // Build an HTML Blob for rich content pasting
      const blob = new Blob([htmlString], { type: 'text/html' });
      const textBlob = new Blob([selectedSig.fullName], { type: 'text/plain' });
      
      const item = new ClipboardItem({
        'text/html': blob,
        'text/plain': textBlob,
      });
      
      await navigator.clipboard.write([item]);
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 2000);
    } catch (err) {
      console.error('Failed to copy rich text', err);
      // Fallback to simple HTML copy if browser restricts ClipboardItem
      navigator.clipboard.writeText(htmlString);
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 2000);
    }
  };

  const handleCopyRawHTML = () => {
    if (!selectedSig) return;
    const htmlString = generateSignatureHTML(selectedSig);
    navigator.clipboard.writeText(htmlString);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const clients = [
    { id: 'gmail', name: 'Gmail', icon: '✉️' },
    { id: 'outlook-desktop', name: 'Outlook Desktop', icon: '💻' },
    { id: 'outlook-web', name: 'Outlook Web', icon: '🌐' },
    { id: 'apple', name: 'Apple Mail', icon: '🍎' },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-12 px-6 text-[#F5F5F5]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-sans font-black uppercase text-white tracking-tight">Deploy Footer</h1>
          <p className="text-xs font-mono text-white/40 mt-1">Easily paste your formatted brand signature into any desktop or browser mail correspondence pipeline.</p>
        </div>

        {signatures.length === 0 ? (
          <div className="bg-[#111] border border-white/10 rounded-none p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 bg-[#FF3E00]/10 rounded-full flex items-center justify-center text-[#FF3E00] mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-wider text-white">No signatures to install</h3>
            <p className="text-xs text-white/40 font-mono">Create or import a signature template first so you can configure setup details.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Options / Copy Box */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#111] border border-white/10 rounded-none p-6 space-y-6">
                <div>
                  <h3 className="text-xs font-mono text-[#FF3E00] uppercase tracking-widest font-black">1. Select Target Profile</h3>
                  <select
                    id="install-select-sig"
                    value={selectedSigId}
                    onChange={(e) => setSelectedSigId(e.target.value)}
                    className="w-full text-xs mt-2 px-3.5 py-2.5 border border-white/10 bg-[#0A0A0A] text-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF3E00]"
                  >
                    {signatures.map((s) => (
                      <option key={s.id} value={s.id} className="bg-[#0A0A0A]">{s.name} ({s.fullName})</option>
                    ))}
                  </select>
                </div>

                {/* Live Minimal Preview Container */}
                <div className="border border-white/5 p-4 rounded-none bg-[#0A0A0A] space-y-2 overflow-x-auto">
                  <div className="text-[9px] font-mono text-white/30 uppercase tracking-wider">Preview Signature:</div>
                  <div className="bg-white p-2 rounded-none">
                    <div 
                      className="scale-90 origin-top-left"
                      dangerouslySetInnerHTML={{ __html: generateSignatureHTML(selectedSig) }} 
                    />
                  </div>
                </div>

                {/* Premium Clipboard copy actions */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <button
                    id="install-btn-copy-rich"
                    onClick={handleCopyRichText}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#FF3E00] hover:bg-[#e63800] text-black rounded-none font-black text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    {copiedRich ? (
                      <>
                        <Check className="w-4 h-4 text-black stroke-[3px]" />
                        <span>Copied Rich Signature!</span>
                      </>
                    ) : (
                      <>
                        <Layout className="w-4 h-4 text-black" />
                        <span>Copy Styled Signature (Gmail/Outlook)</span>
                      </>
                    )}
                  </button>

                  <button
                    id="install-btn-copy-raw"
                    onClick={handleCopyRawHTML}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/10 bg-[#0A0A0A] hover:bg-white/5 text-white rounded-none font-black text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    {copiedRaw ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Copied Raw HTML Code!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#FF3E00]" />
                        <span>Copy Raw HTML Code</span>
                      </>
                    )}
                  </button>

                  <p className="text-[9px] font-mono text-center text-white/30 leading-normal pt-1">
                    *Choose **Styled Signature** to paste formatted text & pictures instantly into Gmail or Outlook signature boxes.
                  </p>
                </div>

              </div>

            </div>

            {/* Right Guide Instructions Panel */}
            <div className="lg:col-span-7 bg-[#111] border border-white/10 rounded-none p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
                {clients.map((c) => (
                  <button
                    key={c.id}
                    id={`install-client-tab-${c.id}`}
                    onClick={() => setActiveClient(c.id as ClientType)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                      activeClient === c.id 
                        ? 'bg-[#FF3E00] text-black border border-[#FF3E00]' 
                        : 'bg-[#0A0A0A] hover:bg-white/5 border border-white/10 text-white/40'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic steps text based on active tab */}
              <div className="space-y-6">
                
                {activeClient === 'gmail' && (
                  <div className="space-y-4 font-sans text-sm text-white/60">
                    <h3 className="font-black text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-[#FF3E00]" />
                      <span>Gmail Installation Steps</span>
                    </h3>
                    
                    <ol className="list-decimal list-inside space-y-3 pl-1 leading-relaxed text-xs">
                      <li>Click the <strong className="text-white font-bold">Copy Styled Signature</strong> button on the left panel.</li>
                      <li>Open <strong className="text-white font-bold">Gmail</strong> in your browser and click the Cog icon ⚙ in the top right, then select <strong className="text-white font-bold">See all settings</strong>.</li>
                      <li>Scroll down to the <strong className="text-white font-bold">Signature</strong> section.</li>
                      <li>Click <strong className="text-white font-bold">Create new</strong>, name your signature, and click in the signature rich text editor box on the right.</li>
                      <li>Paste using <kbd className="bg-[#0A0A0A] border border-white/10 px-1 py-0.5 rounded-none text-[10px] font-mono font-bold text-white">Ctrl + V</kbd> (or <kbd className="bg-[#0A0A0A] border border-white/10 px-1 py-0.5 rounded-none text-[10px] font-mono font-bold text-white">Cmd + V</kbd> on macOS).</li>
                      <li>Under <strong className="text-white font-bold">Signature defaults</strong>, select your newly named profile for both "For new emails use" and "On reply/forward use".</li>
                      <li>Scroll to the very bottom of the page and click <strong className="text-white font-bold">Save Changes</strong>.</li>
                    </ol>
                  </div>
                )}

                {activeClient === 'outlook-desktop' && (
                  <div className="space-y-4 font-sans text-sm text-white/60">
                    <h3 className="font-black text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-[#FF3E00]" />
                      <span>Outlook Desktop Steps</span>
                    </h3>
                    
                    <ol className="list-decimal list-inside space-y-3 pl-1 leading-relaxed text-xs">
                      <li>Click the <strong className="text-white font-bold">Copy Styled Signature</strong> button on the left panel.</li>
                      <li>Open <strong className="text-white font-bold">Outlook</strong> on your computer.</li>
                      <li>Go to <strong className="text-white font-bold">File</strong> &gt; <strong className="text-white font-bold">Options</strong> &gt; <strong className="text-white font-bold">Mail</strong> &gt; <strong className="text-white font-bold">Signatures</strong>.</li>
                      <li>Click <strong className="text-white font-bold">New</strong> to create a blank profile and name it.</li>
                      <li>Click inside the edit window below and paste using <kbd className="bg-[#0A0A0A] border border-white/10 px-1 py-0.5 rounded-none text-[10px] font-mono font-bold text-white">Ctrl + V</kbd>.</li>
                      <li>Make sure <strong className="text-white font-bold">HTML</strong> formatting is selected for outbound emails.</li>
                      <li>Click <strong className="text-white font-bold">OK</strong> to save the changes.</li>
                    </ol>
                  </div>
                )}

                {activeClient === 'outlook-web' && (
                  <div className="space-y-4 font-sans text-sm text-white/60">
                    <h3 className="font-black text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-[#FF3E00]" />
                      <span>Outlook Web App Steps</span>
                    </h3>
                    
                    <ol className="list-decimal list-inside space-y-3 pl-1 leading-relaxed text-xs">
                      <li>Click the <strong className="text-white font-bold">Copy Styled Signature</strong> button on the left panel.</li>
                      <li>Open the browser version of Outlook.</li>
                      <li>Click the Cog icon ⚙ in the top bar to open settings, then go to <strong className="text-white font-bold">View all Outlook settings</strong>.</li>
                      <li>Select <strong className="text-white font-bold">Mail</strong> &gt; <strong className="text-white font-bold">Compose and reply</strong>.</li>
                      <li>Under Email signature, click <strong className="text-white font-bold">+ New signature</strong>.</li>
                      <li>Paste your signature inside the box, save, and check the checkbox to include it on new messages.</li>
                    </ol>
                  </div>
                )}

                {activeClient === 'apple' && (
                  <div className="space-y-4 font-sans text-sm text-white/60">
                    <h3 className="font-black text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-[#FF3E00]" />
                      <span>Apple Mail Steps</span>
                    </h3>
                    
                    <ol className="list-decimal list-inside space-y-3 pl-1 leading-relaxed text-xs">
                      <li>Click the <strong className="text-white font-bold">Copy Styled Signature</strong> button on the left panel.</li>
                      <li>Launch <strong className="text-white font-bold">Mail</strong> on your Mac.</li>
                      <li>Go to <strong className="text-white font-bold">Mail</strong> &gt; <strong className="text-white font-bold">Settings</strong> (or <strong className="text-white font-bold">Preferences</strong>), and select <strong className="text-white font-bold">Signatures</strong>.</li>
                      <li>Click <strong className="text-white font-bold">+</strong> to add a signature, then deselect <strong className="text-white font-bold">"Always match my default message font"</strong>.</li>
                      <li>Paste inside the edit box. If image blocks look placeholder-sized, they will load securely once outbound emails are dispatched!</li>
                    </ol>
                  </div>
                )}

                {/* Support Warning info */}
                <div className="bg-[#0A0A0A] p-4 rounded-none border border-dashed border-white/5 flex items-start gap-2 text-xs text-white/40">
                  <Info className="w-4 h-4 text-[#FF3E00] mt-0.5 flex-shrink-0" />
                  <p className="leading-relaxed font-light">
                    <strong className="text-white font-semibold">No broken images:</strong> All logo and profile photos are securely delivered over HTTPS from SSL-verified CDNs, preventing modern mail clients from blocking images.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
