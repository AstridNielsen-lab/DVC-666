import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaGlobe, FaCaretDown } from 'react-icons/fa';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ code: 'en', name: 'English', flag: '🇺🇸' });

  useEffect(() => {
    // Check if browser language is supported
    const browserLang = navigator.language.split('-')[0];
    const matchedLang = languages.find(lang => lang.code === browserLang);
    
    if (matchedLang) {
      setCurrentLanguage(matchedLang);
    }
    
    // Load Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
    
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        autoDisplay: false,
        includedLanguages: languages.map(l => l.code).join(','),
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };
    
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    
    // Use Google Translate API to change language
    if (window.google && window.google.translate) {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = language.code;
        select.dispatchEvent(new Event('change'));
      }
    }
  };

  return (
    <LanguageSelectorContainer>
      <CurrentLanguage onClick={() => setIsOpen(!isOpen)}>
        <span>{currentLanguage.flag}</span>
        <span className="lang-name">{currentLanguage.name}</span>
        <FaCaretDown />
      </CurrentLanguage>
      
      {isOpen && (
        <LanguageDropdown>
          {languages.map(language => (
            <LanguageOption 
              key={language.code}
              onClick={() => changeLanguage(language)}
              isActive={currentLanguage.code === language.code}
            >
              <span className="flag">{language.flag}</span>
              <span className="name">{language.name}</span>
            </LanguageOption>
          ))}
        </LanguageDropdown>
      )}
      
      <div id="google_translate_element" style={{ display: 'none' }}></div>
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
