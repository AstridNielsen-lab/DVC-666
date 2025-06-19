import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaWallet, FaPlus, FaSync, FaChartLine, FaExchangeAlt, FaShieldAlt } from 'react-icons/fa';
import WalletDashboard from '../components/WalletDashboard';
import WalletConnector from '../components/WalletConnector';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';

const Wallet = () => {
  const [isWalletConnectorOpen, setIsWalletConnectorOpen] = useState(false);
  const [connectedWallets, setConnectedWallets] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioChange, setPortfolioChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simular atualizações de portfólio
  useEffect(() => {
    const interval = setInterval(() => {
      const baseValue = 12450.67;
      const volatility = 500;
      const change = (Math.random() - 0.5) * volatility;
      const newValue = Math.max(0, baseValue + change);
      const changePercent = (change / baseValue) * 100;
      
      setPortfolioValue(newValue);
      setPortfolioChange(changePercent);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAddWallet = () => {
    setIsWalletConnectorOpen(true);
  };

  const handleWalletConnect = (address, chainId) => {
    if (address) {
      const newWallet = {
        id: `wallet-${Date.now()}`,
        address,
        chainId,
        type: 'MetaMask', // Detectar tipo real
        name: `Carteira ${connectedWallets.length + 1}`,
        connectedAt: new Date().toISOString(),
        balance: {
          ETH: (Math.random() * 5).toFixed(4),
          DVC666: Math.floor(Math.random() * 50000),
          USDT: (Math.random() * 2000).toFixed(2)
        }
      };
      setConnectedWallets(prev => [...prev, newWallet]);
      setIsWalletConnectorOpen(false);
      toast.success(`Carteira ${newWallet.name} conectada com sucesso!`);
    }
  };

  const handleRemoveWallet = (walletId) => {
    setConnectedWallets(prev => prev.filter(w => w.id !== walletId));
    toast.success('Carteira removida com sucesso!');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Carregando suas carteiras...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <WalletContainer>
      {/* Header da Página */}
      <WalletHeader>
        <HeaderContent>
          <LogoSection>
            <Logo size="60px" color="#8B0000" />
            <HeaderInfo>
              <PageTitle>Gerenciador de Carteiras</PageTitle>
              <PageSubtitle>Controle total dos seus ativos DVC666</PageSubtitle>
            </HeaderInfo>
          </LogoSection>
          
          <PortfolioSummary>
            <PortfolioValue>
              {formatCurrency(portfolioValue)}
              <PortfolioChange positive={portfolioChange >= 0}>
                {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
              </PortfolioChange>
            </PortfolioValue>
            <PortfolioLabel>Valor Total do Portfólio</PortfolioLabel>
          </PortfolioSummary>
        </HeaderContent>

        {/* Quick Stats */}
        <QuickStats>
          <StatCard>
            <StatIcon><FaWallet /></StatIcon>
            <StatInfo>
              <StatValue>{connectedWallets.length}</StatValue>
              <StatLabel>Carteiras Conectadas</StatLabel>
            </StatInfo>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaShieldAlt /></StatIcon>
            <StatInfo>
              <StatValue>{connectedWallets.filter(w => w.type === 'MetaMask').length}</StatValue>
              <StatLabel>Carteiras Seguras</StatLabel>
            </StatInfo>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaChartLine /></StatIcon>
            <StatInfo>
              <StatValue>+12.34%</StatValue>
              <StatLabel>Performance 7d</StatLabel>
            </StatInfo>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaExchangeAlt /></StatIcon>
            <StatInfo>
              <StatValue>24</StatValue>
              <StatLabel>Transações Hoje</StatLabel>
            </StatInfo>
          </StatCard>
        </QuickStats>
      </WalletHeader>

      {/* Action Bar */}
      <ActionBar>
        <ActionSection>
          <ActionButton primary onClick={handleAddWallet}>
            <FaPlus /> Conectar Nova Carteira
          </ActionButton>
          <ActionButton onClick={() => window.location.reload()}>
            <FaSync /> Atualizar Saldos
          </ActionButton>
        </ActionSection>
        
        <SecurityBadge>
          <FaShieldAlt /> Conexão Segura SSL
        </SecurityBadge>
      </ActionBar>

      {/* Dashboard Principal */}
      <WalletContent>
        <WalletDashboard 
          connectedWallets={connectedWallets}
          onAddWallet={handleAddWallet}
          onRemoveWallet={handleRemoveWallet}
        />
      </WalletContent>

      {/* Modal de Conexão */}
      <WalletConnector 
        isOpen={isWalletConnectorOpen}
        onClose={() => setIsWalletConnectorOpen(false)}
        onConnect={handleWalletConnect}
      />

      {/* Footer Informativo */}
      <WalletFooter>
        <FooterContent>
          <FooterSection>
            <FooterTitle>🔒 Segurança</FooterTitle>
            <FooterText>Suas chaves privadas nunca saem do seu dispositivo</FooterText>
          </FooterSection>
          <FooterSection>
            <FooterTitle>⚡ Performance</FooterTitle>
            <FooterText>Atualizações em tempo real via blockchain</FooterText>
          </FooterSection>
          <FooterSection>
            <FooterTitle>🌐 Multi-Chain</FooterTitle>
            <FooterText>Suporte para Ethereum, BSC, Polygon e mais</FooterText>
          </FooterSection>
        </FooterContent>
      </WalletFooter>
    </WalletContainer>
  );
};

// Styled Components
const WalletContainer = styled.div`
  min-height: 100vh;
  padding: 90px 20px 20px;
  background: linear-gradient(135deg, 
    rgba(10, 10, 10, 0.95) 0%, 
    rgba(26, 26, 26, 0.95) 50%,
    rgba(42, 42, 42, 0.95) 100%
  );
  color: #fff;
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    rgba(10, 10, 10, 0.95) 0%, 
    rgba(26, 26, 26, 0.95) 50%,
    rgba(42, 42, 42, 0.95) 100%
  );
  color: #fff;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(139, 0, 0, 0.3);
  border-top: 4px solid #FF4500;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: #ccc;
  font-weight: 500;
`;

const WalletHeader = styled(motion.div).attrs({
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
})`
  max-width: 1400px;
  margin: 0 auto 2rem;
  background: rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 20px;
  padding: 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #FF4500;
  margin: 0;
  text-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  margin: 0;
  font-weight: 400;
`;

const PortfolioSummary = styled.div`
  text-align: right;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const PortfolioValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    font-size: 2.5rem;
  }
`;

const PortfolioChange = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.positive ? '#00FF88' : '#FF4444'};
  background: ${props => props.positive ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)'};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  border: 1px solid ${props => props.positive ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 68, 68, 0.3)'};
`;

const PortfolioLabel = styled.div`
  font-size: 1rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 0, 0, 0.1);
    border-color: #FF4500;
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: #FF4500;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.2rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionBar = styled.div`
  max-width: 1400px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 15px;
  padding: 1rem 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #8B0000, #FF4500)' : 
    'rgba(139, 0, 0, 0.1)'
  };
  border: 1px solid ${props => props.primary ? '#FF4500' : 'rgba(139, 0, 0, 0.3)'};
  color: #fff;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #8B0000, #FF4500);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3);
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00FF88;
  font-size: 0.9rem;
  font-weight: 600;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
  padding: 0.5rem 1rem;
`;

const WalletContent = styled(motion.div).attrs({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
})`
  max-width: 1400px;
  margin: 0 auto;
`;

const WalletFooter = styled.div`
  max-width: 1400px;
  margin: 3rem auto 0;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 15px;
  padding: 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  text-align: center;
`;

const FooterTitle = styled.h3`
  color: #FF4500;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const FooterText = styled.p`
  color: #ccc;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

export default Wallet;

