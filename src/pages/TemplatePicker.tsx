import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TemplateType } from '../types';
import { generateSignatureHTML } from '../utils';

interface TemplatePickerProps {
  onSelect: (templateId: TemplateType) => void;
  onNavigate: (view: string) => void;
}

const PREVIEW_SIGNATURE = {
  id: 'preview-sig',
  name: 'Preview Profile',
  fullName: 'John Doe',
  jobTitle: 'Creative Director',
  companyName: 'Lumina Group',
  phone: '+1 (555) 304-2190',
  email: 'johndoe@lumina.co',
  website: 'www.lumina.co',
  brandColor: '#FF3E00',
  logoUrl: '',
  socials: {
    linkedin: 'linkedin.com/in/johndoe',
    instagram: 'instagram.com/johndoe',
    facebook: 'facebook.com/johndoe',
    youtube: 'youtube.com/johndoe',
  } as Record<string, string | undefined>,
  templateId: 'premium-boxed' as TemplateType,
  status: 'Installed' as const,
  updatedAt: '2026-06-26',
  clicksCount: 0,
};

export default function TemplatePicker({ onSelect, onNavigate }: TemplatePickerProps) {
  return (
    <div className="bg-[#0A0A0A] min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-white/10 pb-6 mb-10">
          <h1 className="text-3xl sm:text-4xl font-sans font-black uppercase text-white tracking-tight">SELECT A FORMAT</h1>
          <p className="text-xs text-white/40 mt-1 font-light">Pick a designer canvas structure. You can customize the branding assets, colors, and fields on the next step.</p>
        </div>

        {/* Single Template Card */}
        <div className="max-w-xl mx-auto">
          <div
            className="bg-[#111] border border-white/10 hover:border-[#FF3E00]/40 rounded-none overflow-hidden shadow-2xl transition-all flex flex-col justify-between group"
          >
            {/* Visual mockup block showing live rendered signature */}
            <div className="bg-[#151515] border-b border-white/5 p-6 flex items-center justify-center">
              <div className="w-full bg-white p-5 rounded-sm border border-[#e5e2e1] shadow-sm max-w-[480px]">
                <div
                  className="pointer-events-none"
                  dangerouslySetInnerHTML={{
                    __html: generateSignatureHTML(PREVIEW_SIGNATURE)
                  }}
                />
              </div>
            </div>

            {/* Template Meta Info */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-sans font-black text-white uppercase text-sm tracking-wider group-hover:text-[#FF3E00] transition-colors">Premium Boxed</h3>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-none uppercase font-bold tracking-widest bg-[#FF3E00]/10 text-[#FF3E00] border border-[#FF3E00]/20">
                    Featured
                  </span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-5 font-light">
                  Stately boxed card with vertical separator divider, company details on the right, social icon bar, and branded footer. Gmail-ready inline HTML.
                </p>
              </div>

              <button
                id="template-select-premium-boxed"
                onClick={() => onSelect('premium-boxed')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0A0A0A] group-hover:bg-[#FF3E00] border border-white/10 group-hover:border-[#FF3E00] text-white group-hover:text-black rounded-none text-xs font-black uppercase tracking-widest transition-all"
              >
                <span>Choose Format & Edit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Coming soon hint */}
          <div className="mt-8 bg-[#111] border border-white/10 rounded-none p-5 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#FF3E00] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">More Templates Coming Soon</div>
              <p className="text-[11px] text-white/40 leading-relaxed font-light mt-1">
                Additional signature formats including minimal, editorial, and social-heavy designs are being crafted by our design team.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
