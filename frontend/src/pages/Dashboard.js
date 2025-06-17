import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaChartLine, FaArrowUp, FaArrowDown, FaFire, FaCoins, 
  FaExchangeAlt, FaWallet, FaBolt, FaRocket,
  FaChartBar, FaBullseye, FaGem
} from 'react-icons/fa';
import Logo from '../components/Logo';

const Dashboard = () => {
  const [currentPrice, setCurrentPrice] = useState(0.0001);
  const [priceChange24h, setPriceChange24h] = useState(0);
  const [volume24h, setVolume24h] = useState(156789);
  const [marketCap, setMarketCap] = useState(6666.666);
  const [totalSupply] = useState(66666666);
  const [circulatingSupply] = useState(13333333);
  const [stakingRewards] = useState(6.66);
  const [activeStakers] = useState(666);
  const [burnedTokens] = useState(666666);
  const [priceHistory, setPriceHistory] = useState([]);
  const [technicalIndicators, setTechnicalIndicators] = useState({
    rsi: 45.8,
    macd: 0.000012,
    ema20: 0.0000985,
    ema50: 0.0000978,
    bollinger: { upper: 0.000105, lower: 0.0000095 },
    support: 0.0000095,
    resistance: 0.000011
  });

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const basePrice = 0.0001;
      const volatility = 0.000005;
      const change = (Math.random() - 0.5) * volatility;
      const newPrice = Math.max(0.000001, basePrice + change);
      
      setCurrentPrice(newPrice);
      setPriceChange24h((change / basePrice) * 100);
      
      // Update volume and other metrics
      setVolume24h(prev => prev + Math.floor(Math.random() * 1000));
      setMarketCap(newPrice * circulatingSupply);
      
      // Add to price history
      setPriceHistory(prev => {
        const newHistory = [...prev, {
          time: new Date().getTime(),
          price: newPrice,
          volume: Math.floor(Math.random() * 10000) + 5000
        }];
        return newHistory.slice(-100); // Keep last 100 points
      });
      
      // Update technical indicators
      setTechnicalIndicators(prev => ({
        ...prev,
        rsi: Math.max(0, Math.min(100, prev.rsi + (Math.random() - 0.5) * 5)),
        macd: prev.macd + (Math.random() - 0.5) * 0.000001
      }));
      
    }, 2000);

    return () => clearInterval(interval);
  }, [circulatingSupply]);

  const formatPrice = (price) => price.toFixed(8);
  const formatLargeNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toLocaleString();
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTop>
          <LogoSection>
            <Logo size="50px" color="#8B0000" />
            <TokenInfo>
              <TokenName>Devil's Coin 666</TokenName>
              <TokenSymbol>DVC666/ETH</TokenSymbol>
            </TokenInfo>
          </LogoSection>
          
          <PriceSection>
            <CurrentPrice>
              {formatPrice(currentPrice)} ETH
              <PriceChange positive={priceChange24h >= 0}>
                {priceChange24h >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(priceChange24h).toFixed(2)}%
              </PriceChange>
            </CurrentPrice>
            <PriceLabel>24h Change</PriceLabel>
          </PriceSection>
        </HeaderTop>
        
        <QuickStats>
          <StatCard>
            <StatIcon><FaFire /></StatIcon>
            <StatValue>{formatLargeNumber(volume24h)} ETH</StatValue>
            <StatLabel>24h Volume</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaGem /></StatIcon>
            <StatValue>{formatLargeNumber(marketCap)} ETH</StatValue>
            <StatLabel>Market Cap</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaCoins /></StatIcon>
            <StatValue>{formatLargeNumber(circulatingSupply)}</StatValue>
            <StatLabel>Circulating</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaBolt /></StatIcon>
            <StatValue>{stakingRewards}%</StatValue>
            <StatLabel>Staking APY</StatLabel>
          </StatCard>
        </QuickStats>
      </DashboardHeader>
      
      <DashboardGrid>
        {/* Main Chart */}
        <ChartSection>
          <SectionHeader>
            <SectionTitle><FaChartLine /> DVC666 Price Chart</SectionTitle>
            <ChartControls>
              <TimeButton active>1H</TimeButton>
              <TimeButton>4H</TimeButton>
              <TimeButton>1D</TimeButton>
              <TimeButton>1W</TimeButton>
            </ChartControls>
          </SectionHeader>
          
          <ChartContainer>
            <PriceChart>
              {priceHistory.map((point, index) => (
                <ChartPoint 
                  key={index}
                  style={{
                    left: `${(index / 99) * 100}%`,
                    bottom: `${((point.price - 0.000095) / 0.000015) * 100}%`
                  }}
                />
              ))}
              <SupportLine level={20} />
              <ResistanceLine level={80} />
            </PriceChart>
            
            <VolumeChart>
              {priceHistory.map((point, index) => (
                <VolumeBar 
                  key={index}
                  style={{
                    left: `${(index / 99) * 100}%`,
                    height: `${(point.volume / 15000) * 100}%`
                  }}
                />
              ))}
            </VolumeChart>
          </ChartContainer>
        </ChartSection>
        
        {/* Technical Analysis */}
        <TechnicalPanel>
          <SectionHeader>
            <SectionTitle><FaBullseye /> Technical Analysis</SectionTitle>
          </SectionHeader>
          
          <IndicatorGrid>
            <Indicator>
              <IndicatorName>RSI (14)</IndicatorName>
              <IndicatorValue 
                signal={technicalIndicators.rsi > 70 ? 'sell' : technicalIndicators.rsi < 30 ? 'buy' : 'neutral'}
              >
                {technicalIndicators.rsi.toFixed(1)}
              </IndicatorValue>
              <IndicatorSignal 
                signal={technicalIndicators.rsi > 70 ? 'sell' : technicalIndicators.rsi < 30 ? 'buy' : 'neutral'}
              >
                {technicalIndicators.rsi > 70 ? 'OVERBOUGHT' : technicalIndicators.rsi < 30 ? 'OVERSOLD' : 'NEUTRAL'}
              </IndicatorSignal>
            </Indicator>
            
            <Indicator>
              <IndicatorName>MACD</IndicatorName>
              <IndicatorValue signal={technicalIndicators.macd > 0 ? 'buy' : 'sell'}>
                {technicalIndicators.macd.toFixed(8)}
              </IndicatorValue>
              <IndicatorSignal signal={technicalIndicators.macd > 0 ? 'buy' : 'sell'}>
                {technicalIndicators.macd > 0 ? 'BULLISH' : 'BEARISH'}
              </IndicatorSignal>
            </Indicator>
            
            <Indicator>
              <IndicatorName>EMA 20/50</IndicatorName>
              <IndicatorValue signal={technicalIndicators.ema20 > technicalIndicators.ema50 ? 'buy' : 'sell'}>
                {(technicalIndicators.ema20 / technicalIndicators.ema50).toFixed(4)}
              </IndicatorValue>
              <IndicatorSignal signal={technicalIndicators.ema20 > technicalIndicators.ema50 ? 'buy' : 'sell'}>
                {technicalIndicators.ema20 > technicalIndicators.ema50 ? 'GOLDEN CROSS' : 'DEATH CROSS'}
              </IndicatorSignal>
            </Indicator>
            
            <Indicator>
              <IndicatorName>Support/Resistance</IndicatorName>
              <IndicatorValue signal="neutral">
                {formatPrice(technicalIndicators.support)} / {formatPrice(technicalIndicators.resistance)}
              </IndicatorValue>
              <IndicatorSignal signal="neutral">
                KEY LEVELS
              </IndicatorSignal>
            </Indicator>
          </IndicatorGrid>
        </TechnicalPanel>
        
        {/* Market Stats */}
        <MarketStats>
          <SectionHeader>
            <SectionTitle><FaRocket /> Market Evolution</SectionTitle>
          </SectionHeader>
          
          <StatsGrid>
            <StatItem>
              <StatItemIcon positive><FaChartBar /></StatItemIcon>
              <StatItemData>
                <StatItemValue>{formatLargeNumber(activeStakers)}</StatItemValue>
                <StatItemLabel>Active Stakers</StatItemLabel>
              </StatItemData>
            </StatItem>
            
            <StatItem>
              <StatItemIcon><FaFire /></StatItemIcon>
              <StatItemData>
                <StatItemValue>{formatLargeNumber(burnedTokens)}</StatItemValue>
                <StatItemLabel>Tokens Burned</StatItemLabel>
              </StatItemData>
            </StatItem>
            
            <StatItem>
              <StatItemIcon positive><FaCoins /></StatItemIcon>
              <StatItemData>
                <StatItemValue>{((circulatingSupply / totalSupply) * 100).toFixed(1)}%</StatItemValue>
                <StatItemLabel>Circulating %</StatItemLabel>
              </StatItemData>
            </StatItem>
            
            <StatItem>
              <StatItemIcon positive><FaBolt /></StatItemIcon>
              <StatItemData>
                <StatItemValue>13s</StatItemValue>
                <StatItemLabel>Block Time</StatItemLabel>
              </StatItemData>
            </StatItem>
          </StatsGrid>
        </MarketStats>
        
        {/* Trading Tools */}
        <TradingTools>
          <SectionHeader>
            <SectionTitle><FaExchangeAlt /> Trading Tools</SectionTitle>
          </SectionHeader>
          
          <ToolsGrid>
            <TradingButton>
              <FaArrowUp /> Buy DVC666
            </TradingButton>
            <TradingButton secondary>
              <FaArrowDown /> Sell DVC666
            </TradingButton>
            <TradingButton>
              <FaCoins /> Stake Tokens
            </TradingButton>
            <TradingButton secondary>
              <FaWallet /> Portfolio
            </TradingButton>
          </ToolsGrid>
          
          <KeyLevels>
            <LevelItem>
              <LevelLabel>Next Resistance:</LevelLabel>
              <LevelValue positive>{formatPrice(technicalIndicators.resistance)} ETH</LevelValue>
            </LevelItem>
            <LevelItem>
              <LevelLabel>Next Support:</LevelLabel>
              <LevelValue>{formatPrice(technicalIndicators.support)} ETH</LevelValue>
            </LevelItem>
          </KeyLevels>
        </TradingTools>
      </DashboardGrid>
    </DashboardContainer>
  );
};

