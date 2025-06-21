import React, { createContext, useState, useEffect } from 'react';
import translations from '../translations';

// Create the Translation context
export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  // State to hold the current language
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load the saved language preference when component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem('dvc-language');
    
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setCurrentLanguage(browserLang);
        localStorage.setItem('dvc-language', browserLang);
      }
    }
    
    // Set html lang attribute for accessibility
    document.documentElement.lang = currentLanguage;
  }, []);

  // Update html lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Function to change the language
  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem('dvc-language', language);
    }
  };

  // Function to translate a key
  const translate = (key) => {
    // Split the key by dots to navigate nested objects
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    // Navigate through nested properties
    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        // Fallback to English if the key doesn't exist
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            // Return the key if not found in English either
            return key;
          }
        }
        return fallback;
      }
    }
    
    return translation;
  };

  // Context value
  const contextValue = {
    currentLanguage,
    changeLanguage,
    translate,
    availableLanguages: Object.keys(translations)
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
