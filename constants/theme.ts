export const theme = {
  colors: {
    // Neutral color system
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Brand colors
    primary: {
      50:  '#EFFAF1',   // very light green
      100: '#DAF0DB',   // subtle background tint
      200: '#B8E0BA',
      300: '#92D199',
      400: '#73C480',   // accent
      500: '#64BB6D',   // main brand color
      600: '#59A960',   // for buttons/hover
      700: '#498C4F',
      800: '#3A6E3F',
      900: '#2E5832',   // for high contrast
    },
    
    // Semantic colors
    success: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
    },
    
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
    },
    
    error: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
    },
    
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
    },
    
    // Text colors
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      tertiary: '#6B7280',
      inverse: '#FFFFFF',
    },
    
    // Border colors
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
      dark: '#9CA3AF',
    },
  },
  
  typography: {
    // Font sizes following industry-standard scale
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    
    // Font weights
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      bolder: '800',
    },
    
    // Line heights
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    // Spacing scale (4px base unit)
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  
  // Layout constants
  layout: {
    maxWidth: 1200,
    containerPadding: 16,
    headerHeight: 56,
    tabBarHeight: 80,
  },
} as const;

export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
export type ThemeSpacing = typeof theme.spacing; 