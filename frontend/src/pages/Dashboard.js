import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaChartLine, FaArrowUp, FaArrowDown, FaFire, FaCoins, 
  FaExchangeAlt, FaWallet, FaBolt, FaRocket,
  FaChartBar, FaBullseye, FaGem, FaTabs, FaEye,
  FaCog, FaBell, FaSearch, FaPlus, FaMinus, FaUsers,
  FaHistory, FaLayerGroup, FaHome, FaChartPie, FaCircle
} from 'react-icons/fa';
import Logo from '../components/Logo';
import WalletDashboard from '../components/WalletDashboard';
import WalletConnector from '../components/WalletConnector';

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
  
  // Estado para controle de abas
  const [activeTab, setActiveTab] = useState('trading');
  const [isWalletConnectorOpen, setIsWalletConnectorOpen] = useState(false);
  const [connectedWallets, setConnectedWallets] = useState([]);

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
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toLocaleString();
  };

  const handleAddWallet = () => {
    setIsWalletConnectorOpen(true);
  };

  const handleWalletConnect = (address, chainId) => {
    const newWallet = {
      id: `wallet-${Date.now()}`,
      address,
      chainId,
      type: 'MetaMask', // Detectar tipo real
      name: `Carteira ${connectedWallets.length + 1}`,
      connectedAt: new Date().toISOString()
    };
    setConnectedWallets(prev => [...prev, newWallet]);
    setIsWalletConnectorOpen(false);
  };

  const handleRemoveWallet = (walletId) => {
    setConnectedWallets(prev => prev.filter(w => w.id !== walletId));
  };

  const tabs = [
    { id: 'trading', label: 'Trading', icon: FaChartLine },
    { id: 'staking', label: 'Staking', icon: FaCoins },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar }
  ];

  return (
    <DashboardLayout>
      {/* Modern Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <Logo size="40px" color="#8B0000" />
          <SidebarTitle>DVC666</SidebarTitle>
        </SidebarHeader>
        
        <SidebarNav>
          <NavItem active>
            <FaHome /> Dashboard
          </NavItem>
          <NavItem>
            <FaChartLine /> Trading
          </NavItem>
          <NavItem>
            <FaCoins /> Staking
          </NavItem>
          <NavItem>
            <FaChartPie /> Portfolio
          </NavItem>
          <NavItem>
            <FaHistory /> History
          </NavItem>
          <NavItem>
            <FaUsers /> Community
          </NavItem>
        </SidebarNav>
        
        <SidebarFooter>
          <NavItem>
            <FaCog /> Settings
          </NavItem>
          <StatusIndicator>
            <FaCircle /> Online
          </StatusIndicator>
        </SidebarFooter>
      </Sidebar>
      
      {/* Main Content */}
      <MainContent>
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

      {/* Sistema de Abas */}
      <TabsContainer>
        <TabsList>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent />
                {tab.label}
              </TabButton>
            );
          })}
        </TabsList>
      </TabsContainer>

      {/* Conteúdo das Abas */}
      {activeTab === 'trading' && (
        <DashboardGrid>
        {/* Main Chart */}
        <ChartSection>
          <ChartHeader>
            <ChartTitleSection>
              <SectionTitle><FaChartLine /> Gráfico de DVC666 para BRL</SectionTitle>
              <ChartPriceDisplay>
                <CurrentChartPrice>R$ {(currentPrice * 100000).toFixed(2)}</CurrentChartPrice>
                <ChartPriceChange positive={priceChange24h >= 0}>
                  {priceChange24h >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(priceChange24h).toFixed(2)}% (24h)
                </ChartPriceChange>
              </ChartPriceDisplay>
            </ChartTitleSection>
            
            <ChartControls>
              <TimeframeButtons>
                <TimeButton active>1D</TimeButton>
                <TimeButton>7D</TimeButton>
                <TimeButton>1M</TimeButton>
                <TimeButton>3M</TimeButton>
                <TimeButton>1A</TimeButton>
                <TimeButton>Tudo</TimeButton>
              </TimeframeButtons>
              
              <ChartTypeButtons>
                <ChartTypeButton active>Preço</ChartTypeButton>
                <ChartTypeButton>Capitalização de Mercado</ChartTypeButton>
                <ChartTypeButton>Volume</ChartTypeButton>
              </ChartTypeButtons>
            </ChartControls>
          </ChartHeader>
          
          <ModernChartContainer>
            <ChartLoadingIndicator>
              <FaChartLine />
              <span>Carregando Dados</span>
              <LoadingSubtext>Aguarde, estamos carregando os dados do gráfico</LoadingSubtext>
            </ChartLoadingIndicator>
            
            <PriceChartArea>
              <ChartYAxis>
                <YAxisLabel>R$ {(currentPrice * 100000 * 1.1).toFixed(2)}</YAxisLabel>
                <YAxisLabel>R$ {(currentPrice * 100000 * 1.05).toFixed(2)}</YAxisLabel>
                <YAxisLabel>R$ {(currentPrice * 100000).toFixed(2)}</YAxisLabel>
                <YAxisLabel>R$ {(currentPrice * 100000 * 0.95).toFixed(2)}</YAxisLabel>
                <YAxisLabel>R$ {(currentPrice * 100000 * 0.9).toFixed(2)}</YAxisLabel>
              </ChartYAxis>
              
              <ChartGrid>
                <GridLineHorizontal style={{top: '0%'}} />
                <GridLineHorizontal style={{top: '25%'}} />
                <GridLineHorizontal style={{top: '50%'}} />
                <GridLineHorizontal style={{top: '75%'}} />
                <GridLineHorizontal style={{top: '100%'}} />
                
                <GridLineVertical style={{left: '0%'}} />
                <GridLineVertical style={{left: '20%'}} />
                <GridLineVertical style={{left: '40%'}} />
                <GridLineVertical style={{left: '60%'}} />
                <GridLineVertical style={{left: '80%'}} />
                <GridLineVertical style={{left: '100%'}} />
              </ChartGrid>
              
              <PriceLineChart>
                <ChartGradientArea />
                {priceHistory.map((point, index) => (
                  <ChartDataPoint 
                    key={index}
                    style={{
                      left: `${(index / 99) * 100}%`,
                      bottom: `${((point.price - 0.000095) / 0.000015) * 100}%`
                    }}
                  />
                ))}
                <ChartHoverLine />
              </PriceLineChart>
            </PriceChartArea>
            
            <VolumeChartArea>
              <VolumeTitle>Volume</VolumeTitle>
              <VolumeDisplay>R$ {formatLargeNumber(volume24h * currentPrice * 100000)}</VolumeDisplay>
              {priceHistory.map((point, index) => (
                <VolumeBarModern 
                  key={index}
                  positive={index === 0 || point.price >= priceHistory[index-1]?.price}
                  style={{
                    left: `${(index / 99) * 100}%`,
                    height: `${(point.volume / 15000) * 100}%`
                  }}
                />
              ))}
            </VolumeChartArea>
            
            <ChartXAxis>
              <XAxisLabel>Há 24h</XAxisLabel>
              <XAxisLabel>Há 18h</XAxisLabel>
              <XAxisLabel>Há 12h</XAxisLabel>
              <XAxisLabel>Há 6h</XAxisLabel>
              <XAxisLabel>Agora</XAxisLabel>
            </ChartXAxis>
          </ModernChartContainer>
          
          <ChartStats>
            <StatPair>
              <ChartStatLabel>Baixa (24h)</ChartStatLabel>
              <ChartStatValue>R$ {(currentPrice * 100000 * 0.95).toFixed(2)}</ChartStatValue>
            </StatPair>
            <StatPair>
              <ChartStatLabel>Alta (24h)</ChartStatLabel>
              <ChartStatValue>R$ {(currentPrice * 100000 * 1.05).toFixed(2)}</ChartStatValue>
            </StatPair>
            <StatPair>
              <ChartStatLabel>Máxima de todos os tempos</ChartStatLabel>
              <ChartStatValue>R$ {(currentPrice * 100000 * 1.2).toFixed(2)}</ChartStatValue>
            </StatPair>
            <StatPair>
              <ChartStatLabel>Mínimo de todos os tempos</ChartStatLabel>
              <ChartStatValue>R$ {(currentPrice * 100000 * 0.1).toFixed(2)}</ChartStatValue>
            </StatPair>
          </ChartStats>
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
      )}


      {/* Aba de Staking */}
      {activeTab === 'staking' && (
        <StakingSection>
          <SectionHeader>
            <SectionTitle><FaCoins /> Staking DVC666</SectionTitle>
          </SectionHeader>
          
          <StakingGrid>
            <StakingCard>
              <StakingTitle>Staking Disponível</StakingTitle>
              <StakingAPY>6.66% APY</StakingAPY>
              <StakingDescription>
                Faça stake dos seus tokens DVC666 e ganhe recompensas passivas.
                Período mínimo de 30 dias.
              </StakingDescription>
              <StakingButton>
                <FaCoins /> Iniciar Staking
              </StakingButton>
            </StakingCard>
            
            <StakingCard>
              <StakingTitle>Seus Stakes</StakingTitle>
              <StakingStats>
                <StatRow>
                  <StakingStatLabel>Total em Stake:</StakingStatLabel>
                  <StakingStatValue>0 DVC666</StakingStatValue>
                </StatRow>
                <StatRow>
                  <StakingStatLabel>Recompensas Pendentes:</StakingStatLabel>
                  <StakingStatValue positive>0 DVC666</StakingStatValue>
                </StatRow>
                <StatRow>
                  <StakingStatLabel>Próximo Unlock:</StakingStatLabel>
                  <StakingStatValue>-</StakingStatValue>
                </StatRow>
              </StakingStats>
              <StakingButton secondary>
                <FaBolt /> Coletar Recompensas
              </StakingButton>
            </StakingCard>
          </StakingGrid>
        </StakingSection>
      )}

      {/* Aba de Analytics */}
      {activeTab === 'analytics' && (
        <AnalyticsSection>
          <SectionHeader>
            <SectionTitle><FaChartBar /> Analytics Avançados</SectionTitle>
          </SectionHeader>
          
          <AnalyticsGrid>
            <AnalyticsCard>
              <AnalyticsTitle>Performance 24h</AnalyticsTitle>
              <AnalyticsValue positive>+{Math.abs(priceChange24h).toFixed(2)}%</AnalyticsValue>
            </AnalyticsCard>
            
            <AnalyticsCard>
              <AnalyticsTitle>Volume Total</AnalyticsTitle>
              <AnalyticsValue>{formatLargeNumber(volume24h)} ETH</AnalyticsValue>
            </AnalyticsCard>
            
            <AnalyticsCard>
              <AnalyticsTitle>Holders Únicos</AnalyticsTitle>
              <AnalyticsValue>1,337</AnalyticsValue>
            </AnalyticsCard>
            
            <AnalyticsCard>
              <AnalyticsTitle>Transações 24h</AnalyticsTitle>
              <AnalyticsValue>2,456</AnalyticsValue>
            </AnalyticsCard>
          </AnalyticsGrid>
        </AnalyticsSection>
      )}

      {/* Modal do WalletConnector */}
      <WalletConnector 
        isOpen={isWalletConnectorOpen}
        onClose={() => setIsWalletConnectorOpen(false)}
        onConnect={handleWalletConnect}
      />
        </DashboardContainer>
      </MainContent>
    </DashboardLayout>
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

