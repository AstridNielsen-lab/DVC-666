import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFire, FaRocket, FaWallet, FaEthereum, FaCheck, FaSpinner } from 'react-icons/fa';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0x...';
const PRESALE_ABI = [
  "function buyTokens() external payable",
  "function getTokenAmount(uint256 ethAmount) external view returns (uint256)",
  "function getPresaleInfo() external view returns (uint256 price, uint256 sold, uint256 remaining, bool active)",
  "function getMinMaxPurchase() external view returns (uint256 min, uint256 max)",
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost)"
];

const Presale = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [ethAmount, setEthAmount] = useState('0.001');
  const [tokenAmount, setTokenAmount] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [presaleInfo, setPresaleInfo] = useState({
    price: '0.0001',
    sold: '0',
    remaining: '13333333',
    active: true
  });
  const [contract, setContract] = useState(null);

  const loadPresaleInfo = useCallback(async (contractInstance) => {
    try {
      const info = await contractInstance.getPresaleInfo();
      setPresaleInfo({
        price: ethers.utils.formatEther(info.price),
        sold: ethers.utils.formatEther(info.sold),
        remaining: ethers.utils.formatEther(info.remaining),
        active: info.active
      });
    } catch (error) {
      console.error('Error loading presale info:', error);
    }
  }, []);

  const initContract = useCallback(async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, PRESALE_ABI, signer);
      setContract(contractInstance);
      await loadPresaleInfo(contractInstance);
    }
  }, [loadPresaleInfo]);

  const checkWalletConnection = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
          await initContract();
        }
      } catch (error) {
        console.error('Error checking wallet:', error);
      }
    }
  }, [initContract]);

  const calculateTokenAmount = useCallback(() => {
    if (ethAmount && presaleInfo.price) {
      const tokens = parseFloat(ethAmount) / parseFloat(presaleInfo.price);
      setTokenAmount(tokens.toFixed(0));
    }
  }, [ethAmount, presaleInfo.price]);

  useEffect(() => {
    checkWalletConnection();
    calculateTokenAmount();
  }, [checkWalletConnection, calculateTokenAmount]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await checkWalletConnection();
        toast.success('Wallet connected successfully!');
      } catch (error) {
        toast.error('Failed to connect wallet');
      }
    } else {
      toast.error('Please install MetaMask!');
    }
  };

  const addTokenToMetaMask = async () => {
    if (window.ethereum && contract) {
      try {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: CONTRACT_ADDRESS,
              symbol: 'DVC666',
              decimals: 18,
              image: 'https://your-domain.com/dvc666-logo.png'
            }
          }
        });
        toast.success('DVC666 token added to MetaMask!');
      } catch (error) {
        toast.error('Failed to add token to MetaMask');
      }
    }
  };

  const buyTokens = async () => {
    if (!contract || !isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (parseFloat(ethAmount) < 0.001) {
      toast.error('Minimum purchase is 0.001 ETH');
      return;
    }

    if (parseFloat(ethAmount) > 10) {
      toast.error('Maximum purchase is 10 ETH');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await contract.buyTokens({
        value: ethers.utils.parseEther(ethAmount)
      });
      
      toast.success('Transaction submitted! Waiting for confirmation...');
      
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        toast.success(`Successfully bought ${tokenAmount} DVC666 tokens!`);
        await loadPresaleInfo(contract);
        await addTokenToMetaMask();
      } else {
        toast.error('Transaction failed');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      if (error.code === 4001) {
        toast.error('Transaction rejected by user');
      } else if (error.message.includes('insufficient funds')) {
        toast.error('Insufficient ETH balance');
      } else {
        toast.error('Transaction failed: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const progress = presaleInfo.sold && presaleInfo.remaining ? 
    (parseFloat(presaleInfo.sold) / (parseFloat(presaleInfo.sold) + parseFloat(presaleInfo.remaining))) * 100 : 0;

  return (
    <PresaleContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <PresaleHeader>
          <FaFire />
          <h1>DVC666 Presale</h1>
          <p>Get Devil's Coin 666 tokens at the best price - 0.0001 ETH each!</p>
          <PresaleStatus active={presaleInfo.active}>
            {presaleInfo.active ? '🟢 PRESALE ACTIVE' : '🔴 PRESALE ENDED'}
          </PresaleStatus>
        </PresaleHeader>
        
        <PresaleContent>
          <PresaleStats>
            <StatCard>
              <StatLabel>Token Price</StatLabel>
              <StatValue>0.0001 ETH</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Tokens Sold</StatLabel>
              <StatValue>{parseInt(presaleInfo.sold).toLocaleString()} DVC666</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Progress</StatLabel>
              <StatValue>{progress.toFixed(1)}%</StatValue>
            </StatCard>
          </PresaleStats>

          <ProgressBarContainer>
            <ProgressBar width={progress} />
            <ProgressText>{progress.toFixed(1)}% Complete</ProgressText>
          </ProgressBarContainer>

          <PurchaseCard>
            <h2>💰 Buy DVC666 Tokens</h2>
            
            {!isConnected ? (
              <ConnectSection>
                <ConnectButton onClick={connectWallet}>
                  <FaWallet /> Connect MetaMask
                </ConnectButton>
                <p>Connect your wallet to participate in the presale</p>
              </ConnectSection>
            ) : (
              <PurchaseSection>
                <WalletInfo>
                  <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
                  <FaCheck color="#00ff00" />
                </WalletInfo>
                
                <InputGroup>
                  <Label>ETH Amount</Label>
                  <Input
                    type="number"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    min="0.001"
                    max="10"
                    step="0.001"
                    placeholder="0.001"
                  />
                  <InputNote>Min: 0.001 ETH • Max: 10 ETH</InputNote>
                </InputGroup>
                
                <ConversionInfo>
                  <FaEthereum />
                  <span>{ethAmount} ETH = {parseInt(tokenAmount).toLocaleString()} DVC666</span>
                </ConversionInfo>
                
                <BuyButton 
                  onClick={buyTokens} 
                  disabled={isLoading || !presaleInfo.active}
                >
                  {isLoading ? (
                    <><FaSpinner className="spinning" /> Processing...</>
                  ) : (
                    <><FaRocket /> Buy DVC666 Tokens</>
                  )}
                </BuyButton>
                
                <AddTokenButton onClick={addTokenToMetaMask}>
                  Add DVC666 to MetaMask
                </AddTokenButton>
              </PurchaseSection>
            )}
          </PurchaseCard>
        </PresaleContent>
      </motion.div>
    </PresaleContainer>
  );
};

const PresaleContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PresaleHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  svg {
    font-size: 4rem;
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const PresaleContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;


const PresaleStatus = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  margin-top: 1rem;
  background: ${props => props.active ? 
    'linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 200, 0, 0.2))' :
    'linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(200, 0, 0, 0.2))'
  };
  color: ${props => props.active ? '#00ff00' : '#ff4444'};
  border: 1px solid ${props => props.active ? '#00ff00' : '#ff4444'};
`;

const PresaleStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const ProgressBarContainer = styled.div`
  background: rgba(26, 26, 26, 0.8);
  border-radius: 25px;
  height: 40px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  background: linear-gradient(90deg, #8B0000, #FF4500);
  height: 100%;
  width: ${props => props.width}%;
  border-radius: 25px;
  transition: width 0.5s ease;
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
`;

const PurchaseCard = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const ConnectSection = styled.div`
  text-align: center;
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    margin-top: 1rem;
  }
`;

const ConnectButton = styled.button`
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
  margin: 0 auto;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.3);
  }
`;

const PurchaseSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const Input = styled.input`
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 10px rgba(139, 0, 0, 0.3);
  }
`;

const InputNote = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const ConversionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 69, 0, 0.1);
  border: 1px solid rgba(255, 69, 0, 0.3);
  border-radius: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

const BuyButton = styled.button`
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
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.3);
  }
  
  .spinning {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const AddTokenButton = styled.button`
  background: rgba(139, 0, 0, 0.1);
  color: ${props => props.theme.colors.primary};
  border: 1px solid rgba(139, 0, 0, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 0, 0, 0.2);
    transform: translateY(-1px);
  }
`;

export default Presale;

