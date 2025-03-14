
import React from 'react';

interface VLogoProps {
  className?: string;
  size?: number;
}

const VLogo: React.FC<VLogoProps> = ({ className, size = 24 }) => {
  return (
    <div 
      className={`flex items-center justify-center font-bold ${className}`}
      style={{ 
        width: size, 
        height: size,
        color: '#9b87f5', // Primary purple color
      }}
    >
      <span className="text-vlv-purple" style={{ fontSize: size * 0.75 }}>V</span>
    </div>
  );
};

export default VLogo;
