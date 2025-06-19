import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWallet, FaPlus, FaTrash, FaEdit, FaCopy, FaExternalLinkAlt, 
  FaEye, FaEyeSlash, FaQrcode, FaDownload, FaUpload, FaSync,
  FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaCog
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const WalletDashboard = ({ connectedWallets = [], onAddWallet, onRemoveWallet }) => {
  const [showBalances, setShowBalances] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletBalances, setWalletBalances] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simular dados de carteiras para demonstração
  const [mockWallets] = useState([
    {
      id: 'metamask-1',
      name: 'MetaMask Principal',
      type: 'MetaMask',
      address: '0x742D35Cc6648C753...f4C8',
      balance: {
        ETH: '2.456',
        DVC666: '13,333',
        USDT: '1,250.00'
      },
      network: 'Ethereum',
      status: 'connected',
      icon: '🦊',
      favorite: true
    },
    {
      id: 'trust-1',
      name: 'Trust Wallet Mobile',
      type: 'Trust Wallet',
      address: '0x8A3b1C29D5f4...2A8C',
      balance: {
        BNB: '5.234',
        DVC666: '25,000',
        BUSD: '850.00'
      },
      network: 'BSC',
      status: 'connected',
      icon: '🛡️',
      favorite: false
    },
    {
      id: 'binance-1',
      name: 'Binance Exchange',
      type: 'Binance',
      address: 'binance_user_123',
      balance: {
        BTC: '0.0234',
        ETH: '1.567',
        DVC666: '50,000',
        USDT: '2,450.00'
      },
      network: 'Binance',
      status: 'connected',
      icon: '🔶',
      favorite: true
    },
    {
      id: 'mercadopago-1',
      name: 'Mercado Pago Crypto',
      type: 'Mercado Pago',
      address: 'mp_crypto_user_456',
      balance: {
        BTC: '0.0156',
        ETH: '0.789',
        DVC666: '0',
        BRL: '5,250.00'
      },
      network: 'Mercado Pago',
      status: 'pending',
      icon: '💳',
      favorite: false
    }
  ]);

  const refreshBalances = async () => {
    setIsRefreshing(true);
    // Simular refresh de saldos
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Saldos atualizados!');
    setIsRefreshing(false);
  };

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    toast.success('Endereço copiado!');
  };

  const toggleFavorite = (walletId) => {
    // Implementar toggle de favorito
    toast.success('Favorito atualizado!');
  };

  const exportWalletData = (wallet) => {
    const data = JSON.stringify(wallet, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${wallet.name.replace(/\s+/g, '_')}_data.json`;
    a.click();
    toast.success('Dados da carteira exportados!');
  };

  const formatBalance = (amount) => {
    if (!amount) return '0.00';
    return parseFloat(amount.replace(/,/g, '')).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return '#00ff00';
      case 'pending': return '#ffaa00';
      case 'disconnected': return '#ff0000';
      default: return '#999';
    }
  };

  const getTotalPortfolioValue = () => {
    // Simulação de cálculo de valor total em USD
    return '$12,450.67';
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTitle>
          <FaWallet /> Painel de Carteiras
        </HeaderTitle>
        <HeaderActions>
          <RefreshButton onClick={refreshBalances} disabled={isRefreshing}>
            <FaSync className={isRefreshing ? 'spinning' : ''} />
            {isRefreshing ? 'Atualizando...' : 'Atualizar'}
          </RefreshButton>
          <AddWalletButton onClick={onAddWallet}>
            <FaPlus /> Adicionar Carteira
          </AddWalletButton>
        </HeaderActions>
      </DashboardHeader>

      <PortfolioSummary>
        <SummaryCard>
          <SummaryTitle>Valor Total do Portfólio</SummaryTitle>
          <SummaryValue>{getTotalPortfolioValue()}</SummaryValue>
          <SummaryChange positive>+5.67% (24h)</SummaryChange>
        </SummaryCard>
        
        <SummaryCard>
          <SummaryTitle>DVC666 Total</SummaryTitle>
          <SummaryValue>88,333 DVC666</SummaryValue>
          <SummaryChange positive>+12.34% (24h)</SummaryChange>
        </SummaryCard>
        
        <SummaryCard>
          <SummaryTitle>Carteiras Ativas</SummaryTitle>
          <SummaryValue>{mockWallets.filter(w => w.status === 'connected').length}</SummaryValue>
          <SummarySubtext>de {mockWallets.length} total</SummarySubtext>
        </SummaryCard>
      </PortfolioSummary>

      <DashboardControls>
        <ControlGroup>
          <ToggleButton 
            active={showBalances} 
            onClick={() => setShowBalances(!showBalances)}
          >
            {showBalances ? <FaEye /> : <FaEyeSlash />}
            {showBalances ? 'Ocultar Saldos' : 'Mostrar Saldos'}
          </ToggleButton>
        </ControlGroup>
      </DashboardControls>

      <WalletsGrid>
        {mockWallets.map(wallet => (
          <WalletCard 
            key={wallet.id}
            onClick={() => setSelectedWallet(selectedWallet === wallet.id ? null : wallet.id)}
            expanded={selectedWallet === wallet.id}
          >
            <WalletHeader>
              <WalletIcon>{wallet.icon}</WalletIcon>
              <WalletInfo>
                <WalletName>{wallet.name}</WalletName>
                <WalletType>{wallet.type} • {wallet.network}</WalletType>
              </WalletInfo>
              <WalletStatus>
                <StatusIndicator color={getStatusColor(wallet.status)} />
                <StatusText>{wallet.status}</StatusText>
                {wallet.favorite && <FavoriteIcon>⭐</FavoriteIcon>}
              </WalletStatus>
            </WalletHeader>

            <WalletAddress>
              <AddressText>{wallet.address}</AddressText>
              <AddressActions>
                <ActionButton onClick={(e) => { e.stopPropagation(); copyAddress(wallet.address); }}>
                  <FaCopy />
                </ActionButton>
                <ActionButton onClick={(e) => { e.stopPropagation(); }}>
                  <FaQrcode />
                </ActionButton>
                <ActionButton onClick={(e) => { e.stopPropagation(); }}>
                  <FaExternalLinkAlt />
                </ActionButton>
              </AddressActions>
            </WalletAddress>

            <BalanceSection>
              {Object.entries(wallet.balance).map(([token, amount]) => (
                <BalanceItem key={token}>
                  <TokenSymbol>{token}</TokenSymbol>
                  <TokenAmount>
                    {showBalances ? formatBalance(amount) : '****'}
                  </TokenAmount>
                </BalanceItem>
              ))}
            </BalanceSection>

            <AnimatePresence>
              {selectedWallet === wallet.id && (
                <ExpandedSection
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <SectionTitle>Ações Rápidas</SectionTitle>
                  <QuickActions>
                    <QuickActionButton>
                      <FaUpload /> Enviar
                    </QuickActionButton>
                    <QuickActionButton>
                      <FaDownload /> Receber
                    </QuickActionButton>
                    <QuickActionButton>
                      <FaSync /> Trocar
                    </QuickActionButton>
                    <QuickActionButton>
                      <FaCog /> Config
                    </QuickActionButton>
                  </QuickActions>

                  <SectionTitle>Configurações</SectionTitle>
                  <WalletSettings>
                    <SettingRow>
                      <SettingLabel>Favorita</SettingLabel>
                      <ToggleSwitch 
                        active={wallet.favorite}
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(wallet.id); }}
                      />
                    </SettingRow>
                    <SettingRow>
                      <SettingLabel>Notificações</SettingLabel>
                      <ToggleSwitch active={true} />
                    </SettingRow>
                    <SettingRow>
                      <SettingLabel>Auto-refresh</SettingLabel>
                      <ToggleSwitch active={false} />
                    </SettingRow>
                  </WalletSettings>

                  <DangerZone>
                    <DangerButton onClick={(e) => { e.stopPropagation(); exportWalletData(wallet); }}>
                      <FaDownload /> Exportar Dados
                    </DangerButton>
                    <DangerButton onClick={(e) => { e.stopPropagation(); onRemoveWallet?.(wallet.id); }}>
                      <FaTrash /> Remover Carteira
                    </DangerButton>
                  </DangerZone>
                </ExpandedSection>
              )}
            </AnimatePresence>
          </WalletCard>
        ))}
      </WalletsGrid>

      {mockWallets.length === 0 && (
        <EmptyState>
          <EmptyIcon><FaWallet /></EmptyIcon>
          <EmptyTitle>Nenhuma carteira conectada</EmptyTitle>
          <EmptyDescription>
            Conecte sua primeira carteira para começar a usar o DVC666
          </EmptyDescription>
          <AddWalletButton onClick={onAddWallet}>
            <FaPlus /> Conectar Primeira Carteira
          </AddWalletButton>
        </EmptyState>
      )}
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderTitle = styled.h1`
  color: #ff4500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const RefreshButton = styled.button`
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.3);
  color: #fff;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinning {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const AddWalletButton = styled.button`
  background: linear-gradient(135deg, #8B0000, #FF4500);
  border: none;
  color: white;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PortfolioSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryCard = styled.div`
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
`;

const SummaryTitle = styled.h3`
  color: #ccc;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SummaryValue = styled.div`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SummaryChange = styled.div`
  color: ${props => props.positive ? '#00ff00' : '#ff0000'};
  font-size: 0.9rem;
  font-weight: 600;
`;

const SummarySubtext = styled.div`
  color: #999;
  font-size: 0.8rem;
`;

const DashboardControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #8B0000, #FF4500)' : 'rgba(139, 0, 0, 0.1)'};
  border: 1px solid rgba(139, 0, 0, 0.3);
  color: #fff;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #8B0000, #FF4500)' : 'rgba(139, 0, 0, 0.2)'};
  }
`;

const WalletsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const WalletCard = styled.div`
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const WalletIcon = styled.div`
  font-size: 2.5rem;
`;

const WalletInfo = styled.div`
  flex: 1;
`;

const WalletName = styled.h3`
  color: #fff;
  margin: 0 0 0.25rem 0;
`;

const WalletType = styled.div`
  color: #ccc;
  font-size: 0.9rem;
`;

const WalletStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const StatusText = styled.div`
  color: #ccc;
  font-size: 0.8rem;
  text-transform: capitalize;
`;

const FavoriteIcon = styled.div`
  font-size: 1rem;
`;

const WalletAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const AddressText = styled.div`
  font-family: 'Monaco', monospace;
  color: #ff4500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddressActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ff4500;
    background: rgba(139, 0, 0, 0.1);
  }
`;

const BalanceSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const BalanceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const TokenSymbol = styled.div`
  color: #ccc;
  font-size: 0.8rem;
  font-weight: 600;
`;

const TokenAmount = styled.div`
  color: #fff;
  font-weight: 600;
`;

const ExpandedSection = styled(motion.div)`
  border-top: 1px solid rgba(139, 0, 0, 0.2);
  padding-top: 1rem;
  margin-top: 1rem;
`;

const SectionTitle = styled.h4`
  color: #ff4500;
  margin: 0 0 1rem 0;
  font-size: 1rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const QuickActionButton = styled.button`
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.3);
  color: #fff;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 0, 0, 0.2);
    transform: translateY(-1px);
  }
`;

const WalletSettings = styled.div`
  margin-bottom: 2rem;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
`;

const SettingLabel = styled.div`
  color: #ccc;
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background: ${props => props.active ? '#ff4500' : '#333'};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.active ? '22px' : '2px'};
    transition: all 0.3s ease;
  }
`;

const DangerZone = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const DangerButton = styled.button`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff4444;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 0, 0, 0.2);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #ccc;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  margin-bottom: 2rem;
  opacity: 0.7;
`;

export default WalletDashboard;

