import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFire, FaTwitter, FaDiscord, FaTelegram, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <FaFire />
            <LogoText>
              Devil's Coin
              <LogoSubtext>DVC</LogoSubtext>
            </LogoText>
          </FooterLogo>
          <FooterDescription>
            Embrace the darkness, unleash the value. A next-generation cryptocurrency 
            built on custom Proof-of-Stake blockchain with devilishly good rewards.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://twitter.com/devilscoin" target="_blank">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://discord.gg/devilscoin" target="_blank">
              <FaDiscord />
            </SocialLink>
            <SocialLink href="https://t.me/devilscoin" target="_blank">
              <FaTelegram />
            </SocialLink>
            <SocialLink href="https://github.com/devilscoin" target="_blank">
              <FaGithub />
            </SocialLink>
            <SocialLink href="mailto:contact@devilscoin.io">
              <FaEnvelope />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink as={Link} to="/">Home</FooterLink>
            <FooterLink as={Link} to="/presale">Presale</FooterLink>
            <FooterLink as={Link} to="/staking">Staking</FooterLink>
            <FooterLink as={Link} to="/dashboard">Dashboard</FooterLink>
            <FooterLink as={Link} to="/whitepaper">Whitepaper</FooterLink>
            <FooterLink as={Link} to="/about">About</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLinks>
            <FooterLink href="#">Documentation</FooterLink>
            <FooterLink href="#">API Reference</FooterLink>
            <FooterLink href="#">Smart Contracts</FooterLink>
            <FooterLink href="#">Security Audits</FooterLink>
            <FooterLink href="#">Bug Bounty</FooterLink>
            <FooterLink href="#">Media Kit</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLinks>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
            <FooterLink href="#">Risk Disclosure</FooterLink>
            <FooterLink href="#">Compliance</FooterLink>
            <FooterLink href="#">License</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Token Metrics</FooterTitle>
          <TokenMetrics>
            <MetricItem>
              <MetricLabel>Total Supply</MetricLabel>
              <MetricValue>66,666,666 DVC</MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>Staking APY</MetricLabel>
              <MetricValue>6.66%</MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>Block Time</MetricLabel>
              <MetricValue>13 seconds</MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>Consensus</MetricLabel>
              <MetricValue>Proof of Stake</MetricValue>
            </MetricItem>
          </TokenMetrics>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterBottomContent>
          <Copyright>
            © 2025 Devil's Coin Project. All rights reserved.
          </Copyright>
          <Disclaimer>
            <strong>Risk Warning:</strong> Cryptocurrency investments carry significant risk. 
            This project is for educational purposes. Always do your own research.
          </Disclaimer>
        </FooterBottomContent>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, 
    rgba(26, 26, 26, 0.95) 0%, 
    rgba(42, 42, 42, 0.95) 100%
  );
  border-top: 1px solid ${props => props.theme.colors.border.primary};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;

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

const FooterDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
  max-width: 300px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: 50%;
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3);
  }
`;

const FooterTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.25rem 0;

  &:hover {
    color: ${props => props.theme.colors.primary};
    padding-left: 0.5rem;
  }
`;

const TokenMetrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
`;

const MetricLabel = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const MetricValue = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 0.9rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border.secondary};
  background: rgba(10, 10, 10, 0.5);
`;

const FooterBottomContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.text.tertiary};
  font-size: 0.9rem;
  margin: 0;
`;

const Disclaimer = styled.p`
  color: ${props => props.theme.colors.text.tertiary};
  font-size: 0.8rem;
  margin: 0;
  max-width: 500px;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }

  strong {
    color: ${props => props.theme.colors.warning};
  }
`;

export default Footer;

