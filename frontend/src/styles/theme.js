export const darkTheme = {
  colors: {
    // Primary Devil's theme colors
    primary: '#8B0000', // Dark red
    primaryLight: '#B22222', // Fire brick
    primaryDark: '#660000', // Darker red
    
    // Secondary colors
    secondary: '#FF4500', // Orange red
    secondaryLight: '#FF6347', // Tomato
    secondaryDark: '#DC143C', // Crimson
    
    // Accent colors
    accent: '#FF0000', // Pure red
    accentGlow: '#FF0000CC', // Red with transparency
    
    // Background colors
    background: '#0a0a0a', // Almost black
    backgroundSecondary: '#1a1a1a', // Dark gray
    backgroundTertiary: '#2a2a2a', // Lighter dark gray
    
    // Card and surface colors
    surface: '#1a1a1a',
    surfaceHover: '#2a2a2a',
    cardBackground: 'rgba(26, 26, 26, 0.8)',
    
    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      tertiary: '#999999',
      muted: '#666666',
      inverse: '#000000',
    },
    
    // Status colors
    success: '#00FF00',
    warning: '#FFA500',
    error: '#FF0000',
    info: '#1E90FF',
    
    // Border colors
    border: {
      primary: '#8B0000',
      secondary: '#444444',
      light: '#666666',
    },
    
    // Gradient colors
    gradients: {
      primary: 'linear-gradient(135deg, #8B0000 0%, #FF4500 100%)',
      secondary: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      card: 'linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(255, 69, 0, 0.1) 100%)',
      glow: 'radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, transparent 70%)',
    },
    
    // Glass morphism effects
    glass: {
      background: 'rgba(26, 26, 26, 0.25)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(139, 0, 0, 0.2)',
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: '\'Poppins\', sans-serif',
      secondary: '\'Inter\', sans-serif',
      mono: '\'JetBrains Mono\', monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(139, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(139, 0, 0, 0.1), 0 2px 4px -1px rgba(139, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(139, 0, 0, 0.1), 0 4px 6px -2px rgba(139, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(139, 0, 0, 0.1), 0 10px 10px -5px rgba(139, 0, 0, 0.04)',
    glow: '0 0 20px rgba(139, 0, 0, 0.5)',
    glowLarge: '0 0 40px rgba(139, 0, 0, 0.3)',
    inner: 'inset 0 2px 4px 0 rgba(139, 0, 0, 0.06)',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  // Transitions
  transitions: {
    fast: 'all 0.15s ease-in-out',
    normal: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
    
    // Specific property transitions
    color: 'color 0.15s ease-in-out',
    background: 'background-color 0.15s ease-in-out',
    border: 'border-color 0.15s ease-in-out',
    transform: 'transform 0.15s ease-in-out',
    opacity: 'opacity 0.15s ease-in-out',
    shadow: 'box-shadow 0.15s ease-in-out',
  },
  
  // Animation durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    
    // Easing functions
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  
  // Component specific styles
  components: {
    button: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
      }
    },
    input: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      }
    },
    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      }
    }
  }
};

export default darkTheme;

