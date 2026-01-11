import { describe, it, expect } from 'vitest';
import { theme } from '../theme';
import type { Theme } from '../theme.types';

describe('Theme Configuration', () => {
  it('should export a valid theme object', () => {
    expect(theme).toBeDefined();
    expect(theme).toBeTypeOf('object');
  });

  it('should have all required color properties', () => {
    expect(theme.colors).toBeDefined();
    expect(theme.colors.cream).toBe('#fff4e4'); // Old Lace
    expect(theme.colors.lavender).toBe('#f7e8a4'); // Vanilla Custard
    expect(theme.colors.sage).toBe('#6efafb'); // Electric Aqua
    expect(theme.colors.periwinkle).toBe('#0091ad'); // Pacific Cyan
    expect(theme.colors.coral).toBe('#ff57bb'); // Bubblegum Fizz
    expect(theme.colors.charcoal).toBe('#1A202C');
  });

  it('should have typography configuration', () => {
    expect(theme.typography).toBeDefined();
    expect(theme.typography.baseFontSize).toBe('16px');
    expect(theme.typography.lineHeight).toBe(1.5);
    expect(theme.typography.fontFamily.primary).toContain('Sarabun');
    expect(theme.typography.fontFamily.fallback).toContain('Noto Sans Thai');
  });

  it('should have spacing scale with base unit', () => {
    expect(theme.spacing).toBeDefined();
    expect(theme.spacing.base).toBe(4);
    expect(theme.spacing.xs).toBe('8px');
    expect(theme.spacing.sm).toBe('16px');
    expect(theme.spacing.md).toBe('24px');
    expect(theme.spacing.lg).toBe('32px');
    expect(theme.spacing.xl).toBe('48px');
  });

  it('should have breakpoint definitions', () => {
    expect(theme.breakpoints).toBeDefined();
    expect(theme.breakpoints.mobile).toBe('0px');
    expect(theme.breakpoints.tablet).toBe('768px');
    expect(theme.breakpoints.desktop).toBe('1024px');
  });

  it('should satisfy Theme type', () => {
    const typedTheme: Theme = theme;
    expect(typedTheme).toBeDefined();
  });
});
