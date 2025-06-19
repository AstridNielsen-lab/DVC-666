#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('🔥 DVC666 Coin - Setup Automático 🔥');
  console.log('=====================================\n');
  
  console.log('📝 Este script vai configurar tudo para o deploy do DVC666 Coin');
  console.log('🛪 Você precisará de:');
  console.log('   - Chave privada com fundos');
  console.log('   - API keys dos exploradores');
  console.log('   - Confirmação para instalar dependências\n');
  
  const proceed = await question('🚀 Continuar com o setup? (y/N): ');
  if (proceed.toLowerCase() !== 'y' && proceed.toLowerCase() !== 'yes') {
    console.log('❌ Setup cancelado');
    process.exit(0);
  }
  
  console.log('\n📦 Instalando dependências...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependências instaladas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao instalar dependências:', error.message);
    process.exit(1);
  }
  
  console.log('\n🔑 Configuração das chaves...');
  
  // Verificar se .env já existe
  const envPath = path.join(__dirname, '.env');
  let envExists = fs.existsSync(envPath);
  
  if (envExists) {
    const overwrite = await question('📄 Arquivo .env já existe. Sobrescrever? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('⚠️  Mantendo arquivo .env existente');
      envExists = false;
    }
  }
  
  if (!envExists || fs.existsSync(envPath)) {
    console.log('\n🔐 Configure suas chaves privadas e APIs:');
    
    const privateKey = await question('🔑 Chave privada (sem 0x): ');
    if (!privateKey || privateKey.length !== 64) {
      console.log('❌ Chave privada inválida (deve ter 64 caracteres)');
      process.exit(1);
    }
    
    console.log('\n🔍 APIs dos exploradores (pressione Enter para pular):');
    const etherscanKey = await question('Etherscan API Key: ');
    const bscscanKey = await question('BSCScan API Key: ');
    const polygonscanKey = await question('PolygonScan API Key: ');
    
    // Ler template do .env
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Atualizar chaves
    envContent = envContent.replace('PRIVATE_KEY="your_private_key_here"', `PRIVATE_KEY="${privateKey}"`);
    
    if (etherscanKey) {
      envContent = envContent.replace('ETHERSCAN_API_KEY="YourEtherscanApiKey"', `ETHERSCAN_API_KEY="${etherscanKey}"`);
    }
    
    if (bscscanKey) {
      envContent = envContent.replace('BSCSCAN_API_KEY="YourBscscanApiKey"', `BSCSCAN_API_KEY="${bscscanKey}"`);
    }
    
    if (polygonscanKey) {
      envContent = envContent.replace('POLYGONSCAN_API_KEY="YourPolygonscanApiKey"', `POLYGONSCAN_API_KEY="${polygonscanKey}"`);
    }
    
    // Habilitar otimizações
    envContent = envContent.replace('ENABLE_OPTIMIZER=true', 'ENABLE_OPTIMIZER=true');
    envContent = envContent.replace('VERIFY_CONTRACT=true', 'VERIFY_CONTRACT=true');
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Arquivo .env configurado!');
  }
  
  console.log('\n🛠️  Compilando contratos...');
  try {
    execSync('npm run compile', { stdio: 'inherit' });
    console.log('✅ Contratos compilados com sucesso!');
  } catch (error) {
    console.error('❌ Erro na compilação:', error.message);
    process.exit(1);
  }
  
  console.log('\n🎉 Setup concluído com sucesso!');
  console.log('\n🚀 Próximos passos:');
  console.log('\n1. 🧪 Testnet (recomendado primeiro):');
  console.log('   npm run deploy:testnet:goerli');
  console.log('\n2. 🎆 Mainnet (quando estiver pronto):');
  console.log('   npm run deploy:full:mainnet');
  console.log('   npm run deploy:full:bsc');
  console.log('   npm run deploy:full:polygon');
  
  console.log('\n📄 Documentação completa: README.md');
  console.log('📞 Suporte: support@dvc666.com');
  
  const deployNow = await question('\n🚀 Fazer deploy em testnet agora? (y/N): ');
  if (deployNow.toLowerCase() === 'y' || deployNow.toLowerCase() === 'yes') {
    console.log('\n🗺 Deploy em Goerli testnet...');
    try {
      execSync('npm run deploy:testnet:goerli', { stdio: 'inherit' });
      console.log('\n✅ Deploy em testnet concluído!');
      console.log('🔗 Verifique o contrato no Goerli Etherscan');
    } catch (error) {
      console.error('❌ Erro no deploy:', error.message);
      console.log('🛠️  Verifique suas configurações e tente novamente');
    }
  }
  
  rl.close();
}

// Executar setup
setup().catch(error => {
  console.error('❌ Erro no setup:', error);
  process.exit(1);
});

