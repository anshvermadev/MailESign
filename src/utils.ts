import { Signature, TemplateType } from './types';

export const PRESET_AVATARS = [
  {
    id: 'avatar-1',
    name: 'Professional Male',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250&h=250',
  },
  {
    id: 'avatar-2',
    name: 'Professional Female',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250',
  },
  {
    id: 'avatar-3',
    name: 'Modern Executive',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250&h=250',
  },
  {
    id: 'avatar-4',
    name: 'Creative Specialist',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250&h=250',
  },
];

export const INITIAL_SIGNATURES: Signature[] = [
  {
    id: 'sig-1',
    name: 'Primary Executive',
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
    },
    templateId: 'premium-boxed',
    status: 'Installed',
    updatedAt: '2026-05-12',
    clicksCount: 845,
  },
];

export function getStoredSignatures(): Signature[] {
  const data = localStorage.getItem('inkstamp_signatures');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse signatures', e);
    }
  }
  return INITIAL_SIGNATURES;
}

export function setStoredSignatures(signatures: Signature[]) {
  localStorage.setItem('inkstamp_signatures', JSON.stringify(signatures));
}

export function generateSignatureHTML(sig: Signature): string {
  const brandColor = sig.brandColor || '#FF3E00';
  const logo = sig.logoUrl || 'https://via.placeholder.com/100';

  const formatUrl = (url?: string) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  // Build social links HTML elements
  const socialIconsHTML = Object.entries(sig.socials)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => {
      // Return inline styled small social icon links
      return `<a href="https://${value}" target="_blank" style="display:inline-block; margin: 0 4px; text-decoration:none; color: #5f5e5e; font-size:14px; font-family: sans-serif;">
        [${key.toUpperCase()}]
      </a>`;
    })
    .join('');

  switch (sig.templateId) {
    case 'executive-modern':
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; max-width: 500px; border: 1px solid #e5e2e1; padding: 16px; background-color: #ffffff;">
  <tr>
    <td valign="top" style="padding-right: 16px; border-right: 1px solid #e5e2e1; width: 40px; text-align: center;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding-bottom: 8px;">
            <span style="font-size: 14px; font-weight: bold; color: ${brandColor};">⚓</span>
          </td>
        </tr>
        <tr>
          <td align="center" style="font-size: 11px; font-family: monospace; color: #5f5e5e; line-height: 1.8;">
            ${sig.socials.linkedin ? `<a href="https://${sig.socials.linkedin}" style="text-decoration:none; color:#5f5e5e; font-weight:bold;">in</a><br/>` : ''}
            ${sig.socials.twitter ? `<a href="https://${sig.socials.twitter}" style="text-decoration:none; color:#5f5e5e; font-weight:bold;">tw</a><br/>` : ''}
            ${sig.socials.instagram ? `<a href="https://${sig.socials.instagram}" style="text-decoration:none; color:#5f5e5e; font-weight:bold;">ig</a>` : ''}
          </td>
        </tr>
      </table>
    </td>
    <td valign="top" style="padding-left: 16px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <div style="font-size: 14px; font-weight: bold; color: #5f5e5e; text-transform: uppercase; letter-spacing: 1px;">
              ${sig.companyName}
            </div>
            <div style="font-size: 18px; font-weight: bold; color: #1a1c1c; margin-top: 4px; margin-bottom: 2px;">
              ${sig.fullName} <span style="color: ${brandColor};">✔</span>
            </div>
            <div style="font-size: 14px; color: #5f5e5e; font-style: italic; margin-bottom: 8px;">
              ${sig.jobTitle}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 8px; border-top: 1px solid #f3f3f4; font-size: 12px; color: #656464; line-height: 1.5;">
            <div><b>T:</b> ${sig.phone}</div>
            <div><b>E:</b> <a href="mailto:${sig.email}" style="color: #1a1c1c; text-decoration: none;">${sig.email}</a></div>
            <div><b>W:</b> <a href="https://${sig.website}" style="color: #1a1c1c; text-decoration: none;">${sig.website}</a></div>
          </td>
        </tr>
      </table>
    </td>
    <td valign="middle" style="padding-left: 16px; text-align: center;">
      <img src="${logo}" alt="${sig.fullName}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 0; border: 1px solid #e5e2e1;" />
    </td>
  </tr>
</table>
      `.trim();

    case 'stark-minimal':
      return `
<div style="font-family: Arial, sans-serif; max-width: 450px; border-top: 2px solid ${brandColor}; border-bottom: 1px solid #e5e2e1; padding: 12px 0; background-color: #ffffff;">
  <div style="font-size: 16px; font-weight: bold; color: #1a1c1c;">${sig.fullName}</div>
  <div style="font-size: 12px; color: #5f5e5e; margin-bottom: 8px;">${sig.jobTitle} at <strong style="color: ${brandColor};">${sig.companyName}</strong></div>
  <div style="font-size: 12px; color: #656464; line-height: 1.4;">
    <span>${sig.phone}</span> | 
    <span><a href="mailto:${sig.email}" style="color: #1a1c1c; text-decoration: none;">${sig.email}</a></span> | 
    <span><a href="https://${sig.website}" style="color: #1a1c1c; text-decoration: none;">${sig.website}</a></span>
  </div>
</div>
      `.trim();

    case 'editorial-portrait':
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Georgia, serif; max-width: 480px; padding: 12px; background-color: #ffffff;">
  <tr>
    <td valign="top" style="padding-right: 16px;">
      <img src="${logo}" alt="${sig.fullName}" style="width: 70px; height: 70px; border-radius: 50%; border: 1px solid #e5e2e1; object-fit: cover;" />
    </td>
    <td valign="top" style="border-left: 1px solid #1a1c1c; padding-left: 16px;">
      <div style="font-size: 20px; font-weight: bold; color: #1a1c1c; font-style: italic;">${sig.fullName}</div>
      <div style="font-size: 13px; font-family: Arial, sans-serif; color: #5f5e5e; margin-top: 2px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
        ${sig.jobTitle} &bull; ${sig.companyName}
      </div>
      <div style="font-size: 11px; font-family: Courier, monospace; color: #656464; line-height: 1.5;">
        <div>t: ${sig.phone}</div>
        <div>e: <a href="mailto:${sig.email}" style="color: #1a1c1c; text-decoration: none;">${sig.email}</a></div>
        <div>w: <a href="https://${sig.website}" style="color: #1a1c1c; text-decoration: none;">${sig.website}</a></div>
      </div>
    </td>
  </tr>
</table>
      `.trim();

    case 'grid-brutalist':
      return `
<div style="font-family: monospace; max-width: 450px; border: 1px solid #1a1c1c; padding: 12px; background-color: #ffffff;">
  <div style="border-bottom: 1px solid #1a1c1c; padding-bottom: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 16px; font-weight: bold; color: #1a1c1c;">${sig.fullName.toUpperCase()}</span>
    <span style="background-color: ${brandColor}; color: #ffffff; padding: 2px 6px; font-size: 10px;">PRO</span>
  </div>
  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; font-size: 12px;">
    <tr>
      <td style="padding: 4px 0; color: #5f5e5e; width: 80px;">ROLE:</td>
      <td style="padding: 4px 0; color: #1a1c1c;">${sig.jobTitle}</td>
    </tr>
    <tr>
      <td style="padding: 4px 0; color: #5f5e5e;">CORP:</td>
      <td style="padding: 4px 0; color: #1a1c1c;">${sig.companyName}</td>
    </tr>
    <tr>
      <td style="padding: 4px 0; color: #5f5e5e;">PHONE:</td>
      <td style="padding: 4px 0; color: #1a1c1c;">${sig.phone}</td>
    </tr>
    <tr>
      <td style="padding: 4px 0; color: #5f5e5e;">EMAIL:</td>
      <td style="padding: 4px 0; color: #1a1c1c;"><a href="mailto:${sig.email}" style="color: #1a1c1c; text-decoration: none;">${sig.email}</a></td>
    </tr>
    <tr>
      <td style="padding: 4px 0; color: #5f5e5e;">WEB:</td>
      <td style="padding: 4px 0; color: #1a1c1c;"><a href="https://${sig.website}" style="color: #1a1c1c; text-decoration: none;">${sig.website}</a></td>
    </tr>
  </table>
</div>
      `.trim();

    case 'type-heavy':
      return `
<div style="font-family: Georgia, serif; max-width: 450px; background-color: #ffffff; padding: 10px 0;">
  <div style="font-size: 24px; font-weight: bold; color: #1a1c1c; line-height: 1.1; margin-bottom: 4px;">${sig.fullName}</div>
  <div style="font-size: 13px; font-family: monospace; letter-spacing: 1px; color: ${brandColor}; text-transform: uppercase; margin-bottom: 12px;">
    ${sig.jobTitle} // ${sig.companyName}
  </div>
  <div style="border-left: 2px solid #5f5e5e; padding-left: 12px; font-size: 12px; font-family: monospace; color: #5f5e5e; line-height: 1.6;">
    <div>TEL: ${sig.phone}</div>
    <div>EML: <a href="mailto:${sig.email}" style="color: #1a1c1c; text-decoration: none;">${sig.email}</a></div>
    <div>WWW: <a href="https://${sig.website}" style="color: #1a1c1c; text-decoration: none;">${sig.website}</a></div>
  </div>
</div>
      `.trim();

    case 'social-aligned':
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; max-width: 480px; padding: 12px 0; background-color: #ffffff; border-bottom: 1px solid #e5e2e1;">
  <tr>
    <td valign="top">
      <div style="font-size: 16px; font-weight: bold; color: #1a1c1c; margin-bottom: 2px;">${sig.fullName}</div>
      <div style="font-size: 12px; color: #5f5e5e;">${sig.jobTitle} &bull; ${sig.companyName}</div>
      <div style="font-size: 11px; color: #656464; margin-top: 6px;">
        <span>${sig.phone}</span> | <span>${sig.email}</span>
      </div>
    </td>
    <td valign="bottom" align="right" style="padding-left: 16px; width: 140px;">
      <div style="font-size: 11px; font-family: monospace; color: #5f5e5e; margin-bottom: 4px;">CONNECT:</div>
      <div>
        ${sig.socials.linkedin ? `<a href="https://${sig.socials.linkedin}" style="display:inline-block; margin-left: 6px; text-decoration:none; color:${brandColor}; font-weight:bold; font-size:12px;">LN</a>` : ''}
        ${sig.socials.twitter ? `<a href="https://${sig.socials.twitter}" style="display:inline-block; margin-left: 6px; text-decoration:none; color:${brandColor}; font-weight:bold; font-size:12px;">TW</a>` : ''}
        ${sig.socials.instagram ? `<a href="https://${sig.socials.instagram}" style="display:inline-block; margin-left: 6px; text-decoration:none; color:${brandColor}; font-weight:bold; font-size:12px;">IG</a>` : ''}
      </div>
    </td>
  </tr>
</table>
      `.trim();

    case 'premium-boxed': {
      // Build social icons row - includes website as first icon
      const socialIconCells: string[] = [];
      
      if (sig.website) {
        socialIconCells.push(`<td class="layout-web-icon sicon" style="padding:0 4px 0 0"><a href="${formatUrl(sig.website)}" target="_blank"><img alt="" src="https://image.customesignature.com/images/static/images/social/static/1/web-icon.png" width="32"></a></td>`);
      }
      if (sig.socials.instagram) {
        socialIconCells.push(`<td class="layout-insta-icon sicon" style="padding:0 4px 0 0"><a href="${formatUrl(sig.socials.instagram)}" target="_blank"><img alt="" src="https://image.customesignature.com/images/static/images/social/static/1/insta-icon.png" width="32"></a></td>`);
      }
      if (sig.socials.linkedin) {
        socialIconCells.push(`<td class="layout-linkedin-icon sicon" style="padding:0 4px 0 0"><a href="${formatUrl(sig.socials.linkedin)}" target="_blank"><img alt="" src="https://image.customesignature.com/images/static/images/social/static/1/linkedin-icon.png" width="32"></a></td>`);
      }
      if (sig.socials.facebook) {
        socialIconCells.push(`<td class="layout-facebook-icon sicon" style="padding:0 4px 0 0"><a href="${formatUrl(sig.socials.facebook)}" target="_blank"><img alt="" src="https://image.customesignature.com/images/static/images/social/static/1/facebook-icon.png" width="32"></a></td>`);
      }
      if (sig.socials.youtube) {
        socialIconCells.push(`<td class="layout-youtube-icon sicon" style="padding:0 4px 0 0"><a href="${formatUrl(sig.socials.youtube)}" target="_blank"><img alt="" src="https://image.customesignature.com/images/static/images/social/static/1/youtube-icon.png" width="32"></a></td>`);
      }
      if (sig.socials.twitter) {
        socialIconCells.push(`<td class="layout-twitter-icon sicon" style="padding:0 4px 0 0"><a href="${formatUrl(sig.socials.twitter)}" target="_blank"><img alt="" src="https://image.customesignature.com/images/static/images/social/static/1/twitter-icon.png" width="32"></a></td>`);
      }

      const hasSocialIcons = socialIconCells.length > 0;
      let socialsRowHTML = '';
      if (hasSocialIcons) {
        socialsRowHTML = `<tr><td valign="top" align="left" class="layout_border layout_socialicon_border" style="border-collapse:separate; border-radius:5px; border-width: 1px; border-color:#e2e2e2; border-style: solid; padding:8px; display: compact;"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr>${socialIconCells.join('')}</tr></tbody></table></td></tr>`;
      }

      let leftCellHTML = '';
      let rightCellHTML = '';

      if (sig.logoUrl) {
        leftCellHTML = `<td align="left" valign="middle" style="padding:0 15px 0 0;"><a href="${formatUrl(sig.website)}" id="layout_link"><img class="layout_logo" src="${logo}" width="120" style="display:block;"></a></td>`;
        rightCellHTML = `<td align="left" valign="middle" class="layout_divider" style="border-collapse:collapse; border-left-width:1px; border-left-color:#e2e2e2; border-left-style: solid; padding:0 0 0 15px;"><table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:separate;"><tbody><tr><td style="border-collapse: collapse; padding-bottom:10px;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="left" valign="middle" nowrap=""> <span class="layout_firstname" style="font-weight:bold; font-style:normal; color:#000000; font-size:16px;">${sig.fullName.toUpperCase()}</span> </td></tr><tr><td style="border-collapse: collapse; padding-bottom: 5px;" nowrap=""> <span class="layout_jobtitle" style="font-weight:normal; font-style:normal; color:#000000; font-size:12px;">${sig.jobTitle}</span></td></tr><tr><td style="border-collapse: collapse;"> <span class="layout_company" style="font-weight:bold; font-style:normal; color:#000000; font-size:12px;">${sig.companyName}</span></td></tr><tr><td style="border-collapse: collapse;" nowrap="">  <a href="tel:${sig.phone.replace(/[^+\d]/g, '')}" class="layout_phone_label1 label" style="text-decoration: none;font-weight:bold; font-style:normal; color:#000000; font-size:12px;"><span class="layout_phone1" style="font-weight:normal; font-style:normal; color:#000000; font-size:12px;">${sig.phone}</span></a></td></tr><tr><td style="border-collapse: collapse;" nowrap="">  <a href="mailto:${sig.email}" class="layout_email_label1 label" style="text-decoration: none;font-weight:bold; font-style:normal; color:#000000; font-size:12px;"><span class="layout_email1" style="font-weight:normal; font-style:normal; color:#000000; font-size:12px;">${sig.email}</span></a></td></tr></tbody></table></td></tr>${socialsRowHTML}<tr><td style="border-collapse:collapse;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tbody><tr></tr></tbody></table></td></tr></tbody></table></td>`;
      } else {
        leftCellHTML = `<td align="left" valign="middle" style="padding:0 15px 0 0;"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding:0; border-collapse: collapse;"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="left" valign="middle" nowrap=""> <span class="layout_firstname" style="font-weight:bold; font-style:normal; color:#000000; font-size:16px;">${sig.fullName.toUpperCase()}</span> </td></tr></tbody></table></td></tr><tr><td style="border-collapse: collapse;" nowrap=""> <span class="layout_jobtitle" style="font-weight:normal; font-style:normal; color:#000000; font-size:12px;">${sig.jobTitle}</span></td></tr></tbody></table></td>`;
        rightCellHTML = `<td align="left" valign="middle" class="layout_divider" style="border-collapse:collapse; border-left-width:1px; border-left-color:#e2e2e2; border-left-style: solid; padding:0 0 0 15px;"><table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:separate;"><tbody><tr><td style="border-collapse: collapse; padding-bottom:10px;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="border-collapse: collapse;"> <span class="layout_company" style="font-weight:bold; font-style:normal; color:#000000; font-size:12px;">${sig.companyName}</span></td></tr><tr><td style="border-collapse: collapse;" nowrap="">  <a href="tel:${sig.phone.replace(/[^+\d]/g, '')}" class="layout_phone_label1 label" style="text-decoration: none;font-weight:bold; font-style:normal; color:#000000; font-size:12px;"><span class="layout_phone1" style="font-weight:normal; font-style:normal; color:#000000; font-size:12px;">${sig.phone}</span></a></td></tr><tr><td style="border-collapse: collapse;" nowrap="">  <a href="mailto:${sig.email}" class="layout_email_label1 label" style="text-decoration: none;font-weight:bold; font-style:normal; color:#000000; font-size:12px;"><span class="layout_email1" style="font-weight:normal; font-style:normal; color:#000000; font-size:12px;">${sig.email}</span></a></td></tr></tbody></table></td></tr>${socialsRowHTML}<tr><td style="border-collapse:collapse;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tbody><tr></tr></tbody></table></td></tr></tbody></table></td>`;
      }

      return `<table class="signature_tbl" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:10px;font-family:Inter,sans-serif;"><tbody><tr><td class="layout_maintd" style="line-height:16px;font-family:Inter, sans-serif; border-collapse:collapse;"><table cellpadding="0" cellspacing="0" style="border-collapse: separate"><tbody><tr><td valign="top" align="left" class="layout_border" style="border-collapse:collapse; padding:25px;border-width: 1px; border-color:#e2e2e2; border-style: solid;border-radius:5px;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr>${leftCellHTML}${rightCellHTML}</tr></tbody></table></td></tr> <tr><td align="left" valign="top"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr>    </tr></tbody></table></td></tr><tr></tr></tbody></table></td></tr></tbody></table>`;
    }

    default:
      return `<div><strong>${sig.fullName}</strong><br>${sig.jobTitle} at ${sig.companyName}</div>`;
  }
}
