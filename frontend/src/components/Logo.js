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
        {/* Círculo externo com brilho infernal */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          opacity="0.9"
        />
        
        {/* Pentagrama invertido - estrela de 5 pontas com 2 pontas para cima */}
        <path
          d="M50 15 L42.4 35.2 L18.1 35.2 L37.6 49.6 L30 69.8 L50 55.4 L70 69.8 L62.4 49.6 L81.9 35.2 L57.6 35.2 Z"
          fill={color}
          stroke={color}
          strokeWidth="1.8"
          fillOpacity="0.95"
        />
        
        {/* Contorno interno da estrela invertida */}
        <path
          d="M50 22 L44.8 37.5 L26.8 37.5 L41.0 48.0 L35.8 63.5 L50 53.0 L64.2 63.5 L59.0 48.0 L73.2 37.5 L55.2 37.5 Z"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          opacity="0.8"
        />
        
        {/* Centro da estrela com símbolo do mal */}
        <circle
          cx="50"
          cy="48"
          r="6"
          fill={color}
          opacity="0.9"
        />
        
        {/* Pontos de energia nas 5 pontas */}
        <circle cx="50" cy="15" r="2.5" fill="#FF4500" opacity="0.9" /> {/* Ponta superior */}
        <circle cx="30" cy="69.8" r="2.5" fill="#FF4500" opacity="0.9" /> {/* Ponta inferior esquerda */}
        <circle cx="70" cy="69.8" r="2.5" fill="#FF4500" opacity="0.9" /> {/* Ponta inferior direita */}
        <circle cx="18.1" cy="35.2" r="2.5" fill="#FF4500" opacity="0.9" /> {/* Ponta esquerda */}
        <circle cx="81.9" cy="35.2" r="2.5" fill="#FF4500" opacity="0.9" /> {/* Ponta direita */}
        
        {/* Efeito de brilho interior diabólico */}
        <circle
          cx="50"
          cy="48"
          r="3"
          fill="#FF6600"
          opacity="0.7"
        />
        
        {/* Pequeno núcleo central */}
        <circle
          cx="50"
          cy="48"
          r="1.5"
          fill="#FFFF00"
          opacity="0.8"
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

