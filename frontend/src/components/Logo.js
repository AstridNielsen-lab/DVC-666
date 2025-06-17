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
        {/* Círculo externo com brilho */}
        <circle
          cx="50"
          cy="50"
          r="47"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        
        {/* Pentagrama invertido - 2 pontas para cima */}
        <path
          d="M50 20 L38.8 35 L20 30 L32 45 L20 60 L38.8 55 L50 70 L61.2 55 L80 60 L68 45 L80 30 L61.2 35 Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          fillOpacity="0.9"
        />
        
        {/* Estrela invertida interna - mais definida */}
        <path
          d="M50 25 L42 40 L25 35 L37 47.5 L25 60 L42 55 L50 70 L58 55 L75 60 L63 47.5 L75 35 L58 40 Z"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.7"
        />
        
        {/* Centro da estrela */}
        <circle
          cx="50"
          cy="47.5"
          r="8"
          fill={color}
          opacity="0.8"
        />
        
        {/* Pontos de energia nas pontas superiores */}
        <circle cx="42" cy="40" r="2" fill={color} opacity="0.9" />
        <circle cx="58" cy="40" r="2" fill={color} opacity="0.9" />
        
        {/* Efeito de brilho interior */}
        <circle
          cx="50"
          cy="47.5"
          r="4"
          fill="#FF4500"
          opacity="0.6"
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
    filter: drop-shadow(0 0 15px rgba(139, 0, 0, 0.6)) 
            drop-shadow(0 0 30px rgba(255, 69, 0, 0.4));
    transition: all 0.5s ease;
    animation: glow 3s ease-in-out infinite alternate;
    
    &:hover {
      filter: drop-shadow(0 0 25px rgba(139, 0, 0, 0.9))
              drop-shadow(0 0 50px rgba(255, 69, 0, 0.7))
              drop-shadow(0 0 75px rgba(139, 0, 0, 0.5));
      transform: rotate(360deg) scale(1.1);
    }
  }
  
  @keyframes glow {
    from {
      filter: drop-shadow(0 0 15px rgba(139, 0, 0, 0.6)) 
              drop-shadow(0 0 30px rgba(255, 69, 0, 0.4));
    }
    to {
      filter: drop-shadow(0 0 20px rgba(139, 0, 0, 0.8)) 
              drop-shadow(0 0 40px rgba(255, 69, 0, 0.6))
              drop-shadow(0 0 60px rgba(139, 0, 0, 0.3));
    }
  }
`;

export default Logo;

