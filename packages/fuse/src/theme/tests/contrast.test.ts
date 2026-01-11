import { describe, it, expect } from 'vitest';
import { theme } from '../theme';

// Calculate relative luminance for color contrast
// Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20/#relativeluminancedef
function getLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
// Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Color Contrast Ratios', () => {
  it('should have 7:1 contrast for charcoal text on cream background (WCAG AAA)', () => {
    const contrast = getContrastRatio(theme.colors.charcoal, theme.colors.cream);
    expect(contrast).toBeGreaterThanOrEqual(7);
  });

  it('should have at least 4.5:1 contrast for charcoal on lavender (WCAG AA)', () => {
    const contrast = getContrastRatio(theme.colors.charcoal, theme.colors.lavender);
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });

  it('should have sufficient contrast for charcoal on sage', () => {
    const contrast = getContrastRatio(theme.colors.charcoal, theme.colors.sage);
    expect(contrast).toBeGreaterThanOrEqual(3); // Minimum for large text
  });

  it('should calculate correct luminance for cream background', () => {
    const luminance = getLuminance(theme.colors.cream);
    expect(luminance).toBeGreaterThan(0.9); // Very light color
  });

  it('should calculate correct luminance for charcoal text', () => {
    const luminance = getLuminance(theme.colors.charcoal);
    expect(luminance).toBeLessThan(0.1); // Very dark color
  });
});