// Animations
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(139, 0, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(139, 0, 0, 0.8), 0 0 30px rgba(255, 69, 0, 0.4); }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Main Container
const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 90px 20px 20px;
  background: linear-gradient(135deg, 
    rgba(10, 10, 10, 0.95) 0%, 
    rgba(26, 26, 26, 0.95) 50%,
    rgba(42, 42, 42, 0.95) 100%
  );
  color: ${props => props.theme.colors.text.primary};
`;

// Header Sections
const DashboardHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto 2rem;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 20px;
  padding: 2rem;
  animation: ${slideUp} 0.6s ease-out;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TokenName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  text-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
`;

const TokenSymbol = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const PriceSection = styled.div`
  text-align: right;
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const PriceChange = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.positive ? '#00FF88' : '#FF4444'};
  animation: ${pulse} 2s ease-in-out infinite;
`;

const PriceLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Quick Stats
const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, 
    rgba(139, 0, 0, 0.1) 0%, 
    rgba(255, 69, 0, 0.05) 100%
  );
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.2);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Dashboard Grid
const DashboardGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

// Chart Section
const ChartSection = styled.div`
  grid-column: 1;
  grid-row: 1 / 3;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 20px;
  padding: 2rem;
  animation: ${slideUp} 0.8s ease-out;
  
  @media (max-width: 1200px) {
    grid-column: 1;
    grid-row: auto;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const ChartControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TimeButton = styled.button`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #8B0000, #FF4500)' : 
    'transparent'
  };
  color: ${props => props.active ? 'white' : props.theme.colors.text.secondary};
  border: 1px solid ${props => props.theme.colors.border.primary};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #8B0000, #FF4500);
    color: white;
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  overflow: hidden;
`;

const PriceChart = styled.div`
  height: 70%;
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(139, 0, 0, 0.1) 0%,
    rgba(255, 69, 0, 0.05) 50%,
    transparent 100%
  );
