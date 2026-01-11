# Theme Foundation Documentation

## Overview

This document describes the theme foundation for Thai Master, including the pastel color palette, typography system, spacing scale, and Thai font configuration.

## Color Palette

The theme uses a vibrant, modern color palette with warm and cool tones designed for visual appeal and readability during extended learning sessions.

### Colors

| Color | HEX Value | Color Name | Use Case |
|-------|-----------|------------|----------|
| **Cream** | `#fff4e4` | Old Lace | Primary background color. Warm, soft base that reduces eye strain. |
| **Lavender** | `#f7e8a4` | Vanilla Custard | Secondary background color. Used for cards, panels, and subtle differentiation. |
| **Sage** | `#6efafb` | Electric Aqua | Accent color. Bright, energetic color for highlights and decorative elements. |
| **Periwinkle** | `#0091ad` | Pacific Cyan | Interactive elements. Used for buttons, links, and actionable UI components. |
| **Coral** | `#ff57bb` | Bubblegum Fizz | Highlights and attention. Used for important callouts, achievements, and feedback. |
| **Charcoal** | `#1A202C` | Charcoal | Primary text color. Provides 7:1 contrast ratio with cream background (WCAG AAA). |

### Accessibility

- **Text Contrast**: Charcoal text on cream background achieves a 7:1 contrast ratio, meeting WCAG AAA standards for optimal readability.
- **Thai Characters**: The high contrast ratio is especially important for Thai characters with tone marks, ensuring accurate visual perception of diacritical marks.

## Typography

### Font Stack

**Primary**: Sarabun
- Google Fonts: `'Sarabun', sans-serif`
- Weights: 400 (regular), 500 (medium), 700 (bold)
- Clean, modern Thai font with excellent readability

**Fallback**: Noto Sans Thai
- Google Fonts: `'Noto Sans Thai', sans-serif`
- Weights: 400, 500, 700
- Optimized for Thai script with accurate tone mark positioning

**System Fallback**: sans-serif

### Typography Scale

| Property | Value | Usage |
|----------|-------|-------|
| **Base Font Size** | 16px | Body text, standard UI elements |
| **Line Height** | 1.5 | All text for optimal readability |
| **Minimum Thai Font** | 48pt | Canvas practice mode (NFR-U3 requirement) |

### Font Loading

- **Method**: Link tags in HTML `<head>` with `font-display: swap`
- **Performance**: Asynchronous loading with fallback fonts visible during load
- **Preconnect**: DNS prefetch for faster font loading
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ```

### Thai Font Requirements (NFR-U3)

- **Primary Font**: Sarabun for clean, modern appearance
- **Accurate Positioning**: Tone marks (้ ๊ ่ ๋) must align correctly above consonants
- **Unicode Compliance**: Full support for Thai Unicode range (U+0E00 to U+0E7F)
- **Minimum Size**: 48pt font size on mobile (320px width) for canvas practice
- **Contrast**: 7:1 ratio between charcoal text and Old Lace background

## Spacing Scale

The spacing system uses a base unit of 4px, creating a consistent rhythm throughout the interface.

| Token | Value | Multiplier | Usage |
|-------|-------|------------|-------|
| `base` | 4px | 1× | Base unit (not used directly in components) |
| `xs` | 8px | 2× | Tight spacing, compact UI, small gaps |
| `sm` | 16px | 4× | Default spacing, component padding, small margins |
| `md` | 24px | 6× | Moderate spacing, section gaps, medium margins |
| `lg` | 32px | 8× | Large spacing, major sections, prominent margins |
| `xl` | 48px | 12× | Extra large spacing, page-level sections |

### Usage Examples

```typescript
// Component padding
padding: ${props => props.theme.spacing.sm}; // 16px

// Section margins
margin-bottom: ${props => props.theme.spacing.lg}; // 32px

// Page-level spacing
padding: ${props => props.theme.spacing.xl}; // 48px
```

## Breakpoints

Responsive design breakpoints for different device sizes.

| Breakpoint | Value | Target Devices |
|------------|-------|----------------|
| **Mobile** | 0px | Default, mobile-first design |
| **Tablet** | 768px | Tablets and small laptops |
| **Desktop** | 1024px | Desktop and large screens |

### Usage

```typescript
@media (min-width: ${props => props.theme.breakpoints.tablet}) {
  // Tablet and larger styles
}

@media (min-width: ${props => props.theme.breakpoints.desktop}) {
  // Desktop-only styles
}
```

## Using the Theme

### Setup

The theme is configured in the Fuse library and applied via ThemeProvider in the App package.

```tsx
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '@thai-master/fuse';

<ThemeProvider theme={theme}>
  <GlobalStyles />
  <App />
</ThemeProvider>
```

### Accessing Theme in Components

```typescript
import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.theme.colors.cream};
  color: ${props => props.theme.colors.charcoal};
  padding: ${props => props.theme.spacing.md};
`;
```

### TypeScript Support

The theme provides full TypeScript autocomplete through the `DefaultTheme` interface extension.

```typescript
// packages/fuse/src/theme/styled.d.ts
import 'styled-components';
import type { Theme } from './theme.types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

## Service Worker Font Caching (Future - Epic 5)

### Planned Implementation

Font caching will be implemented in Epic 5 (Story 5.6) using Service Worker for offline-first functionality.

### Cache Strategy

- **Cache Name**: `thai-master-fonts-v1`
- **Strategy**: Cache-first (serve from cache, update in background)
- **Expiration**: 30+ days (long-term caching for font files)
- **Versioning**: Cache name includes version for easy invalidation

### Benefits

- Instant font loading on repeat visits
- Full offline support for Thai fonts
- Reduced bandwidth usage
- Improved performance on slow connections

---

**Last Updated**: 2026-01-11
**Related Stories**: 1.6 (Thai Font Loading & Theme Foundation), 5.6 (Service Worker Font Caching)
**Related Requirements**: NFR-U3 (Thai Character Rendering)
