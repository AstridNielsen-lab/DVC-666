# 🚀 DVC666 Coin - Início Rápido

## 🔥 Deploy em 3 Passos

### 1️⃣ Setup Automático
```bash
npm run setup
```
Este comando irá:
- ✅ Instalar todas as dependências
- ✅ Configurar arquivo .env
- ✅ Compilar contratos
- ✅ Oferecer deploy em testnet

### 2️⃣ Deploy em Testnet (Recomendado)
```bash
npm run deploy:testnet:goerli
```

### 3️⃣ Deploy em Mainnet (Produção)
```bash
# Ethereum + Uniswap
npm run deploy:full:mainnet

# BSC + PancakeSwap
npm run deploy:full:bsc

# Polygon + QuickSwap
npm run deploy:full:polygon
```

## 💰 Fundos Necessários

| Rede | Valor Mínimo | Para |
|------|---------------|------|
| Ethereum | 0.5 ETH | Deploy + Verificação + Liquidez |
| BSC | 0.1 BNB | Deploy + Verificação + Liquidez |
| Polygon | 50 MATIC | Deploy + Verificação + Liquidez |
| Goerli | 0.1 GoerliETH | Testnet |

## 🔑 O que Você Precisa

1. **Chave Privada** com fundos suficientes
2. **API Keys** (opcional para verificação):
   - [Etherscan](https://etherscan.io/apis)
   - [BSCScan](https://bscscan.com/apis) 
   - [PolygonScan](https://polygonscan.com/apis)

## 📋 Características do Token

- 📛 **Nome**: DVC666 Coin
- 🔤 **Símbolo**: DVC666
- 🔢 **Decimais**: 18
- 💎 **Supply**: 66,666,666 DVC666
- 💰 **Preço**: 0.00010382 ETH
- 🥩 **Staking**: 6.66% APY
- ⏰ **Lock**: 30 dias

## 🎯 Após o Deploy

O token será automaticamente:
- ✅ Verificado nos exploradores
- ✅ Adicionado ao MetaMask
- ✅ Listado nos DEXs principais
- ✅ Pronto para trading

## 🆘 Problemas?

```bash
# Recompilar se houver erro
npm run clean && npm run compile

# Verificar configuração
cat .env

# Testar rede
npm run deploy:testnet:goerli
```

## 📞 Suporte
- 📧 Email: support@dvc666.com
- 💬 Telegram: @dvc666official
- 📄 Docs: README.md

---
**🔥 DVC666 - The Devil's in the Details 🔥**

