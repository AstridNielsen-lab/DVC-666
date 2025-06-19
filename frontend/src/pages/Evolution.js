import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaChartLine, FaArrowUp, FaArrowDown, FaFire, FaCoins, 
  FaUsers, FaTrophy, FaRocket, FaGem, FaBolt, FaEye,
  FaCalendar, FaGlobe, FaExchangeAlt, FaShieldAlt
} from 'react-icons/fa';
import Logo from '../components/Logo';

const Evolution = () => {
  const [currentPrice, setCurrentPrice] = useState(0.0001234);
  const [priceChange24h, setPriceChange24h] = useState(12.34);
  const [marketCap, setMarketCap] = useState(8234567);
  const [volume24h, setVolume24h] = useState(1234567);
  const [totalSupply] = useState(66666666);
  const [circulatingSupply] = useState(23456789);
  const [burnedTokens] = useState(3456789);
  const [holders, setHolders] = useState(13337);
  const [transactions24h, setTransactions24h] = useState(2456);
  const [activeStakers] = useState(5678);
  const [stakingRewards] = useState(6.66);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [priceHistory, setPriceHistory] = useState([]);
  const [milestones] = useState([
    {
      id: 1,
      date: '2024-01-15',
      title: 'DVC666 Genesis',
      description: 'Lançamento oficial do token DVC666',
      price: 0.00001,
      achieved: true,
      icon: '🔥'
    },
    {
      id: 2,
      date: '2024-02-01',
      title: 'Primeira Exchange',
      description: 'Listagem na primeira exchange descentralizada',
      price: 0.000025,
      achieved: true,
      icon: '🚀'
    },
    {
      id: 3,
      date: '2024-03-15',
      title: '10K Holders',
      description: 'Alcançamos 10.000 holders únicos',
      price: 0.00008,
      achieved: true,
      icon: '👥'
    },
    {
      id: 4,
      date: '2024-06-01',
      title: 'Staking Launch',
      description: 'Lançamento do sistema de staking',
      price: 0.0001234,
      achieved: true,
      icon: '💎'
    },
    {
      id: 5,
      date: '2024-08-15',
      title: 'Major Exchange',
      description: 'Listagem em exchange centralizada Tier 1',
      price: 0.0005,
      achieved: false,
      icon: '🏆'
    },
    {
      id: 6,
      date: '2024-12-01',
      title: 'DeFi Ecosystem',
      description: 'Lançamento do ecossistema DeFi completo',
      price: 0.001,
      achieved: false,
      icon: '🌟'
    }
  ]);

  // Simular dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const basePrice = 0.0001234;
      const volatility = 0.000005;
      const change = (Math.random() - 0.5) * volatility;
      const newPrice = Math.max(0.000001, basePrice + change);
      
      setCurrentPrice(newPrice);
      setPriceChange24h((change / basePrice) * 100);
      setMarketCap(newPrice * circulatingSupply);
      setVolume24h(prev => prev + Math.floor(Math.random() * 1000));
      setHolders(prev => prev + Math.floor(Math.random() * 10));
      setTransactions24h(prev => prev + Math.floor(Math.random() * 50));
      
      // Atualizar histórico de preços
      setPriceHistory(prev => {
        const newHistory = [...prev, {
          time: new Date().getTime(),
          price: newPrice,
          volume: Math.floor(Math.random() * 10000) + 5000
        }];
        return newHistory.slice(-100);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [circulatingSupply]);

  const formatPrice = (price) => price.toFixed(8);
  const formatLargeNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toLocaleString();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const getProgressPercentage = () => {
    const achievedMilestones = milestones.filter(m => m.achieved).length;
    return (achievedMilestones / milestones.length) * 100;
  };

  const timeframes = ['1H', '4H', '1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <EvolutionContainer>
      {/* Header Principal */}
      <EvolutionHeader>
        <HeaderContent>
          <LogoSection>
            <Logo size="60px" color="#8B0000" />
            <HeaderInfo>
              <PageTitle>Evolução DVC666</PageTitle>
              <PageSubtitle>Acompanhe o crescimento diabólico do DVC666</PageSubtitle>
            </HeaderInfo>
          </LogoSection>
          
          <PriceDisplay>
            <CurrentPrice>
              {formatPrice(currentPrice)} ETH
              <PriceChange positive={priceChange24h >= 0}>
                {priceChange24h >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(priceChange24h).toFixed(2)}%
              </PriceChange>
            </CurrentPrice>
            <PriceLabel>Preço Atual • 24h Change</PriceLabel>
          </PriceDisplay>
        </HeaderContent>
      </EvolutionHeader>

      {/* Estatísticas Principais */}
      <MainStats>
        <StatsGrid>
          <StatCard featured>
            <StatIcon><FaFire /></StatIcon>
            <StatContent>
              <StatValue>{formatCurrency(marketCap)}</StatValue>
              <StatLabel>Market Cap</StatLabel>
              <StatChange positive>+15.67% (24h)</StatChange>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaExchangeAlt /></StatIcon>
            <StatContent>
              <StatValue>{formatCurrency(volume24h)}</StatValue>
              <StatLabel>Volume 24h</StatLabel>
              <StatChange positive>+8.23% (24h)</StatChange>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaUsers /></StatIcon>
            <StatContent>
              <StatValue>{formatLargeNumber(holders)}</StatValue>
              <StatLabel>Total Holders</StatLabel>
              <StatChange positive>+234 (24h)</StatChange>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon><FaCoins /></StatIcon>
            <StatContent>
              <StatValue>{formatLargeNumber(circulatingSupply)}</StatValue>
              <StatLabel>Circulating Supply</StatLabel>
              <StatChange>{((circulatingSupply / totalSupply) * 100).toFixed(1)}% do total</StatChange>
            </StatContent>
          </StatCard>
        </StatsGrid>
      </MainStats>

      {/* Gráfico de Evolução */}
      <ChartSection>
        <SectionHeader>
          <SectionTitle>
            <FaChartLine /> Evolução do Preço
          </SectionTitle>
          <TimeframeSelector>
            {timeframes.map(timeframe => (
              <TimeframeButton
                key={timeframe}
                active={selectedTimeframe === timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </TimeframeButton>
            ))}
          </TimeframeSelector>
        </SectionHeader>
        
        <ChartContainer>
          <PriceChart>
            {priceHistory.map((point, index) => (
              <ChartPoint 
                key={index}
                style={{
                  left: `${(index / 99) * 100}%`,
                  bottom: `${((point.price - 0.0001) / 0.0001) * 100}%`
                }}
              />
            ))}
            <ChartLine />
          </PriceChart>
          
          <ChartInfo>
            <ChartMetric>
              <MetricLabel>ATH</MetricLabel>
              <MetricValue positive>0.00015432 ETH</MetricValue>
            </ChartMetric>
            <ChartMetric>
              <MetricLabel>ATL</MetricLabel>
              <MetricValue>0.00000789 ETH</MetricValue>
            </ChartMetric>
            <ChartMetric>
              <MetricLabel>ROI</MetricLabel>
              <MetricValue positive>+1,234.56%</MetricValue>
            </ChartMetric>
          </ChartInfo>
        </ChartContainer>
      </ChartSection>

      {/* Marcos da Evolução */}
      <MilestonesSection>
        <SectionHeader>
          <SectionTitle>
            <FaTrophy /> Marcos da Evolução
          </SectionTitle>
          <ProgressBar>
            <ProgressFill progress={getProgressPercentage()} />
            <ProgressText>{getProgressPercentage().toFixed(0)}% Concluído</ProgressText>
          </ProgressBar>
        </SectionHeader>
        
        <MilestonesTimeline>
          {milestones.map((milestone, index) => (
            <MilestoneCard key={milestone.id} achieved={milestone.achieved}>
              <MilestoneIcon achieved={milestone.achieved}>
                {milestone.icon}
              </MilestoneIcon>
              <MilestoneContent>
                <MilestoneDate>
                  <FaCalendar /> {new Date(milestone.date).toLocaleDateString('pt-BR')}
                </MilestoneDate>
                <MilestoneTitle>{milestone.title}</MilestoneTitle>
                <MilestoneDescription>{milestone.description}</MilestoneDescription>
                <MilestonePrice achieved={milestone.achieved}>
                  Preço: {formatPrice(milestone.price)} ETH
                </MilestonePrice>
              </MilestoneContent>
              <MilestoneStatus achieved={milestone.achieved}>
                {milestone.achieved ? '✅ Concluído' : '⏳ Pendente'}
              </MilestoneStatus>
            </MilestoneCard>
          ))}
        </MilestonesTimeline>
      </MilestonesSection>

      {/* Métricas Avançadas */}
      <AdvancedMetrics>
        <MetricsGrid>
          <MetricCard>
            <MetricHeader>
              <FaBolt /> Performance
            </MetricHeader>
            <MetricsList>
              <MetricItem>
                <MetricItemLabel>ROI desde lançamento</MetricItemLabel>
                <MetricItemValue positive>+1,234.56%</MetricItemValue>
              </MetricItem>
              <MetricItem>
                <MetricItemLabel>Volatilidade 30d</MetricItemLabel>
                <MetricItemValue>45.67%</MetricItemValue>
              </MetricItem>
              <MetricItem>
                <MetricItemLabel>Sharpe Ratio</MetricItemLabel>
                <MetricItemValue positive>2.34</MetricItemValue>
              </MetricItem>
            </MetricsList>
          </MetricCard>
          
          <MetricCard>
            <MetricHeader>
              <FaGem /> Tokenomics
            </MetricHeader>
            <MetricsList>
              <MetricItem>
                <MetricItemLabel>Tokens Queimados</MetricItemLabel>
                <MetricItemValue>{formatLargeNumber(burnedTokens)}</MetricItemValue>
              </MetricItem>
              <MetricItem>
                <MetricItemLabel>Em Staking</MetricItemLabel>
                <MetricItemValue>{formatLargeNumber(activeStakers * 1000)}</MetricItemValue>
              </MetricItem>
              <MetricItem>
                <MetricItemLabel>APY Staking</MetricItemLabel>
                <MetricItemValue positive>{stakingRewards}%</MetricItemValue>
              </MetricItem>
            </MetricsList>
          </MetricCard>
          
          <MetricCard>
            <MetricHeader>
              <FaGlobe /> Atividade
            </MetricHeader>
            <MetricsList>
              <MetricItem>
                <MetricItemLabel>Transações 24h</MetricItemLabel>
                <MetricItemValue>{formatLargeNumber(transactions24h)}</MetricItemValue>
              </MetricItem>
              <MetricItem>
                <MetricItemLabel>Holders Ativos</MetricItemLabel>
                <MetricItemValue>{formatLargeNumber(Math.floor(holders * 0.7))}</MetricItemValue>
              </MetricItem>
              <MetricItem>
                <MetricItemLabel>Volume Médio</MetricItemLabel>
                <MetricItemValue>{formatCurrency(volume24h / transactions24h)}</MetricItemValue>
              </MetricItem>
            </MetricsList>
          </MetricCard>
        </MetricsGrid>
      </AdvancedMetrics>

      {/* Footer com Insights */}
      <EvolutionFooter>
        <FooterContent>
          <InsightCard>
            <InsightIcon><FaRocket /></InsightIcon>
            <InsightContent>
              <InsightTitle>Próximo Objetivo</InsightTitle>
              <InsightText>Listagem em exchange Tier 1 prevista para Q3 2024</InsightText>
            </InsightContent>
          </InsightCard>
          
          <InsightCard>
            <InsightIcon><FaShieldAlt /></InsightIcon>
            <InsightContent>
              <InsightTitle>Segurança</InsightTitle>
              <InsightText>Auditoria de segurança completada com sucesso</InsightText>
            </InsightContent>
          </InsightCard>
          
          <InsightCard>
            <InsightIcon><FaEye /></InsightIcon>
            <InsightContent>
              <InsightTitle>Transparência</InsightTitle>
              <InsightText>Todos os dados são verificáveis na blockchain</InsightText>
            </InsightContent>
          </InsightCard>
        </FooterContent>
      </EvolutionFooter>
    </EvolutionContainer>
  );
};

// Animations
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 69, 0, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 69, 0, 0.6), 0 0 40px rgba(139, 0, 0, 0.4); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const slideIn = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Styled Components
const EvolutionContainer = styled.div`
  min-height: 100vh;
  padding: 90px 20px 20px;
  background: linear-gradient(135deg, 
    rgba(10, 10, 10, 0.95) 0%, 
    rgba(26, 26, 26, 0.95) 50%,
    rgba(42, 42, 42, 0.95) 100%
  );
  color: #fff;
`;

const EvolutionHeader = styled(motion.div).attrs({
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
  animation: ${glow} 3s ease-in-out infinite;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 3rem;
  font-weight: 700;
  color: #FF4500;
  margin: 0;
  text-shadow: 0 0 30px rgba(255, 69, 0, 0.6);
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin: 0;
  font-weight: 400;
`;

const PriceDisplay = styled.div`
  text-align: right;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CurrentPrice = styled.div`
  font-size: 3.5rem;
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

const PriceChange = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${props => props.positive ? '#00FF88' : '#FF4444'};
  display: flex;
  align-items: center;
  gap: 0.3rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const PriceLabel = styled.div`
  font-size: 1rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MainStats = styled.div`
  max-width: 1400px;
  margin: 0 auto 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled(motion.div).attrs({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
})`
  background: ${props => props.featured ? 
    'linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(255, 69, 0, 0.1))' :
    'rgba(139, 0, 0, 0.1)'
  };
  border: 1px solid ${props => props.featured ? '#FF4500' : 'rgba(139, 0, 0, 0.3)'};
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.6s ease-out;
  
  &:hover {
    background: rgba(139, 0, 0, 0.15);
    border-color: #FF4500;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.3);
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  color: #FF4500;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.positive ? '#00FF88' : '#FF4444'};
`;

const ChartSection = styled.div`
  max-width: 1400px;
  margin: 0 auto 2rem;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 20px;
  padding: 2rem;
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
  font-size: 1.8rem;
  font-weight: 600;
  color: #FF4500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TimeframeButton = styled.button`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #8B0000, #FF4500)' : 
    'rgba(139, 0, 0, 0.1)'
  };
  border: 1px solid ${props => props.active ? '#FF4500' : 'rgba(139, 0, 0, 0.3)'};
  color: ${props => props.active ? '#fff' : '#ccc'};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #8B0000, #FF4500);
    color: #fff;
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
`;

const PriceChart = styled.div`
  height: 80%;
  position: relative;
  padding: 1rem;
`;

const ChartPoint = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: #FF4500;
  border-radius: 50%;
  box-shadow: 0 0 6px #FF4500;
`;

const ChartLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #FF4500, transparent);
  opacity: 0.3;
`;

const ChartInfo = styled.div`
  height: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid rgba(139, 0, 0, 0.2);
  padding: 1rem;
`;

const ChartMetric = styled.div`
  text-align: center;
`;

const MetricLabel = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.3rem;
`;

const MetricValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.positive ? '#00FF88' : '#FF4444'};
`;

const MilestonesSection = styled.div`
  max-width: 1400px;
  margin: 0 auto 2rem;
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 20px;
  padding: 2rem;
`;

const ProgressBar = styled.div`
  position: relative;
  background: rgba(139, 0, 0, 0.2);
  border-radius: 20px;
  height: 8px;
  min-width: 200px;
`;

const ProgressFill = styled.div`
  background: linear-gradient(90deg, #8B0000, #FF4500);
  border-radius: 20px;
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 1s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  top: -25px;
  right: 0;
  font-size: 0.8rem;
  color: #FF4500;
  font-weight: 600;
`;

const MilestonesTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MilestoneCard = styled(motion.div).attrs({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
})`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: ${props => props.achieved ? 
    'rgba(0, 255, 136, 0.1)' : 
    'rgba(139, 0, 0, 0.1)'
  };
  border: 1px solid ${props => props.achieved ? 
    'rgba(0, 255, 136, 0.3)' : 
    'rgba(139, 0, 0, 0.3)'
  };
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    box-shadow: 0 5px 20px rgba(139, 0, 0, 0.2);
  }
`;

const MilestoneIcon = styled.div`
  font-size: 2.5rem;
  opacity: ${props => props.achieved ? 1 : 0.5};
`;

const MilestoneContent = styled.div`
  flex: 1;
`;

const MilestoneDate = styled.div`
  font-size: 0.9rem;
  color: #999;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
`;

const MilestoneTitle = styled.h3`
  font-size: 1.3rem;
  color: #FF4500;
  margin: 0 0 0.5rem 0;
`;

const MilestoneDescription = styled.p`
  color: #ccc;
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
`;

const MilestonePrice = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.achieved ? '#00FF88' : '#999'};
`;

const MilestoneStatus = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => props.achieved ? '#00FF88' : '#999'};
  background: ${props => props.achieved ? 
    'rgba(0, 255, 136, 0.1)' : 
    'rgba(139, 0, 0, 0.1)'
  };
  border: 1px solid ${props => props.achieved ? 
    'rgba(0, 255, 136, 0.3)' : 
    'rgba(139, 0, 0, 0.3)'
  };
`;

const AdvancedMetrics = styled.div`
  max-width: 1400px;
  margin: 0 auto 2rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const MetricCard = styled.div`
  background: rgba(139, 0, 0, 0.05);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 0, 0, 0.1);
    border-color: #FF4500;
  }
`;

const MetricHeader = styled.h3`
  color: #FF4500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
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
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
`;

const MetricItemLabel = styled.span`
  color: #ccc;
  font-size: 0.9rem;
`;

const MetricItemValue = styled.span`
  color: ${props => props.positive ? '#00FF88' : '#fff'};
  font-weight: 600;
  font-size: 1rem;
`;

const EvolutionFooter = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const InsightCard = styled.div`
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
    transform: translateY(-2px);
  }
`;

const InsightIcon = styled.div`
  font-size: 2rem;
  color: #FF4500;
`;

const InsightContent = styled.div`
  flex: 1;
`;

const InsightTitle = styled.h4`
  color: #FF4500;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const InsightText = styled.p`
  color: #ccc;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

export default Evolution;

