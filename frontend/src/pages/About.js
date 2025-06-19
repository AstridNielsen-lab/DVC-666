import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const About = () => {
  return (
    <AboutContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AboutHeader>
          <Logo size="60px" color="#8B0000" />
          <h1>About Devil's Coin DVC666</h1>
          <p>A História das Nove Chaves da Libertação Financeira</p>
          <PhaseInfo>
            🔑 <strong>1ª Chave Desbloqueada</strong> - 8 Evoluções Restantes até 2027
          </PhaseInfo>
        </AboutHeader>
        
        <AboutContent>
          <Section>
            <h2>📜 A Origem da Moeda</h2>
            <p>Nas profundezas do submundo digital, onde as finanças tradicionais escravizaram a humanidade com sua hipocrisia e falsas promessas, uma nova força emerge. <strong>DVC666</strong> não é apenas uma criptomoeda - é uma rebelião, uma manifestação das <strong>Nove Chaves Satânicas</strong> traduzidas para o reino das finanças descentralizadas.</p>
          </Section>
          
          <Section>
            <h2>🗝️ Nossa Evolução em 9 Fases</h2>
            <PhasesList>
              <PhaseItem active>
                <PhaseTitle>🔑 1ª Chave: Indulgência sobre Abstinência (ATIVA)</PhaseTitle>
                <PhaseDescription>Libertação financeira através da indulgência controlada. Presale ativo com 66% de bônus.</PhaseDescription>
                <PhaseStatus>✅ DESBLOQUEADA - Preço: $0.001 USD</PhaseStatus>
              </PhaseItem>
              
              <PhaseItem>
                <PhaseTitle>🔑 2ª Chave: Existência Vital (Q3 2025)</PhaseTitle>
                <PhaseDescription>Utilidade no mundo real e parcerias estratégicas.</PhaseDescription>
                <PhaseStatus>🔒 Aguardando desbloqueio</PhaseStatus>
              </PhaseItem>
              
              <PhaseItem>
                <PhaseTitle>🔑 3ª Chave: Sabedoria Pura (Q4 2025)</PhaseTitle>
                <PhaseDescription>Algoritmos de trading alimentados por IA.</PhaseDescription>
                <PhaseStatus>🔒 Aguardando desbloqueio</PhaseStatus>
              </PhaseItem>
              
              <PhaseItem>
                <PhaseTitle>🔑 4ª-9ª Chaves (2026-2027)</PhaseTitle>
                <PhaseDescription>Bondade Merecida, Vingança Justa, Responsabilidade Pessoal, Natureza Humana, Abraçando Desejos, e A Verdade Absoluta.</PhaseDescription>
                <PhaseStatus>🔒 Revelações futuras do ecossistema</PhaseStatus>
              </PhaseItem>
            </PhasesList>
          </Section>
          
          <Section>
            <h2>⚡ Tecnologia Atual</h2>
            <p>Construída em blockchain Proof-of-Stake customizado com blocos de 13 segundos, mecanismos de consenso energeticamente eficientes e preço atual de <strong>0.00010382 ETH ($0.001 USD)</strong>.</p>
          </Section>
          
          <Section>
            <h2>🎭 Nossa Filosofia</h2>
            <p>DVC666 não adora as trevas - abraça a sombra das finanças tradicionais para iluminar um caminho melhor. Promovemos <strong>Liberdade Financeira Individual</strong>, <strong>Contratos Transparentes</strong>, <strong>Governança Comunitária</strong> e <strong>Inovação Tecnológica</strong> sobre sistemas ultrapassados.</p>
          </Section>
        </AboutContent>
      </motion.div>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
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

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
`;

const PhaseInfo = styled.div`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  margin: 1rem 0;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(255, 69, 0, 0.2));
  border: 1px solid rgba(139, 0, 0, 0.5);
  border-radius: 25px;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;

const PhasesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PhaseItem = styled.div`
  background: ${props => props.active ? 
    'linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 200, 0, 0.1))' :
    'rgba(26, 26, 26, 0.5)'
  };
  border: 1px solid ${props => props.active ? 
    'rgba(0, 255, 0, 0.3)' :
    'rgba(139, 0, 0, 0.3)'
  };
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 0, 0, 0.2);
  }
`;

const PhaseTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const PhaseDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const PhaseStatus = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

const Section = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: ${props => props.theme.colors.glass.backdropFilter};
  border: ${props => props.theme.colors.glass.border};
  border-radius: 1rem;
  padding: 2rem;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

export default About;

