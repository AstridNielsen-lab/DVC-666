import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaTimes, FaCheck, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { SiMetamask, SiBinance } from 'react-icons/si';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

// Configuração das carteiras suportadas
const SUPPORTED_WALLETS = {
  // Carteiras Web3 Principais
  metamask: {
    name: 'MetaMask',
    icon: '🦊',
    description: 'A carteira mais popular para DeFi',
    downloadUrl: 'https://metamask.io/download/',
    type: 'web3',
    popular: true,
    detector: () => window.ethereum?.isMetaMask,
    connector: async () => {
      if (!window.ethereum?.isMetaMask) throw new Error('MetaMask não está instalado');
      return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  },
  
  trustWallet: {
    name: 'Trust Wallet',
    icon: '🛡️',
    description: 'Carteira móvel mais popular do mundo',
    downloadUrl: 'https://trustwallet.com/',
    type: 'web3',
    popular: true,
    detector: () => window.ethereum?.isTrust || window.trustwallet,
    connector: async () => {
      if (window.ethereum?.isTrust) {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (window.trustwallet) {
        return await window.trustwallet.request({ method: 'eth_requestAccounts' });
      }
      throw new Error('Trust Wallet não está instalado');
    }
  },

  coinbaseWallet: {
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Carteira oficial da maior exchange dos EUA',
    downloadUrl: 'https://wallet.coinbase.com/',
    type: 'web3',
    popular: true,
    detector: () => window.ethereum?.isCoinbaseWallet,
    connector: async () => {
      if (!window.ethereum?.isCoinbaseWallet) throw new Error('Coinbase Wallet não está instalado');
      return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  },

  binanceWallet: {
    name: 'Binance Chain Wallet',
    icon: '🔶',
    description: 'Carteira oficial da Binance para BSC',
    downloadUrl: 'https://www.bnbchain.org/en/wallets',
    type: 'web3',
    popular: true,
    detector: () => window.BinanceChain || window.ethereum?.isBinance,
    connector: async () => {
      if (window.BinanceChain) {
        return await window.BinanceChain.request({ method: 'eth_requestAccounts' });
      } else if (window.ethereum?.isBinance) {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      throw new Error('Binance Wallet não está instalado');
    }
  },

  // Carteiras Web3 Adiccionais
  okxWallet: {
    name: 'OKX Wallet',
    icon: '⭕',
    description: 'Carteira da exchange OKX com DeFi integrado',
    downloadUrl: 'https://www.okx.com/web3',
    type: 'web3',
    detector: () => window.okxwallet || window.ethereum?.isOkxWallet,
    connector: async () => {
      if (window.okxwallet) {
        return await window.okxwallet.request({ method: 'eth_requestAccounts' });
      } else if (window.ethereum?.isOkxWallet) {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      throw new Error('OKX Wallet não está instalado');
    }
  },

  phantomWallet: {
    name: 'Phantom Wallet',
    icon: '👻',
    description: 'Popular carteira multi-chain (Solana/Ethereum)',
    downloadUrl: 'https://phantom.app/',
    type: 'web3',
    detector: () => window.phantom?.ethereum || window.ethereum?.isPhantom,
    connector: async () => {
      if (window.phantom?.ethereum) {
        return await window.phantom.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (window.ethereum?.isPhantom) {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      throw new Error('Phantom Wallet não está instalado');
    }
  },

  rainbowWallet: {
    name: 'Rainbow Wallet',
    icon: '🌈',
    description: 'Carteira móvel com interface moderna',
    downloadUrl: 'https://rainbow.me/',
    type: 'web3',
    detector: () => window.ethereum?.isRainbow,
    connector: async () => {
      if (!window.ethereum?.isRainbow) throw new Error('Rainbow Wallet não está instalado');
      return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  },

  braveWallet: {
    name: 'Brave Wallet',
    icon: '🦁',
    description: 'Carteira nativa do navegador Brave',
    downloadUrl: 'https://brave.com/wallet/',
    type: 'web3',
    detector: () => window.ethereum?.isBraveWallet,
    connector: async () => {
      if (!window.ethereum?.isBraveWallet) throw new Error('Brave Wallet não está disponível');
      return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  },

  // WalletConnect para carteiras móveis
  walletConnect: {
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Conecte 300+ carteiras móveis via QR Code',
    downloadUrl: 'https://walletconnect.com/',
    type: 'walletconnect',
    popular: false,
    detector: () => true,
    connector: async () => {
      // Implementação básica do WalletConnect - será implementada futuramente
      throw new Error('WalletConnect: Funcionalidade em desenvolvimento');
    }
  },

  // Exchanges Brasileiras
  mercadoPago: {
    name: 'Mercado Pago Crypto',
    icon: '💳',
    description: 'Conecte sua conta Mercado Pago (em breve)',
    downloadUrl: 'https://www.mercadopago.com.br/crypto',
    type: 'exchange',
    country: 'BR',
    detector: () => false,
    connector: async () => {
      // Implementação futura da API do Mercado Pago
      throw new Error('Integração Mercado Pago em desenvolvimento');
    }
  },

  bitprecoExchange: {
    name: 'BitPreço',
    icon: '🇧🇷',
    description: 'Exchange brasileira com taxa zero',
    downloadUrl: 'https://www.bitpreco.com/',
    type: 'exchange',
    country: 'BR',
    detector: () => false,
    connector: async () => {
      // Integração futura - sem abrir nova janela
      throw new Error('Integração BitPreço em desenvolvimento');
    }
  },

  foxbitExchange: {
    name: 'Foxbit',
    icon: '🦊',
    description: 'Primeira exchange brasileira de Bitcoin',
    downloadUrl: 'https://foxbit.com.br/',
    type: 'exchange',
    country: 'BR',
    detector: () => false,
    connector: async () => {
      // Integração futura - sem abrir nova janela
      throw new Error('Integração Foxbit em desenvolvimento');
    }
  },

  novadaxExchange: {
    name: 'NovaDAX',
    icon: '🌟',
    description: 'Exchange brasileira com staking',
    downloadUrl: 'https://www.novadax.com.br/',
    type: 'exchange',
    country: 'BR',
    detector: () => false,
    connector: async () => {
      // Integração futura - sem abrir nova janela
      throw new Error('Integração NovaDAX em desenvolvimento');
    }
  },

  // Exchanges Internacionais
  binanceExchange: {
    name: 'Binance Exchange',
    icon: '🏦',
    description: 'Maior exchange de criptomoedas do mundo',
    downloadUrl: 'https://www.binance.com/',
    type: 'exchange',
    popular: true,
    detector: () => false,
    connector: async () => {
      // Integração futura - sem abrir nova janela
      throw new Error('Integração Binance Exchange em desenvolvimento');
    }
  },

  kucoinExchange: {
    name: 'KuCoin',
    icon: '🔷',
    description: 'Exchange com mais de 700 criptomoedas',
    downloadUrl: 'https://www.kucoin.com/',
    type: 'exchange',
    detector: () => false,
    connector: async () => {
      // Integração futura - sem abrir nova janela
      throw new Error('Integração KuCoin em desenvolvimento');
    }
  },

  gateioExchange: {
    name: 'Gate.io',
    icon: '🚪',
    description: 'Exchange com trading avançado',
    downloadUrl: 'https://www.gate.io/',
    type: 'exchange',
    detector: () => false,
    connector: async () => {
      // Integração futura - sem abrir nova janela
      throw new Error('Integração Gate.io em desenvolvimento');
    }
  },

  // Carteiras Hardware
  ledgerWallet: {
    name: 'Ledger',
    icon: '🔒',
    description: 'Carteira hardware mais segura',
    downloadUrl: 'https://www.ledger.com/',
    type: 'hardware',
    detector: () => false,
    connector: async () => {
      throw new Error('Conecte seu Ledger via MetaMask ou outro provedor');
    }
  },

  trezorWallet: {
    name: 'Trezor',
    icon: '🛡️',
    description: 'Pioneira em carteiras hardware',
    downloadUrl: 'https://trezor.io/',
    type: 'hardware',
    detector: () => false,
    connector: async () => {
      throw new Error('Conecte seu Trezor via MetaMask ou outro provedor');
    }
  }
};

// Configuração das redes
const NETWORKS = {
  ethereum: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://etherscan.io']
  },
  bsc: {
    chainId: '0x38',
    chainName: 'BNB Smart Chain',
    rpcUrls: ['https://bsc-dataseed1.binance.org'],
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    blockExplorerUrls: ['https://bscscan.com']
  },
  polygon: {
    chainId: '0x89',
    chainName: 'Polygon',
    rpcUrls: ['https://polygon-rpc.com'],
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    blockExplorerUrls: ['https://polygonscan.com']
  },
  arbitrum: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum One',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://arbiscan.io']
  }
};

const WalletConnector = ({ isOpen, onClose, onConnect }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [walletStatuses, setWalletStatuses] = useState({});

  // Verificar carteiras instaladas
  useEffect(() => {
    const checkWallets = () => {
      const statuses = {};
      Object.entries(SUPPORTED_WALLETS).forEach(([key, wallet]) => {
        statuses[key] = {
          installed: wallet.detector(),
          available: wallet.detector() || key === 'walletConnect'
        };
      });
      setWalletStatuses(statuses);
    };

    checkWallets();
    const interval = setInterval(checkWallets, 1000);
    return () => clearInterval(interval);
  }, []);

  // Verificar conexão existente
  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setCurrentNetwork(chainId);
          onConnect?.(accounts[0], chainId);
        }
      } catch (error) {
        console.error('Error checking existing connection:', error);
      }
    }
  };

  const connectWallet = async (walletKey) => {
    const wallet = SUPPORTED_WALLETS[walletKey];
    if (!wallet) return;

    setIsConnecting(true);
    setSelectedWallet(walletKey);

    try {
      if (!walletStatuses[walletKey]?.available) {
        toast.error(`${wallet.name} não está disponível. Instale a extensão primeiro.`);
        window.open(wallet.downloadUrl, '_blank');
        return;
      }

      const accounts = await wallet.connector();
      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        setConnectedAccount(account);
        
        // Verificar rede atual
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setCurrentNetwork(chainId);
        
        toast.success(`Conectado com ${wallet.name}!`);
        onConnect?.(account, chainId);
        
        // Auto-adicionar token DVC666
        await addTokenToWallet();
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error(error.message || `Erro ao conectar com ${wallet.name}`);
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  const switchNetwork = async (networkKey) => {
    const network = NETWORKS[networkKey];
    if (!network || !window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }]
      });
      setCurrentNetwork(network.chainId);
      toast.success(`Rede alterada para ${network.chainName}`);
    } catch (error) {
      if (error.code === 4902) {
        // Rede não existe, tentar adicionar
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network]
          });
          setCurrentNetwork(network.chainId);
          toast.success(`Rede ${network.chainName} adicionada e selecionada!`);
        } catch (addError) {
          toast.error(`Erro ao adicionar rede: ${addError.message}`);
        }
      } else {
        toast.error(`Erro ao trocar rede: ${error.message}`);
      }
    }
  };

  const addTokenToWallet = async () => {
    if (!window.ethereum || !connectedAccount) return;

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: process.env.REACT_APP_CONTRACT_ADDRESS || '0x...', // Será preenchido após deploy
            symbol: 'DVC666',
            decimals: 18,
            image: 'https://dvc666.com/logo.png'
          }
        }
      });
      toast.success('Token DVC666 adicionado à carteira!');
    } catch (error) {
      console.error('Error adding token:', error);
    }
  };

  const disconnect = () => {
    setConnectedAccount(null);
    setCurrentNetwork(null);
    onConnect?.(null, null);
    toast.success('Carteira desconectada');
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId) => {
    const network = Object.values(NETWORKS).find(n => n.chainId === chainId);
    return network?.chainName || 'Rede Desconhecida';
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <ModalHeader>
          <ModalTitle>
            <FaWallet /> Conectar Carteira
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        {connectedAccount ? (
          <ConnectedSection>
            <ConnectionStatus>
              <FaCheck color="#00ff00" />
              <span>Conectado</span>
            </ConnectionStatus>
            
            <AccountInfo>
              <AccountAddress>{formatAddress(connectedAccount)}</AccountAddress>
              <NetworkInfo>
                Rede: {getNetworkName(currentNetwork)}
              </NetworkInfo>
            </AccountInfo>

            <NetworkGrid>
              <NetworkTitle>Trocar Rede:</NetworkTitle>
              {Object.entries(NETWORKS).map(([key, network]) => (
                <NetworkButton
                  key={key}
                  onClick={() => switchNetwork(key)}
                  active={currentNetwork === network.chainId}
                >
                  {network.chainName}
                </NetworkButton>
              ))}
            </NetworkGrid>

            <ActionButtons>
              <AddTokenButton onClick={addTokenToWallet}>
                Adicionar DVC666 Token
              </AddTokenButton>
              <DisconnectButton onClick={disconnect}>
                Desconectar
              </DisconnectButton>
            </ActionButtons>
          </ConnectedSection>
        ) : (
          <WalletGrid>
            {sortWallets(SUPPORTED_WALLETS).map(([key, wallet]) => {
              const status = walletStatuses[key];
              const isLoading = isConnecting && selectedWallet === key;
              
              return (
                <WalletCard
                  key={key}
                  onClick={() => connectWallet(key)}
                  disabled={!status?.available || isLoading}
                  available={status?.available}
                  isMetaMask={key === 'metamask'}
                >
                  <WalletIcon>{wallet.icon}</WalletIcon>
                  <WalletInfo>
                    <WalletName>{wallet.name}</WalletName>
                    <WalletDescription>{wallet.description}</WalletDescription>
                    {key === 'metamask' && (
                      <WalletBadge>✨ Recomendado</WalletBadge>
                    )}
                  </WalletInfo>
                  
                  <WalletStatus>
                    {isLoading ? (
                      <FaSpinner className="spinning" />
                    ) : status?.installed ? (
                      <FaCheck color="#00ff00" />
                    ) : status?.available ? (
                      <span>Disponível</span>
                    ) : (
                      <FaExclamationTriangle color="#ffaa00" />
                    )}
                  </WalletStatus>
                </WalletCard>
              );
            })}
          </WalletGrid>
        )}

        <ModalFooter>
          <FooterText>
            🔒 Suas chaves privadas nunca saem do seu dispositivo
          </FooterText>
          <FooterText>
            💡 Dica: Use MetaMask para a melhor experiência
          </FooterText>
        </ModalFooter>
      </Modal>
    </Overlay>
  );
};

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500; /* Above sidebar */
  backdrop-filter: blur(5px);
