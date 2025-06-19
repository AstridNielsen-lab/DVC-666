import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

// Configuração das redes
const NETWORKS = {
  '0x1': { name: 'Ethereum', symbol: 'ETH', color: '#627eea' },
  '0x38': { name: 'BSC', symbol: 'BNB', color: '#f0b90b' },
  '0x89': { name: 'Polygon', symbol: 'MATIC', color: '#8247e5' },
  '0xa4b1': { name: 'Arbitrum', symbol: 'ETH', color: '#28a0f0' },
  '0xa86a': { name: 'Avalanche', symbol: 'AVAX', color: '#e84142' }
};

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState('0');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Verificar conexão existente
  const checkConnection = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          const balance = await provider.getBalance(accounts[0]);

          setAccount(accounts[0]);
          setChainId(chainId);
          setBalance(ethers.utils.formatEther(balance));
          setProvider(provider);
          setSigner(signer);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  }, []);

  // Conectar carteira
  const connect = useCallback(async (walletType = 'metamask') => {
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        toast.error('MetaMask não está instalado!');
        return false;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const balance = await provider.getBalance(accounts[0]);

        setAccount(accounts[0]);
        setChainId(chainId);
        setBalance(ethers.utils.formatEther(balance));
        setProvider(provider);
        setSigner(signer);
        setIsConnected(true);

        toast.success('Carteira conectada com sucesso!');
        
        // Adicionar DVC666 token automaticamente
        await addTokenToWallet();
        
        return true;
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Erro ao conectar carteira');
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Desconectar carteira
  const disconnect = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setBalance('0');
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
    toast.success('Carteira desconectada');
  }, []);

  // Trocar rede
  const switchNetwork = useCallback(async (targetChainId) => {
    if (!window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }]
      });
      return true;
    } catch (error) {
      if (error.code === 4902) {
        // Rede não existe, tentar adicionar
        return await addNetwork(targetChainId);
      }
      toast.error('Erro ao trocar rede');
      return false;
    }
  }, []);

  // Adicionar rede
  const addNetwork = useCallback(async (chainId) => {
    const networkConfigs = {
      '0x38': {
        chainId: '0x38',
        chainName: 'BNB Smart Chain',
        rpcUrls: ['https://bsc-dataseed1.binance.org'],
        nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
        blockExplorerUrls: ['https://bscscan.com']
      },
      '0x89': {
        chainId: '0x89',
        chainName: 'Polygon',
        rpcUrls: ['https://polygon-rpc.com'],
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
        blockExplorerUrls: ['https://polygonscan.com']
      },
      '0xa4b1': {
        chainId: '0xa4b1',
        chainName: 'Arbitrum One',
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        blockExplorerUrls: ['https://arbiscan.io']
      }
    };

    const config = networkConfigs[chainId];
    if (!config) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [config]
      });
      toast.success(`Rede ${config.chainName} adicionada!`);
      return true;
    } catch (error) {
      toast.error('Erro ao adicionar rede');
      return false;
    }
  }, []);

  // Adicionar token DVC666
  const addTokenToWallet = useCallback(async () => {
    if (!window.ethereum || !account) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: process.env.REACT_APP_CONTRACT_ADDRESS || '0x...', // Será preenchido após deploy
            symbol: 'DVC666',
            decimals: 18,
            image: 'https://dvc666.com/logo.png' // Logo do token
          }
        }
      });
      toast.success('Token DVC666 adicionado à carteira!');
      return true;
    } catch (error) {
      console.error('Error adding token:', error);
      return false;
    }
  }, [account]);

  // Atualizar saldo
  const updateBalance = useCallback(async () => {
    if (provider && account) {
      try {
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error('Error updating balance:', error);
      }
    }
  }, [provider, account]);

  // Formatar endereço
  const formatAddress = useCallback((address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  // Obter informações da rede
  const getNetworkInfo = useCallback((chainId) => {
    return NETWORKS[chainId] || { name: 'Unknown', symbol: 'ETH', color: '#gray' };
  }, []);

  // Event listeners
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
          updateBalance();
        }
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
        updateBalance();
        const networkInfo = getNetworkInfo(chainId);
        toast.success(`Rede alterada para ${networkInfo.name}`);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      };
    }
  }, [account, disconnect, updateBalance, getNetworkInfo]);

  // Verificar conexão ao carregar
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return {
    // Estado
    isConnected,
    account,
    chainId,
    balance,
    provider,
    signer,
    isConnecting,
    
    // Funções
    connect,
    disconnect,
    switchNetwork,
    addNetwork,
    addTokenToWallet,
    updateBalance,
    formatAddress,
    getNetworkInfo,
    
    // Helpers
    networkInfo: getNetworkInfo(chainId),
    formattedAddress: formatAddress(account),
    formattedBalance: parseFloat(balance).toFixed(4)
  };
};

export default useWallet;