`;

const ChartPoint = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  box-shadow: 0 0 4px ${props => props.theme.colors.secondary};
`;

const SupportLine = styled.div`
  position: absolute;
  bottom: ${props => props.level}%;
  left: 0;
  right: 0;
  height: 1px;
  background: #00FF88;
  opacity: 0.7;
  
  &:before {
    content: 'Support';
    position: absolute;
    right: 10px;
    top: -15px;
    font-size: 0.8rem;
    color: #00FF88;
  }
`;

const ResistanceLine = styled.div`
  position: absolute;
  bottom: ${props => props.level}%;
  left: 0;
  right: 0;
  height: 1px;
  background: #FF4444;
  opacity: 0.7;
  
  &:before {
    content: 'Resistance';
    position: absolute;
    right: 10px;
    top: -15px;
    font-size: 0.8rem;
    color: #FF4444;
  }
`;

const VolumeChart = styled.div`
  height: 30%;
  position: relative;
  margin-top: auto;
`;

const VolumeBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 1px;
  background: rgba(139, 0, 0, 0.6);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

// Technical Analysis Panel
const TechnicalPanel = styled.div`
  grid-column: 2;
  grid-row: 1;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 20px;
  padding: 2rem;
  animation: ${slideUp} 1s ease-out;
  
  @media (max-width: 1200px) {
    grid-column: 1;
    grid-row: auto;
  }
`;

const IndicatorGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Indicator = styled.div`
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(139, 0, 0, 0.1);
  }
`;

const IndicatorName = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const IndicatorValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => {
    switch(props.signal) {
      case 'buy': return '#00FF88';
      case 'sell': return '#FF4444';
      default: return props.theme.colors.text.primary;
    }
  }};
  margin-bottom: 0.3rem;
`;

const IndicatorSignal = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => {
    switch(props.signal) {
      case 'buy': return '#00FF88';
      case 'sell': return '#FF4444';
      default: return props.theme.colors.text.tertiary;
    }
  }};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Market Stats
const MarketStats = styled.div`
  grid-column: 2;
  grid-row: 2;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 20px;
  padding: 2rem;
  animation: ${slideUp} 1.2s ease-out;
  
  @media (max-width: 1200px) {
    grid-column: 1;
    grid-row: auto;
  }
`;

const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(139, 0, 0, 0.1);
  }
`;

const StatItemIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.positive ? '#00FF88' : props.theme.colors.secondary};
  animation: ${props => props.positive ? glow : 'none'} 2s ease-in-out infinite;
`;

const StatItemData = styled.div`
  flex: 1;
`;

const StatItemValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.2rem;
`;

const StatItemLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Trading Tools
const TradingTools = styled.div`
  grid-column: 1 / -1;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 20px;
  padding: 2rem;
  animation: ${slideUp} 1.4s ease-out;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TradingButton = styled.button`
  background: ${props => props.secondary ? 
    'transparent' : 
    'linear-gradient(135deg, #8B0000, #FF4500)'
  };
  color: ${props => props.secondary ? 
    props.theme.colors.primary : 
    'white'
  };
  border: ${props => props.secondary ? 
    `2px solid ${props.theme.colors.primary}` : 
    'none'
  };
  padding: 1rem 2rem;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 0, 0, 0.3);
    background: ${props => props.secondary ? 
      props.theme.colors.primary : 
      'linear-gradient(135deg, #A00000, #FF6500)'
    };
    color: white;
  }
`;

const KeyLevels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 15px;
`;

const LevelItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LevelLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const LevelValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.positive ? '#00FF88' : '#FF4444'};
`;


export default Dashboard;

