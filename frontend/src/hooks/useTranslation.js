import { useContext } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';

/**
 * Custom hook to use translations throughout the application
 * 
 * @returns {Object} An object containing translation functions and state
 * @property {string} currentLanguage - The current active language code
 * @property {function} changeLanguage - Function to change the current language
 * @property {function} translate - Function to translate a key
 * @property {function} t - Shorthand alias for translate
 * @property {Array<string>} availableLanguages - List of available language codes
 */
const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  const { currentLanguage, changeLanguage, translate, availableLanguages } = context;
  
  // Shorthand for translate function
  const t = translate;
  
  return {
    currentLanguage,
    changeLanguage,
    translate,
    t, // Alias for translate
    availableLanguages
  };
};

export default useTranslation;
