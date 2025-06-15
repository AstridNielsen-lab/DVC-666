import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFire, FaRocket } from 'react-icons/fa';

const Presale = () => {
  return (
    <PresaleContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <PresaleHeader>
          <FaFire />
          <h1>Devil's Coin Presale</h1>
          <p>Join the revolution and get DVC tokens at the best price!</p>
        </PresaleHeader>
        
        <PresaleContent>
          <PresaleCard>
            <h2>🔥 Presale Details</h2>
            <ul>
              <li><strong>Price:</strong> $0.0001 per DVC</li>
              <li><strong>Min Purchase:</strong> 0.01 ETH</li>
              <li><strong>Max Purchase:</strong> 10 ETH</li>
              <li><strong>Total Supply:</strong> 13,333,333 DVC (20%)</li>
              <li><strong>Status:</strong> Coming Soon</li>
            </ul>
            
            <PresaleButton disabled>
              <FaRocket /> Presale Starting Soon
            </PresaleButton>
          </PresaleCard>
        </PresaleContent>
      </motion.div>
    </PresaleContainer>
  );
};

const PresaleContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PresaleHeader = styled.div`
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

const PresaleContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const PresaleCard = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 2rem;
  }
  
  ul {
    text-align: left;
    margin-bottom: 2rem;
    
    li {
      margin-bottom: 1rem;
      color: ${props => props.theme.colors.text.secondary};
      
      strong {
        color: ${props => props.theme.colors.text.primary};
      }
    }
  }
`;

const PresaleButton = styled.button`
  background: linear-gradient(135deg, #8B0000, #FF4500);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

export default Presale;

