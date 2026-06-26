export interface UserProfile {
  fullName: string;
  email: string;
}

export type TemplateType = 'executive-modern' | 'stark-minimal' | 'editorial-portrait' | 'grid-brutalist' | 'type-heavy' | 'social-aligned' | 'premium-boxed';

export interface Signature {
  id: string;
  name: string; // Internal name of signature (e.g. "Primary Executive")
  fullName: string;
  jobTitle: string;
  companyName: string;
  phone: string;
  email: string;
  website: string;
  brandColor: string;
  logoUrl: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  templateId: TemplateType;
  status: 'Installed' | 'Draft';
  updatedAt: string;
  clicksCount: number;
}

export interface Metric {
  name: string;
  clicks: number;
  ctr: string;
}

export interface ClickTrendPoint {
  date: string;
  clicks: number;
}
