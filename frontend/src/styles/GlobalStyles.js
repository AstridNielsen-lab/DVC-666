import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.typography.fontFamily.primary};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text.primary};
    overflow-x: hidden;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.primaryLight}, ${props => props.theme.colors.secondaryLight});
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${props => props.theme.colors.primary} ${props => props.theme.colors.backgroundSecondary};
  }

  /* Selection styling */
  ::selection {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  ::-moz-selection {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  /* Focus styles */
  :focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Button reset */
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Link styles */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* List styles */
  ul, ol {
    list-style: none;
  }

  /* Table styles */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Form elements */
  input, textarea {
    background: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border.secondary};
    border-radius: ${props => props.theme.borderRadius.md};
    color: ${props => props.theme.colors.text.primary};
    padding: 0.75rem 1rem;
    transition: ${props => props.theme.transitions.normal};
    
    &:focus {
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.1);
    }
    
    &::placeholder {
      color: ${props => props.theme.colors.text.muted};
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  /* Animation classes */
  .fade-in {
    animation: fadeIn 0.6s ease-in-out;
  }

  .slide-up {
    animation: slideUp 0.6s ease-out;
  }

  .glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  /* Keyframe animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 5px ${props => props.theme.colors.primary};
    }
    to {
      text-shadow: 0 0 20px ${props => props.theme.colors.primary}, 0 0 30px ${props => props.theme.colors.primary};
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Loading spinner */
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid ${props => props.theme.colors.border.secondary};
    border-top: 4px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Toast notifications positioning */
  .Toastify__toast-container {
    z-index: ${props => props.theme.zIndex.toast};
  }
  
  /* React Hot Toast positioning */
  div[data-hot-toast] {
    z-index: 1800 !important;
  }

  /* Dark mode specific styles */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    button, input, textarea {
      border-width: 2px;
    }
  }

  /* Print styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
    }
    
    .no-print {
      display: none !important;
    }
  }

  /* Mobile specific styles */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
    
    .container {
      padding: 0 1rem;
    }
  }

  /* Tablet specific styles */
  @media (min-width: 769px) and (max-width: 1024px) {
    .container {
      padding: 0 1.5rem;
    }
  }

  /* Large screen styles */
  @media (min-width: 1920px) {
    .container {
      max-width: 1400px;
    }
  }

  /* Accessibility improvements */
  @media (prefers-reduced-motion: no-preference) {
    .smooth-scroll {
      scroll-behavior: smooth;
    }
  }

  /* Custom scrollbar for webkit browsers */
  .custom-scroll::-webkit-scrollbar {
    width: 12px;
  }

  .custom-scroll::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundTertiary};
    border-radius: 6px;
  }

  .custom-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 6px;
    border: 2px solid ${props => props.theme.colors.backgroundTertiary};
  }

  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.primaryLight}, ${props => props.theme.colors.secondaryLight});
  }
`;

export default GlobalStyles;

