import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaGlobe, FaCaretDown } from 'react-icons/fa';
import useTranslation from '../hooks/useTranslation';

// Define language information
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  // Only include languages we have translations for now
  // We can add these back when we add more translations
  // { code: 'es', name: 'Español', flag: '🇪🇸' },
  // { code: 'fr', name: 'Français', flag: '🇫🇷' },
  // { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  // { code: 'zh', name: '中文', flag: '🇨🇳' },
  // { code: 'ja', name: '日本語', flag: '🇯🇵' },
  // { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage: activeLanguage, changeLanguage } = useTranslation();
  
  // Find the current language object in our languages array
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find(lang => lang.code === activeLanguage) || languages[0]
  );
  
  // Update selected language when the context language changes
  useEffect(() => {
    const langObj = languages.find(lang => lang.code === activeLanguage);
    if (langObj) {
      setSelectedLanguage(langObj);
    }
  }, [activeLanguage]);
  
  // Handle language selection
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    changeLanguage(language.code);
  };

  return (
    <LanguageSelectorContainer>
      <CurrentLanguage onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedLanguage.flag}</span>
        <span className="lang-name">{selectedLanguage.name}</span>
        <FaCaretDown />
      </CurrentLanguage>
      
      {isOpen && (
        <LanguageDropdown>
          {languages.map(language => (
            <LanguageOption 
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              isActive={selectedLanguage.code === language.code}
            >
              <span className="flag">{language.flag}</span>
              <span className="name">{language.name}</span>
            </LanguageOption>
          ))}
        </LanguageDropdown>
      )}
    </LanguageSelectorContainer>
  );
};

const LanguageSelectorContainer = styled.div`
  position: relative;
  z-index: 1100;
`;

const CurrentLanguage = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 0, 0, 0.2);
  }
  
  .lang-name {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const LanguageDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: 8px;
  min-width: 150px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1101;
`;

const LanguageOption = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: ${props => props.isActive ? 'rgba(139, 0, 0, 0.2)' : 'transparent'};
  color: ${props => props.theme.colors.text.primary};
  transition: all 0.2s ease;
  border: none;
  
  &:hover {
    background: rgba(139, 0, 0, 0.1);
  }
  
  .flag {
    font-size: 1.2rem;
  }
  
  .name {
    font-size: 0.9rem;
  }
`;

export default LanguageSelector;