// Sistema de Abas
const TabsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto 2rem;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 15px;
  padding: 1rem;
`;

const TabsList = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

const TabButton = styled.button`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #8B0000, #FF4500)' : 
    'transparent'
  };
  color: ${props => props.active ? 'white' : props.theme.colors.text.secondary};
  border: 1px solid ${props => props.active ? '#FF4500' : 'rgba(139, 0, 0, 0.3)'};
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  justify-content: center;
  
  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(135deg, #8B0000, #FF4500)' : 
      'rgba(139, 0, 0, 0.1)'
    };
    color: white;
    transform: translateY(-1px);
  }
`;

// Seção de Staking
const StakingSection = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 20px;
  padding: 2rem;
  animation: ${slideUp} 0.6s ease-out;
`;

const StakingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const StakingCard = styled.div`
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.2);
    border-color: #FF4500;
  }
`;

const StakingTitle = styled.h3`
  color: #FF4500;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const StakingAPY = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #00FF88;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
`;

const StakingDescription = styled.p`
  color: #ccc;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const StakingButton = styled.button`
  background: ${props => props.secondary ? 
    'rgba(139, 0, 0, 0.1)' : 
    'linear-gradient(135deg, #8B0000, #FF4500)'
  };
  border: ${props => props.secondary ? 
    '1px solid rgba(139, 0, 0, 0.3)' : 
    'none'
  };
  color: white;
  border-radius: 10px;
  padding: 1rem 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #8B0000, #FF4500);
  }
