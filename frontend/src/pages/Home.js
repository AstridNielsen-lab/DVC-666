import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaFire, FaCoins, FaRocket, FaShieldAlt, FaChartLine, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Home = () => {
  const [currentPrice, setCurrentPrice] = useState('0.00010382');
  const [priceUSD, setPriceUSD] = useState('0.249');
  const [totalSupply] = useState('100,000,000');
  const [soldTokens, setSoldTokens] = useState(12345678);
  const [stakingAPY] = useState('8.75');
  const [activeUsers, setActiveUsers] = useState(5842);
  const [marketCap, setMarketCap] = useState('24.9M');
  const [tradingVolume, setTradingVolume] = useState('3.7M');

  useEffect(() => {
    // Simulate price updates
    const interval = setInterval(() => {
      const basePrice = 0.00010382;
      const fluctuation = (Math.random() - 0.5) * 0.000001;
      const newPrice = basePrice + fluctuation;
      setCurrentPrice(newPrice.toFixed(8));
      
      // Simulate USD price based on ETH price (assuming ETH ~$2400)
      const ethPrice = 2400;
      const usdPrice = newPrice * ethPrice;
      setPriceUSD(usdPrice.toFixed(4));
      
      // Update market cap (total supply * price)
      const mcap = (usdPrice * 100000000) / 1000000;
      setMarketCap(`${mcap.toFixed(2)}M`);
      
      // Simulate trading volume fluctuation
      const baseVolume = 3.7;
      const volumeFluctuation = (Math.random() - 0.5) * 0.2;
      setTradingVolume(`${(baseVolume + volumeFluctuation).toFixed(2)}M`);
    }, 3000);

    // Simulate user count updates
    const userInterval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);

    // Simulate token sales (increase sold tokens gradually)
    const salesInterval = setInterval(() => {
      setSoldTokens(prev => {
        const increment = Math.floor(Math.random() * 100) + 50; // 50-150 tokens per update
        const newValue = prev + increment;
        // Don't exceed a reasonable amount (goal: reach 2M+ sold)
        return newValue < 2500000 ? newValue : prev;
      });
    }, 8000); // Update every 8 seconds

    return () => {
      clearInterval(interval);
      clearInterval(userInterval);
      clearInterval(salesInterval);
    };
  }, []);

  return (
    <HomeContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>
              <Logo size="80px" color="#8B0000" />
              <TitleText>
                DVC
                <HeroSubtitle>Devil's Coin</HeroSubtitle>
              </TitleText>
            </HeroTitle>
            
            <HeroDescription>
              Embrace innovation, unleash true value. A next-generation cryptocurrency 
              built on advanced Proof-of-Stake technology with industry-leading security 
              and sustainable rewards for long-term holders.
            </HeroDescription>
            
            <HeroStats>
              <StatItem>
                <StatValue>{currentPrice} ETH</StatValue>
                <StatSubValue>${priceUSD} USD</StatSubValue>
                <StatLabel>Current Price</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>${marketCap}</StatValue>
                <StatSubValue>${tradingVolume} 24h Vol</StatSubValue>
                <StatLabel>Market Cap</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{stakingAPY}%</StatValue>
                <StatSubValue>30-day lock</StatSubValue>
                <StatLabel>Staking APY</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{activeUsers.toLocaleString()}</StatValue>
                <StatSubValue>{(soldTokens/1000000).toFixed(1)}M Tokens Sold</StatSubValue>
                <StatLabel>Community</StatLabel>
              </StatItem>
            </HeroStats>
            
            <HeroButtons>
              <PrimaryButton as={Link} to="/presale">
                <FaRocket /> Join Presale
              </PrimaryButton>
              <SecondaryButton as={Link} to="/staking">
                <FaCoins /> Start Staking
              </SecondaryButton>
            </HeroButtons>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>
          <FaFire /> Key Features
        </SectionTitle>
        
        <FeaturesGrid>
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FeatureIcon><FaShieldAlt /></FeatureIcon>
            <FeatureTitle>Advanced Security</FeatureTitle>
            <FeatureDescription>
              Industry-leading security protocols with comprehensive audits and a 
              battle-tested infrastructure for maximum asset protection.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FeatureIcon><FaCoins /></FeatureIcon>
            <FeatureTitle>Rewarding Staking</FeatureTitle>
            <FeatureDescription>
              Earn competitive {stakingAPY}% APY returns with our flexible staking program. 
              Options for short-term and long-term holders with compounding rewards.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FeatureIcon><FaChartLine /></FeatureIcon>
            <FeatureTitle>Tokenomics</FeatureTitle>
            <FeatureDescription>
              Sustainable tokenomics with built-in deflationary mechanisms and strategic 
              buyback programs to support long-term price stability.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FeatureIcon><FaUsers /></FeatureIcon>
            <FeatureTitle>Community Governance</FeatureTitle>
            <FeatureDescription>
              Democratic governance model where token holders vote on key decisions,
              protocol upgrades, and fund allocations through our DAO structure.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <TokenomicsSection>
        <SectionTitle>Tokenomics & Distribution</SectionTitle>
        
        <TokenomicsGrid>
          <TokenomicsCard>
            <TokenomicsTitle>Token Distribution</TokenomicsTitle>
            <TokenomicsChart>
              <ChartSlice color="#8B0000" width="30%">30% Liquidity Pool</ChartSlice>
              <ChartSlice color="#B22222" width="25%">25% Staking Rewards</ChartSlice>
              <ChartSlice color="#DC143C" width="20%">20% Public Sale</ChartSlice>
              <ChartSlice color="#FF4500" width="10%">10% Team & Advisors</ChartSlice>
              <ChartSlice color="#FF8C00" width="10%">10% Marketing & Partnerships</ChartSlice>
              <ChartSlice color="#FFD700" width="5%">5% Community Reserve</ChartSlice>
            </TokenomicsChart>
          </TokenomicsCard>
          
          <TokenomicsCard>
            <TokenomicsTitle>Key Metrics</TokenomicsTitle>
            <MetricsList>
              <MetricItem>
                <MetricLabel>Total Supply:</MetricLabel>
                <MetricValue>100,000,000 DVC</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>Tokens Sold:</MetricLabel>
                <MetricValue>{soldTokens.toLocaleString()} DVC</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>Initial Price:</MetricLabel>
                <MetricValue>$0.18 USD</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>Blockchain:</MetricLabel>
                <MetricValue>Ethereum (ERC-20)</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>Transaction Fee:</MetricLabel>
                <MetricValue>0.5%</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>Staking Options:</MetricLabel>
                <MetricValue>30/60/90 days</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>Max APY:</MetricLabel>
                <MetricValue>12.5% (90-day lock)</MetricValue>
              </MetricItem>
            </MetricsList>
          </TokenomicsCard>
        </TokenomicsGrid>
      </TokenomicsSection>

      <RoadmapSection>
        <SectionTitle>Strategic Roadmap</SectionTitle>
        
        <RoadmapTimeline>
          <RoadmapItem>
            <RoadmapPhase>Q2 2025 - Genesis</RoadmapPhase>
            <RoadmapTasks>
              <Task completed>✓ Smart Contract Development</Task>
              <Task completed>✓ Frontend dApp Creation</Task>
              <Task completed>✓ Backend API Implementation</Task>
              <Task>🔥 Presale Launch</Task>
              <Task>🔥 Mainnet Deployment</Task>
            </RoadmapTasks>
          </RoadmapItem>
          
          <RoadmapItem>
            <RoadmapPhase>Q3 2025 - Expansion</RoadmapPhase>
            <RoadmapTasks>
              <Task>📱 Mobile Wallet App</Task>
              <Task>🔗 Exchange Listings</Task>
              <Task>🏛️ Governance Platform</Task>
              <Task>🎮 Gaming Integration</Task>
            </RoadmapTasks>
          </RoadmapItem>
          
          <RoadmapItem>
            <RoadmapPhase>Q4 2025 - Domination</RoadmapPhase>
            <RoadmapTasks>
              <Task>🌉 Cross-chain Bridges</Task>
              <Task>🎨 NFT Marketplace</Task>
              <Task>💸 Lending Protocol</Task>
              <Task>🔮 Prediction Markets</Task>
            </RoadmapTasks>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapPhase>Q1 2026 - Ecosystem Expansion</RoadmapPhase>
            <RoadmapTasks>
              <Task>🌐 Global Marketing Campaign</Task>
              <Task>🏆 Major Exchange Listings</Task>
              <Task>🔄 Cross-chain Interoperability</Task>
              <Task>🤝 Strategic Partnerships</Task>
            </RoadmapTasks>
          </RoadmapItem>
        </RoadmapTimeline>
      </RoadmapSection>
      
      <TokenUtilitySection>
        <SectionTitle>Token Utility & Ecosystem</SectionTitle>
        <UtilityDescription>
          DVC is more than just a cryptocurrency - it's a utility token powering a complete ecosystem of financial services and decentralized applications.
        </UtilityDescription>
        
        <UtilityGrid>
          <UtilityCard>
            <UtilityIcon>💱</UtilityIcon>
            <UtilityTitle>Trading & Payments</UtilityTitle>
            <UtilityText>Fast, secure transactions with minimal fees across our entire ecosystem of partners and merchants.</UtilityText>
          </UtilityCard>
          
          <UtilityCard>
            <UtilityIcon>🔐</UtilityIcon>
            <UtilityTitle>Staking & Rewards</UtilityTitle>
            <UtilityText>Lock your tokens to earn competitive APY and gain access to premium features and services.</UtilityText>
          </UtilityCard>
          
          <UtilityCard>
            <UtilityIcon>🏛️</UtilityIcon>
            <UtilityTitle>Governance & Voting</UtilityTitle>
            <UtilityText>Participate in key decision-making processes with voting power proportional to your holdings.</UtilityText>
          </UtilityCard>
          
          <UtilityCard>
            <UtilityIcon>🎮</UtilityIcon>
            <UtilityTitle>Gaming & NFTs</UtilityTitle>
            <UtilityText>Use DVC tokens in our gaming ecosystem and exclusive NFT marketplace for digital collectibles.</UtilityText>
          </UtilityCard>
        </UtilityGrid>
      </TokenUtilitySection>

      <CTASection>
        <CTAContent>
          <CTATitle>Ready to Join the Financial Revolution?</CTATitle>
          <CTADescription>
            Join over 5,000 users already experiencing the benefits of DVC. 
            Secure your position in the next generation of digital finance today.
          </CTADescription>
          <CTAButtons>
            <PrimaryButton as={Link} to="/presale">
              <FaFire /> Buy DVC Now
            </PrimaryButton>
            <SecondaryButton as={Link} to="/whitepaper">
              📄 Read Whitepaper
            </SecondaryButton>
          </CTAButtons>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

// Styled Components
const glowAnimation = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.5); }
  50% { box-shadow: 0 0 40px rgba(139, 0, 0, 0.8); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  color: ${props => props.theme.colors.text.primary};
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 150px; /* Ainda mais espaço do menu */
  padding-bottom: 50px;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 30% 40%,
    rgba(139, 0, 0, 0.3) 0%,
    rgba(255, 69, 0, 0.1) 50%,
    transparent 100%
  );
  animation: ${floatAnimation} 6s ease-in-out infinite;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 3rem 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem; /* Abaixa o conteúdo */
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  background: linear-gradient(135deg, #8B0000, #FF4500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: ${glowAnimation} 3s ease-in-out infinite;
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;


const HeroSubtitle = styled.span`
  display: block;
  font-size: 0.4em;
  color: ${props => props.theme.colors.secondary};
  margin-top: 0.5rem;
`;

const HeroDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text.secondary};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.2rem;
`;

const StatSubValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.button)`
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
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.3);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(139, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  text-align: center;
  margin: 0 auto;
  max-width: 100%;
`;

const TokenomicsSection = styled.section`
  padding: 6rem 2rem;
  background: ${props => props.theme.colors.backgroundSecondary};
`;

const TokenomicsGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
`;

const TokenomicsCard = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
`;

const TokenomicsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const TokenomicsChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChartSlice = styled.div`
  background: ${props => props.color};
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  color: white;
  font-weight: 600;
  width: ${props => props.width};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
  }
`;

const MetricsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border.secondary};
`;

const MetricLabel = styled.span`
  color: ${props => props.theme.colors.text.secondary};
`;

const MetricValue = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const RoadmapSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const RoadmapTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const RoadmapItem = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
`;

const RoadmapPhase = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const RoadmapTasks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const Task = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${props => props.completed ? 
    'linear-gradient(135deg, #228B22, #32CD32)' : 
    'linear-gradient(135deg, #8B0000, #FF4500)'
  };
  color: white;
  font-weight: 500;
  text-align: center;
`;

const CTASection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, 
    rgba(139, 0, 0, 0.1) 0%, 
    rgba(255, 69, 0, 0.1) 100%
  );
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const CTADescription = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

// Additional styled components for new sections
const TokenUtilitySection = styled.section`
  padding: 6rem 2rem;
  background: ${props => props.theme.colors.backgroundSecondary};
  text-align: center;
`;

const UtilityDescription = styled.p`
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const UtilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const UtilityCard = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const UtilityIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const UtilityTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const UtilityText = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
`;

export default Home;

