import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Copy, Check, Sparkles, Image, Globe, Mail, Phone, User, Landmark, ShieldAlert, ArrowLeft, Plus, X } from 'lucide-react';
import { Signature, TemplateType } from '../types';
import { PRESET_AVATARS, generateSignatureHTML } from '../utils';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/crop';

interface SignatureEditorProps {
  initialSignature?: Signature | null;
  selectedTemplateId?: TemplateType | null;
  onSave: (sig: Signature) => void;
  onNavigate: (view: string) => void;
}

const COLOR_PALETTE = [
  { name: 'Neon Orange', hex: '#FF3E00' },
  { name: 'Acid Green', hex: '#22C55E' },
  { name: 'Electric Blue', hex: '#3B82F6' },
  { name: 'Vibrant Amber', hex: '#d97706' },
  { name: 'Sharp Pink', hex: '#EC4899' },
  { name: 'Pure White', hex: '#FFFFFF' },
];

export default function SignatureEditor({ initialSignature, selectedTemplateId, onSave, onNavigate }: SignatureEditorProps) {
  // Local editable signature state
  const [sig, setSig] = useState<Signature>({
    id: `sig-${Date.now()}`,
    name: 'New Signature Profile',
    fullName: 'John Doe',
    jobTitle: 'Creative Director',
    companyName: 'Lumina Group',
    phone: '+1 (555) 304-2190',
    email: 'johndoe@lumina.co',
    website: 'www.lumina.co',
    brandColor: '#FF3E00',
    logoUrl: PRESET_AVATARS[0].url,
    socials: {
      linkedin: 'linkedin.com/in/johndoe',
      twitter: 'twitter.com/johndoe',
      instagram: 'instagram.com/johndoe',
    },
    templateId: selectedTemplateId || 'premium-boxed',
    status: 'Draft',
    updatedAt: new Date().toISOString().split('T')[0],
    clicksCount: 0,
  });

  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [isUploading, setIsUploading] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // Load signature properties if we are in Edit mode
  useEffect(() => {
    if (initialSignature) {
      setSig({ ...initialSignature });
    }
  }, [initialSignature]);

  const handleFieldChange = (field: keyof Signature, value: any) => {
    setSig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (socialKey: string, value: string) => {
    setSig((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [socialKey]: value,
      },
    }));
  };

  const handleCopyHTML = () => {
    const html = generateSignatureHTML(sig);
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...sig,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onNavigate('dashboard');
    }, 1500);
  };

  const handleFileSelect = (file: File) => {
    if (!file) return;

    // 1MB limit check
    if (file.size > 1 * 1024 * 1024) {
      alert('File size exceeds 1MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () =>
      setSelectedImage(reader.result?.toString() || null)
    );
    reader.readAsDataURL(file);
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleUploadCroppedImage = async () => {
    if (!selectedImage || !croppedAreaPixels) return;
    setIsUploading(true);
    try {
      const croppedImageFile = await getCroppedImg(selectedImage, croppedAreaPixels);
      if (!croppedImageFile) throw new Error('Failed to crop image');

      const formData = new FormData();
      formData.append('image', croppedImageFile);
      
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY'; 
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        handleFieldChange('logoUrl', data.data.url);
        setSelectedImage(null); // Close crop modal
      } else {
        alert('Image upload failed: ' + (data.error?.message || 'Unknown error. Did you configure your API key?'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed. Check console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-12 px-6 text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Editor Top Bar with Return Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <button
              id="editor-btn-back"
              onClick={() => onNavigate('dashboard')}
              className="p-2 border border-white/10 bg-[#111] hover:bg-white/5 rounded-none transition-all text-white/60 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono text-[#FF3E00] uppercase tracking-widest font-black">
                FORMAT: {sig.templateId.replace('-', ' ')}
              </div>
              <h1 className="text-2xl font-sans font-black uppercase text-white tracking-tight">
                {initialSignature ? 'MODIFY FOOTER' : 'CONFIGURE FOOTER'}
              </h1>
            </div>
          </div>

          <div className="flex gap-2.5">
            <button
              id="editor-btn-copy"
              type="button"
              onClick={handleCopyHTML}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#111] hover:bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-none transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#FF3E00]" />
                  <span>Copy HTML Code</span>
                </>
              )}
            </button>
            <button
              id="editor-btn-save"
              onClick={handleFormSubmit}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#FF3E00] hover:bg-[#e63800] text-black text-xs font-black uppercase tracking-widest rounded-none transition-all shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Footer</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="bg-green-950/20 border border-green-900/50 text-green-400 text-xs rounded-none p-4 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400 font-bold" />
            <span>Success! The email signature profile was securely synchronized to your local repository. Navigating to Dashboard...</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT SIDEBAR: CONFIGURATION CONTROLS */}
          <form onSubmit={handleFormSubmit} className="lg:col-span-6 space-y-8 bg-[#111] border border-white/10 rounded-none p-6 sm:p-8">
            
            {/* Signature Properties Header */}
            <div className="space-y-1">
              <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-wider font-bold">Metadata Profile</h3>
              <input
                id="editor-input-profile-name"
                type="text"
                required
                value={sig.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="E.g. Primary Corporate"
                className="w-full px-4 py-2 border border-white/10 bg-[#0A0A0A] text-white focus:bg-[#111] text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] placeholder:text-white/20 transition-all"
              />
            </div>

            {/* Section 1: Personal Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-[#FF3E00] uppercase tracking-widest font-bold">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    <input
                      id="editor-input-fullname"
                      type="text"
                      required
                      value={sig.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] placeholder:text-white/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Job Title</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                      <Landmark className="w-3.5 h-3.5" />
                    </span>
                    <input
                      id="editor-input-jobtitle"
                      type="text"
                      required
                      value={sig.jobTitle}
                      onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] placeholder:text-white/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase">Company Name</label>
                <input
                  id="editor-input-companyname"
                  type="text"
                  required
                  value={sig.companyName}
                  onChange={(e) => handleFieldChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] placeholder:text-white/20 transition-all"
                />
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-[#FF3E00] uppercase tracking-widest font-bold">Contact Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <input
                      id="editor-input-phone"
                      type="text"
                      required
                      value={sig.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] placeholder:text-white/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input
                      id="editor-input-email"
                      type="email"
                      required
                      value={sig.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] placeholder:text-white/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/40 uppercase">Website URL</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                  <input
                    id="editor-input-website"
                    type="text"
                    required
                    value={sig.website}
                    onChange={(e) => handleFieldChange('website', e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none focus:ring-1 focus:ring-[#FF3E00] focus:border-[#FF3E00] placeholder:text-white/20 transition-all"
                  />
                </div>
              </div>

              {/* Social Channels Details */}
              <div className="pt-4 border-t border-dashed border-white/10 space-y-3">
                <label className="text-[10px] font-mono text-white/40 uppercase block">Social Channels (Optional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/40 w-12 text-right">LinkedIn:</span>
                    <input
                      id="editor-social-linkedin"
                      type="text"
                      placeholder="linkedin.com/..."
                      value={sig.socials.linkedin || ''}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      className="flex-1 px-2.5 py-1.5 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/40 w-12 text-right">Twitter:</span>
                    <input
                      id="editor-social-twitter"
                      type="text"
                      placeholder="twitter.com/..."
                      value={sig.socials.twitter || ''}
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      className="flex-1 px-2.5 py-1.5 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/40 w-12 text-right">Instagram:</span>
                    <input
                      id="editor-social-instagram"
                      type="text"
                      placeholder="instagram.com/..."
                      value={sig.socials.instagram || ''}
                      onChange={(e) => handleSocialChange('instagram', e.target.value)}
                      className="flex-1 px-2.5 py-1.5 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/40 w-12 text-right">Facebook:</span>
                    <input
                      id="editor-social-facebook"
                      type="text"
                      placeholder="facebook.com/..."
                      value={sig.socials.facebook || ''}
                      onChange={(e) => handleSocialChange('facebook', e.target.value)}
                      className="flex-1 px-2.5 py-1.5 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/40 w-12 text-right">YouTube:</span>
                    <input
                      id="editor-social-youtube"
                      type="text"
                      placeholder="youtube.com/..."
                      value={sig.socials.youtube || ''}
                      onChange={(e) => handleSocialChange('youtube', e.target.value)}
                      className="flex-1 px-2.5 py-1.5 border border-white/10 text-xs rounded-none bg-[#0A0A0A] text-white focus:bg-[#111] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Brand Assets */}
            <div className="space-y-5">
              <h3 className="text-xs font-mono text-[#FF3E00] uppercase tracking-widest font-bold">Brand Assets</h3>
              
              {/* Custom Color Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase">
                  <span>Accent Accent Color</span>
                  <span className="text-[#FF3E00] font-bold">{sig.brandColor}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  {/* Preset DOTS */}
                  <div className="flex gap-2">
                    {COLOR_PALETTE.map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => handleFieldChange('brandColor', col.hex)}
                        title={col.name}
                        className={`w-6 h-6 rounded-full border border-black/10 transition-transform ${
                          sig.brandColor === col.hex ? 'scale-125 ring-2 ring-white/40' : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                  </div>

                  <div className="h-6 w-[1px] bg-white/10" />

                  {/* Manual color picker */}
                  <div className="flex items-center gap-1.5 bg-[#0A0A0A] border border-white/10 px-2 py-1 rounded-none">
                    <input
                      id="editor-color-picker"
                      type="color"
                      value={sig.brandColor}
                      onChange={(e) => handleFieldChange('brandColor', e.target.value)}
                      className="w-5 h-5 border-0 rounded-none cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      id="editor-color-picker-text"
                      type="text"
                      maxLength={7}
                      value={sig.brandColor}
                      onChange={(e) => handleFieldChange('brandColor', e.target.value)}
                      className="w-16 bg-transparent text-[11px] font-mono text-white border-0 focus:outline-none focus:ring-0 p-0 text-center uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Logo / Avatar Asset upload block */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-white/40 uppercase block">Profile Image / Corporate Logo</label>
                
                {/* Drag and Drop Zone */}
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleLogoDrop}
                  className="border-2 border-dashed border-white/10 rounded-none p-5 text-center bg-[#0A0A0A] hover:bg-white/5 transition-all cursor-pointer relative block"
                >
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileInputChange} disabled={isUploading} />
                  <div className="flex flex-col items-center gap-1.5">
                    {isUploading ? (
                      <div className="w-6 h-6 border-2 border-[#FF3E00] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Image className="w-6 h-6 text-[#FF3E00]/60" />
                    )}
                    <div className="text-xs font-black uppercase tracking-wider text-white">
                      {isUploading ? 'Uploading...' : 'Drag and drop or click to upload'}
                    </div>
                    <div className="text-[10px] text-white/40 font-light">Supports PNG, JPG, or SVG via ImgBB (Max 1MB).</div>
                  </div>
                </label>

                {/* Remove Photo Button */}
                {sig.logoUrl && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleFieldChange('logoUrl', '')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111] hover:bg-white/5 border border-white/10 text-white/60 hover:text-[#FF3E00] text-xs font-bold uppercase tracking-widest rounded-none transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

            <button type="submit" className="hidden" />
          </form>

          {/* RIGHT SIDEBAR: EMAIL WORKSPACE LIVE PREVIEW */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#111] rounded-none border border-white/10 shadow-2xl overflow-hidden sticky top-6">
              
              {/* Mock browser header */}
              <div className="bg-[#0A0A0A] border-b border-white/5 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] font-mono text-white/40 truncate bg-[#111] px-4 py-1 rounded-none border border-white/5">
                  New Message — {sig.fullName.toLowerCase().replace(' ', '')}@inkandstamp.com
                </div>
                <div className="w-4" />
              </div>

              {/* Envelope workspace */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Meta Header */}
                <div className="space-y-2 pb-4 border-b border-white/5 text-xs font-sans text-white/40">
                  <div><span className="font-semibold text-white">To:</span> partner@lumina.co</div>
                  <div><span className="font-semibold text-white">Subject:</span> Partnership Agreement Handshake</div>
                </div>

                {/* Body Text */}
                <div className="space-y-3 font-sans text-sm text-white leading-relaxed font-light">
                  <p className="font-semibold text-white">Hi Alexander,</p>
                  <p className="text-white/60">
                    I wanted to confirm that the team has finalized the branding alignment, and we are ready to synchronize the logo elements on all footers. 
                    Attached is the verified email signature code structure.
                  </p>
                  <p className="text-white/40 italic">Warmest regards,</p>
                </div>

                {/* LIVE DYNAMIC SIGNATURE */}
                <div className="pt-6 border-t border-white/5 overflow-x-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">Live Preview</span>
                    <div className="flex bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden">
                      <button 
                        type="button" 
                        onClick={() => setPreviewTheme('light')} 
                        className={`px-3 py-1 text-[10px] font-bold uppercase transition-colors ${previewTheme === 'light' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                      >
                        Light
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setPreviewTheme('dark')} 
                        className={`px-3 py-1 text-[10px] font-bold uppercase transition-colors ${previewTheme === 'dark' ? 'bg-[#222] text-white' : 'text-white/40 hover:text-white'}`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>
                  <div className={`min-w-[320px] rounded-none border ${previewTheme === 'light' ? 'bg-white border-gray-200' : 'bg-[#121212] border-white/10'} p-2 relative transition-colors duration-300`}>
                    <div className="absolute top-2 right-2 text-[8px] font-mono bg-[#FF3E00]/10 border border-[#FF3E00]/25 text-[#FF3E00] px-1.5 py-0.5 rounded-none uppercase font-bold tracking-wider z-10">
                      Live Output
                    </div>
                    <div 
                      className={`transition-all duration-300 ${previewTheme === 'dark' ? 'dark-preview-filter' : ''}`}
                      dangerouslySetInnerHTML={{ __html: generateSignatureHTML(sig) }} 
                    />
                  </div>
                </div>

                {/* Guide helper alert */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-none p-4 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#FF3E00] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-white/40 space-y-1">
                    <div className="font-bold text-white uppercase tracking-wider text-[10px]">Dynamic Copy-Paste Ready</div>
                    <p className="leading-relaxed font-light">
                      This preview updates immediately based on changes. Copying the HTML automatically captures fully inline CSS, ensuring correct rendering on both mobile layouts and desktop screens.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Cropper Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="bg-[#111] border border-white/10 p-6 rounded-none w-full max-w-md flex flex-col items-center">
            <h3 className="text-white text-lg font-bold font-sans uppercase tracking-widest mb-4">Crop Image (1:1)</h3>
            <div className="relative w-full h-64 bg-black/50 mb-6 border border-white/10">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="w-full mb-6">
              <label className="text-[10px] font-mono text-white/40 uppercase mb-2 block">Zoom</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#FF3E00]"
              />
            </div>
            <div className="flex gap-4 w-full">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="flex-1 py-2.5 bg-transparent border border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-widest text-xs transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUploadCroppedImage}
                className="flex-1 py-2.5 bg-[#FF3E00] text-black hover:bg-[#e63800] font-black uppercase tracking-widest text-xs transition-colors"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Confirm & Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
