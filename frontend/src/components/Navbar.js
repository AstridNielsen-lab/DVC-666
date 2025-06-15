import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFire, FaBars, FaTimes, FaWallet } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/presale', label: 'Presale' },
    { path: '/staking', label: 'Staking' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/whitepaper', label: 'Whitepaper' },
    { path: '/about', label: 'About' }
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        if (accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to connect your wallet!');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo as={Link} to="/">
          <FaFire />
          <LogoText>
            Devil's Coin
            <LogoSubtext>DVC</LogoSubtext>
          </LogoText>
        </Logo>

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
            <WalletInfo onClick={disconnectWallet}>
              <FaWallet />
              <span>{formatAddress(walletAddress)}</span>
            </WalletInfo>
          ) : (
            <ConnectButton onClick={connectWallet}>
              <FaWallet />
              Connect Wallet
            </ConnectButton>
          )}

          <MobileMenuButton
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavActions>
      </NavContent>

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

const Logo = styled(motion.div)`
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

  svg {
    color: #FF4500;
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

