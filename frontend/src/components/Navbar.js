import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import useTranslation from '../hooks/useTranslation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: '🏠' },
    { path: '/presale', label: t('nav.presale'), icon: '🔥' },
    { path: '/staking', label: t('nav.staking'), icon: '🥩' },
    { path: '/dashboard', label: t('nav.dashboard'), icon: '📊' },
    { path: '/wallet', label: t('nav.wallet'), icon: '💼' },
    { path: '/evolution', label: t('nav.evolution'), icon: '📈' },
    { path: '/whitepaper', label: t('nav.whitepaper'), icon: '📄' },
    { path: '/about', label: t('nav.about'), icon: 'ℹ️' }
  ];


  return (
    <NavContainer>
      <NavContent>
        <LogoContainer as={Link} to="/">
          <Logo size="40px" color="#8B0000" />
          <LogoText>
            {t('hero.title')}
            <LogoSubtext>{t('hero.subtitle')}</LogoSubtext>
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
          <LanguageSelector />
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
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    z-index: 1100; /* Below dashboard sidebar on mobile */
  }
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
    z-index: 1100; /* Below dashboard sidebar */
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
  z-index: 1050; /* Below navbar menu and sidebar */

  @media (min-width: 769px) {
    display: none;
  }
`;

export default Navbar;

