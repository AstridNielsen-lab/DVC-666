# DVC666 Coin - Smart Contracts

🔥 **DVC666 Coin** é um token ERC20 multi-chain com funcionalidades de presale, staking e governança.

## 📋 Características

- **Token ERC20** com 18 decimais
- **Supply Total**: 66,666,666 DVC666
- **Presale Automática** com preço de 0.00010382 ETH por token
- **Staking** com 6.66% APY
- **Multi-Chain**: Ethereum, BSC, Polygon, Arbitrum, Avalanche
- **Integração MetaMask** automática
- **Verificação** automática em exploradores
- **Liquidez** automática em DEXs

## 🚀 Deploy Rápido

### 1. Configuração Inicial

```bash
# Instalar dependências
npm install

# Copiar e configurar variáveis de ambiente
cp .env .env.local
# Edite .env.local com suas chaves privadas e API keys
```

### 2. Deploy em Mainnet

```bash
# Ethereum Mainnet (deploy + verificação + liquidez)
npm run deploy:full:mainnet

# BSC Mainnet
npm run deploy:full:bsc

# Polygon Mainnet
npm run deploy:full:polygon
```

### 3. Deploy Individual

```bash
# Apenas deploy
npm run deploy:mainnet
npm run deploy:bsc
npm run deploy:polygon

# Apenas verificação
npm run verify:mainnet
npm run verify:bsc
npm run verify:polygon

# Apenas liquidez
npm run liquidity:uniswap
npm run liquidity:pancakeswap
npm run liquidity:quickswap
```

## 🔧 Configuração Detalhada

### Variáveis de Ambiente (.env)

```env
# Chave privada do deployer (OBRIGATÓRIO)
PRIVATE_KEY="sua_chave_privada_aqui"

# API Keys para verificação
ETHERSCAN_API_KEY="sua_etherscan_api_key"
BSCSCAN_API_KEY="sua_bscscan_api_key"
POLYGONSCAN_API_KEY="sua_polygonscan_api_key"

# URLs RPC (já configuradas com endpoints públicos)
MAINNET_RPC_URL="https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
BSC_RPC_URL="https://bsc-dataseed1.binance.org/"
POLYGON_RPC_URL="https://polygon-rpc.com/"
```

### Obter API Keys

1. **Etherscan**: https://etherscan.io/apis
2. **BSCScan**: https://bscscan.com/apis
3. **PolygonScan**: https://polygonscan.com/apis

## 📦 Comandos Disponíveis

### Deploy
```bash
# Deploy em todas as redes principais
npm run deploy:mainnet     # Ethereum
npm run deploy:bsc         # Binance Smart Chain
npm run deploy:polygon     # Polygon
npm run deploy:arbitrum    # Arbitrum
npm run deploy:avalanche   # Avalanche

# Deploy em testnets
npm run deploy:testnet:goerli
npm run deploy:testnet:sepolia
npm run deploy:testnet:bsc
npm run deploy:testnet:mumbai
```

### Verificação
```bash
npm run verify:mainnet     # Verificar no Etherscan
npm run verify:bsc         # Verificar no BSCScan
npm run verify:polygon     # Verificar no PolygonScan
npm run verify:all         # Verificar em todas as redes
```

### Liquidez
```bash
npm run liquidity:uniswap      # Adicionar liquidez no Uniswap
npm run liquidity:pancakeswap  # Adicionar liquidez no PancakeSwap
npm run liquidity:quickswap    # Adicionar liquidez no QuickSwap
```

### Administração
```bash
npm run price:update           # Atualizar preço do presale
npm run price:update:mainnet   # Atualizar preço no mainnet
```

### Desenvolvimento
```bash
npm run compile               # Compilar contratos
npm run test                  # Executar testes
npm run test:coverage         # Teste com coverage
npm run gas-report            # Relatório de gas
npm run size                  # Tamanho dos contratos
npm run flatten               # Achatar contrato
```

## 🌐 Redes Suportadas

