import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { Toaster } from 'react-hot-toast';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

// Pages
import Home from './pages/Home';
import Presale from './pages/Presale';
import Staking from './pages/Staking';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Evolution from './pages/Evolution';
import Whitepaper from './pages/Whitepaper';
import About from './pages/About';

// Styles and Theme
import GlobalStyles from './styles/GlobalStyles';
import { darkTheme } from './styles/theme';

// Web3 Provider function
function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #2a0a0a 100%);
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled(motion.main)`
  position: relative;
  z-index: 2;
  min-height: calc(100vh - 140px);
`;

const DevilishGlow = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 30% 40%,
    rgba(139, 0, 0, 0.1) 0%,
    rgba(255, 69, 0, 0.05) 25%,
    transparent 50%
  );
  animation: rotate 20s linear infinite;
  pointer-events: none;
  z-index: 1;
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <AppContainer>
            <GlobalStyles />
            <ParticleBackground />
            <DevilishGlow />
            
            <Navbar />
            
            <MainContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/presale" element={<Presale />} />
                <Route path="/staking" element={<Staking />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/carteira" element={<Wallet />} />
                <Route path="/evolution" element={<Evolution />} />
                <Route path="/evolucao" element={<Evolution />} />
                <Route path="/whitepaper" element={<Whitepaper />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </MainContent>
            
            <Footer />
            
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid #8B0000',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(139, 0, 0, 0.3)',
                },
                success: {
                  iconTheme: {
                    primary: '#00ff00',
                    secondary: '#1a1a1a',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ff0000',
                    secondary: '#1a1a1a',
                  },
                },
              }}
            />
          </AppContainer>
        </Router>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;

