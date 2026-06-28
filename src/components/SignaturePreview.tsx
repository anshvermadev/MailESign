import React from 'react';
import { Signature } from '../types';
import { generateSignatureHTML } from '../utils';

interface SignaturePreviewProps {
  signature: Signature;
  className?: string;
}

export default function SignaturePreview({ signature, className = '' }: SignaturePreviewProps) {
  return (
    <div className={`p-6 overflow-x-auto min-h-[140px] flex items-center bg-white ${className}`}>
      <div 
        className="w-full scale-90 origin-left max-w-full"
        dangerouslySetInnerHTML={{ __html: generateSignatureHTML(signature) }} 
      />
    </div>
  );
}
