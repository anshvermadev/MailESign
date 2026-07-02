import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TemplateType } from '../types';
import SignaturePreview from '../components/SignaturePreview';

interface TemplatePickerProps {
  onSelect: (templateId: TemplateType) => void;
  onNavigate: (view: string) => void;
}

const TEMPLATES: Array<{ id: TemplateType, name: string, description: string, badge?: string }> = [
  {
    id: 'premium-boxed',
    name: 'Premium Boxed',
    description: 'Stately boxed card with vertical separator divider, company details on the right, social icon bar, and branded footer. Gmail-ready inline HTML.',
    badge: 'Featured'
  },
  {
    id: 'grid-brutalist',
    name: 'Grid Brutalist',
    description: 'Modern, structured table layout with high-contrast text rendering and clear grid boundaries. Perfect for technical roles.'
  },
  {
    id: 'type-heavy',
    name: 'Type Heavy',
    description: 'Editorial design prioritizing large, bold typography over visual embellishments. Excellent for creatives and designers.'
  },
  {
    id: 'social-aligned',
    name: 'Social Aligned',
    description: 'Clean, linear presentation emphasizing social connections over standard contact details. Lightweight and versatile.'
  }
];

export default function TemplatePicker({ onSelect, onNavigate }: TemplatePickerProps) {
  
  const getPreviewData = (templateId: TemplateType) => ({
    id: 'preview-sig',
    name: 'Preview Profile',
    fullName: 'John Doe',
    jobTitle: 'Creative Director',
    companyName: 'Lumina Group',
    phone: '+1 (555) 304-2190',
    email: 'johndoe@lumina.co',
    website: 'www.lumina.co',
    logoUrl: '',
    socials: {
      linkedin: 'linkedin.com/in/johndoe',
      instagram: 'instagram.com/johndoe',
      twitter: 'twitter.com/johndoe',
    },
    templateId,
    status: 'Installed' as const,
    updatedAt: '2026-06-26',
    clicksCount: 0,
    animatedIcons: true,
  });

  return (
    <div className="bg-[#0a0a0f] min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-white/10 pb-6 mb-10">
          <h1 className="text-3xl sm:text-4xl font-sans font-black uppercase text-white tracking-tight">SELECT A FORMAT</h1>
          <p className="text-xs text-white/40 mt-1 font-light">Pick a designer canvas structure. You can customize the branding assets, colors, and fields on the next step.</p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-[#111118] border border-white/10 hover:border-[#b04090]/40 rounded-2xl overflow-hidden shadow-2xl transition-all flex flex-col justify-between group"
            >
              {/* Visual mockup block showing live rendered signature */}
              <div className="bg-[#151515] border-b border-white/5 p-6 flex items-center justify-center min-h-[220px]">
                <div className="w-full max-w-[480px] pointer-events-none">
                  <SignaturePreview signature={getPreviewData(tpl.id)} className="rounded-sm border border-[#e5e2e1] shadow-sm bg-white" />
                </div>
              </div>

              {/* Template Meta Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-sans font-black text-white uppercase text-sm tracking-wider group-hover:text-[#b04090] transition-colors">{tpl.name}</h3>
                    {tpl.badge && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-2xl uppercase font-bold tracking-widest bg-[#b04090]/10 text-[#b04090] border border-[#b04090]/20">
                        {tpl.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed mb-5 font-light">
                    {tpl.description}
                  </p>
                </div>

                <button
                  id={`template-select-${tpl.id}`}
                  onClick={() => onSelect(tpl.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0a0a0f] group-hover:bg-[#b04090] border border-white/10 group-hover:border-[#b04090] text-white group-hover:text-black rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  <span>Choose Format & Edit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon hint */}
        <div className="mt-8 bg-[#111118] border border-white/10 rounded-2xl p-5 flex items-start gap-3 max-w-2xl mx-auto">
          <Sparkles className="w-5 h-5 text-[#b04090] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">More Templates Coming Soon</div>
            <p className="text-[11px] text-white/40 leading-relaxed font-light mt-1">
              Additional signature formats including minimal, editorial, and dynamic designs are being crafted by our design team.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
