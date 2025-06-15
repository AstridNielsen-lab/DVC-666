import React from 'react';
import styled from 'styled-components';

const Logo = ({ size = '40px', color = '#8B0000' }) => {
  return (
    <LogoContainer size={size}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Círculo externo */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        
        {/* Pentagrama invertido */}
        <path
          d="M50 15 L35.8 38.2 L15 30.9 L34.5 50 L15 69.1 L35.8 61.8 L50 85 L64.2 61.8 L85 69.1 L65.5 50 L85 30.9 L64.2 38.2 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />
        
        {/* Pentágono interno */}
        <path
          d="M50 38.2 L42.9 50 L50 61.8 L57.1 50 Z"
          fill="#000"
        />
      </svg>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  svg {
    filter: drop-shadow(0 0 10px rgba(139, 0, 0, 0.5));
    transition: all 0.3s ease;
    
    &:hover {
      filter: drop-shadow(0 0 20px rgba(139, 0, 0, 0.8));
      transform: rotate(180deg);
    }
  }
`;

export default Logo;

