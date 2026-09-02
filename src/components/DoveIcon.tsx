import React from 'react';
import CustomIcon from './CustomIcon';

export interface DoveIconProps {
  size?: number;
  className?: string;
  variant?: 'default' | 'white' | 'circle' | 'purple' | 'hover-white' | 'hover-dark' | 'hover-purple';
}

export const DoveIcon: React.FC<DoveIconProps> = ({ size = 20, className = "", variant = 'default' }: DoveIconProps) => {
  return <CustomIcon size={size} className={className} variant={variant} />;
};

export default DoveIcon;