| Rede | Chain ID | Explorer | DEX Principal |
|------|----------|----------|---------------|
| Ethereum | 1 | [Etherscan](https://etherscan.io) | Uniswap V2 |
| BSC | 56 | [BSCScan](https://bscscan.com) | PancakeSwap |
| Polygon | 137 | [PolygonScan](https://polygonscan.com) | QuickSwap |
| Arbitrum | 42161 | [Arbiscan](https://arbiscan.io) | SushiSwap |
| Avalanche | 43114 | [SnowTrace](https://snowtrace.io) | TraderJoe |

## 💰 Tokenomics

- **Total Supply**: 66,666,666 DVC666
- **Presale**: 13,333,333 DVC666 (20%)
- **Staking Rewards**: 20,000,000 DVC666 (30%)
- **Liquidity Pool**: 26,666,667 DVC666 (40%)
- **Team Reserve**: 6,666,666 DVC666 (10%)

## 🔒 Segurança

- Contratos baseados em OpenZeppelin
- Reentrancy protection
- Pausable functionality
- Owner controls
- Gas optimization

## 📊 Presale

- **Preço**: 0.00010382 ETH por DVC666
- **Mínimo**: 0.001 ETH
- **Máximo**: 10 ETH por transação
- **Duração**: Ativo por padrão
- **Auto-start**: Sim

## 🥩 Staking

- **APY**: 6.66%
- **Período de Lock**: 30 dias
- **Rewards**: Automáticos
- **Unstake**: Após período de lock

## 📱 Integração MetaMask

### Adicionar Token Automaticamente

Após o deploy, o token será automaticamente configurado para aparecer no MetaMask com:
- **Nome**: DVC666 Coin
- **Símbolo**: DVC666
- **Decimais**: 18
- **Ícone**: Configurável

### Adicionar Manualmente

```javascript
// Endereços dos contratos (atualizados após deploy)
const ADDRESSES = {
  ethereum: "0x...",  // Será preenchido automaticamente
  bsc: "0x...",       // Será preenchido automaticamente
  polygon: "0x...",   // Será preenchido automaticamente
};
```

## 🔗 Links Úteis

### Trading
- **Uniswap**: `https://app.uniswap.org/#/swap?outputCurrency=CONTRACT_ADDRESS`
- **PancakeSwap**: `https://pancakeswap.finance/swap?outputCurrency=CONTRACT_ADDRESS`
- **QuickSwap**: `https://quickswap.exchange/#/swap?outputCurrency=CONTRACT_ADDRESS`

### Analytics
- **DexTools**: `https://www.dextools.io/app/ether/pair-explorer/CONTRACT_ADDRESS`
- **CoinGecko**: Submeter após listagem
- **CoinMarketCap**: Submeter após listagem

## 🚨 Pré-requisitos

### Software
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

### Fundos Necessários
- **Ethereum**: ~0.5 ETH (deploy + verificação + liquidez)
- **BSC**: ~0.1 BNB (deploy + verificação + liquidez)
- **Polygon**: ~50 MATIC (deploy + verificação + liquidez)

### Chaves e APIs
- Chave privada com fundos
- API keys dos exploradores
- URLs RPC (já configuradas)

## 🎯 Roadmap de Deploy

### Fase 1: Testnet
1. Deploy em Goerli/Sepolia
2. Testes de funcionalidade
3. Verificação de contratos
4. Testes de liquidez

### Fase 2: Mainnet
1. Deploy em Ethereum
2. Verificação no Etherscan
3. Liquidez no Uniswap
4. Anúncio oficial

### Fase 3: Multi-chain
1. Deploy em BSC
2. Deploy em Polygon
3. Deploy em Arbitrum
4. Deploy em Avalanche

## 📞 Suporte

- **Email**: support@dvc666.com
- **Telegram**: @dvc666official
- **Discord**: https://discord.gg/dvc666
- **Twitter**: @DVC666Coin

## ⚠️ Disclaimer

Este é um projeto de demonstração. Sempre faça auditoria de segurança antes de usar em produção com fundos reais.

---

**🔥 DVC666 Coin - The Devil's in the Details 🔥**

