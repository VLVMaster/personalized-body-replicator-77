
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
          {/* Stylized VLR logo */}
          <defs>
            <linearGradient id="vlrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A4D76" />
              <stop offset="100%" stopColor="#742D56" />
            </linearGradient>
          </defs>
          
          {/* Stylized V shape */}
          <path
            d="M20,20 L50,70 L80,20"
            fill="none"
            stroke="url(#vlrGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* L shape */}
          <path
            d="M30,40 L30,75 L60,75"
            fill="none"
            stroke="url(#vlrGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* R shape */}
          <path
            d="M70,45 C85,45 85,60 70,60 L55,60 L70,75"
            fill="none"
            stroke="url(#vlrGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {withText && (
        <span className={`font-display font-bold ${
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        } text-transparent bg-clip-text bg-gradient-to-r from-vlv-purple to-vlv-burgundy`}>
          Vulva La Replica
        </span>
      )}
    </Link>
  );
};

export default Logo;