`;

const StakingStats = styled.div`
  text-align: left;
  margin-bottom: 2rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
`;

const StakingStatLabel = styled.span`
  color: #ccc;
  font-size: 0.9rem;
`;

const StakingStatValue = styled.span`
  color: ${props => props.positive ? '#00FF88' : '#fff'};
  font-weight: 600;
`;

// Seção de Analytics
const AnalyticsSection = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 20px;
  padding: 2rem;
  animation: ${slideUp} 0.6s ease-out;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const AnalyticsCard = styled.div`
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.2);
    border-color: #FF4500;
  }
`;

const AnalyticsTitle = styled.h3`
  color: #ccc;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AnalyticsValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.positive ? '#00FF88' : '#FF4500'};
  text-shadow: 0 0 10px ${props => props.positive ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 69, 0, 0.3)'};
`;

// Modern Sidebar Layout Components
const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(10, 10, 10, 0.95) 0%, 
    rgba(26, 26, 26, 0.95) 50%,
    rgba(42, 42, 42, 0.95) 100%
  );
`;

const Sidebar = styled.div`
  width: 280px;
  background: linear-gradient(180deg, 
    rgba(15, 15, 15, 0.95) 0%,
    rgba(25, 25, 25, 0.9) 100%
  );
  border-right: 1px solid rgba(139, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 100;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SidebarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF4500;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 1rem 0;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  color: ${props => props.active ? '#fff' : '#ccc'};
  background: ${props => props.active ? 
    'linear-gradient(90deg, rgba(139, 0, 0, 0.3), rgba(255, 69, 0, 0.1))' : 
    'transparent'
  };
  border-right: ${props => props.active ? '3px solid #FF4500' : '3px solid transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: linear-gradient(90deg, rgba(139, 0, 0, 0.2), rgba(255, 69, 0, 0.05));
    color: #fff;
    border-right-color: #FF4500;
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const SidebarFooter = styled.div`
  padding: 1rem 0;
  border-top: 1px solid rgba(139, 0, 0, 0.1);
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  color: #00FF88;
  font-size: 0.9rem;
  font-weight: 500;
  
  svg {
    font-size: 0.8rem;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// Modern Chart Components (CoinMarketCap Style)
const ChartHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
`;

const ChartTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChartPriceDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CurrentChartPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const ChartPriceChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.positive ? '#00FF88' : '#FF4444'};
  background: ${props => props.positive ? 
    'rgba(0, 255, 136, 0.1)' : 
    'rgba(255, 68, 68, 0.1)'
  };
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.positive ? 
    'rgba(0, 255, 136, 0.2)' : 
    'rgba(255, 68, 68, 0.2)'
  };
`;

const TimeframeButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ChartTypeButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const ChartTypeButton = styled.button`
  background: ${props => props.active ? 
    'rgba(139, 0, 0, 0.2)' : 
    'transparent'
  };
  color: ${props => props.active ? '#FF4500' : '#ccc'};
  border: 1px solid ${props => props.active ? '#FF4500' : 'rgba(139, 0, 0, 0.3)'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: rgba(139, 0, 0, 0.2);
    color: #FF4500;
    border-color: #FF4500;
  }
`;

const ModernChartContainer = styled.div`
  height: 500px;
  position: relative;
  background: linear-gradient(180deg, 
    rgba(15, 15, 15, 0.8) 0%,
    rgba(25, 25, 25, 0.6) 100%
  );
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ChartLoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #ccc;
  z-index: 2;
  
  svg {
    font-size: 3rem;
    color: #FF4500;
    animation: ${pulse} 2s ease-in-out infinite;
  }
  
  span {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const LoadingSubtext = styled.div`
  font-size: 0.9rem;
  color: #888;
  text-align: center;
`;

const PriceChartArea = styled.div`
  height: 70%;
  position: relative;
  padding: 1rem;
`;

const ChartYAxis = styled.div`
  position: absolute;
  left: 0;
  top: 1rem;
  bottom: 1rem;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;
`;

const YAxisLabel = styled.div`
  font-size: 0.8rem;
  color: #888;
  background: rgba(25, 25, 25, 0.8);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(139, 0, 0, 0.1);
  width: fit-content;
`;

const ChartGrid = styled.div`
  position: absolute;
  top: 1rem;
  left: 100px;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
`;

const GridLineHorizontal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(139, 0, 0, 0.1);
`;

const GridLineVertical = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(139, 0, 0, 0.1);
`;

const PriceLineChart = styled.div`
  position: absolute;
  top: 1rem;
  left: 100px;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
`;

const ChartGradientArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, 
    rgba(255, 69, 0, 0.1) 0%,
    rgba(139, 0, 0, 0.05) 50%,
    transparent 100%
  );
  border-radius: 8px;
`;

const ChartDataPoint = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: #FF4500;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(255, 69, 0, 0.6);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.5);
    box-shadow: 0 0 12px rgba(255, 69, 0, 0.8);
  }
