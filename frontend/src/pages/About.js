import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const About = () => {
  return (
    <AboutContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AboutHeader>
          <Logo size="60px" color="#8B0000" />
          <h1>About Devil's Coin</h1>
          <p>Learn more about our project and mission</p>
        </AboutHeader>
        
        <AboutContent>
          <Section>
            <h2>🔥 Our Mission</h2>
            <p>Devil's Coin aims to revolutionize the cryptocurrency space with innovative blockchain technology and sustainable tokenomics.</p>
          </Section>
          
          <Section>
            <h2>⚡ Technology</h2>
            <p>Built on a custom Proof-of-Stake blockchain with 13-second block times and energy-efficient consensus mechanisms.</p>
          </Section>
          
          <Section>
            <h2>👥 Community</h2>
            <p>Join our growing community of developers, investors, and blockchain enthusiasts working together to shape the future of DeFi.</p>
          </Section>
        </AboutContent>
      </motion.div>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
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

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
`;

const Section = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

export default About;

