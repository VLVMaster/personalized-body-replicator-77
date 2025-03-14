
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo = ({ className = '', size = 'md', withText = true }: LogoProps) => {
  // Set size dimensions
  const dimensions = {
    sm: { logo: 30, spacing: 1 },
    md: { logo: 36, spacing: 2 },
    lg: { logo: 48, spacing: 3 },
  }[size];

  return (
    <Link 
      to="/"
      className={`flex items-center gap-${dimensions.spacing} ${className}`}
    >
      <div className="relative flex-shrink-0" style={{ 
        width: `${dimensions.logo}px`, 
        height: `${dimensions.logo}px` 
      }}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Geometric VLR logo with overlapping shapes */}
          <defs>
            <linearGradient id="vlrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A4D76" />
              <stop offset="100%" stopColor="#742D56" />
            </linearGradient>
          </defs>
          
          {/* V - Triangle */}
          <polygon 
            points="15,75 35,25 55,75" 
            fill="url(#vlrGradient)" 
            opacity="0.9"
          />
          
          {/* L - Rectangle and square */}
          <rect 
            x="30" 
            y="25" 
            width="15" 
            height="50" 
            fill="url(#vlrGradient)" 
            opacity="0.9"
          />
          <rect 
            x="30" 
            y="60" 
            width="35" 
            height="15" 
            fill="url(#vlrGradient)" 
            opacity="0.9"
          />
          
          {/* R - Combined shapes */}
          <rect 
            x="55" 
            y="25" 
            width="15" 
            height="50" 
            fill="url(#vlrGradient)" 
            opacity="0.9"
          />
          <circle 
            cx="70" 
            cy="35" 
            r="15" 
            fill="url(#vlrGradient)" 
            opacity="0.8"
          />
          <polygon 
            points="70,45 85,75 70,75" 
            fill="url(#vlrGradient)" 
            opacity="0.9"
          />
        </svg>
      </div>
      
      {withText && (
        <span className={`font-display font-bold ${
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        } text-transparent bg-clip-text bg-gradient-to-r from-vlr-purple to-vlr-burgundy`}>
          Vulva La Replica
        </span>
      )}
    </Link>
  );
};

export default Logo;
