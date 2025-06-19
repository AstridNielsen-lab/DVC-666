import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaWallet } from 'react-icons/fa';
import Logo from './Logo';
import WalletConnector from './WalletConnector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [currentNetwork, setCurrentNetwork] = useState(null);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/presale', label: 'Presale', icon: '🔥' },
    { path: '/staking', label: 'Staking', icon: '🥩' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/whitepaper', label: 'Whitepaper', icon: '📄' },
    { path: '/about', label: 'About', icon: 'ℹ️' }
  ];

  const handleWalletConnect = (address, chainId) => {
    if (address) {
      setIsConnected(true);
      setWalletAddress(address);
      setCurrentNetwork(chainId);
      setWalletModalOpen(false);
    } else {
      setIsConnected(false);
      setWalletAddress('');
      setCurrentNetwork(null);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId) => {
    const networks = {
      '0x1': 'Ethereum',
      '0x38': 'BSC',
      '0x89': 'Polygon',
      '0xa4b1': 'Arbitrum'
    };
    return networks[chainId] || 'Unknown';
  };

  return (
    <NavContainer>
      <NavContent>
        <LogoContainer as={Link} to="/">
          <Logo size="40px" color="#8B0000" />
          <LogoText>
            DVC666 Coin
            <LogoSubtext>DVC666</LogoSubtext>
          </LogoText>
        </LogoContainer>

        <NavItems isOpen={isOpen}>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              as={Link}
              to={item.path}
              active={location.pathname === item.path}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavItem>
          ))}
        </NavItems>

        <NavActions>
          {isConnected ? (
            <WalletInfo onClick={() => setWalletModalOpen(true)}>
              <FaWallet />
              <WalletDetails>
                <WalletAddress>{formatAddress(walletAddress)}</WalletAddress>
                <NetworkBadge>{getNetworkName(currentNetwork)}</NetworkBadge>
              </WalletDetails>
            </WalletInfo>
          ) : (
            <ConnectButton onClick={() => setWalletModalOpen(true)}>
              <FaWallet />
              Conectar Carteira
            </ConnectButton>
          )}

          <MobileMenuButton
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavActions>
      </NavContent>

      <WalletConnector
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />

      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.sticky};
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border.primary};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    text-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const LogoSubtext = styled.span`
  font-size: 0.7em;
  color: ${props => props.theme.colors.secondary};
  font-weight: 500;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(26, 26, 26, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    border-bottom: 1px solid ${props => props.theme.colors.border.primary};
  }
`;

const NavItem = styled(motion.a)`
  color: ${props => props.active ? 
    props.theme.colors.primary : 
    props.theme.colors.text.secondary
  };
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background: rgba(139, 0, 0, 0.1);
  }

  ${props => props.active && `
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(255, 69, 0, 0.2));
    box-shadow: 0 0 20px rgba(139, 0, 0, 0.3);
  `}
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ConnectButton = styled(motion.button)`
  background: linear-gradient(135deg, #8B0000, #FF4500);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;

const WalletInfo = styled(motion.div)`
  background: rgba(139, 0, 0, 0.1);
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border.primary};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: rgba(139, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    
    span {
      display: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const WalletDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
`;

const WalletAddress = styled.span`
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  font-weight: 600;
`;

const NetworkBadge = styled.span`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.secondary};
  background: rgba(255, 69, 0, 0.1);
  padding: 0.1rem 0.3rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 69, 0, 0.3);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;

  @media (min-width: 769px) {
    display: none;
  }
`;

export default Navbar;

