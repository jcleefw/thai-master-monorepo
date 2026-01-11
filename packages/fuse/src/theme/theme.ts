import type { Theme } from './theme.types';

export const theme: Theme = {
  colors: {
    cream: '#fff4e4', // Background - Old Lace
    lavender: '#f7e8a4', // Secondary background - Vanilla Custard
    sage: '#6efafb', // Accents - Electric Aqua
    periwinkle: '#0091ad', // Interactive elements - Pacific Cyan
    coral: '#ff57bb', // Highlights - Bubblegum Fizz
    charcoal: '#1A202C', // Primary text (7:1 contrast with cream)
  },
  typography: {
    baseFontSize: '16px',
    lineHeight: 1.5,
    fontFamily: {
      primary:  "'Sarabun', sans-serif",
      fallback:"'Noto Sans Thai', sans-serif",
    },
  },
  spacing: {
    base: 4,
    xs: '8px', // 2 * base
    sm: '16px', // 4 * base
    md: '24px', // 6 * base
    lg: '32px', // 8 * base
    xl: '48px', // 12 * base
  },
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
  },
};
