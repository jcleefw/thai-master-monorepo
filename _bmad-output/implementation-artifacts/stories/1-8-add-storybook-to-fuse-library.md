---
story_id: "1-8"
story_key: "1-8-add-storybook-to-fuse-library"
epic: "epic-1"
title: "Add Storybook to @thai-master/fuse Library"
status: "done"
created: "2026-01-11"
completed: "2026-01-12"
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

## Tasks/Subtasks

- [x] Install Storybook 8.4.7 with React-Vite integration
  - [x] Run Storybook init for React-Vite project
  - [x] Verify installation in packages/fuse/package.json
  - [x] Check .storybook configuration files created
- [x] Configure Storybook for Fuse library
  - [x] Set stories glob pattern in main.ts
  - [x] Configure TypeScript and Vite integration
  - [x] Verify HMR works in dev mode
- [x] Integrate theme into Storybook
  - [x] Import ThemeProvider in preview.ts
  - [x] Import GlobalStyles in preview.ts
  - [x] Add global decorator for ThemeProvider (using React.createElement)
  - [x] Test theme colors available in stories
- [x] Test Thai font rendering
  - [x] Verify Google Fonts load in Storybook
  - [x] Test tone mark positioning with story examples
  - [x] Verify font-display: swap behavior
- [x] Create sample Button story
  - [x] Create Button.stories.tsx with CSF3 format
  - [x] Add multiple variants (Primary, Secondary, Disabled, WithThaiText, ThaiToneMarks, Loading)
  - [x] Configure Storybook controls with argTypes
  - [x] Verify theme integration in story
- [x] Test Storybook dev server
  - [x] Start dev server on port 6006
  - [x] Verify stories appear in sidebar
  - [x] Test HMR with component changes
  - [x] Verify controls work interactively
- [x] Build static Storybook
  - [x] Run build-storybook command
  - [x] Verify output in storybook-static/
  - [x] Test static build in browser
- [x] Add Storybook scripts to package.json
  - [x] Add "storybook" script
  - [x] Add "build-storybook" script
  - [x] Verify scripts work correctly
- [x] Document Storybook workflow
  - [x] Add comprehensive Storybook section to README
  - [x] Document dev server usage
  - [x] Document story creation guidelines with CSF3 examples
  - [x] Document build process
- [x] Run all tests and validations
  - [x] Existing tests pass (28/28 passing)
  - [x] TypeScript compiles without errors
  - [x] Linting passes (fixed ESLint 9 ignores config)
  - [x] Storybook builds successfully

## Dev Agent Record

### Debug Log
- Story started: 2026-01-11
- Sprint status updated to in-progress
- Tasks/Subtasks structure added

### Implementation Plan
Following red-green-refactor cycle for Storybook integration:
1. Install Storybook 8.4.7 with @storybook/react-vite
2. Configure Storybook with proper glob patterns and TypeScript
3. Integrate ThemeProvider and GlobalStyles from Story 1.6
4. Create sample Button.stories.tsx with CSF3 format
5. Test dev server, HMR, and controls
6. Build static Storybook and verify
7. Document workflow in README
8. Validate all tests pass

### Completion Notes
Successfully integrated Storybook 8.4.7 into the Fuse component library with complete theme integration.

**Key Achievements:**
- Installed Storybook 8.4.7 with @storybook/react-vite for optimal Vite integration
- Configured theme integration using React.createElement() to avoid JSX syntax errors in .ts files
- Created comprehensive Button.stories.tsx with 6 story variants including Thai text examples
- Fixed ESLint 9 configuration to use new flat config ignores instead of deprecated .eslintignore
- All tests pass (28/28), TypeScript compiles cleanly, linting passes
- Static Storybook builds successfully to storybook-static/ directory
- Created comprehensive README documentation with Storybook workflow

**Technical Notes:**
- Used React.createElement() in preview.ts decorator to avoid JSX in TypeScript files
- ESLint 9 requires ignores in eslint.config.js, not .eslintignore file
- Theme colors, fonts, and GlobalStyles automatically available in all stories via decorator
- HMR works correctly in dev mode for rapid component development

## File List
- `packages/fuse/.storybook/main.ts` - Storybook main configuration with stories glob and addons
- `packages/fuse/.storybook/preview.ts` - Theme integration with ThemeProvider decorator and GlobalStyles
- `packages/fuse/src/components/Button/Button.stories.tsx` - Sample Button story with CSF3 format and 6 variants
- `packages/fuse/README.md` - Comprehensive documentation including Storybook workflow
- `packages/fuse/package.json` - Updated with Storybook dependencies and scripts
- `packages/fuse/eslint.config.js` - Fixed ESLint 9 flat config with ignores property
- `packages/fuse/storybook-static/` - Static build output directory (ignored by git and ESLint)

## Change Log
- 2026-01-11: Story started, tasks added, sprint status updated to in-progress
- 2026-01-12: Installed Storybook 8.4.7 with React-Vite integration
- 2026-01-12: Configured theme integration in preview.ts using React.createElement()
- 2026-01-12: Created Button.stories.tsx with 6 story variants including Thai text
- 2026-01-12: Built and tested static Storybook successfully
- 2026-01-12: Created comprehensive README with Storybook documentation
- 2026-01-12: Fixed ESLint 9 configuration with ignores property in flat config
- 2026-01-12: All tests passing, story completed and ready for review

## Status
done
