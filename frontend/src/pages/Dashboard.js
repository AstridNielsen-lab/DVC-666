import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <DashboardHeader>
          <FaChartLine />
          <h1>Dashboard</h1>
          <p>Connect your wallet to view your DVC portfolio</p>
        </DashboardHeader>
        
        <DashboardContent>
          <h2>📊 Portfolio Overview</h2>
          <p>Please connect your wallet to view your holdings and staking rewards.</p>
        </DashboardContent>
      </motion.div>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DashboardHeader = styled.div`
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

const DashboardContent = styled.div`
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
  }
`;

export default Dashboard;

