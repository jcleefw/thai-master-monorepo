---
story_id: "1-6"
story_key: "1-6-configure-thai-font-loading-theme-foundation"
epic: "epic-1"
title: "Configure Thai Font Loading & Theme Foundation"
status: "ready-for-dev"
created: "2026-01-11"
---

# Story 1.6: Configure Thai Font Loading & Theme Foundation

## User Story

As a developer,
I want Thai fonts (Noto Sans Thai, Sarabun) loaded from Google Fonts CDN with Styled Components theme foundation,
So that Thai characters render accurately with tone marks and the app uses the pastel color palette.

## Acceptance Criteria

**Given** the Fuse package exists
**When** I create theme configuration in `packages/fuse/src/theme/theme.ts`
**Then** theme object includes pastel color palette:
- `cream`: `#FAF9F6` (background)
- `lavender`: `#E6E6FA` (secondary background)
- `sage`: `#C8D5B9` (accents)
- `periwinkle`: `#CCCCFF` (interactive elements)
- `coral`: `#FFB6A3` (highlights)
- `charcoal`: `#1A202C` (primary text, 7:1 contrast with cream)
**And** theme includes typography scale (16px base, 1.5 line height)
**And** theme includes spacing scale (4px base unit, 8px, 16px, 24px, 32px)
**And** theme includes breakpoints (mobile: 0px, tablet: 768px, desktop: 1024px)
**And** theme is exported as named export for use in Styled Components

**Given** theme configuration exists
**When** I create `packages/fuse/src/theme/GlobalStyles.ts`
**Then** GlobalStyles component uses `createGlobalStyle` from Styled Components
**And** GlobalStyles imports Thai fonts from Google Fonts CDN:
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;700&family=Sarabun:wght@400;500;700&display=swap');
```
**And** GlobalStyles sets body font stack: `'Noto Sans Thai', 'Sarabun', sans-serif`
**And** GlobalStyles sets `font-display: swap` for asynchronous font loading
**And** GlobalStyles includes CSS reset (box-sizing, margin, padding)
**And** GlobalStyles sets cream background color on body

**Given** GlobalStyles imports fonts from Google Fonts CDN
**When** the app loads
**Then** fonts load asynchronously without blocking render
**And** fallback fonts (Sarabun, then system sans-serif) display during font loading
**And** swap occurs smoothly when Noto Sans Thai loads
**And** Thai characters render with accurate tone mark positioning (NFR-U3)

**Given** theme and GlobalStyles are created in Fuse
**When** I set up Styled Components ThemeProvider in `packages/app/src/main.tsx`
**Then** ThemeProvider wraps the entire App component
**And** ThemeProvider receives the imported theme object
**And** GlobalStyles component is rendered inside ThemeProvider
**And** all descendant styled components can access theme via props: `${props => props.theme.colors.sage}`

**Given** ThemeProvider is configured
**When** I create a sample styled component in Fuse
**Then** component accesses theme colors via props
**And** component renders with correct pastel colors
**And** TypeScript autocomplete works for theme properties

**Given** font loading is configured
**When** I test Thai character rendering
**Then** consonants, vowels, and tone marks render with accurate Unicode positioning
**And** minimum font size of 48pt is readable on mobile (320px width)
**And** color contrast between charcoal text and cream background is 7:1 (NFR-U3, WCAG AAA)

**Given** fonts are loaded from Google Fonts CDN
**When** I configure Service Worker (deferred to Epic 5)
**Then** font caching strategy is documented for future implementation:
- Cache-first strategy for font files
- Cache name: `thai-master-fonts-v1`
- Long-term caching (30+ days)

**Given** theme foundation is complete
**When** I create theme documentation
**Then** color palette is documented with HEX values and use cases
**And** typography scale is documented with size/weight/usage
**And** spacing scale is documented with pixel values
**And** Thai font requirements are documented (Noto Sans Thai primary, Sarabun fallback, tone mark positioning)

## Implementation Notes

- Create theme in `packages/fuse/src/theme/theme.ts` with pastel color palette
- Create GlobalStyles in `packages/fuse/src/theme/GlobalStyles.ts` importing Google Fonts
- Set up ThemeProvider in `packages/app/src/main.tsx` wrapping App component
- Use named exports only (no default exports)
- Ensure 7:1 color contrast for Thai characters (charcoal on cream)
- Document font caching strategy for future Service Worker implementation (Epic 5)

## Related Requirements

- NFR-U3: Thai characters render with accurate tone mark positioning, 7:1 contrast ratio, minimum 48pt font
- Story 5.6: Service Worker font caching (future implementation)
