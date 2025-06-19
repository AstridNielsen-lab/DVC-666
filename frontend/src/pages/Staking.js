import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';

const Staking = () => {
  return (
    <StakingContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <StakingHeader>
          <FaCoins />
          <h1>DVC666 Staking - 1ª Chave</h1>
          <p>Earn 6.66% APY by staking your Devil's Coin tokens</p>
          <PhaseInfo>
            🔑 <strong>Primeira Chave Desbloqueada</strong> - Indulgência sobre Abstinência
          </PhaseInfo>
        </StakingHeader>
        
        <StakingContent>
          <h2>🔥 Staking Features</h2>
          <ul>
            <li><strong>APY:</strong> 6.66% annual percentage yield</li>
            <li><strong>Lock Period:</strong> 30 days minimum</li>
            <li><strong>Rewards:</strong> Paid daily</li>
            <li><strong>Auto-compound:</strong> Available</li>
          </ul>
        </StakingContent>
      </motion.div>
    </StakingContainer>
  );
};

const StakingContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StakingHeader = styled.div`
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

const PhaseInfo = styled.div`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  margin: 1rem 0;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(255, 69, 0, 0.2));
  border: 1px solid rgba(139, 0, 0, 0.5);
  border-radius: 25px;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;

const StakingContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 2rem;
    text-align: center;
  }
  
  ul {
    li {
      margin-bottom: 1rem;
      color: ${props => props.theme.colors.text.secondary};
      
      strong {
        color: ${props => props.theme.colors.text.primary};
      }
    }
  }
`;

export default Staking;