`;

const Modal = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a1a1a 100%);
  border-radius: 20px;
  border: 1px solid rgba(139, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(139, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  color: #ff4500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff4500;
  }
`;

const ConnectedSection = styled.div`
  padding: 2rem;
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #00ff00;
  font-weight: 600;
`;

const AccountInfo = styled.div`
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const AccountAddress = styled.div`
  font-family: 'Monaco', monospace;
  font-size: 1.2rem;
  color: #ff4500;
  margin-bottom: 0.5rem;
`;

const NetworkInfo = styled.div`
  color: #ccc;
  font-size: 0.9rem;
`;

const NetworkGrid = styled.div`
  margin-bottom: 2rem;
`;

const NetworkTitle = styled.h3`
  color: #fff;
  margin-bottom: 1rem;
`;

const NetworkButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #8B0000, #FF4500)' : 'rgba(139, 0, 0, 0.1)'};
  border: 1px solid ${props => props.active ? '#FF4500' : 'rgba(139, 0, 0, 0.3)'};
  color: ${props => props.active ? '#fff' : '#ccc'};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #8B0000, #FF4500)' : 'rgba(139, 0, 0, 0.2)'};
    color: #fff;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AddTokenButton = styled.button`
  background: linear-gradient(135deg, #8B0000, #FF4500);
  border: none;
  color: white;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const DisconnectButton = styled.button`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff4444;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const WalletGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 2rem;
`;

// Função para ordenar carteiras (MetaMask primeiro)
const sortWallets = (wallets) => {
  const walletEntries = Object.entries(wallets);
  
  // Separar por tipo e popularidade
  const metamask = walletEntries.filter(([key]) => key === 'metamask');
  const popularWeb3 = walletEntries.filter(([key, wallet]) => 
    key !== 'metamask' && wallet.type === 'web3' && wallet.popular
  );
  const otherWeb3 = walletEntries.filter(([key, wallet]) => 
    key !== 'metamask' && wallet.type === 'web3' && !wallet.popular
  );
  const walletConnect = walletEntries.filter(([key, wallet]) => 
    wallet.type === 'walletconnect'
  );
  const exchanges = walletEntries.filter(([key, wallet]) => 
    wallet.type === 'exchange'
  );
  const hardware = walletEntries.filter(([key, wallet]) => 
    wallet.type === 'hardware'
  );
  
  return [
    ...metamask,
    ...popularWeb3,
    ...otherWeb3,
    ...walletConnect,
    ...exchanges,
    ...hardware
  ];
};

const WalletCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: ${props => props.available ? 'rgba(139, 0, 0, 0.1)' : 'rgba(100, 100, 100, 0.1)'};
  border: 1px solid ${props => props.available ? 'rgba(139, 0, 0, 0.3)' : 'rgba(100, 100, 100, 0.3)'};
  border-radius: 15px;
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  opacity: ${props => props.available ? 1 : 0.6};
  
  &:hover {
    background: ${props => props.available ? 'rgba(139, 0, 0, 0.2)' : 'rgba(100, 100, 100, 0.1)'};
    transform: ${props => props.available ? 'translateY(-2px)' : 'none'};
  }
`;

const WalletIcon = styled.div`
  font-size: 3rem;
  margin-right: 1rem;
`;

const WalletInfo = styled.div`
  flex: 1;
`;

const WalletName = styled.h3`
  color: #fff;
  margin: 0 0 0.5rem 0;
`;

const WalletDescription = styled.p`
  color: #ccc;
  margin: 0;
  font-size: 0.9rem;
`;

const WalletBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
`;

const WalletStatus = styled.div`
  .spinning {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ModalFooter = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(139, 0, 0, 0.2);
  text-align: center;
`;

const FooterText = styled.p`
  color: #999;
  margin: 0.25rem 0;
  font-size: 0.9rem;
`;

export default WalletConnector;

