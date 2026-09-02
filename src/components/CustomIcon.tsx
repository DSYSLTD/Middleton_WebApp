import React from 'react';
import { DOVE_ICON } from '../constants/assets';

export interface CustomIconProps {
  size?: number;
  className?: string;
  variant?: 'default' | 'white' | 'circle' | 'purple' | 'hover-white' | 'hover-dark' | 'hover-purple';
}

export default function CustomIcon({ size = 20, className = "", variant = 'default' }: CustomIconProps) {
  if (variant === 'circle') {
    return (
      <div 
        className={`inline-flex items-center justify-center rounded-full bg-white shadow-sm shrink-0 transition-all ${className}`}
        style={{ width: size * 1.6, height: size * 1.6 }}
      >
        <img 
          src={DOVE_ICON} 
          alt="Middleton Dove Symbol" 
          style={{ width: size, height: size }}
          className="object-contain transition-all hover:brightness-0 hover:invert"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  let filterStyle: string | undefined = undefined;
  let filterClasses = "transition-all duration-300";

  if (variant === 'white') {
    filterStyle = 'brightness(0) invert(1)';
  } else if (variant === 'hover-white') {
    filterClasses += " group-hover:brightness-0 group-hover:invert hover:brightness-0 hover:invert";
  } else if (variant === 'hover-dark' || variant === 'hover-purple') {
    filterClasses += " brightness-0 invert group-hover:brightness-100 group-hover:invert-0 hover:brightness-100 hover:invert-0";
  }

  return (
    <img 
      src={DOVE_ICON} 
      alt="Middleton Dove Symbol" 
      style={{ 
        width: size, 
        height: size,
        filter: filterStyle
      }}
      className={`object-contain inline-block shrink-0 ${filterClasses} ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}

