import React from 'react';

interface TikTokIconProps {
  size?: number;
  className?: string;
}

export default function TikTokIcon({ size = 18, className = '' }: TikTokIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.892 2.897 2.897 0 0 1-2.895-2.892 2.896 2.896 0 0 1 2.895-2.892c.254 0 .498.035.731.098V9.399a6.327 6.327 0 0 0-.731-.044 6.338 6.338 0 0 0-6.336 6.336 6.338 6.338 0 0 0 6.336 6.336 6.338 6.338 0 0 0 6.336-6.336V8.423a8.187 8.187 0 0 0 4.78 1.517V6.495a4.787 4.787 0 0 1-1.002-.191z"/>
    </svg>
  );
}
