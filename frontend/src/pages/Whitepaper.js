import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFileAlt } from 'react-icons/fa';
import Logo from '../components/Logo';

const Whitepaper = () => {
  return (
    <WhitepaperContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <WhitepaperHeader>
          <Logo size="60px" color="#8B0000" />
          <h1>Technical Whitepaper</h1>
          <p>Deep dive into Devil's Coin technology and tokenomics</p>
        </WhitepaperHeader>
        
        <WhitepaperContent>
          <h2>📄 Devil's Coin Whitepaper</h2>
          <p>Our comprehensive technical whitepaper details the blockchain architecture, tokenomics, and roadmap for Devil's Coin.</p>
          <DownloadButton href="/docs/devils-coin-whitepaper.pdf" target="_blank">
            📥 Download Whitepaper (PDF)
          </DownloadButton>
        </WhitepaperContent>
      </motion.div>
    </WhitepaperContainer>
  );
};

const WhitepaperContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WhitepaperHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  svg {
    font-size: 4rem;
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const WhitepaperContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: 2rem;
  }
`;

const DownloadButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #8B0000, #FF4500);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.3);
  }
`;

export default Whitepaper;

