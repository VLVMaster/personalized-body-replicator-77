
import React from 'react';

const VLogo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-2xl font-bold text-vlv-purple">Vulva La Replica</span>
    </div>
  );
};

export default VLogo;