`;

const ChartHoverLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 69, 0, 0.8);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

const VolumeChartArea = styled.div`
  height: 25%;
  position: relative;
  padding: 1rem;
  border-top: 1px solid rgba(139, 0, 0, 0.2);
`;

const VolumeTitle = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  font-size: 0.9rem;
  color: #ccc;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const VolumeDisplay = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 0.9rem;
  color: #FF4500;
  font-weight: 600;
`;

const VolumeBarModern = styled.div`
  position: absolute;
  bottom: 0;
  width: 2px;
  background: ${props => props.positive ? 
    'linear-gradient(180deg, #00FF88, rgba(0, 255, 136, 0.3))' : 
    'linear-gradient(180deg, #FF4444, rgba(255, 68, 68, 0.3))'
  };
  border-radius: 1px 1px 0 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.positive ? '#00FF88' : '#FF4444'};
    transform: scaleX(1.5);
  }
`;

const ChartXAxis = styled.div`
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 100px;
  border-top: 1px solid rgba(139, 0, 0, 0.1);
`;

const XAxisLabel = styled.div`
  font-size: 0.8rem;
  color: #888;
  font-weight: 500;
`;

const ChartStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.1);
  border-radius: 12px;
`;

const StatPair = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChartStatLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChartStatValue = styled.div`
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
`;

export default Dashboard;

