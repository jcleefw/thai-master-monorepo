---
story_id: "1-8"
story_key: "1-8-add-storybook-to-fuse-library"
epic: "epic-1"
title: "Add Storybook to @thai-master/fuse Library"
status: "ready-for-dev"
created: "2026-01-11"
---

# Story 1.8: Add Storybook to @thai-master/fuse Library

## User Story

As a developer,
I want Storybook integrated into the Fuse component library,
So that I can develop, test, and document reusable components in isolation before integrating them into the App.

## Acceptance Criteria

**Given** the Fuse package exists in the monorepo
**When** I install Storybook
**Then** Storybook 8.4.7 is installed in `packages/fuse` as a dev dependency
**And** `@storybook/react-vite` is used for Vite integration
**And** Storybook configuration files are created in `packages/fuse/.storybook/`
**And** `.storybook/main.ts` configures stories glob pattern: `../src/**/*.stories.@(ts|tsx)`
**And** `.storybook/preview.ts` configures global decorators and parameters

**Given** Storybook is installed
**When** I configure Storybook for the Fuse library
**Then** Storybook uses Vite as the builder
**And** Storybook has access to TypeScript configurations from Fuse tsconfig
**And** Storybook can import from Fuse src directory without build step
**And** Hot Module Replacement (HMR) works in Storybook dev mode

**Given** Storybook configuration exists
**When** I integrate the theme from Story 1.6
**Then** `.storybook/preview.ts` imports ThemeProvider from Fuse
**And** `.storybook/preview.ts` imports GlobalStyles from Fuse
**And** all stories are wrapped with ThemeProvider decorator
**And** GlobalStyles component is rendered globally in Storybook
**And** theme colors (cream, lavender, sage, periwinkle, coral, charcoal) are available in all stories

**Given** theme integration is complete
**When** I test Thai font rendering in Storybook
**Then** Noto Sans Thai and Sarabun fonts load from Google Fonts CDN
**And** Thai characters render with accurate tone mark positioning
**And** font-display: swap works correctly (fallback → Noto Sans Thai)

**Given** Storybook is configured with theme
**When** I create a sample Button component story
**Then** story file follows naming convention: `Button.stories.tsx`
**And** story uses CSF3 (Component Story Format 3) syntax with `Meta` and `StoryObj` types
**And** story includes multiple variants (default, disabled, loading)
**And** story uses Storybook controls for interactive props
**And** story renders with correct theme colors

**Given** sample Button story exists
**When** I run `npm run storybook` in packages/fuse
**Then** Storybook dev server starts on `http://localhost:6006`
**And** Button story appears in sidebar navigation
**And** Button renders with theme colors from GlobalStyles
**And** controls panel allows interactive prop changes
**And** HMR updates stories when component code changes

**Given** Storybook dev mode works
**When** I run `npm run build-storybook` in packages/fuse
**Then** static Storybook build outputs to `packages/fuse/storybook-static/`
**And** build completes without errors
**And** static build can be served and viewed in browser
**And** all stories render correctly in static build

**Given** Storybook is fully integrated
**When** I document component development workflow
**Then** README includes instructions:
- `npm run storybook` to start dev server
- Create stories in `src/components/**/*.stories.tsx`
- Use CSF3 format with TypeScript
- Wrap stories with ThemeProvider (automatic via decorator)
- Test Thai character rendering in stories
- Build static Storybook with `npm run build-storybook`

**Given** Storybook build is configured
**When** I add Storybook scripts to packages/fuse/package.json
**Then** scripts include:
- `"storybook": "storybook dev -p 6006"`
- `"build-storybook": "storybook build"`
**And** scripts are documented in README

**Given** Storybook is configured for CI/CD (optional)
**When** I consider adding Storybook build to GitHub Actions
**Then** future Epic can add Storybook deployment to Cloudflare Pages
**And** Storybook static site would serve as living component documentation
**And** deployment URL documented for team reference (deferred to post-Epic 1)

## Implementation Notes

- Install Storybook 8.4.7 with `@storybook/react-vite` in packages/fuse
- Configure stories glob: `../src/**/*.stories.@(ts|tsx)`
- Integrate ThemeProvider and GlobalStyles in `.storybook/preview.ts`
- Use CSF3 (Component Story Format 3) for all stories
- Create sample Button.stories.tsx to validate setup
- Add `storybook` and `build-storybook` scripts to package.json
- Document workflow in README
- Storybook dev server runs on port 6006
- Static build outputs to `packages/fuse/storybook-static/`

## Related Requirements

- Story 1.6: Theme foundation with Thai fonts (integrated into Storybook)
- Fuse Library: Reusable component library requires isolated development environment
- Component Development: Storybook enables component-driven development

## Future Considerations

- Deploy Storybook static build to Cloudflare Pages for team documentation
- Add visual regression testing with Chromatic (post-POC)
- Create comprehensive stories for all Fuse components as they're built
