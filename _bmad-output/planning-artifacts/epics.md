---
stepsCompleted: [1, 2, 3]
workflowComplete: true
totalEpics: 5
totalStories: 31
epicsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
completedDate: "2026-01-10"
---

# thai-learning-v2 - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for thai-learning-v2 (Thai Master), decomposing the requirements from the PRD, UX Design, and Architecture documents into implementable stories.

## Requirements Inventory

### Functional Requirements

**Character Learning & Practice (FR1-FR7):**
- FR1: Users can practice tracing Thai consonants (44 characters) on a touch-enabled canvas with ghost font guidance at 30% opacity
- FR2: Users can practice tracing Thai vowels (32 vowel forms) on a touch-enabled canvas with ghost font guidance
- FR3: Users can practice tracing Thai tone marks (4 tone marks) on a touch-enabled canvas with ghost font guidance
- FR4: Users can reset individual character canvases to practice the same character multiple times
- FR5: Users can hear native speaker pronunciation for each character when practicing
- FR6: Users can track their daily character learning progress (characters practiced per day)
- FR7: System prevents users from accessing vocabulary deck until all characters in Pillar 1 are completed

**Vocabulary Learning & Flash Cards (FR8-FR14):**
- FR8: Users can study 50-word Thai vocabulary deck using flash-card interface
- FR9: Users can hear native speaker pronunciation for each vocabulary word
- FR10: System presents flash cards following 85% known content / 15% controlled unknown sentence exposure methodology
- FR11: System surfaces vocabulary words using spaced repetition algorithm based on user accuracy
- FR12: Users can see tone marks integrated with vocabulary words during flash-card study
- FR13: Users can track daily vocabulary learning progress (new words learned per day)
- FR14: System introduces 4-5 word sentence examples using mostly known vocabulary (15% unknown exposure)

**Assessment & Quiz System (FR15-FR20):**
- FR15: Users can take character recognition quizzes (multiple-choice format) for consonants
- FR16: Users can take character recognition quizzes (multiple-choice format) for vowels
- FR17: Users can take character recognition quizzes (multiple-choice format) for tone marks
- FR18: Users can take vocabulary recognition quizzes with accuracy tracking
- FR19: System provides immediate feedback on quiz answers (correct/incorrect with audio confirmation)
- FR20: System tracks quiz accuracy percentages separately for consonants, vowels, tone marks, and vocabulary

**Performance Review & Reporting (FR21-FR29):**
- FR21: Users can view report card dashboard showing overall accuracy (alphabet 70% target, vocabulary 50% target)
- FR22: Users can see accuracy breakdown by category (consonants, vowels, tone marks, vocabulary) on report card
- FR23: Users can view visual indicators (✓ above target, ⚠️ below target) for each accuracy category
- FR24: Users can see trend visualization showing weekly/daily accuracy over time
- FR25: System identifies weak areas (items with <70% alphabet accuracy or <50% vocabulary accuracy)
- FR26: Users can view list of specific characters/words consistently missed with individual accuracy percentages
- FR27: Users can add weak items to a custom revision deck for targeted practice
- FR28: System dynamically updates revision deck by removing mastered items and adding new weak spots
- FR29: System surfaces revision deck items more frequently in practice sessions based on spaced repetition

**User Onboarding & Access (FR30-FR33):**
- FR30: Users can immediately access the first character tracing canvas without creating an account (no signup wall)
- FR31: Users receive a prompt to save progress after practicing 5-6 characters
- FR32: Users can create a free account to persist their learning progress
- FR33: Users can access the application directly via web browser without app store installation

**Audio & Pronunciation System (FR34-FR39):**
- FR34: System plays native speaker audio pronunciation for all 44 Thai consonants
- FR35: System plays native speaker audio pronunciation for all 32 Thai vowel forms
- FR36: System plays native speaker audio pronunciation for all 4 Thai tone marks
- FR37: System plays native speaker audio pronunciation for all 50 vocabulary words
- FR38: System caches audio files for offline playback using Service Worker
- FR39: System progressively loads audio files (caches next 10 items) to optimize performance

**Data Persistence & Offline Mode (FR40-FR45):**
- FR40: System persists user progress (characters practiced, vocabulary learned, quiz scores) using LocalStorage
- FR41: System maintains user progress across browser sessions without data loss
- FR42: Users can practice character tracing offline (after initial app load)
- FR43: Users can study vocabulary flash cards offline (after audio caching)
- FR44: Users can take quizzes offline with results persisted when returning online
- FR45: System provides export/import functionality for manual progress backup

**Content & Learning Progression (FR46-FR50):**
- FR46: System tracks character mastery completion status (all 44 consonants + 32 vowels + 4 tone marks)
- FR47: System unlocks vocabulary deck only after character mastery is marked complete (progression gate)
- FR48: System tracks Week 4 milestone (character mastery completion)
- FR49: System tracks Week 12 milestone (50-word vocabulary deck completion)
- FR50: Users can see achievement indicators for milestone completions (Week 4, Week 6, Week 12)

### NonFunctional Requirements

**Performance (NFR-P1 to NFR-P5):**
- NFR-P1: Canvas touch input must respond within 50ms on mid-range Android devices (Samsung Galaxy A-series), stroke rendering smooth with no visible lag
- NFR-P2: Audio playback must start within 100ms from cached files, first-time loading from Cloudflare R2 within 500ms on 4G connection
- NFR-P3: Initial app load must complete within 2 seconds on 4G mobile connection (Chrome Android), subsequent navigation within 500ms when cached
- NFR-P4: Offline mode must perform identically to online mode (<50ms canvas latency), offline audio playback within 100ms with no buffering, quiz functionality with no degradation
- NFR-P5: System must cache next 10 audio files in background without blocking UI, audio caching must not interfere with canvas performance or interactions

**Reliability (NFR-R1 to NFR-R4):**
- NFR-R1: User progress must persist across browser sessions with zero data loss, LocalStorage writes with error handling for quota exceeded, progress survives browser crashes
- NFR-R2: Once cached, character practice and vocabulary flash cards must work 100% offline, Service Worker maintains cached audio for minimum 30 days, offline quiz results correctly persisted
- NFR-R3: Accuracy calculations precise to 2 decimal places (e.g., 72.45%), weak area identification correctly identifies items below 70%/50% thresholds, spaced repetition surfaces items consistently
- NFR-R4: Progress export captures 100% of user data (characters, vocabulary, scores, timestamps), progress import restores with perfect fidelity (no corruption or loss)

**Usability (NFR-U1 to NFR-U4):**
- NFR-U1: Canvas interface fully functional on mobile screens (minimum 5-inch display), touch targets minimum 44x44 pixels, UI adapts responsively without horizontal scrolling
- NFR-U2: Native speaker pronunciation audio minimum 128kbps AAC quality, free of background noise/distortion/compression, volume normalized across all 130 audio files
- NFR-U3: Thai characters render with accurate tone mark positioning across Chrome Desktop/Android, ghost font (30% opacity) clearly visible without strain, font size minimum 48pt for mobile canvas
- NFR-U4: Immediate visual/audio feedback for all interactions (tracing completion, quiz answers, button presses), error states clearly communicated with actionable guidance, quiz feedback instant (<100ms)

**Security (NFR-S1 to NFR-S2):**
- NFR-S1: Application served over HTTPS in production, no sensitive data collected during POC, LocalStorage data same-origin only
- NFR-S2: If account creation added, passwords hashed before storage, no plaintext passwords anywhere, basic email validation

**Integration (NFR-I1 to NFR-I2):**
- NFR-I1: Cloudflare R2 audio delivery 99% uptime for 12-week POC, failed loads gracefully retry (3 attempts) before user error, R2 bucket supports CORS
- NFR-I2: Audio files delivered with appropriate caching headers (max-age 30 days), CDN supports range requests, audio URLs stable during POC

### Additional Requirements

**From Architecture Document:**

**Starter Template/Initialization (Epic 1 Story 1):**
- Initialize Vite monorepo with npm workspaces
- Create two packages: `packages/fuse` (generic component library) and `packages/app` (Thai Master PWA)
- Configure workspace structure with root package.json containing `"workspaces": ["packages/*"]`
- Set up Fuse as CDN-compilable library with ES modules and UMD bundle outputs
- Initialize App with Vite React TypeScript template
- Configure build order: Fuse must build before App

**Technology Stack Decisions:**
- Core Framework: React 18 with TypeScript 5
- Build Tool: Vite 5.x with library mode for Fuse package
- State Management: Zustand 5.0.9 with persist middleware
- Routing: Wouter 3.9.0 (lightweight, ~1.5KB)
- Validation: Zod 4.3.5 for LocalStorage data validation
- Styling: Styled Components 6.0+ with Radix UI for accessible primitives
- Error Tracking: Sentry (@sentry/react) 10.32.1
- Testing: Vitest 2.0.0 for unit tests, Playwright 1.45.0 for E2E (Chrome-only)
- Code Quality: ESLint 9.39.2 with typescript-eslint v8, Prettier 3.7.4
- CI/CD: GitHub Actions for testing, Cloudflare Pages for deployment
- Audio CDN: Cloudflare R2 for 130 audio files
- Fonts: Google Fonts CDN (Noto Sans Thai primary, Sarabun fallback)

**Code Structure Requirements:**
- Monorepo Structure: npm workspaces with packages/fuse and packages/app
- Component Organization: Separate files for logic (.tsx), styles (.styles.ts), types (.types.ts), with barrel exports (index.ts)
- Test Organization: All tests in separate tests/ subdirectory within each component/lib/hooks/stores folder
- Naming Conventions: PascalCase for components, camelCase for functions/hooks, no default exports (named exports only), no 'I' prefix on interfaces
- LocalStorage Keys: Prefix all with `thai-master:` (e.g., `thai-master:store`, `thai-master:progress`)
- Service Worker Caches: Versioned pattern `thai-master-{type}-v{version}` (audio-v1, fonts-v1, static-v1)
- Route Constants: Centralized in routes.ts with uppercase constant names

**API Patterns and Integrations:**
- Audio Playback: 3-retry logic with exponential backoff (100ms, 200ms, 400ms delays)
- Service Worker Strategy: Cache-on-first-use (lazy loading) with cache-first for audio/fonts, network-first for HTML
- Zustand Integration: Single global store with persist middleware and Zod validation in storage adapter's getItem method
- Error Handling: Actionable error messages with retry options, Sentry reporting on final failures
- State Persistence: Auto-save to LocalStorage after every interaction, validate on hydration with automatic reset on corruption

**Performance Constraints Beyond NFRs:**
- Canvas Drawing: Immediate draw on touch events for <50ms latency (no requestAnimationFrame batching)
- Audio Caching: Progressive loading in background without UI blocking
- Build Optimization: Tree-shaking via named exports and ES modules, code splitting for optimal bundle size
- Font Loading: Asynchronous load with font-display: swap, Service Worker caching for offline

**Testing Infrastructure Setup:**
- Vitest Configuration: Root-level configuration testing both packages
- Playwright Setup: Chrome-only testing with mobile viewport emulation, critical path coverage as merge gate
- Visual Regression Testing: Canvas rendering accuracy, Thai font with tone marks, pastel theme consistency, responsive layouts (320px-428px)
- CI/CD Integration: Automated test execution on PRs, tests must pass before merge, parallel execution with reporting
- Coverage Focus: Business logic (spaced repetition, accuracy calculations), critical paths (canvas tracing, offline mode, audio playback), accessibility compliance

**From UX Design Document:**

**Responsive Design Requirements:**
- Mobile-First: Primary target 320px-428px width (mobile phones)
- Single Column Layout: One focal element at a time, no multi-column on mobile
- Viewport Allocation: Canvas/flash card occupies 60-70% of viewport, progress indicators 10-15%, navigation/actions 15-20%
- Tablet Support: Deferred to Phase 2+ (2-3 column grid for multiple canvases)
- Desktop Support: Same single-column layout centered with max-width 480px
- Breakpoints: Mobile (0px), Tablet (768px - deferred), Desktop (1024px - development only)
- **NOTE**: Responsive design will need more refinement during story implementation - specific breakpoint behaviors, component scaling, and layout adjustments to be determined per component

**Accessibility Requirements (WCAG):**
- Color Contrast: Thai characters (#1A202C on #FAF9F6) 7:1 ratio (AAA), body text 4.5:1 (AA), interactive elements 3:1 minimum
- Touch Targets: Minimum 44x44px for all interactive elements (iOS/Android HIG standard)
- Spacing: 8px minimum between adjacent touch targets to prevent mis-taps
- Typography: Minimum 16px body text, never smaller than 14px for captions, line height 1.5 for readability
- ARIA Labels: Screen reader support for canvas ("Trace Thai character ก"), buttons ("Reset canvas", "Play pronunciation")
- Keyboard Navigation: Tab through all interactive elements, Radix UI provides focus management automatically
- Audio Fallback: Visual phonetic text ("gor gai") always visible alongside audio pronunciation
- Motion: Respect prefers-reduced-motion (disable toast slide animations, fade only)

**Browser/Device Compatibility:**
- Primary Platform: Chrome browser (desktop development, Android mobile production)
- Baseline Device: Mid-range Android (Samsung Galaxy A-series equivalent)
- Excluded: iOS/Safari, Firefox, Edge explicitly out of scope for 12-week POC
- Font Rendering: Unicode-compliant Thai fonts with accurate tone mark positioning
- Canvas Performance: <50ms touch latency on mid-range Android devices

**User Interaction Patterns:**
- Touch-First Canvas: Ghost font at 30% opacity, immediate stroke rendering, individual reset button, no strict validation
- Audio Pronunciation: Tap anywhere to play, <100ms start time from cache, automatic playback after character trace completion
- Flash Cards: Swipe left (know it) / swipe right (learning it), flip to reveal, audio button for pronunciation
- Spaced Repetition: 85% known content, 15% controlled unknown exposure, automatic surfacing of weak items
- Progress Persistence: Auto-save after every interaction, zero manual save actions
- Zero Onboarding: Straight to canvas within 30 seconds, no tutorial screens, signup prompt only AFTER 5-6 characters practiced

**Animation/Transition Requirements:**
- Canvas Strokes: No animation, instant feedback <50ms
- Toast Notifications: Slide up from bottom with 3-second auto-dismiss, respect prefers-reduced-motion (fade only if needed)
- Achievement Modals: Subtle fade-in (200ms), no distracting bounces or slides
- Button States: Darker shade on active press, clear visual feedback
- Page Transitions: <500ms when cached via Service Worker
- Audio Loading: <100ms playback start, zero buffering delays from cache

**Error Handling UX Patterns:**
- Audio Failure: "Audio failed to load. Check your connection and try again." with Retry button
- Network Errors: Silent offline mode (no error messages if offline functionality works)
- Data Corruption: Automatic reset with console error log, no user-facing crash
- Canvas Touch Issues: Ignored accidental touches outside canvas, no interruptions to flow
- Font Loading Failure: Graceful fallback to Sarabun, then system fonts, Thai characters always render
- LocalStorage Quota: Export/import backup option for manual data management
- Service Worker Failures: Network fallback for audio/fonts, graceful degradation
- Sentry Integration: Full error context + stack traces sent to Sentry, user sees friendly actionable messages

### FR Coverage Map

**Character Learning & Practice (FR1-FR7):**
- FR1 (Consonant tracing): Epic 2
- FR2 (Vowel tracing): Epic 2
- FR3 (Tone mark tracing): Epic 2
- FR4 (Canvas reset): Epic 2
- FR5 (Character audio): Epic 2
- FR6 (Progress tracking): Epic 2
- FR7 (Progression gate): Epic 3

**Vocabulary Learning (FR8-FR14):**
- FR8 (50-word deck): Epic 3
- FR9 (Vocabulary audio): Epic 3
- FR10 (85/15 methodology): Epic 3
- FR11 (Spaced repetition): Epic 3
- FR12 (Tone marks): Epic 3
- FR13 (Daily progress): Epic 3
- FR14 (Sentence examples): Epic 3

**Assessment & Quiz System (FR15-FR20):**
- FR15 (Consonant quiz): Epic 4
- FR16 (Vowel quiz): Epic 4
- FR17 (Tone mark quiz): Epic 4
- FR18 (Vocabulary quiz): Epic 4
- FR19 (Immediate feedback): Epic 4
- FR20 (Accuracy tracking): Epic 4

**Performance Review & Reporting (FR21-FR29):**
- FR21 (Report card): Epic 4
- FR22 (Category breakdown): Epic 4
- FR23 (Visual indicators): Epic 4
- FR24 (Trend visualization): Epic 4
- FR25 (Weak area identification): Epic 4
- FR26 (Missed items list): Epic 4
- FR27 (Add to revision deck): Epic 4
- FR28 (Dynamic deck updates): Epic 4
- FR29 (Revision surfacing): Epic 4

**User Onboarding & Access (FR30-FR33):**
- FR30 (Zero signup wall): Epic 5
- FR31 (Progress save prompt): Epic 5
- FR32 (Account creation): Epic 5
- FR33 (Web browser access): Epic 5

**Audio & Pronunciation System (FR34-FR39):**
- FR34 (Consonant audio): Epic 2
- FR35 (Vowel audio): Epic 2
- FR36 (Tone mark audio): Epic 2
- FR37 (Vocabulary audio): Epic 3
- FR38 (Service Worker caching): Epic 5
- FR39 (Progressive loading): Epic 5

**Data Persistence & Offline Mode (FR40-FR45):**
- FR40 (LocalStorage persistence): Epic 2, 3, 4 (each feature persists its own data)
- FR41 (Session persistence): Epic 2, 3, 4
- FR42 (Offline character tracing): Epic 2
- FR43 (Offline flash cards): Epic 3
- FR44 (Offline quizzes): Epic 4
- FR45 (Export/import): Epic 5

**Content & Learning Progression (FR46-FR50):**
- FR46 (Character mastery tracking): Epic 2
- FR47 (Vocabulary unlock gate): Epic 3
- FR48 (Week 4 milestone): Epic 2, 4
- FR49 (Week 12 milestone): Epic 3
- FR50 (Achievement indicators): Epic 5

## Epic List

### Epic 1: Project Setup & Core Infrastructure
Development environment is ready, and core architecture enables all future features

**What this delivers:**
- Vite monorepo with Fuse component library (CDN-compilable) and App package
- Testing infrastructure (Vitest for unit tests, Playwright for E2E)
- CI/CD pipeline (GitHub Actions testing + Cloudflare Pages deployment)
- GitHub Actions-controlled deployment to Cloudflare Pages
- Core Zustand store with persist middleware and Zod validation
- Sentry error tracking integration
- Thai font loading (Noto Sans Thai, Sarabun) via Google Fonts CDN
- Storybook for Fuse component development and documentation
- Project context file and documentation
- Responsive layout foundation and accessibility compliance setup

**FRs covered:** Starter template requirements, testing infrastructure, code structure, build optimization, font loading
**NFRs covered:** NFR-S1 (HTTPS), NFR-S2 (security basics), NFR-I1/NFR-I2 (integration setup)

---

### Epic 2: Character Learning Foundation
Users can learn all Thai characters through interactive canvas tracing with audio pronunciation and track their progress toward character mastery

**What this delivers:**
- Touch-enabled canvas with ghost font (30% opacity) for tracing Thai characters
- Individual character practice for 44 consonants, 32 vowels, 4 tone marks
- Native speaker audio pronunciation for each character
- Service Worker caching for character audio (offline capability)
- Individual canvas reset for repetition practice
- Daily character practice progress tracking
- Character mastery completion detection (Week 4 milestone)
- Offline functionality for character tracing and audio playback

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR34, FR35, FR36, FR40 (partial), FR41, FR42, FR46
**NFRs covered:** NFR-P1, NFR-P2, NFR-P4, NFR-R1, NFR-R2, NFR-U3, NFR-U4

---

### Epic 3: Vocabulary Learning System
Users can learn 50 Thai vocabulary words using flash cards with spaced repetition, unlocked after mastering characters

**What this delivers:**
- 50-word flash card interface with flip interaction
- Spaced repetition algorithm (85% known, 15% controlled unknown)
- Native speaker audio pronunciation for vocabulary
- Service Worker caching for vocabulary audio
- Tone mark integration with vocabulary words
- 4-5 word sentence examples for contextual learning
- Daily vocabulary progress tracking
- Progression gate (vocabulary unlocks after character mastery completion)
- Offline functionality for flash cards and audio
- Week 12 milestone tracking

**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR37, FR40 (partial), FR41, FR43, FR47, FR49
**NFRs covered:** NFR-P2, NFR-P4, NFR-P5, NFR-R2, NFR-U2

---

### Epic 4: Assessment & Performance Review
Users can test their knowledge through quizzes, view detailed performance analytics, and get personalized revision recommendations based on weak areas

**What this delivers:**
- Multiple-choice character recognition quizzes (consonants, vowels, tone marks)
- Multiple-choice vocabulary recognition quizzes
- Immediate feedback with audio confirmation
- Separate accuracy tracking per category
- Report card dashboard with overall accuracy (70% alphabet target, 50% vocabulary target)
- Accuracy breakdown by category with visual indicators (✓/⚠️)
- Weekly/daily accuracy trend visualization
- Weak area identification (<70% alphabet, <50% vocabulary thresholds)
- Custom revision deck generation
- Dynamic revision deck updates
- Spaced repetition integration for revision items
- Offline quiz capability with result persistence
- Week 6 milestone tracking

**FRs covered:** FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR40 (partial), FR41, FR44, FR48, FR50
**NFRs covered:** NFR-P4, NFR-R3, NFR-U4

---

### Epic 5: User Experience & Accessibility Polish
Users can instantly access the app without barriers, use it completely offline, and experience seamless interactions with full accessibility compliance

**What this delivers:**
- Zero signup wall (immediate canvas access)
- Progress save prompt after 5-6 characters
- Optional free account creation for persistence
- Export/import functionality for manual progress backup
- Service Worker optimization for full offline mode
- Progressive Web App (PWA) capabilities
- Toast notifications for feedback
- Achievement modals for milestones (Week 4, Week 6, Week 12)
- Responsive design refinements across breakpoints
- WCAG AA accessibility compliance (contrast ratios, touch targets, ARIA labels, keyboard navigation)
- Error handling UX patterns (actionable messages, silent offline mode, graceful fallbacks)
- Animation polish (respecting prefers-reduced-motion)

**FRs covered:** FR30, FR31, FR32, FR33, FR38, FR39, FR45
**NFRs covered:** NFR-P3, NFR-P5, NFR-U1, NFR-U4

---

## Epic 1 Stories

### Story 1.1: Initialize Vite Monorepo with Fuse Library & App Packages

As a developer,
I want to set up a Vite monorepo with separate Fuse library and App packages,
So that I can build a reusable component library alongside the Thai Master application with proper dependency management.

**Acceptance Criteria:**

**Given** a new project repository
**When** I initialize the monorepo structure
**Then** the following structure exists:
- Root `package.json` with `"workspaces": ["packages/*"]`
- `packages/fuse/` directory with Vite library mode configuration
- `packages/app/` directory with Vite React TypeScript template
**And** Fuse package.json includes library build configuration with ES modules and UMD outputs
**And** App package.json lists `@thai-master/fuse` as a workspace dependency
**And** Root has Node.js 18+ requirement documented
**And** Build order ensures Fuse builds before App (documented in root package.json scripts)

**Given** the monorepo is initialized
**When** I run `npm install` from the root
**Then** all workspace dependencies install correctly
**And** TypeScript 5.x is configured in strict mode for both packages
**And** Both packages have separate `tsconfig.json` files with proper paths

**Given** Fuse package is configured
**When** I run `npm run build` in packages/fuse
**Then** build outputs ES modules to `dist/` directory
**And** build outputs UMD bundle for CDN usage
**And** type definitions (.d.ts files) are generated
**And** build completes without errors

**Given** App package is configured
**When** I run `npm run dev` in packages/app
**Then** Vite dev server starts on localhost
**And** Hot Module Replacement (HMR) works correctly
**And** App can import from `@thai-master/fuse` workspace package

---

### Story 1.2: Configure Testing Infrastructure (Vitest & Playwright)

As a developer,
I want to set up Vitest for unit testing and Playwright for E2E testing,
So that I can ensure code quality and validate critical user flows throughout development.

**Acceptance Criteria:**

**Given** the monorepo structure exists
**When** I configure Vitest at the root level
**Then** `vitest.config.ts` exists with configuration for both packages
**And** Vitest 2.0.0 is installed as a dev dependency
**And** Test command `npm run test` executes unit tests for both Fuse and App packages
**And** Test files use `.test.tsx` suffix and are located in `tests/` subdirectories within component/lib/hooks/stores folders
**And** Vitest supports TypeScript and JSX transformations

**Given** Vitest is configured
**When** I create a sample component with a unit test
**Then** the test runs successfully with `npm run test`
**And** test output shows pass/fail status clearly
**And** code coverage report can be generated with `npm run test:coverage`

**Given** the App package exists
**When** I configure Playwright for E2E testing
**Then** Playwright 1.45.0 is installed in packages/app
**And** `playwright.config.ts` exists with Chrome-only browser configuration
**And** Mobile viewport emulation is configured (320px-428px width range)
**And** E2E tests are located in `packages/app/e2e/` directory
**And** Test command `npm run test:e2e` executes Playwright tests

**Given** Playwright is configured
**When** I create a sample E2E test for the home route
**Then** the test runs successfully in Chrome
**And** test results show pass/fail status with screenshots on failure
**And** Mobile viewport emulation works correctly

**Given** all testing infrastructure is configured
**When** I run `npm run test:all` from root
**Then** both unit tests (Vitest) and E2E tests (Playwright) execute
**And** all tests complete without configuration errors
**And** test execution completes within reasonable time (<2 minutes for empty suite)

---

### Story 1.3: Set Up CI/CD Pipeline (GitHub Actions & Cloudflare Pages)

As a developer,
I want automated testing and deployment pipelines,
So that code quality is enforced on every PR and successful merges deploy automatically to production.

**Acceptance Criteria:**

**Given** the repository is hosted on GitHub
**When** I create GitHub Actions workflow file `.github/workflows/test.yml`
**Then** workflow triggers on pull request events to main branch
**And** workflow runs `npm install` for all workspace packages
**And** workflow executes ESLint with typescript-eslint v8
**And** workflow executes TypeScript compiler checks (`tsc --noEmit`)
**And** workflow runs Vitest unit tests (`npm run test`)
**And** workflow runs Playwright E2E tests (`npm run test:e2e`) in Chrome
**And** PR cannot merge if any check fails (configured as required status check)

**Given** the test workflow is configured
**When** I create a sample PR with intentional ESLint error
**Then** CI pipeline fails with clear error message
**And** PR shows failed status check
**When** I fix the error and push
**Then** CI pipeline passes
**And** PR shows green status check

**Given** Cloudflare Pages account is set up
**When** I connect the repository to Cloudflare Pages
**Then** build configuration specifies `packages/app` as the root directory
**And** build command is `npm run build` (builds Fuse first, then App)
**And** output directory is `packages/app/dist`
**And** Node.js 18+ is specified in build environment

**Given** Cloudflare Pages is configured
**When** I push to main branch
**Then** Cloudflare Pages automatically triggers deployment
**And** build executes workspace install and builds both packages
**And** successful build deploys to production URL with HTTPS (NFR-S1)
**And** deployment preview is generated for every PR
**And** deployment completes within 5 minutes

**Given** a deployment succeeds
**When** I visit the production URL
**Then** the Thai Master app loads successfully
**And** URL uses HTTPS protocol
**And** initial load completes within 2 seconds on 4G connection (NFR-P3)

---

### Story 1.4: Implement Core Zustand Store with LocalStorage Persistence

As a developer,
I want a global Zustand store with LocalStorage persistence and Zod validation,
So that user progress persists across sessions with zero data loss and automatic corruption recovery.

**Acceptance Criteria:**

**Given** the App package structure exists
**When** I create the Zustand store in `packages/app/src/stores/useStore.ts`
**Then** store is configured with Zustand 5.0.9
**And** persist middleware is integrated with LocalStorage
**And** LocalStorage key is prefixed `thai-master:store`
**And** store follows single global store pattern (NOT feature-based stores)
**And** store exports a custom hook `useStore()` for access

**Given** the store structure is defined
**When** I define initial state shape with TypeScript interfaces
**Then** state includes placeholder sections for:
- `characterProgress` (for Epic 2)
- `vocabularyProgress` (for Epic 3)
- `quizScores` (for Epic 4)
- `userPreferences` (for Epic 5)
**And** each section uses explicit TypeScript types (strict mode)
**And** state shape is documented with JSDoc comments

**Given** persist middleware is configured
**When** I integrate Zod 4.3.5 for schema validation
**Then** Zod schema matches the TypeScript state interface
**And** validation is integrated in persist middleware's `storage.getItem()` method
**And** corrupted data triggers automatic reset to default state
**And** validation errors are logged to console (Sentry integration in Story 1.5)
**And** reset preserves the corrupted data snapshot in a separate LocalStorage key for debugging

**Given** the store with persistence is configured
**When** I update state using store actions (e.g., `updateProgress()`)
**Then** changes immediately save to LocalStorage
**And** changes persist after page refresh
**And** LocalStorage writes include error handling for quota exceeded scenarios

**Given** LocalStorage contains valid persisted state
**When** the app reloads and hydrates state
**Then** Zod validation passes
**And** state restores with perfect fidelity (NFR-R1)
**And** hydration completes before first component render

**Given** LocalStorage contains corrupted data (invalid JSON or schema mismatch)
**When** the app attempts to hydrate state
**Then** Zod validation fails gracefully
**And** state resets to default values automatically
**And** corrupted data is copied to `thai-master:store:corrupted` key
**And** console error logs the validation failure with schema details
**And** app continues functioning without crashing

**Given** the store is implemented with tests
**When** I run unit tests for the store
**Then** tests validate state updates persist to LocalStorage
**And** tests validate Zod schema correctly rejects invalid data
**And** tests validate automatic reset on corruption
**And** tests validate quota exceeded error handling
**And** all tests pass

---

### Story 1.5: Integrate Sentry Error Tracking

As a developer,
I want Sentry error tracking integrated into the App package,
So that production errors are captured with full context while users see actionable error messages.

**Acceptance Criteria:**

**Given** the App package exists
**When** I install Sentry SDK
**Then** `@sentry/react` version 10.32.1 is installed as a dependency
**And** Sentry is initialized in `packages/app/src/main.tsx` before React renders

**Given** Sentry SDK is installed
**When** I configure Sentry initialization
**Then** DSN is loaded from environment variable `VITE_SENTRY_DSN`
**And** environment is set to `development` or `production` based on build mode
**And** `tracesSampleRate` is set to 1.0 for POC (100% transaction sampling)
**And** `replaysSessionSampleRate` is set to 0.1 (10% session replay sampling)
**And** `replaysOnErrorSampleRate` is set to 1.0 (100% replay on errors)
**And** release version is set from `package.json` version field

**Given** Sentry is initialized
**When** I wrap the App component with Sentry ErrorBoundary
**Then** ErrorBoundary catches React component errors
**And** ErrorBoundary displays user-friendly fallback UI with actionable message
**And** fallback UI includes "Reload App" button to recover
**And** errors are sent to Sentry with full component stack trace

**Given** Zustand store error handling exists (from Story 1.4)
**When** I integrate Sentry logging for LocalStorage validation failures
**Then** Zod validation errors are captured by Sentry with full context:
- Corrupted data structure
- Zod error details
- User's browser/device information
**And** users see friendly message in console (no Sentry internals exposed)

**Given** Sentry integration is complete
**When** I test error reporting in development
**Then** I can trigger a test error and verify it appears in Sentry dashboard
**And** error includes full stack trace, breadcrumbs, and device context
**And** session replay is captured for errors (when enabled)

**Given** Sentry configuration uses environment variables
**When** I document Sentry setup in README
**Then** instructions explain how to create `.env.local` file with `VITE_SENTRY_DSN`
**And** instructions explain how to obtain DSN from Sentry project settings
**And** `.env.local` is added to `.gitignore` to prevent committing sensitive keys

**Given** Sentry is fully integrated
**When** I run build and deployment
**Then** production builds include Sentry initialized with production DSN
**And** development builds use development DSN (separate Sentry project)
**And** Sentry does not block app initialization if DSN is missing (graceful degradation)

---

### Story 1.6: Configure Thai Font Loading & Theme Foundation

As a developer,
I want Thai fonts (Noto Sans Thai, Sarabun) loaded from Google Fonts CDN with Styled Components theme foundation,
So that Thai characters render accurately with tone marks and the app uses the pastel color palette.

**Acceptance Criteria:**

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

---

### Story 1.7: Create Project Context Documentation

As a developer,
I want comprehensive project context documentation,
So that AI agents and human developers understand critical patterns, anti-patterns, and architectural decisions when implementing features.

**Acceptance Criteria:**

**Given** the project has completed Stories 1.1-1.6
**When** I create `docs/project-context.md` file
**Then** document includes frontmatter with:
- `project_name`: "thai-learning-v2"
- `date`: current date
- `sections_completed`: list of completed sections
- `status`: "complete"
- `rule_count`: total number of rules documented
- `optimized_for_llm`: true

**Given** project context template exists
**When** I document Technology Stack & Versions section
**Then** section lists all technologies with exact versions:
- Core Framework: React 18 + TypeScript 5 (strict mode)
- Build Tool: Vite 5 (monorepo: packages/fuse + packages/app)
- State Management: Zustand 5.0.9 (persist middleware)
- Validation: Zod 4.3.5 (LocalStorage validation)
- Styling: Styled Components + Radix UI
- Routing: Wouter 3.9.0
- Testing: Vitest 2.0.0 (unit), Playwright 1.45.0 (E2E, Chrome-only)
- Code Quality: ESLint 9.39.2 + typescript-eslint v8, Prettier 3.7.4
- Error Tracking: Sentry 10.32.1 (@sentry/react)
- CI/CD: GitHub Actions + Cloudflare Pages
- Audio CDN: Cloudflare R2
- Fonts: Google Fonts CDN (Noto Sans Thai, Sarabun)
**And** critical constraints are listed (Chrome-only POC, offline-first PWA, mid-range Android baseline)

**Given** technology stack is documented
**When** I document Critical Implementation Rules section
**Then** section includes:
- **Language-Specific Rules (TypeScript)**: Strict mode, named exports only, barrel pattern via index.ts, type-only imports, no 'I' prefix on interfaces, error handling requirements (Sentry integration, 3-retry audio logic)
- **Framework-Specific Rules (React 18)**: Component structure (.tsx, .styles.ts, .types.ts, index.ts), tests in tests/ subdirectory, Zustand single global store pattern, hooks patterns, styled components theme access, canvas performance (immediate draw, no requestAnimationFrame)
- **Testing Rules**: Test organization (tests/ subdirectory), critical path coverage focus, E2E requirements (Chrome-only, mobile viewport), mock patterns, CI/CD requirements
- **Code Quality & Style Rules**: ESLint/Prettier enforcement, naming conventions (PascalCase components, camelCase hooks/utils, LocalStorage prefixes, Service Worker cache naming, route constants), file organization (monorepo, separated concerns), documentation requirements

**Given** implementation rules are documented
**When** I document Critical Don't-Miss Rules section
**Then** section includes:
- **Anti-Patterns (NEVER DO THIS)**: Default exports, multiple Zustand stores, Tailwind CSS, canvas draw batching, unprefixed LocalStorage keys, co-located test files, 'I' prefix on interfaces, full attempt history in LocalStorage, app-specific logic in Fuse library
- **Thai Language Specifics**: Fonts (Noto Sans Thai primary, Sarabun fallback), tone marks (Unicode-compliant, accurate positioning), ghost font (30% opacity), minimum size (48pt mobile), contrast (7:1 for Thai characters), Service Worker font caching
- **Performance Edge Cases**: <50ms canvas latency on mid-range Android, <100ms audio from cache, <2s initial load on 4G, direct touch handling, LocalStorage ~5-10MB limit
- **Offline-First Gotchas**: Separate Service Worker caches by type, version cache names, 100% functionality offline, cache-on-first-use for audio, zero data loss guarantee (Zod validation)
- **State Management Edge Cases**: Zod validation in Zustand persist getItem, reset corrupted data with Sentry logging, user preferences configurable thresholds
- **Security Requirements**: Chrome-only POC, HTTPS in production (Cloudflare Pages), no PII collection, audio CDN 3-retry logic, Sentry full context vs user actionable messages
- **Service Worker Cache Strategies**: Audio cache-first (thai-master-audio-v1), fonts cache-first long-term (thai-master-fonts-v1), static network-first HTML + cache-first JS/CSS

**Given** all sections are documented
**When** I document Usage Guidelines section
**Then** section includes:
- **For AI Agents**: Read this file before implementing code, follow ALL rules exactly, prefer restrictive options when in doubt, refer to architecture.md for detailed decisions, update file if new patterns emerge
- **For Humans**: Keep file lean and focused on agent needs, update when technology changes, review quarterly for outdated rules, remove obvious rules over time, ensure new team members understand patterns

**Given** project context document is complete
**When** I validate the document
**Then** rule count in frontmatter matches actual rules documented (count all bullet points in implementation rules sections)
**And** document is optimized for LLM consumption (concise, structured, clear formatting)
**And** document references architecture.md, prd.md, and ux-design-specification.md where appropriate
**And** last updated date in frontmatter matches current date

**Given** project context is documented
**When** I test using the document for implementation guidance
**Then** AI agents can read the document and correctly apply patterns (e.g., named exports, barrel pattern, single Zustand store, tests in tests/ subdirectory)
**And** anti-patterns are clearly flagged and avoided
**And** critical requirements (Thai font rendering, <50ms canvas latency, zero data loss) are clearly understood

---

### Story 1.8: Add Storybook to @thai-master/fuse Library

As a developer,
I want Storybook integrated into the Fuse component library,
So that I can develop, test, and document reusable components in isolation before integrating them into the App.

**Acceptance Criteria:**

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

---

### Story 1.9: Deploy to Cloudflare Pages via GitHub Actions

As a developer,
I want automated deployment to Cloudflare Pages controlled by GitHub Actions,
So that builds run in GitHub's environment with full control over the build and deployment pipeline.

**Acceptance Criteria:**

**Given** a Cloudflare account with Pages project exists
**When** I create a Cloudflare API token
**Then** token has permissions: "Cloudflare Pages - Edit"
**And** token is scoped to the specific Pages project or account
**And** token is stored as GitHub repository secret `CLOUDFLARE_API_TOKEN`
**And** Cloudflare Account ID is stored as GitHub repository secret `CLOUDFLARE_ACCOUNT_ID`

**Given** Cloudflare secrets are configured in GitHub
**When** I create `.github/workflows/deploy.yml` workflow file
**Then** workflow triggers on:
- Push to `main` branch (production deployment)
- Pull request events (preview deployment)
**And** workflow runs after test.yml passes (depends on test workflow)
**And** workflow uses Node.js 18+ for build environment
**And** workflow has separate jobs for production and preview deployments

**Given** deployment workflow is configured
**When** I set up the build job
**Then** workflow checks out repository code
**And** workflow sets up Node.js 18+ with caching enabled
**And** workflow runs `npm ci` to install dependencies
**And** workflow runs `npm run build` to build Fuse and App packages
**And** build artifacts are available in `packages/app/dist/`
**And** build step uses GitHub Actions cache for `node_modules` to speed up builds

**Given** build completes successfully
**When** I configure production deployment (main branch only)
**Then** workflow uses `cloudflare/pages-action@v1` or `wrangler pages deploy`
**And** deployment command targets `packages/app/dist` directory
**And** deployment uses `CLOUDFLARE_API_TOKEN` from GitHub secrets
**And** deployment uses `CLOUDFLARE_ACCOUNT_ID` from GitHub secrets
**And** Pages project name is configured (e.g., "thai-master" or from environment variable)
**And** deployment creates production deployment (branch: main)
**And** deployment output URL is captured and displayed in workflow summary

**Given** build completes successfully on PR
**When** I configure preview deployment
**Then** workflow deploys to Cloudflare Pages preview environment
**And** preview uses PR branch name for deployment identification
**And** preview URL is unique per PR (e.g., `<branch>.<project>.pages.dev`)
**And** preview URL is posted as comment on PR (using `actions/github-script` or similar)
**And** preview deployments are automatically cleaned up when PR is closed/merged

**Given** deployment workflow is complete
**When** I push to main branch
**Then** test workflow runs first (lint, type-check, unit tests, E2E tests)
**And** deployment workflow runs only if tests pass
**And** build completes in GitHub Actions environment
**And** app deploys to Cloudflare Pages production URL
**And** production URL uses HTTPS (NFR-S1)
**And** deployment completes within 5 minutes
**And** workflow summary shows deployment URL

**Given** a PR is created
**When** tests pass
**Then** preview deployment workflow runs
**And** preview deployment completes successfully
**And** preview URL is commented on PR
**And** developers can test changes on preview URL before merging

**Given** deployment workflow runs
**When** build or deployment fails
**Then** workflow fails with clear error message
**And** GitHub shows failed status check on PR/commit
**And** error message indicates which step failed (build or deploy)
**And** logs are available in GitHub Actions for debugging

**Given** deployment succeeds to production
**When** I visit the production URL
**Then** Thai Master app loads successfully
**And** URL uses HTTPS protocol
**And** initial load completes within 2 seconds on 4G connection (NFR-P3)
**And** app functions identically to Cloudflare Pages native deployment

**Given** Cloudflare Pages native integration exists (from Story 1.3)
**When** I migrate to GitHub Actions deployment
**Then** I disable Cloudflare Pages automatic deployments in Cloudflare dashboard (optional)
**And** all deployments are now controlled by GitHub Actions
**And** deployment history is visible in both GitHub Actions and Cloudflare Pages dashboard
**And** documentation explains the GitHub Actions deployment approach

**Given** deployment workflow is documented
**When** I update repository README
**Then** README includes deployment section with:
- How deployments work (GitHub Actions → Cloudflare Pages)
- Required GitHub secrets (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
- How to obtain Cloudflare API token
- Production deployment process (push to main)
- Preview deployment process (automatic on PRs)
- How to view deployment logs in GitHub Actions

---

## Epic 2 Stories

### Story 2.1: Create Character Data Model & Content Structure

As a developer,
I want a structured data model for Thai characters (consonants, vowels, tone marks) with metadata,
So that the application can systematically present all 80 characters for practice with proper categorization and audio references.

**Acceptance Criteria:**

**Given** the App package structure exists
**When** I create character data types in `packages/app/src/lib/types/character.types.ts`
**Then** TypeScript interfaces are defined:
- `CharacterType`: Enum with 'consonant' | 'vowel' | 'tone_mark'
- `Character`: Interface with fields:
  - `id`: string (unique identifier, e.g., "cons-01")
  - `type`: CharacterType
  - `character`: string (Unicode Thai character)
  - `romanization`: string (phonetic, e.g., "gor gai")
  - `audioUrl`: string (Cloudflare R2 URL)
  - `order`: number (sequence for presentation)
**And** interfaces use named exports with no default exports
**And** types are documented with JSDoc comments

**Given** character type definitions exist
**When** I create character data in `packages/app/src/data/characters.ts`
**Then** data exports three arrays:
- `consonants`: Array of 44 Character objects (type: 'consonant')
- `vowels`: Array of 32 Character objects (type: 'vowel')
- `toneMarks`: Array of 4 Character objects (type: 'tone_mark')
**And** all 80 characters include proper Unicode Thai characters
**And** romanization uses standard Thai romanization (e.g., "gor gai" for ก)
**And** audioUrl uses placeholder pattern `https://audio.thai-master.app/characters/{id}.aac` (Cloudflare R2 URLs to be configured later)
**And** order field sequences characters in traditional Thai teaching order

**Given** character arrays are defined
**When** I create helper functions in `packages/app/src/lib/utils/characterUtils.ts`
**Then** utility functions are exported:
- `getAllCharacters()`: Returns all 80 characters in order
- `getCharactersByType(type: CharacterType)`: Returns filtered array
- `getCharacterById(id: string)`: Returns single character or undefined
- `getTotalCharacterCount()`: Returns 80
- `getCharacterProgress(practiced: string[])`: Returns percentage completed
**And** functions use named exports
**And** functions have full TypeScript type safety
**And** edge cases are handled (empty arrays, invalid IDs)

**Given** character data structure is complete
**When** I create unit tests in `packages/app/src/lib/utils/tests/characterUtils.test.ts`
**Then** tests validate:
- `getAllCharacters()` returns exactly 80 characters
- Character IDs are unique (no duplicates)
- All Unicode characters are valid Thai script
- `getCharactersByType()` correctly filters by type (44 consonants, 32 vowels, 4 tone marks)
- `getCharacterById()` handles valid and invalid IDs
- `getCharacterProgress()` correctly calculates percentages (0%, 50%, 100%)
**And** all tests pass with `npm run test`

**Given** character data is implemented
**When** I document the data structure
**Then** README or docs explain:
- Character data organization (consonants, vowels, tone marks)
- Traditional Thai teaching order rationale
- Audio URL pattern for Cloudflare R2
- How to add or modify character data
- Unicode Thai character ranges used

---

### Story 2.2: Build Touch-Enabled Canvas Component with Ghost Font

As a developer,
I want a reusable Canvas component in Fuse library with touch input, ghost font overlay, and reset capability,
So that users can practice tracing Thai characters with <50ms latency and visual guidance.

**Acceptance Criteria:**

**Given** the Fuse package exists
**When** I create Canvas component types in `packages/fuse/src/components/Canvas/Canvas.types.ts`
**Then** interfaces are defined:
- `CanvasProps`: Interface with fields:
  - `ghostText`: string (Thai character to trace)
  - `ghostOpacity`: number (default 0.3 for 30%)
  - `fontSize`: number (minimum 48 for mobile)
  - `width`: number (canvas width in pixels)
  - `height`: number (canvas height in pixels)
  - `strokeColor`: string (user's stroke color)
  - `strokeWidth`: number (pen thickness)
  - `onDrawComplete`: () => void (optional callback)
  - `disabled`: boolean (optional, default false)
**And** types use named exports with JSDoc comments

**Given** Canvas types are defined
**When** I create Canvas component in `packages/fuse/src/components/Canvas/Canvas.tsx`
**Then** component implementation includes:
- HTML5 `<canvas>` element with ref
- Touch event listeners: `touchstart`, `touchmove`, `touchend`
- Mouse event listeners for development: `mousedown`, `mousemove`, `mouseup` (desktop testing)
- Canvas context setup (2D context)
- Ghost text rendering at specified opacity on canvas layer
- User stroke rendering on separate canvas layer
**And** component uses React.memo for performance
**And** component accesses theme via Styled Components props
**And** component follows component file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** Canvas component handles touch events
**When** user touches canvas and moves finger
**Then** stroke renders immediately on touchmove (direct draw, NO requestAnimationFrame batching)
**And** stroke follows finger position with <50ms latency on mid-range Android (NFR-P1)
**And** stroke uses specified color and width from props
**And** multiple strokes accumulate (no clearing between strokes)
**And** strokes are smooth with no visible lag or jitter

**Given** Canvas renders ghost text
**When** component mounts with `ghostText` prop
**Then** Thai character renders centered on canvas
**And** character uses Noto Sans Thai font (loaded via GlobalStyles from Story 1.6)
**And** opacity is set to value from `ghostOpacity` prop (default 0.3)
**And** font size matches `fontSize` prop (minimum 48pt for mobile)
**And** tone marks render with accurate Unicode positioning (NFR-U3)
**And** ghost text is visible but not overwhelming (30% opacity guideline)

**Given** Canvas component is interactive
**When** I create reset functionality
**Then** component exposes `reset()` method via imperative handle (useImperativeHandle)
**And** reset clears all user strokes from canvas
**And** reset preserves ghost text
**And** reset is instant with no animation delay

**Given** Canvas component structure is complete
**When** I create styled wrapper in `packages/fuse/src/components/Canvas/Canvas.styles.ts`
**Then** styled component wraps canvas element:
- Border with theme color (e.g., sage)
- Border radius for rounded corners
- Touch-action: none (prevents default touch behaviors)
- User-select: none (prevents text selection)
- Responsive sizing with max-width
**And** styles use Styled Components with theme props access

**Given** Canvas component is implemented
**When** I create barrel export in `packages/fuse/src/components/Canvas/index.ts`
**Then** exports include:
```typescript
export { Canvas } from './Canvas'
export type { CanvasProps } from './Canvas.types'
```

**Given** Canvas component is complete
**When** I create unit tests in `packages/fuse/src/components/Canvas/tests/Canvas.test.tsx`
**Then** tests validate:
- Component renders without crashing
- Ghost text displays with correct opacity
- Touch events trigger drawing (simulated)
- Reset clears strokes but preserves ghost text
- Disabled prop prevents interaction
- Component handles invalid props gracefully
**And** all tests pass

**Given** Canvas component is tested
**When** I create interaction tests in `packages/fuse/src/components/Canvas/tests/Canvas.interactions.test.tsx`
**Then** tests validate:
- Multiple strokes accumulate correctly
- Touch coordinates map correctly to canvas pixels
- Drawing performance meets <50ms latency (performance timer in test)
- Canvas responds correctly on 320px mobile viewport
**And** tests pass in Chrome (target browser)

---

### Story 2.3: Implement Audio Player Hook with 3-Retry Logic

As a developer,
I want a custom React hook for playing audio with exponential backoff retry logic (3 attempts),
So that audio playback is reliable even with transient network issues and meets <100ms cached playback requirement.

**Acceptance Criteria:**

**Given** the App package exists
**When** I create audio player types in `packages/app/src/hooks/useAudioPlayer/useAudioPlayer.types.ts`
**Then** TypeScript interfaces are defined:
- `AudioPlayerState`: Interface with fields:
  - `isPlaying`: boolean
  - `isLoading`: boolean
  - `error`: Error | null
  - `retryCount`: number
- `UseAudioPlayerReturn`: Interface with fields:
  - `play`: (audioUrl: string) => Promise<void>
  - `stop`: () => void
  - `state`: AudioPlayerState
**And** types use named exports with JSDoc comments

**Given** audio player types exist
**When** I create `useAudioPlayer` hook in `packages/app/src/hooks/useAudioPlayer/useAudioPlayer.ts`
**Then** hook implementation includes:
- Internal state for `isPlaying`, `isLoading`, `error`, `retryCount`
- HTML5 Audio API usage (`new Audio(url)`)
- `play()` function with 3-retry logic and exponential backoff (100ms, 200ms, 400ms)
- `stop()` function to halt playback
- Cleanup on unmount (stop audio, remove event listeners)
**And** hook uses useState and useEffect for state management
**And** hook follows camelCase naming convention

**Given** play function implements retry logic
**When** audio fails to load or play
**Then** hook automatically retries up to 3 times
**And** delays between retries use exponential backoff: 100ms, 200ms, 400ms
**And** on first retry, `retryCount` is 1
**And** on second retry, `retryCount` is 2
**And** on third retry, `retryCount` is 3
**And** after 3 failed attempts, error is set and reported to Sentry (integration from Story 1.5)
**And** user-facing error message is actionable: "Audio failed to load. Check your connection and try again."

**Given** audio loads successfully from cache
**When** user triggers `play(audioUrl)`
**Then** audio starts playback within 100ms (NFR-P2 for cached files)
**And** `isPlaying` state is true during playback
**And** `isLoading` state is false after playback starts
**And** `onended` event resets `isPlaying` to false

**Given** audio loads successfully from network (first time)
**When** user triggers `play(audioUrl)` for uncached audio
**Then** audio starts playback within 500ms on 4G connection (NFR-P2)
**And** `isLoading` is true during initial load
**And** subsequent plays use cached audio with <100ms playback start

**Given** hook handles errors gracefully
**When** network is completely offline and audio is not cached
**Then** retry logic exhausts all 3 attempts
**And** error state contains meaningful Error object
**And** error is logged to Sentry with full context (audio URL, retry count, network status)
**And** `isLoading` and `isPlaying` both become false

**Given** useAudioPlayer is implemented
**When** I create barrel export in `packages/app/src/hooks/useAudioPlayer/index.ts`
**Then** exports include:
```typescript
export { useAudioPlayer } from './useAudioPlayer'
export type { AudioPlayerState, UseAudioPlayerReturn } from './useAudioPlayer.types'
```

**Given** hook is complete
**When** I create unit tests in `packages/app/src/hooks/useAudioPlayer/tests/useAudioPlayer.test.ts`
**Then** tests validate:
- Hook initializes with correct default state (not playing, not loading, no error)
- `play()` successfully plays valid audio URL (mocked Audio API)
- `stop()` halts playback and resets state
- Retry logic executes on failure with correct delays (100ms, 200ms, 400ms)
- After 3 failures, error state is set
- Cleanup occurs on unmount (audio stops, listeners removed)
**And** all tests pass

**Given** hook is tested
**When** I create integration tests mocking network failures
**Then** tests validate:
- Transient failures (fail then succeed) resolve on retry
- Permanent failures (all 3 attempts fail) set error state correctly
- Exponential backoff timing is accurate (use fake timers)
**And** tests pass

---

### Story 2.4: Create Character Practice Page with Canvas & Audio Integration

As a developer,
I want a Character Practice page that combines Canvas component, audio playback, and character navigation,
So that users can practice tracing characters with audio pronunciation and progress through all 80 characters sequentially.

**Acceptance Criteria:**

**Given** the App package has Canvas component (Story 2.2) and useAudioPlayer hook (Story 2.3)
**When** I create CharacterPractice page in `packages/app/src/pages/CharacterPractice/CharacterPractice.tsx`
**Then** page component includes:
- Canvas component rendering current character's Thai text as ghost font
- Audio playback button (speaker icon) to play character pronunciation
- "Reset Canvas" button to clear user strokes
- "Next Character" button to progress to next character
- Character counter display: "Character X of 80"
- Character category label: "Consonant" | "Vowel" | "Tone Mark"
- Romanization display below canvas (e.g., "gor gai" for ก)
**And** page uses Styled Components for layout with theme colors
**And** page follows component file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** CharacterPractice page is structured
**When** component mounts
**Then** first character (order: 0) from character data loads automatically
**And** character's Thai text renders in Canvas as ghost font at 30% opacity
**And** romanization displays below canvas
**And** character counter shows "Character 1 of 80"
**And** category label shows correct type (consonant/vowel/tone mark)

**Given** user is on CharacterPractice page
**When** user taps the audio playback button
**Then** useAudioPlayer hook plays the current character's audio URL
**And** audio starts within 100ms if cached (NFR-P2)
**And** button shows loading state while audio loads (spinner or "Loading...")
**And** button is disabled during playback to prevent multiple simultaneous plays
**And** if audio fails after 3 retries, error toast appears: "Audio failed to load. Check your connection and try again."

**Given** user is tracing on canvas
**When** user completes a stroke and lifts finger
**Then** canvas draws user's stroke with <50ms latency (NFR-P1)
**And** strokes accumulate (no automatic clearing)
**And** ghost font remains visible at 30% opacity

**Given** user wants to retry tracing
**When** user taps "Reset Canvas" button
**Then** all user strokes clear immediately
**And** ghost font remains visible
**And** character does not change (still same character)
**And** user can immediately start tracing again

**Given** user completes practicing a character
**When** user taps "Next Character" button
**Then** character index increments by 1
**And** next character's data loads
**And** Canvas resets automatically (clears previous strokes)
**And** ghost font updates to new character
**And** romanization updates to new character
**And** character counter updates (e.g., "Character 2 of 80")
**And** audio automatically plays new character's pronunciation (optional auto-play on next)

**Given** user reaches the last character (character 80)
**When** user taps "Next Character" button
**Then** button is disabled (no character 81)
**And** completion message displays: "You've practiced all 80 characters! Great work!"
**And** optional: Navigate to Report Card or Dashboard

**Given** CharacterPractice page routing is configured
**When** I add route in `packages/app/src/routes.ts`
**Then** route constant is defined: `ROUTES.CHARACTER_PRACTICE = '/practice/characters'`
**And** route uses Wouter for routing
**And** route is accessible from app navigation

**Given** CharacterPractice page is styled
**When** I create styles in `packages/app/src/pages/CharacterPractice/CharacterPractice.styles.ts`
**Then** styled components include:
- PageContainer: Full viewport, cream background, centered content
- CanvasContainer: 60-70% of viewport height (per UX design)
- ControlsContainer: Buttons arranged vertically with 8px spacing (minimum touch target spacing)
- Button: Minimum 44x44px touch targets (NFR-U1, accessibility)
- RomanizationText: Charcoal color, 16px minimum, below canvas
- CounterText: Small text, sage color, above canvas
**And** styles use theme colors and spacing from Story 1.6

**Given** CharacterPractice page is complete
**When** I create unit tests in `packages/app/src/pages/CharacterPractice/tests/CharacterPractice.test.tsx`
**Then** tests validate:
- Page renders without crashing
- First character loads on mount
- Canvas displays ghost font
- Audio button triggers playback
- Reset button clears canvas
- Next button advances to next character
- Character counter updates correctly
- Last character disables Next button
**And** all tests pass

**Given** CharacterPractice page is tested
**When** I create E2E test in `packages/app/e2e/character-practice.spec.ts`
**Then** Playwright test validates:
- Navigate to `/practice/characters`
- Canvas renders with visible ghost font
- Click audio button and verify audio element plays (check `paused` property)
- Draw on canvas and verify strokes appear
- Click reset and verify canvas clears
- Click next and verify character changes (counter increments, new ghost font)
- Navigate through multiple characters successfully
**And** test passes in Chrome with mobile viewport emulation (320px-428px)

---

### Story 2.5: Implement Character Progress Tracking in Zustand Store

As a developer,
I want character practice progress tracked in Zustand store with LocalStorage persistence,
So that users' daily practice is recorded, and character mastery completion (Week 4 milestone) is detected reliably.

**Acceptance Criteria:**

**Given** the Zustand store exists (from Story 1.4)
**When** I extend the store state in `packages/app/src/stores/useStore.ts`
**Then** `characterProgress` section includes:
- `practicedCharacterIds`: string[] (array of character IDs practiced)
- `lastPracticedDate`: string (ISO date string)
- `dailyPracticeCount`: number (characters practiced today)
- `completionDate`: string | null (ISO date when all 80 characters completed)
- `isMasteryComplete`: boolean (true when all 80 practiced)
**And** TypeScript interfaces are updated in store types
**And** Zod schema is updated to validate new fields

**Given** characterProgress state is defined
**When** I add actions to the store
**Then** actions include:
- `markCharacterPracticed(characterId: string)`: Adds character ID to practicedCharacterIds if not already present, updates dailyPracticeCount if today, saves to LocalStorage
- `checkMasteryCompletion()`: Checks if practicedCharacterIds.length === 80, sets isMasteryComplete to true, sets completionDate to current date
- `resetDailyCount()`: Resets dailyPracticeCount to 0 (called on date change)
- `getCharacterProgressPercentage()`: Returns percentage (practicedCharacterIds.length / 80 * 100)
**And** actions use immer pattern (Zustand built-in state mutation)

**Given** markCharacterPracticed action exists
**When** user practices a character on CharacterPractice page
**Then** action is called with character ID after user taps "Next Character"
**And** character ID is added to practicedCharacterIds array (if not duplicate)
**And** if today's date matches lastPracticedDate, dailyPracticeCount increments
**And** if today's date differs from lastPracticedDate, dailyPracticeCount resets to 1 and lastPracticedDate updates
**And** changes immediately persist to LocalStorage (NFR-R1)

**Given** all 80 characters are practiced
**When** checkMasteryCompletion() runs
**Then** isMasteryComplete is set to true
**And** completionDate is set to current ISO date string
**And** Week 4 milestone is triggered (toast notification or modal)
**And** vocabulary deck unlocks (progression gate for Epic 3)

**Given** user returns to app on a new day
**When** app hydrates state from LocalStorage
**Then** lastPracticedDate is checked against current date
**And** if different, dailyPracticeCount resets to 0 automatically
**And** practicedCharacterIds persists (no reset, cumulative)

**Given** progress tracking is integrated with CharacterPractice page
**When** I update `packages/app/src/pages/CharacterPractice/CharacterPractice.tsx`
**Then** useStore hook is called: `const { markCharacterPracticed, practicedCharacterIds } = useStore()`
**And** "Next Character" button calls `markCharacterPracticed(currentCharacter.id)` before advancing
**And** Canvas displays a checkmark (✓) or highlight if character is already in practicedCharacterIds (visual feedback for repeat practice)

**Given** progress tracking persists to LocalStorage
**When** I test data persistence
**Then** after practicing 10 characters and refreshing the page
**And** practicedCharacterIds contains all 10 character IDs
**And** progress percentage is 12.5% (10/80)
**And** state restores with perfect fidelity (NFR-R1)

**Given** character progress logic is implemented
**When** I create unit tests in `packages/app/src/stores/tests/useStore.characterProgress.test.ts`
**Then** tests validate:
- `markCharacterPracticed()` adds new IDs and prevents duplicates
- `dailyPracticeCount` increments correctly for today's date
- `dailyPracticeCount` resets on date change
- `checkMasteryCompletion()` sets isMasteryComplete to true when all 80 practiced
- `completionDate` is set correctly on mastery completion
- `getCharacterProgressPercentage()` returns correct percentages (0%, 50%, 100%)
**And** all tests pass

**Given** progress tracking is complete
**When** I test with Zod validation
**Then** corrupted characterProgress data triggers automatic reset
**And** Sentry logs validation errors with context
**And** app continues functioning without crashing

---

### Story 2.6: Add Offline Support for Character Practice with Service Worker Audio Caching

As a developer,
I want Service Worker caching for character audio files with cache-on-first-use strategy,
So that character practice works 100% offline after initial audio loads and meets offline performance requirements.

**Acceptance Criteria:**

**Given** the App package is deployed
**When** I create Service Worker in `packages/app/public/sw.js`
**Then** Service Worker includes:
- Installation event listener to activate immediately
- Activation event listener to clean up old caches
- Fetch event listener to intercept network requests
- Cache name: `thai-master-audio-v1` (versioned for cache invalidation)
- Cache strategy: Cache-on-first-use (lazy loading, NOT preload all 130 files)
**And** Service Worker is registered in `packages/app/src/main.tsx` after React renders

**Given** Service Worker fetch handler is configured
**When** app requests character audio file (URL pattern: `https://audio.thai-master.app/characters/*.aac`)
**Then** Service Worker checks cache first (cache-first strategy)
**And** if audio is cached, return cached response immediately (<100ms, NFR-P4)
**And** if audio is not cached, fetch from network, cache response, then return to app
**And** cached audio persists for minimum 30 days (NFR-R2)

**Given** Service Worker caching is active
**When** user practices a character for the first time
**Then** audio loads from Cloudflare R2 within 500ms on 4G (NFR-P2)
**And** audio file is cached in `thai-master-audio-v1` cache
**And** subsequent plays of same character use cached audio with <100ms playback start

**Given** character audio is cached
**When** user goes offline (network disconnected)
**Then** character practice page continues functioning
**And** cached audio plays successfully within 100ms (NFR-P4)
**And** canvas tracing works identically to online mode (<50ms latency, NFR-P4)
**And** "Next Character" button advances through cached characters
**And** no error messages appear for offline functionality (silent offline mode per UX design)

**Given** user goes offline before caching all character audio
**When** user attempts to play uncached audio
**Then** audio fails to load (no network available)
**And** useAudioPlayer hook exhausts 3 retry attempts
**And** error toast appears: "Audio failed to load. Check your connection and try again."
**And** canvas tracing still works (offline canvas functionality not dependent on audio)

**Given** Service Worker handles cache versioning
**When** I update cache version (e.g., `thai-master-audio-v2`)
**Then** activation event deletes old caches (`thai-master-audio-v1`)
**And** new audio requests use new cache version
**And** cache invalidation works correctly on deployment

**Given** Service Worker does not cache HTML (network-first strategy)
**When** app requests HTML files
**Then** Service Worker fetches from network first
**And** only caches HTML as fallback for offline navigation
**And** HTML cache does not interfere with Cloudflare Pages deployment updates

**Given** Service Worker is registered
**When** I test Service Worker registration in `packages/app/src/main.tsx`
**Then** registration code includes:
```typescript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered:', registration))
      .catch(error => console.error('SW registration failed:', error))
  })
}
```
**And** registration occurs after React renders (non-blocking)
**And** registration errors are logged but do not crash app

**Given** Service Worker caching is implemented
**When** I create E2E test in `packages/app/e2e/offline-character-practice.spec.ts`
**Then** Playwright test validates:
- Navigate to character practice page
- Practice first character (audio caches)
- Simulate offline mode (Playwright context.setOffline(true))
- Verify canvas still draws with <50ms latency
- Verify cached audio plays successfully
- Verify "Next Character" button works for cached characters
- Verify error toast appears when attempting to play uncached audio offline
**And** test passes in Chrome

**Given** Service Worker is complete
**When** I document caching strategy
**Then** documentation explains:
- Cache-on-first-use strategy (lazy loading)
- Cache name versioning pattern (`thai-master-{type}-v{version}`)
- Cache-first strategy for audio files
- Network-first strategy for HTML
- How to invalidate cache (update version number)
- Minimum 30-day cache persistence (NFR-R2)

**Given** offline functionality is validated
**When** I test 100% offline usage after initial load
**Then** all 80 characters can be practiced offline (assuming all audio previously cached)
**And** progress tracking persists to LocalStorage correctly
**And** canvas tracing performs identically to online mode (<50ms latency)
**And** no functionality degrades in offline mode (NFR-P4)

---

## Epic 3 Stories

### Story 3.1: Create Vocabulary Data Model & Content Structure

As a developer,
I want a structured data model for 50 Thai vocabulary words with metadata including sentences,
So that the application can present vocabulary with audio, tone marks, and contextual sentence examples using spaced repetition.

**Acceptance Criteria:**

**Given** the App package structure exists
**When** I create vocabulary data types in `packages/app/src/lib/types/vocabulary.types.ts`
**Then** TypeScript interfaces are defined:
- `VocabularyWord`: Interface with fields:
  - `id`: string (unique identifier, e.g., "vocab-01")
  - `thaiWord`: string (Thai script with tone marks)
  - `romanization`: string (phonetic)
  - `english`: string (English translation)
  - `audioUrl`: string (Cloudflare R2 URL)
  - `sentenceExample`: string (4-5 word Thai sentence using the word)
  - `sentenceRomanization`: string (sentence phonetic)
  - `sentenceEnglish`: string (sentence English translation)
  - `order`: number (sequence for presentation)
**And** interfaces use named exports with JSDoc comments

**Given** vocabulary type definitions exist
**When** I create vocabulary data in `packages/app/src/data/vocabulary.ts`
**Then** data exports:
- `vocabularyWords`: Array of 50 VocabularyWord objects
**And** all 50 words include proper Unicode Thai characters with tone marks
**And** romanization uses standard Thai romanization
**And** sentence examples are 4-5 words long with mostly known vocabulary (85% known / 15% unknown exposure methodology, FR10)
**And** audioUrl uses placeholder pattern `https://audio.thai-master.app/vocabulary/{id}.aac`
**And** order field sequences words from beginner to intermediate difficulty

**Given** vocabulary array is defined
**When** I create helper functions in `packages/app/src/lib/utils/vocabularyUtils.ts`
**Then** utility functions are exported:
- `getAllVocabulary()`: Returns all 50 words in order
- `getVocabularyById(id: string)`: Returns single word or undefined
- `getTotalVocabularyCount()`: Returns 50
- `getVocabularyProgress(learned: string[])`: Returns percentage completed
- `shuffleVocabulary(words: VocabularyWord[])`: Returns randomized array for spaced repetition
**And** functions use named exports
**And** functions have full TypeScript type safety

**Given** vocabulary data structure is complete
**When** I create unit tests in `packages/app/src/lib/utils/tests/vocabularyUtils.test.ts`
**Then** tests validate:
- `getAllVocabulary()` returns exactly 50 words
- Vocabulary IDs are unique (no duplicates)
- All Thai words include proper Unicode with tone marks
- Sentence examples are 4-5 words long
- `getVocabularyById()` handles valid and invalid IDs
- `getVocabularyProgress()` correctly calculates percentages (0%, 50%, 100%)
- `shuffleVocabulary()` returns array with same length but different order
**And** all tests pass with `npm run test`

**Given** vocabulary data is implemented
**When** I document the data structure
**Then** README or docs explain:
- 50-word vocabulary selection rationale
- Sentence examples methodology (85% known / 15% unknown)
- Audio URL pattern for Cloudflare R2
- Tone mark integration requirements
- How to add or modify vocabulary data

---

### Story 3.2: Build Flash Card Component in Fuse Library

As a developer,
I want a reusable FlashCard component with flip interaction and audio playback,
So that users can study vocabulary with an intuitive flip-to-reveal interface and hear native pronunciation.

**Acceptance Criteria:**

**Given** the Fuse package exists
**When** I create FlashCard component types in `packages/fuse/src/components/FlashCard/FlashCard.types.ts`
**Then** interfaces are defined:
- `FlashCardProps`: Interface with fields:
  - `frontContent`: string (Thai word to display on front)
  - `backContent`: string (English translation to display on back)
  - `isFlipped`: boolean (controlled flip state)
  - `onFlip`: () => void (callback when user taps to flip)
  - `onSwipeLeft`: () => void (callback for "know it" swipe)
  - `onSwipeRight`: () => void (callback for "learning it" swipe)
  - `disabled`: boolean (optional, default false)
**And** types use named exports with JSDoc comments

**Given** FlashCard types are defined
**When** I create FlashCard component in `packages/fuse/src/components/FlashCard/FlashCard.tsx`
**Then** component implementation includes:
- Two-sided card with front and back content
- CSS 3D flip animation (rotateY 180deg)
- Tap-to-flip interaction (calls onFlip callback)
- Touch gesture detection for swipe left/right (using touch events or gesture library)
- Responsive sizing (fills container, max-width for mobile)
- Accessible ARIA labels for screen readers
**And** component uses React.memo for performance
**And** component accesses theme via Styled Components props
**And** component follows file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** FlashCard handles flip interaction
**When** user taps card
**Then** onFlip callback is triggered
**And** card animates flip (200ms transition per UX design)
**And** flip animation is smooth with no jank
**And** front content is hidden when flipped, back content is visible
**And** flip respects prefers-reduced-motion (instant flip if user prefers reduced motion)

**Given** FlashCard handles swipe gestures
**When** user swipes left on card
**Then** onSwipeLeft callback is triggered ("know it" action)
**And** card slides off screen to the left with animation
**And** card resets position after animation completes (for next card)

**When** user swipes right on card
**Then** onSwipeRight callback is triggered ("learning it" action)
**And** card slides off screen to the right with animation
**And** card resets position after animation completes

**Given** FlashCard component structure is complete
**When** I create styled wrapper in `packages/fuse/src/components/FlashCard/FlashCard.styles.ts`
**Then** styled components include:
- CardContainer: Perspective for 3D flip effect
- Card: Position relative, transform-style preserve-3d
- CardFace (Front): Absolute position, backface-visibility hidden
- CardFace (Back): Absolute position, rotateY(180deg), backface-visibility hidden
- FlipAnimation: CSS transition for rotateY transform
- SwipeAnimation: CSS transition for translateX (slide off screen)
**And** styles use theme colors (lavender background, charcoal text, sage accent)
**And** styles include minimum 44x44px touch target for flip area

**Given** FlashCard component is implemented
**When** I create barrel export in `packages/fuse/src/components/FlashCard/index.ts`
**Then** exports include:
```typescript
export { FlashCard } from './FlashCard'
export type { FlashCardProps } from './FlashCard.types'
```

**Given** FlashCard component is complete
**When** I create unit tests in `packages/fuse/src/components/FlashCard/tests/FlashCard.test.tsx`
**Then** tests validate:
- Component renders without crashing
- Front content displays when isFlipped is false
- Back content displays when isFlipped is true
- Tap triggers onFlip callback
- Swipe left triggers onSwipeLeft callback (simulated touch events)
- Swipe right triggers onSwipeRight callback
- Disabled prop prevents interaction
**And** all tests pass

**Given** FlashCard component is tested
**When** I create interaction tests in `packages/fuse/src/components/FlashCard/tests/FlashCard.interactions.test.tsx`
**Then** tests validate:
- Flip animation completes within 200ms
- Swipe gesture detection threshold is correct (minimum 50px swipe distance)
- Card resets position after swipe animation
- Component respects prefers-reduced-motion (no flip animation)
**And** tests pass in Chrome

---

### Story 3.3: Implement Spaced Repetition Algorithm

As a developer,
I want a spaced repetition algorithm that surfaces vocabulary using 85% known / 15% controlled unknown exposure,
So that users efficiently learn vocabulary with optimal retention using scientifically-backed methodology.

**Acceptance Criteria:**

**Given** the App package exists
**When** I create spaced repetition types in `packages/app/src/lib/spacedRepetition/spacedRepetition.types.ts`
**Then** TypeScript interfaces are defined:
- `VocabularyKnowledge`: Interface with fields:
  - `vocabularyId`: string
  - `knowledgeLevel`: 'known' | 'learning' | 'new'
  - `lastReviewed`: string (ISO date)
  - `reviewCount`: number
  - `accuracy`: number (percentage, 0-100)
- `SpacedRepetitionQueue`: Interface with fields:
  - `queue`: string[] (ordered vocabulary IDs to present)
  - `knownWords`: VocabularyKnowledge[]
  - `learningWords`: VocabularyKnowledge[]
  - `newWords`: VocabularyKnowledge[]
**And** types use named exports with JSDoc comments

**Given** spaced repetition types exist
**When** I create algorithm in `packages/app/src/lib/spacedRepetition/spacedRepetition.ts`
**Then** algorithm implementation includes:
- `generateQueue(knowledge: VocabularyKnowledge[], allVocabulary: VocabularyWord[])`: Generates queue following 85% known / 15% controlled unknown methodology (FR10)
- `updateKnowledge(vocabularyId: string, wasCorrect: boolean, currentKnowledge: VocabularyKnowledge[])`: Updates knowledge level based on user response ("know it" vs "learning it")
- `calculateNextReviewDate(vocabularyId: string, knowledge: VocabularyKnowledge)`: Determines when word should surface again based on review count and accuracy
- `prioritizeWeakWords(knowledge: VocabularyKnowledge[])`: Surfaces words with <50% accuracy more frequently (weak area detection, FR25)
**And** functions use named exports
**And** algorithm follows spaced repetition best practices (SM-2 or Leitner system)

**Given** generateQueue function exists
**When** algorithm generates a queue
**Then** queue contains ~85% known words and ~15% learning/new words (FR10)
**And** queue length is appropriate for session (10-15 words per session)
**And** new words are introduced gradually (1-2 new words per session)
**And** learning words (accuracy <70%) appear more frequently than known words (accuracy ≥70%)
**And** known words still appear periodically for retention

**Given** updateKnowledge function exists
**When** user marks a word as "know it" (swipe left)
**Then** word's reviewCount increments
**And** if reviewCount ≥3 and accuracy ≥70%, word moves to 'known' level
**And** lastReviewed updates to current date
**And** accuracy calculation factors in historical performance (running average)

**When** user marks a word as "learning it" (swipe right)
**Then** word remains in 'learning' level
**And** reviewCount increments
**And** accuracy decreases slightly (indicating continued difficulty)
**And** word surfaces again sooner in next session

**Given** prioritizeWeakWords function exists
**When** algorithm identifies weak words (accuracy <50%, FR25)
**Then** weak words appear 2-3x more frequently in queue
**And** weak words are distributed throughout session (not clustered)
**And** user receives custom revision deck recommendation for weak words (FR27)

**Given** spaced repetition algorithm is complete
**When** I create unit tests in `packages/app/src/lib/spacedRepetition/tests/spacedRepetition.test.ts`
**Then** tests validate:
- `generateQueue()` returns 85% known / 15% unknown distribution
- `updateKnowledge()` correctly transitions words between levels (new → learning → known)
- `calculateNextReviewDate()` uses exponential backoff for known words
- `prioritizeWeakWords()` surfaces weak words more frequently
- Queue generation handles edge cases (all new words, all known words)
**And** all tests pass

**Given** algorithm is tested
**When** I create integration tests simulating full learning session
**Then** tests validate:
- New user (all words 'new') receives appropriate first session queue
- User progressing through vocabulary transitions words to 'known' correctly
- Weak words surface more frequently across multiple sessions
- Known words still appear periodically for retention
**And** tests pass

---

### Story 3.4: Create Vocabulary Learning Page with Flash Cards & Spaced Repetition

As a developer,
I want a Vocabulary Learning page that presents flash cards using spaced repetition algorithm with audio playback,
So that users can efficiently learn 50 vocabulary words with sentence examples and track their daily progress.

**Acceptance Criteria:**

**Given** the App package has FlashCard component (Story 3.2) and spaced repetition algorithm (Story 3.3)
**When** I create VocabularyLearning page in `packages/app/src/pages/VocabularyLearning/VocabularyLearning.tsx`
**Then** page component includes:
- FlashCard component displaying current vocabulary word (front: Thai word, back: English translation)
- Audio playback button to play vocabulary word pronunciation
- Romanization display below card (phonetic pronunciation)
- Sentence example display (Thai sentence with English translation)
- Audio playback button for sentence pronunciation
- Word counter display: "Word X of Y" (Y = session queue length)
- Daily progress indicator: "Words learned today: N"
- "Know It" button (or swipe left gesture)
- "Learning It" button (or swipe right gesture)
**And** page uses Styled Components for layout with theme colors
**And** page follows component file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** VocabularyLearning page is structured
**When** component mounts
**Then** spaced repetition algorithm generates session queue (10-15 words following 85/15 methodology)
**And** first vocabulary word from queue loads
**And** FlashCard displays Thai word on front (flipped state: false)
**And** romanization displays below card
**And** sentence example displays below romanization
**And** word counter shows "Word 1 of [queue length]"
**And** daily progress indicator shows words learned today from Zustand store

**Given** user is on VocabularyLearning page
**When** user taps the vocabulary audio button
**Then** useAudioPlayer hook plays vocabulary word's audio URL
**And** audio starts within 100ms if cached (NFR-P2)
**And** button shows loading state during audio load
**And** if audio fails after 3 retries, error toast appears: "Audio failed to load. Check your connection and try again."

**When** user taps the sentence audio button
**Then** useAudioPlayer hook plays sentence example audio URL
**And** sentence audio follows same performance requirements as word audio

**Given** user is viewing flash card
**When** user taps the card to flip
**Then** card animates flip (200ms transition)
**And** back side displays English translation
**And** flip animation respects prefers-reduced-motion setting

**Given** user has reviewed the word (front and back)
**When** user swipes left or taps "Know It" button
**Then** spaced repetition algorithm updates word knowledge (marks as "known")
**And** vocabulary progress tracking updates in Zustand store
**And** next vocabulary word from queue loads
**And** flash card resets to front side (unflipped state)
**And** word counter increments
**And** daily progress indicator updates

**When** user swipes right or taps "Learning It" button
**Then** spaced repetition algorithm updates word knowledge (marks as "learning")
**And** vocabulary progress tracking updates
**And** word remains in learning pool (will surface again)
**And** next vocabulary word loads

**Given** user completes session queue
**When** all words in queue are reviewed
**Then** completion message displays: "Great session! You reviewed X words today."
**And** session summary shows: "Known: X | Learning: Y | New: Z"
**And** option to start new session appears (generates new queue)
**And** daily progress persists to LocalStorage

**Given** VocabularyLearning page routing is configured
**When** I add route in `packages/app/src/routes.ts`
**Then** route constant is defined: `ROUTES.VOCABULARY_LEARNING = '/learn/vocabulary'`
**And** route uses Wouter for routing
**And** route is accessible from app navigation (only if character mastery complete, FR7/FR47 progression gate)

**Given** VocabularyLearning page is styled
**When** I create styles in `packages/app/src/pages/VocabularyLearning/VocabularyLearning.styles.ts`
**Then** styled components include:
- PageContainer: Full viewport, cream background, centered content
- FlashCardContainer: 60-70% of viewport height (per UX design)
- AudioButtonsContainer: Buttons arranged horizontally with 8px spacing
- ActionButtonsContainer: "Know It" and "Learning It" buttons side by side
- Button: Minimum 44x44px touch targets (NFR-U1, accessibility)
- RomanizationText: Charcoal color, 16px minimum
- SentenceText: Smaller text, sage color, italic
- CounterText: Small text, above card
**And** styles use theme colors and spacing from Story 1.6

**Given** VocabularyLearning page is complete
**When** I create unit tests in `packages/app/src/pages/VocabularyLearning/tests/VocabularyLearning.test.tsx`
**Then** tests validate:
- Page renders without crashing
- Spaced repetition queue generates on mount
- First vocabulary word loads
- FlashCard displays Thai word on front
- Audio buttons trigger playback
- Flip interaction works
- "Know It" and "Learning It" actions advance to next word
- Session completion message displays after queue exhausted
- Daily progress updates correctly
**And** all tests pass

**Given** VocabularyLearning page is tested
**When** I create E2E test in `packages/app/e2e/vocabulary-learning.spec.ts`
**Then** Playwright test validates:
- Navigate to `/learn/vocabulary` (requires character mastery complete)
- FlashCard renders with Thai vocabulary word
- Click audio button and verify audio plays
- Click card to flip and verify English translation displays
- Click "Know It" and verify next word loads
- Complete full session queue
- Verify session summary displays with correct counts
**And** test passes in Chrome with mobile viewport emulation (320px-428px)

---

### Story 3.5: Implement Vocabulary Progress Tracking in Zustand Store

As a developer,
I want vocabulary learning progress tracked in Zustand store with spaced repetition knowledge levels,
So that users' vocabulary knowledge persists across sessions and the Week 12 milestone is detected when all 50 words are learned.

**Acceptance Criteria:**

**Given** the Zustand store exists (from Story 1.4)
**When** I extend the store state in `packages/app/src/stores/useStore.ts`
**Then** `vocabularyProgress` section includes:
- `vocabularyKnowledge`: VocabularyKnowledge[] (array from Story 3.3 types)
- `lastStudiedDate`: string (ISO date string)
- `dailyWordsLearned`: number (words learned today)
- `totalKnownWords`: number (words with 'known' level)
- `completionDate`: string | null (ISO date when all 50 words known)
- `isVocabularyComplete`: boolean (true when all 50 known)
**And** TypeScript interfaces are updated in store types
**And** Zod schema is updated to validate new fields

**Given** vocabularyProgress state is defined
**When** I add actions to the store
**Then** actions include:
- `updateVocabularyKnowledge(vocabularyId: string, wasCorrect: boolean)`: Updates word knowledge using spaced repetition algorithm (from Story 3.3)
- `markVocabularyStudied(vocabularyId: string)`: Records that word was studied today, updates dailyWordsLearned
- `checkVocabularyCompletion()`: Checks if all 50 words are 'known' level, sets isVocabularyComplete to true, sets completionDate
- `resetDailyVocabularyCount()`: Resets dailyWordsLearned to 0 (called on date change)
- `getVocabularyProgressPercentage()`: Returns percentage (totalKnownWords / 50 * 100)
- `getVocabularyKnowledgeById(vocabularyId: string)`: Returns single word's knowledge state
**And** actions use immer pattern (Zustand built-in state mutation)

**Given** updateVocabularyKnowledge action exists
**When** user marks a word as "know it" on VocabularyLearning page
**Then** action is called with vocabularyId and wasCorrect = true
**And** spaced repetition algorithm updates word's knowledge level (may transition to 'known' if criteria met)
**And** reviewCount increments, accuracy updates, lastReviewed updates to current date
**And** totalKnownWords updates if word transitions to 'known'
**And** changes immediately persist to LocalStorage (NFR-R1)

**When** user marks a word as "learning it"
**Then** action is called with vocabularyId and wasCorrect = false
**And** word remains in 'learning' level
**And** reviewCount increments, accuracy decreases slightly
**And** word will surface again sooner in next session

**Given** all 50 words are 'known' level
**When** checkVocabularyCompletion() runs
**Then** isVocabularyComplete is set to true
**And** completionDate is set to current ISO date string
**And** Week 12 milestone is triggered (toast notification or modal)
**And** achievement indicator displays (FR50)

**Given** user returns to app on a new day
**When** app hydrates state from LocalStorage
**Then** lastStudiedDate is checked against current date
**And** if different, dailyWordsLearned resets to 0 automatically
**And** vocabularyKnowledge persists (no reset, cumulative)

**Given** progress tracking is integrated with VocabularyLearning page
**When** I update `packages/app/src/pages/VocabularyLearning/VocabularyLearning.tsx`
**Then** useStore hook is called: `const { updateVocabularyKnowledge, vocabularyKnowledge, dailyWordsLearned } = useStore()`
**And** "Know It" button calls `updateVocabularyKnowledge(currentWord.id, true)`
**And** "Learning It" button calls `updateVocabularyKnowledge(currentWord.id, false)`
**And** spaced repetition queue generation uses vocabularyKnowledge from store
**And** daily progress indicator displays dailyWordsLearned from store

**Given** vocabulary progress persists to LocalStorage
**When** I test data persistence
**Then** after learning 10 words and refreshing the page
**And** vocabularyKnowledge contains knowledge states for all 10 words
**And** spaced repetition queue correctly uses persisted knowledge levels
**And** state restores with perfect fidelity (NFR-R1)

**Given** vocabulary progress logic is implemented
**When** I create unit tests in `packages/app/src/stores/tests/useStore.vocabularyProgress.test.ts`
**Then** tests validate:
- `updateVocabularyKnowledge()` correctly updates knowledge levels using spaced repetition algorithm
- Word transitions from 'new' → 'learning' → 'known' based on reviewCount and accuracy
- `dailyWordsLearned` increments correctly for today's date
- `dailyWordsLearned` resets on date change
- `checkVocabularyCompletion()` sets isVocabularyComplete to true when all 50 known
- `completionDate` is set correctly on vocabulary completion
- `getVocabularyProgressPercentage()` returns correct percentages (0%, 50%, 100%)
**And** all tests pass

**Given** progress tracking is complete
**When** I test with Zod validation
**Then** corrupted vocabularyProgress data triggers automatic reset
**And** Sentry logs validation errors with context
**And** app continues functioning without crashing

---

### Story 3.6: Implement Progression Gate to Unlock Vocabulary After Character Mastery

As a developer,
I want vocabulary learning page locked until all 80 characters are practiced (character mastery complete),
So that users follow the script-first methodology and complete Pillar 1 before accessing vocabulary (FR7, FR47).

**Acceptance Criteria:**

**Given** the Zustand store has characterProgress.isMasteryComplete (from Story 2.5)
**When** I create progression gate logic in `packages/app/src/lib/utils/progressionGate.ts`
**Then** utility function is exported:
- `isVocabularyUnlocked(characterProgress: CharacterProgress)`: Returns boolean (true if isMasteryComplete is true)
**And** function uses named export
**And** function is fully typed with TypeScript

**Given** progressionGate utility exists
**When** user has NOT completed character mastery (isMasteryComplete: false)
**Then** `isVocabularyUnlocked()` returns false
**And** VocabularyLearning page is not accessible (route redirects to CharacterPractice)

**When** user HAS completed character mastery (isMasteryComplete: true)
**Then** `isVocabularyUnlocked()` returns true
**And** VocabularyLearning page is accessible

**Given** progression gate is implemented
**When** I update VocabularyLearning page route in `packages/app/src/pages/VocabularyLearning/VocabularyLearning.tsx`
**Then** component checks `isVocabularyUnlocked()` on mount using Zustand store
**And** if vocabulary is locked, component displays gate message:
  - Heading: "Complete Character Mastery First!"
  - Body: "Practice all 80 Thai characters before unlocking the vocabulary deck."
  - Progress indicator: "Characters practiced: X / 80"
  - Button: "Go to Character Practice" (navigates to ROUTES.CHARACTER_PRACTICE)
**And** if vocabulary is unlocked, component renders flash card interface normally

**Given** vocabulary gate is in place
**When** I update app navigation in `packages/app/src/components/Navigation/Navigation.tsx` (or similar)
**Then** "Vocabulary" navigation link shows lock icon (🔒) when vocabulary is locked
**And** "Vocabulary" navigation link shows unlocked appearance when vocabulary is unlocked
**And** tapping locked navigation link shows toast: "Complete all characters first!"

**Given** user completes character mastery (all 80 characters practiced)
**When** checkMasteryCompletion() runs in characterProgress (Story 2.5)
**Then** isMasteryComplete is set to true
**And** vocabulary unlocks automatically
**And** toast notification displays: "Vocabulary Unlocked! Start learning 50 Thai words."
**And** navigation updates to show vocabulary as accessible

**Given** progression gate logic is complete
**When** I create unit tests in `packages/app/src/lib/utils/tests/progressionGate.test.ts`
**Then** tests validate:
- `isVocabularyUnlocked()` returns false when isMasteryComplete is false
- `isVocabularyUnlocked()` returns true when isMasteryComplete is true
- Edge case: Returns false if characterProgress is undefined/null
**And** all tests pass

**Given** progression gate is integrated with VocabularyLearning page
**When** I create unit tests in `packages/app/src/pages/VocabularyLearning/tests/VocabularyLearning.gate.test.tsx`
**Then** tests validate:
- Page displays gate message when vocabulary is locked
- Page renders flash cards when vocabulary is unlocked
- "Go to Character Practice" button navigates correctly
- Progress indicator shows correct character count
**And** all tests pass

**Given** progression gate is fully implemented
**When** I create E2E test in `packages/app/e2e/vocabulary-progression-gate.spec.ts`
**Then** Playwright test validates:
- New user (0 characters practiced) cannot access vocabulary page (gate message displays)
- User practices 79 characters, vocabulary still locked
- User practices 80th character, character mastery completes
- Vocabulary unlocks automatically
- Navigate to `/learn/vocabulary` successfully renders flash cards
- Navigation shows vocabulary as unlocked
**And** test passes in Chrome

---

## Epic 4 Stories

### Story 4.1: Create Quiz Data Model & Question Generation Logic

As a developer,
I want quiz question types and generation logic for character and vocabulary quizzes,
So that users can take multiple-choice quizzes with randomized wrong answers and accurate tracking.

**Acceptance Criteria:**

**Given** the App package structure exists
**When** I create quiz types in `packages/app/src/lib/types/quiz.types.ts`
**Then** TypeScript interfaces are defined:
- `QuizType`: Enum with 'consonant' | 'vowel' | 'tone_mark' | 'vocabulary'
- `QuizQuestion`: Interface with fields:
  - `id`: string (unique identifier)
  - `type`: QuizType
  - `questionText`: string (e.g., Thai character or word)
  - `correctAnswer`: string (English romanization or translation)
  - `wrongAnswers`: string[] (3 incorrect options)
  - `audioUrl`: string (optional, Cloudflare R2 URL)
- `QuizAttempt`: Interface with fields:
  - `questionId`: string
  - `selectedAnswer`: string
  - `correctAnswer`: string
  - `wasCorrect`: boolean
  - `timestamp`: string (ISO date)
- `QuizSession`: Interface with fields:
  - `type`: QuizType
  - `questions`: QuizQuestion[]
  - `attempts`: QuizAttempt[]
  - `score`: number (percentage)
  - `completedAt`: string | null (ISO date)
**And** interfaces use named exports with JSDoc comments

**Given** quiz types are defined
**When** I create question generation logic in `packages/app/src/lib/quiz/quizGenerator.ts`
**Then** generator functions are exported:
- `generateCharacterQuiz(type: 'consonant' | 'vowel' | 'tone_mark', count: number)`: Generates N questions for character recognition
- `generateVocabularyQuiz(count: number)`: Generates N questions for vocabulary recognition
- `shuffleAnswers(correct: string, wrong: string[])`: Randomizes answer order (4 total options)
- `selectWrongAnswers(allOptions: string[], correctAnswer: string, count: 3)`: Randomly selects 3 incorrect options that differ from correct
**And** functions use named exports
**And** functions have full TypeScript type safety

**Given** generateCharacterQuiz function exists
**When** I generate a consonant quiz with 10 questions
**Then** quiz contains 10 QuizQuestion objects with type 'consonant'
**And** each question's questionText is a Thai consonant character
**And** each question's correctAnswer is the romanization (e.g., "gor gai" for ก)
**And** each question has 3 wrongAnswers that are romanizations from other consonants
**And** wrong answers are randomly selected and don't include correct answer
**And** answers are presented in random order (shuffle applied)

**Given** generateVocabularyQuiz function exists
**When** I generate a vocabulary quiz with 10 questions
**Then** quiz contains 10 QuizQuestion objects with type 'vocabulary'
**And** each question's questionText is a Thai vocabulary word
**And** each question's correctAnswer is the English translation
**And** each question has 3 wrongAnswers that are English translations from other vocabulary words
**And** wrong answers are semantically different from correct answer (not too similar)

**Given** quiz generation logic is complete
**When** I create unit tests in `packages/app/src/lib/quiz/tests/quizGenerator.test.ts`
**Then** tests validate:
- `generateCharacterQuiz()` returns correct number of questions
- Question types match requested type (consonant/vowel/tone_mark)
- Wrong answers are unique and don't include correct answer
- `shuffleAnswers()` randomizes order (test multiple runs)
- `selectWrongAnswers()` selects exactly 3 unique wrong answers
- Edge case: Generate quiz when available characters/vocabulary < 4 (need minimum 4 options)
**And** all tests pass

**Given** quiz generator is implemented
**When** I document the quiz generation logic
**Then** README or docs explain:
- Question generation strategy (random selection from available content)
- Wrong answer selection criteria (must be distinct from correct answer)
- Answer shuffling to prevent pattern recognition
- Minimum content requirements for quiz generation (4+ items)

---

### Story 4.2: Build Multiple-Choice Quiz Component in Fuse Library

As a developer,
I want a reusable MultipleChoiceQuiz component with question display and answer selection,
So that users can take quizzes with immediate feedback and clear visual states.

**Acceptance Criteria:**

**Given** the Fuse package exists
**When** I create MultipleChoiceQuiz component types in `packages/fuse/src/components/MultipleChoiceQuiz/MultipleChoiceQuiz.types.ts`
**Then** interfaces are defined:
- `MultipleChoiceQuizProps`: Interface with fields:
  - `questionText`: string (Thai character or word to identify)
  - `answers`: string[] (4 options in shuffled order)
  - `correctAnswer`: string (the correct option)
  - `onAnswerSelected`: (selected: string) => void (callback when user selects)
  - `showFeedback`: boolean (whether to display correct/incorrect state)
  - `selectedAnswer`: string | null (controlled state)
  - `disabled`: boolean (optional, default false)
**And** types use named exports with JSDoc comments

**Given** MultipleChoiceQuiz types are defined
**When** I create MultipleChoiceQuiz component in `packages/fuse/src/components/MultipleChoiceQuiz/MultipleChoiceQuiz.tsx`
**Then** component implementation includes:
- Question text display (large, centered)
- 4 answer buttons arranged vertically
- Touch-friendly buttons (minimum 44x44px, NFR-U1)
- Selected state styling (highlighted button)
- Correct feedback state styling (green button)
- Incorrect feedback state styling (red button, green shows correct)
- Disabled state during feedback display
**And** component uses React.memo for performance
**And** component accesses theme via Styled Components props
**And** component follows file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** MultipleChoiceQuiz handles answer selection
**When** user taps an answer button
**Then** onAnswerSelected callback is triggered with selected answer
**And** button shows selected state (highlighted background)
**And** other buttons remain unselected
**And** component does not automatically show feedback (controlled by parent via showFeedback prop)

**Given** showFeedback is true after user selects answer
**When** selected answer is correct
**Then** selected button displays green background (correct state)
**And** checkmark icon (✓) appears on button
**And** all buttons are disabled (no further selection allowed)

**When** selected answer is incorrect
**Then** selected button displays red background (incorrect state)
**And** X icon (✗) appears on incorrect button
**And** correct answer button displays green background
**And** checkmark icon (✓) appears on correct button
**And** all buttons are disabled

**Given** MultipleChoiceQuiz component structure is complete
**When** I create styled wrapper in `packages/fuse/src/components/MultipleChoiceQuiz/MultipleChoiceQuiz.styles.ts`
**Then** styled components include:
- QuizContainer: Centered container, full width
- QuestionText: Large text (24px+), charcoal color, centered, Thai font
- AnswersContainer: Vertical stack, 8px spacing between buttons
- AnswerButton: Full width, minimum 44x44px height, rounded corners, theme colors
- AnswerButton (selected): Periwinkle background highlight
- AnswerButton (correct): Sage or green background
- AnswerButton (incorrect): Coral or red background
- Icon: Checkmark (✓) and X (✗) icons
**And** styles use theme colors from Story 1.6
**And** styles include 8px minimum spacing between buttons (accessibility)

**Given** MultipleChoiceQuiz component is implemented
**When** I create barrel export in `packages/fuse/src/components/MultipleChoiceQuiz/index.ts`
**Then** exports include:
```typescript
export { MultipleChoiceQuiz } from './MultipleChoiceQuiz'
export type { MultipleChoiceQuizProps } from './MultipleChoiceQuiz.types'
```

**Given** MultipleChoiceQuiz component is complete
**When** I create unit tests in `packages/fuse/src/components/MultipleChoiceQuiz/tests/MultipleChoiceQuiz.test.tsx`
**Then** tests validate:
- Component renders without crashing
- Question text displays correctly
- 4 answer buttons render
- Answer selection triggers onAnswerSelected callback
- Selected answer highlights correctly
- showFeedback=true displays correct feedback (green checkmark)
- showFeedback=true displays incorrect feedback (red X, green correct)
- Disabled prop prevents interaction
**And** all tests pass

**Given** MultipleChoiceQuiz component is tested
**When** I create interaction tests in `packages/app/src/components/MultipleChoiceQuiz/tests/MultipleChoiceQuiz.interactions.test.tsx`
**Then** tests validate:
- Thai characters render correctly (Unicode, tone marks)
- Touch targets meet 44x44px minimum (NFR-U1)
- Feedback displays within 100ms (NFR-U4 immediate feedback)
- Component is keyboard accessible (tab through answers, enter to select)
**And** tests pass in Chrome

---

### Story 4.3: Create Quiz Taking Page for Characters & Vocabulary

As a developer,
I want a Quiz page that presents multiple-choice questions with immediate feedback and score tracking,
So that users can test their character and vocabulary recognition and see their performance.

**Acceptance Criteria:**

**Given** the App package has MultipleChoiceQuiz component (Story 4.2) and quiz generator (Story 4.1)
**When** I create QuizTaking page in `packages/app/src/pages/QuizTaking/QuizTaking.tsx`
**Then** page component includes:
- Quiz type selector: Buttons for "Consonants", "Vowels", "Tone Marks", "Vocabulary"
- MultipleChoiceQuiz component displaying current question
- Audio playback button to play question audio (character/vocabulary pronunciation)
- Question counter display: "Question X of Y"
- Progress bar showing quiz completion percentage
- "Next Question" button (appears after answer feedback shown)
- Score display after quiz completion: "Score: X / Y (Z%)"
**And** page uses Styled Components for layout with theme colors
**And** page follows component file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** QuizTaking page is structured
**When** component mounts
**Then** quiz type selector displays with 4 buttons (Consonants, Vowels, Tone Marks, Vocabulary)
**And** user must select a quiz type to begin
**And** no quiz is active yet (waiting for selection)

**Given** user selects a quiz type (e.g., "Consonants")
**When** quiz type button is tapped
**Then** quiz generator creates a quiz with 10 questions for selected type
**And** first question loads into MultipleChoiceQuiz component
**And** question counter shows "Question 1 of 10"
**And** progress bar shows 0% completion
**And** quiz type selector hides (quiz is active)

**Given** user is taking a quiz
**When** user taps the audio playback button
**Then** useAudioPlayer hook plays the question's audio URL (character or vocabulary pronunciation)
**And** audio starts within 100ms if cached (NFR-P2)
**And** if audio fails after 3 retries, error toast appears

**Given** user views a quiz question
**When** user selects an answer
**Then** MultipleChoiceQuiz component triggers onAnswerSelected callback
**And** QuizAttempt is created and stored in session (questionId, selectedAnswer, correctAnswer, wasCorrect, timestamp)
**And** showFeedback is set to true (MultipleChoiceQuiz displays correct/incorrect feedback)
**And** audio feedback plays: Success sound if correct, error sound if incorrect (optional, FR19)
**And** "Next Question" button appears after 1-second delay (allows user to see feedback)

**Given** user sees answer feedback
**When** user taps "Next Question" button
**Then** next question from quiz session loads
**And** MultipleChoiceQuiz resets (no selected answer, no feedback)
**And** question counter increments (e.g., "Question 2 of 10")
**And** progress bar updates (e.g., 10% complete after question 1)

**Given** user completes all 10 questions
**When** last question is answered
**Then** quiz session completes
**And** score is calculated (correct answers / total questions * 100)
**And** completion screen displays:
  - "Quiz Complete!" heading
  - Score: "X / 10 (Z%)"
  - Accuracy by type stored in Zustand (updated via store action)
  - Visual indicator: ✓ if accuracy above target (70% alphabet, 50% vocabulary), ⚠️ if below
  - "Take Another Quiz" button (returns to quiz type selector)
  - "View Report Card" button (navigates to ROUTES.REPORT_CARD)

**Given** QuizTaking page routing is configured
**When** I add route in `packages/app/src/routes.ts`
**Then** route constant is defined: `ROUTES.QUIZ_TAKING = '/quiz'`
**And** route uses Wouter for routing
**And** route is accessible from app navigation

**Given** QuizTaking page is styled
**When** I create styles in `packages/app/src/pages/QuizTaking/QuizTaking.styles.ts`
**Then** styled components include:
- PageContainer: Full viewport, cream background, centered content
- QuizTypeSelector: 4 buttons arranged in 2x2 grid
- QuizContainer: Centered quiz interface, 60-70% viewport height
- AudioButton: Minimum 44x44px touch target
- ProgressBar: Horizontal bar, sage color fill, 10px height
- NextButton: Minimum 44x44px touch target, periwinkle background
- CompletionScreen: Centered, large score text, action buttons
**And** styles use theme colors and spacing from Story 1.6

**Given** QuizTaking page is complete
**When** I create unit tests in `packages/app/src/pages/QuizTaking/tests/QuizTaking.test.tsx`
**Then** tests validate:
- Page renders without crashing
- Quiz type selector displays 4 options
- Selecting quiz type generates 10 questions
- First question loads correctly
- Answer selection triggers feedback
- "Next Question" advances to next question
- Quiz completion displays score
- Score calculation is accurate
**And** all tests pass

**Given** QuizTaking page is tested
**When** I create E2E test in `packages/app/e2e/quiz-taking.spec.ts`
**Then** Playwright test validates:
- Navigate to `/quiz`
- Click "Consonants" quiz type
- Answer first question (correct or incorrect)
- Verify feedback displays (green checkmark or red X)
- Click "Next Question"
- Complete all 10 questions
- Verify score displays correctly
- Click "Take Another Quiz" and verify return to quiz type selector
**And** test passes in Chrome with mobile viewport emulation (320px-428px)

---

### Story 4.4: Implement Accuracy Tracking & Calculation in Zustand Store

As a developer,
I want quiz accuracy tracked separately by category (consonants, vowels, tone marks, vocabulary) with precision to 2 decimal places,
So that users can see detailed performance metrics and weak areas are correctly identified (FR20, FR22, NFR-R3).

**Acceptance Criteria:**

**Given** the Zustand store exists (from Story 1.4)
**When** I extend the store state in `packages/app/src/stores/useStore.ts`
**Then** `quizScores` section includes:
- `consonantAccuracy`: number (percentage, 0-100, 2 decimal precision)
- `vowelAccuracy`: number (percentage, 0-100, 2 decimal precision)
- `toneMarkAccuracy`: number (percentage, 0-100, 2 decimal precision)
- `vocabularyAccuracy`: number (percentage, 0-100, 2 decimal precision)
- `quizHistory`: QuizSession[] (array of recent quiz sessions, max 50)
- `totalQuizzesTaken`: number
- `lastQuizDate`: string (ISO date)
**And** TypeScript interfaces are updated in store types
**And** Zod schema is updated to validate new fields

**Given** quizScores state is defined
**When** I add actions to the store
**Then** actions include:
- `recordQuizSession(session: QuizSession)`: Stores quiz session and recalculates accuracy for that quiz type
- `calculateAccuracy(quizType: QuizType)`: Calculates accuracy from quiz history for that type, returns percentage with 2 decimal precision (NFR-R3)
- `getAccuracyByType(quizType: QuizType)`: Returns current accuracy percentage for specified type
- `getAllAccuracies()`: Returns object with all 4 accuracy values
- `isAboveTarget(quizType: QuizType)`: Returns boolean (true if accuracy meets or exceeds target: 70% for alphabet, 50% for vocabulary, FR21)
**And** actions use immer pattern (Zustand built-in state mutation)

**Given** calculateAccuracy function exists
**When** user completes a quiz session
**Then** accuracy is calculated as: (total correct answers / total questions) * 100 across all sessions for that quiz type
**And** accuracy is precise to 2 decimal places (e.g., 72.45%, NFR-R3)
**And** calculation uses only recent quiz sessions (e.g., last 20 sessions per type) for recency weighting
**And** empty quiz history returns 0.00% accuracy

**Given** recordQuizSession action exists
**When** user completes a quiz on QuizTaking page
**Then** action is called with completed QuizSession object
**And** session is added to quizHistory array
**And** if quizHistory length > 50, oldest session is removed (FIFO queue)
**And** accuracy for that quiz type is recalculated using calculateAccuracy()
**And** consonantAccuracy/vowelAccuracy/toneMarkAccuracy/vocabularyAccuracy updates accordingly
**And** totalQuizzesTaken increments
**And** lastQuizDate updates to current date
**And** changes immediately persist to LocalStorage (NFR-R1)

**Given** isAboveTarget function exists
**When** checking alphabet quiz types (consonant, vowel, tone_mark)
**Then** target is 70% (FR21)
**And** function returns true if accuracy ≥ 70.00%
**And** function returns false if accuracy < 70.00%

**When** checking vocabulary quiz type
**Then** target is 50% (FR21)
**And** function returns true if accuracy ≥ 50.00%
**And** function returns false if accuracy < 50.00%

**Given** accuracy tracking is integrated with QuizTaking page
**When** I update `packages/app/src/pages/QuizTaking/QuizTaking.tsx`
**Then** useStore hook is called: `const { recordQuizSession } = useStore()`
**And** after quiz completion, `recordQuizSession()` is called with completed session
**And** completion screen displays visual indicator: ✓ if `isAboveTarget()` returns true, ⚠️ if false (FR23)

**Given** accuracy calculations are stored
**When** I test accuracy precision
**Then** completing 7 correct out of 10 questions results in 70.00% accuracy
**And** completing 17 correct out of 23 questions results in 73.91% accuracy (precise to 2 decimals, NFR-R3)
**And** accuracy updates correctly after multiple quizzes
**And** state restores with perfect fidelity after page refresh (NFR-R1)

**Given** quiz tracking logic is implemented
**When** I create unit tests in `packages/app/src/stores/tests/useStore.quizScores.test.ts`
**Then** tests validate:
- `recordQuizSession()` adds session to quizHistory
- `calculateAccuracy()` returns percentage precise to 2 decimals (NFR-R3)
- `isAboveTarget()` returns correct boolean for 70% and 50% thresholds
- quizHistory is capped at 50 sessions (FIFO removal)
- Accuracy recalculates correctly after multiple quiz sessions
- Edge case: calculateAccuracy() handles empty quiz history (returns 0.00%)
**And** all tests pass

**Given** accuracy tracking is complete
**When** I test with Zod validation
**Then** corrupted quizScores data triggers automatic reset
**And** Sentry logs validation errors with context
**And** app continues functioning without crashing

---

### Story 4.5: Create Report Card Dashboard with Accuracy Breakdown & Trends

As a developer,
I want a Report Card dashboard that displays overall accuracy, category breakdown with visual indicators, and trend visualization,
So that users can monitor their performance and identify weak areas for revision (FR21-FR24, FR26).

**Acceptance Criteria:**

**Given** the Zustand store has quizScores with accuracy data (from Story 4.4)
**When** I create ReportCard page in `packages/app/src/pages/ReportCard/ReportCard.tsx`
**Then** page component includes:
- Overall accuracy summary (average of all 4 categories)
- Category accuracy breakdown:
  - Consonants: X.XX% with visual indicator (✓ or ⚠️)
  - Vowels: X.XX% with visual indicator
  - Tone Marks: X.XX% with visual indicator
  - Vocabulary: X.XX% with visual indicator
- Target indicators: "Target: 70%" for alphabet categories, "Target: 50%" for vocabulary
- Trend visualization: Line chart or bar chart showing accuracy over time (weekly/daily)
- Weak areas list: Characters/words with <70% or <50% accuracy (FR26)
- "Take Quiz" button for each category
- "View Revision Deck" button (navigates to custom revision practice)
**And** page uses Styled Components for layout with theme colors
**And** page follows component file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** ReportCard page is structured
**When** component mounts
**Then** useStore hook loads quiz accuracy data: `const { consonantAccuracy, vowelAccuracy, toneMarkAccuracy, vocabularyAccuracy, quizHistory } = useStore()`
**And** overall accuracy is calculated as average of 4 categories
**And** category breakdown displays each accuracy with 2 decimal precision (e.g., "72.45%")

**Given** category accuracy displays
**When** accuracy is at or above target (70% alphabet, 50% vocabulary)
**Then** visual indicator shows ✓ (checkmark) in sage/green color
**And** category text color is sage (above target)

**When** accuracy is below target
**Then** visual indicator shows ⚠️ (warning) in coral/yellow color
**And** category text color is coral (below target, FR23)

**Given** trend visualization is implemented
**When** quiz history contains multiple sessions
**Then** chart displays accuracy trend over time (last 7 days or last 10 quizzes)
**And** X-axis shows dates or quiz numbers
**And** Y-axis shows accuracy percentage (0-100%)
**And** line or bar chart uses sage color for above-target trend, coral for below-target
**And** chart library is lightweight (e.g., Chart.js or Recharts)

**Given** weak areas list is displayed (FR26)
**When** quiz history contains failed questions
**Then** weak areas section lists:
- Character IDs or vocabulary IDs with individual accuracy <70% (alphabet) or <50% (vocabulary)
- Format: "ก (gor gai) - 45.00%" for characters, "สวัสดี (hello) - 35.00%" for vocabulary
- List is sorted by accuracy (lowest first)
- Maximum 10 weak items displayed
**And** each weak item shows "Add to Revision Deck" button (FR27)

**Given** ReportCard displays "Take Quiz" buttons
**When** user taps "Take Quiz" button for a category (e.g., "Consonants")
**Then** navigate to QuizTaking page with pre-selected quiz type (ROUTES.QUIZ_TAKING + query param)

**Given** ReportCard displays "View Revision Deck" button
**When** user taps "View Revision Deck" button
**Then** navigate to custom revision practice page (ROUTES.REVISION_PRACTICE)
**And** revision deck includes all items marked for revision (FR27)

**Given** ReportCard page routing is configured
**When** I add route in `packages/app/src/routes.ts`
**Then** route constant is defined: `ROUTES.REPORT_CARD = '/report'`
**And** route uses Wouter for routing
**And** route is accessible from app navigation

**Given** ReportCard page is styled
**When** I create styles in `packages/app/src/pages/ReportCard/ReportCard.styles.ts`
**Then** styled components include:
- PageContainer: Full viewport, cream background, scrollable
- SummaryCard: Lavender background, large overall accuracy text
- CategoryCard: Individual cards for each category, sage border if above target, coral border if below
- VisualIndicator: ✓ or ⚠️ icon, 24px size
- TrendChart: Chart container, responsive sizing
- WeakAreasList: Vertical list, each item has character/word + accuracy + "Add" button
- ActionButton: Minimum 44x44px touch target
**And** styles use theme colors and spacing from Story 1.6

**Given** ReportCard page is complete
**When** I create unit tests in `packages/app/src/pages/ReportCard/tests/ReportCard.test.tsx`
**Then** tests validate:
- Page renders without crashing
- Overall accuracy calculates correctly (average of 4 categories)
- Category breakdown displays all 4 categories with 2 decimal precision
- Visual indicators (✓ or ⚠️) display correctly based on targets
- Weak areas list displays items below threshold
- "Take Quiz" buttons navigate correctly
- Trend chart renders (if quiz history exists)
**And** all tests pass

**Given** ReportCard page is tested
**When** I create E2E test in `packages/app/e2e/report-card.spec.ts`
**Then** Playwright test validates:
- Complete 2-3 quizzes to populate quiz history
- Navigate to `/report`
- Verify overall accuracy displays
- Verify category breakdown displays with visual indicators
- Verify trend chart displays (if implemented)
- Click "Take Quiz" for consonants and verify navigation to QuizTaking page
- Verify weak areas list displays (if any items below threshold)
**And** test passes in Chrome with mobile viewport emulation (320px-428px)

---

### Story 4.6: Implement Weak Area Detection & Custom Revision Deck

As a developer,
I want weak area detection that identifies items with low accuracy and a custom revision deck for targeted practice,
So that users can focus on their weak spots and improve accuracy efficiently (FR25-FR29).

**Acceptance Criteria:**

**Given** the Zustand store has quiz history with individual question attempts (from Story 4.4)
**When** I create weak area detection logic in `packages/app/src/lib/weakAreas/weakAreaDetection.ts`
**Then** utility functions are exported:
- `identifyWeakCharacters(quizHistory: QuizSession[], threshold: 0.70)`: Returns character IDs with accuracy below threshold (FR25)
- `identifyWeakVocabulary(quizHistory: QuizSession[], threshold: 0.50)`: Returns vocabulary IDs with accuracy below threshold
- `calculateItemAccuracy(itemId: string, quizHistory: QuizSession[])`: Returns accuracy percentage for specific item (0-100, 2 decimals, FR26)
- `getWeakItemsWithAccuracy()`: Returns array of items with ID, type, and accuracy percentage sorted by accuracy (lowest first)
**And** functions use named exports
**And** functions have full TypeScript type safety

**Given** weak area detection logic exists
**When** identifyWeakCharacters is called with quiz history
**Then** function analyzes all quiz sessions for character quizzes (consonant, vowel, tone_mark types)
**And** for each character, calculates individual accuracy across all attempts
**And** returns array of character IDs where accuracy < 70% (FR25)
**And** threshold is configurable (default 70% for alphabet, user preferences in Story 5, FR25)

**When** identifyWeakVocabulary is called with quiz history
**Then** function analyzes all vocabulary quiz sessions
**And** for each vocabulary word, calculates individual accuracy across all attempts
**And** returns array of vocabulary IDs where accuracy < 50% (FR25)
**And** threshold is configurable (default 50% for vocabulary)

**Given** the Zustand store is extended for revision deck
**When** I add revisionDeck to `packages/app/src/stores/useStore.ts`
**Then** `revisionDeck` section includes:
- `characterRevisionIds`: string[] (character IDs manually added for revision, FR27)
- `vocabularyRevisionIds`: string[] (vocabulary IDs manually added for revision)
- `autoRevisionEnabled`: boolean (default true, automatically adds weak items, FR28)
**And** actions include:
  - `addToRevisionDeck(itemId: string, type: 'character' | 'vocabulary')`: Manually adds item to revision deck (FR27)
  - `removeFromRevisionDeck(itemId: string, type: 'character' | 'vocabulary')`: Removes mastered item from revision deck (FR28 dynamic updates)
  - `syncWeakAreasToRevisionDeck()`: Automatically adds items identified as weak areas if autoRevisionEnabled is true (FR28)
  - `getRevisionDeckItems()`: Returns all items in revision deck (both character and vocabulary)

**Given** addToRevisionDeck action exists
**When** user taps "Add to Revision Deck" button on ReportCard weak areas list (from Story 4.5)
**Then** action is called with itemId and type
**And** item ID is added to characterRevisionIds or vocabularyRevisionIds array
**And** duplicate IDs are prevented (check before adding)
**And** changes immediately persist to LocalStorage (NFR-R1)

**Given** removeFromRevisionDeck action exists
**When** user practices a revision item and accuracy improves above threshold (≥70% alphabet or ≥50% vocabulary)
**Then** action is called with itemId and type
**And** item ID is removed from revision deck arrays
**And** this is automatic dynamic update (FR28)

**Given** syncWeakAreasToRevisionDeck action exists
**When** user completes a quiz and weak areas are detected
**Then** if autoRevisionEnabled is true, action automatically runs
**And** identified weak items are added to revisionDeck arrays
**And** user is NOT notified for each auto-add (silent background sync)
**And** weak items removed from deck if accuracy improves (dynamic updates, FR28)

**Given** revision deck is populated
**When** I create RevisionPractice page in `packages/app/src/pages/RevisionPractice/RevisionPractice.tsx`
**Then** page displays:
- List of all revision deck items (characters + vocabulary)
- Each item shows: Thai text, romanization, current accuracy percentage
- "Practice" button for each item (navigates to focused practice)
- "Remove from Deck" button for each item (calls removeFromRevisionDeck)
- Empty state message if revision deck is empty: "No items in revision deck. Keep practicing!"

**Given** revision deck uses spaced repetition
**When** user practices revision deck items
**Then** items surface more frequently in regular practice sessions (FR29)
**And** spaced repetition algorithm (from Story 3.3) prioritizes revision deck items
**And** revision deck items appear 2-3x more frequently than non-revision items

**Given** weak area detection is complete
**When** I create unit tests in `packages/app/src/lib/weakAreas/tests/weakAreaDetection.test.ts`
**Then** tests validate:
- `identifyWeakCharacters()` correctly identifies items below 70% threshold
- `identifyWeakVocabulary()` correctly identifies items below 50% threshold
- `calculateItemAccuracy()` returns correct percentage with 2 decimal precision
- `getWeakItemsWithAccuracy()` sorts items by accuracy (lowest first)
- Edge case: Empty quiz history returns empty weak areas array
**And** all tests pass

**Given** revision deck logic is implemented
**When** I create unit tests in `packages/app/src/stores/tests/useStore.revisionDeck.test.ts`
**Then** tests validate:
- `addToRevisionDeck()` adds item ID to correct array (character or vocabulary)
- Duplicate IDs are prevented
- `removeFromRevisionDeck()` removes item ID correctly
- `syncWeakAreasToRevisionDeck()` auto-adds weak items when enabled
- Dynamic updates remove items when accuracy improves above threshold
**And** all tests pass

**Given** revision deck is fully implemented
**When** I create E2E test in `packages/app/e2e/revision-deck.spec.ts`
**Then** Playwright test validates:
- Complete quiz with some incorrect answers (create weak areas)
- Navigate to Report Card
- Verify weak areas list displays items below threshold
- Click "Add to Revision Deck" for a weak item
- Navigate to Revision Practice page
- Verify item appears in revision deck
- Practice item and improve accuracy above threshold
- Verify item is automatically removed from revision deck (dynamic update, FR28)
**And** test passes in Chrome

---

## Epic 5 Stories

### Story 5.1: Implement Zero Onboarding with Progressive Signup Prompt

As a developer,
I want users to access character practice immediately without signup, with a prompt to save progress after 5-6 characters,
So that users experience zero barriers to entry and can optionally create accounts for persistence (FR30, FR31, FR32).

**Acceptance Criteria:**

**Given** the App is deployed
**When** a new user visits the app for the first time
**Then** app loads directly to CharacterPractice page (ROUTES.CHARACTER_PRACTICE) within 30 seconds (zero onboarding, FR30)
**And** NO signup form or login screen appears
**And** NO tutorial screens or onboarding modals appear
**And** user can immediately start tracing first character
**And** first canvas interaction occurs within 30 seconds of page load

**Given** user is practicing characters without an account
**When** user has practiced 5-6 characters (tracked in Zustand store)
**Then** progress save prompt modal appears
**And** modal displays:
  - Heading: "Save Your Progress?"
  - Body: "Create a free account to save your learning progress across devices."
  - "Create Account" button (primary action)
  - "Maybe Later" button (secondary action, dismisses modal)
  - "Don't ask again" checkbox (stores preference in LocalStorage)
**And** modal uses theme colors (lavender background, charcoal text)
**And** modal is dismissible (tap outside or tap "Maybe Later")

**Given** progress save prompt is displayed
**When** user taps "Create Account" button
**Then** navigate to account creation page (ROUTES.ACCOUNT_CREATE)
**And** account creation form includes:
  - Email input (required, validated)
  - Password input (required, minimum 8 characters)
  - "Create Account" button
  - Privacy notice: "No sensitive data collected during POC"
**And** form uses Radix UI accessible form primitives
**And** form validates inputs client-side with clear error messages

**Given** user completes account creation form
**When** user taps "Create Account" button
**Then** account is created (implementation: LocalStorage for POC, FR32)
**And** user's current progress syncs to account (copy LocalStorage state)
**And** success toast displays: "Account created! Your progress is saved."
**And** navigate back to CharacterPractice page

**Given** progress save prompt is displayed
**When** user taps "Maybe Later" button
**Then** modal dismisses
**And** user continues practicing without account
**And** progress still persists to LocalStorage (anonymous user)
**And** prompt may appear again after practicing another 10-15 characters (not too frequent)

**Given** user checks "Don't ask again" and taps "Maybe Later"
**When** user dismisses modal
**Then** preference is saved to LocalStorage key `thai-master:signup-prompt-dismissed`
**And** prompt never appears again for this user
**And** user continues using app without account

**Given** user returns to app with existing account
**When** app loads
**Then** check for account credentials in LocalStorage
**And** if account exists, display welcome message: "Welcome back, [email]!"
**And** load user's progress from account storage
**And** NO signup prompt appears (already has account)

**Given** zero onboarding is complete
**When** I create unit tests in `packages/app/src/components/ProgressSavePrompt/tests/ProgressSavePrompt.test.tsx`
**Then** tests validate:
- Modal renders after 5-6 characters practiced
- "Create Account" button navigates to account creation page
- "Maybe Later" button dismisses modal
- "Don't ask again" preference persists to LocalStorage
- Modal does not appear if preference is set
- Modal does not appear if user has account
**And** all tests pass

**Given** zero onboarding is implemented
**When** I create E2E test in `packages/app/e2e/zero-onboarding.spec.ts`
**Then** Playwright test validates:
- New user visit loads directly to CharacterPractice (no signup wall, FR30)
- Practice 5 characters
- Verify progress save prompt appears (FR31)
- Click "Maybe Later"
- Practice 1 more character
- Verify progress persists to LocalStorage
- Refresh page
- Verify progress restores (6 characters practiced)
**And** test passes in Chrome

---

### Story 5.2: Configure PWA with Manifest & Service Worker Registration

As a developer,
I want PWA configuration with manifest file and optimized Service Worker registration,
So that users can install the app on their home screen and experience <2s initial load with offline capability (FR33, NFR-P3).

**Acceptance Criteria:**

**Given** the App package exists
**When** I create PWA manifest in `packages/app/public/manifest.json`
**Then** manifest includes:
- `name`: "Thai Master - Learn Thai Script & Vocabulary"
- `short_name`: "Thai Master"
- `description`: "Learn Thai characters, tones, and vocabulary with interactive tracing and spaced repetition"
- `start_url`: "/"
- `display`: "standalone" (full-screen PWA experience)
- `background_color`: "#FAF9F6" (cream)
- `theme_color`: "#C8D5B9" (sage)
- `icons`: Array of icons at sizes 192x192, 512x512 (PNG format)
- `scope`: "/"
- `orientation`: "portrait" (mobile-first)
- `categories`: ["education", "productivity"]

**Given** manifest.json is created
**When** I add manifest link to `packages/app/index.html`
**Then** HTML `<head>` includes: `<link rel="manifest" href="/manifest.json">`
**And** meta tags include:
  - `<meta name="theme-color" content="#C8D5B9">`
  - `<meta name="apple-mobile-web-app-capable" content="yes">`
  - `<meta name="apple-mobile-web-app-status-bar-style" content="default">`
  - `<meta name="apple-mobile-web-app-title" content="Thai Master">`

**Given** PWA icons are needed
**When** I create app icons in `packages/app/public/icons/`
**Then** icons include:
- `icon-192x192.png`: 192x192px PNG (Android home screen)
- `icon-512x512.png`: 512x512px PNG (Android splash screen)
- `apple-touch-icon.png`: 180x180px PNG (iOS home screen)
**And** icons use Thai Master branding (pastel colors, Thai script)
**And** icons have transparent or cream background

**Given** Service Worker exists from Story 2.6
**When** I optimize Service Worker registration in `packages/app/src/main.tsx`
**Then** registration occurs AFTER React hydration (non-blocking, NFR-P3)
**And** registration uses `load` event listener to avoid blocking initial render
**And** Service Worker caches HTML, CSS, JS assets on first load (cache-first strategy)
**And** Service Worker version is easily updateable (cache name versioning)

**Given** Service Worker caches static assets
**When** user visits app for the first time
**Then** initial load completes within 2 seconds on 4G connection (NFR-P3)
**And** critical assets (HTML, JS, CSS) are cached in `thai-master-static-v1` cache
**And** subsequent navigations use cached assets with <500ms load time (NFR-P3)

**Given** PWA is installable
**When** user visits app on Chrome Android
**Then** browser shows "Add to Home Screen" prompt (automatically or via menu)
**And** user can install app to home screen
**And** installed app launches in standalone mode (no browser chrome)
**And** installed app displays correct icon and name on home screen

**Given** installed PWA is launched
**When** user taps app icon on home screen
**Then** app launches directly to CharacterPractice page (zero onboarding)
**And** app loads from Service Worker cache within 500ms (cached load, NFR-P3)
**And** app displays full-screen without browser UI (standalone display mode)

**Given** PWA manifest and Service Worker are configured
**When** I test PWA compliance using Lighthouse
**Then** Lighthouse PWA audit scores:
- Installable: Pass (manifest meets requirements)
- PWA optimized: Pass (Service Worker registered, start_url responds with 200)
- Performance: Score ≥90 (meets <2s load time, NFR-P3)
**And** no critical PWA errors

**Given** PWA is complete
**When** I create E2E test in `packages/app/e2e/pwa-offline.spec.ts`
**Then** Playwright test validates:
- Navigate to app URL
- Verify Service Worker registers successfully
- Verify manifest.json loads correctly
- Simulate offline mode (context.setOffline(true))
- Verify app still loads from Service Worker cache
- Verify CharacterPractice page functions offline (from Story 2.6)
- Verify cached assets serve within 500ms
**And** test passes in Chrome

**Given** PWA is deployed
**When** I document PWA setup
**Then** README explains:
- How to install app on Android (Add to Home Screen)
- Service Worker caching strategies (static, audio, fonts)
- How to update Service Worker version (increment cache version)
- Offline capabilities and limitations

---

### Story 5.3: Implement Export/Import Progress Functionality

As a developer,
I want users to export and import their learning progress as JSON files,
So that users can manually backup and restore their data with perfect fidelity (FR45, NFR-R4).

**Acceptance Criteria:**

**Given** the Zustand store contains user progress (character, vocabulary, quiz, revision deck)
**When** I create export logic in `packages/app/src/lib/exportImport/exportProgress.ts`
**Then** export function is exported:
- `exportProgressToJSON()`: Returns complete store state as JSON string
**And** exported JSON includes ALL state sections:
  - characterProgress (practicedCharacterIds, dailyPracticeCount, isMasteryComplete, completionDate)
  - vocabularyProgress (vocabularyKnowledge, dailyWordsLearned, isVocabularyComplete, completionDate)
  - quizScores (accuracies, quizHistory, totalQuizzesTaken)
  - revisionDeck (characterRevisionIds, vocabularyRevisionIds)
  - userPreferences (configurable thresholds, autoRevisionEnabled)
  - metadata (exportDate, appVersion, dataVersion)
**And** function uses named export with TypeScript types

**Given** export function exists
**When** user triggers export action
**Then** JSON string is generated with pretty formatting (2-space indentation)
**And** JSON structure matches Zustand store schema exactly
**And** all timestamps are ISO date strings
**And** all IDs and arrays are preserved with perfect fidelity (NFR-R4)
**And** JSON size is reasonable (<1MB for full progress data)

**Given** export JSON is generated
**When** I create download logic in `packages/app/src/lib/exportImport/downloadFile.ts`
**Then** download function is exported:
- `downloadJSON(data: string, filename: string)`: Triggers browser download of JSON file
**And** function creates Blob from JSON string
**And** function creates temporary anchor element with download attribute
**And** function triggers click to initiate download
**And** filename format: `thai-master-progress-YYYY-MM-DD.json`

**Given** download function exists
**When** user taps "Export Progress" button on Settings page
**Then** export function generates JSON
**And** download function triggers browser download
**And** user receives file: `thai-master-progress-2026-01-10.json`
**And** download completes within 1 second

**Given** import logic is needed
**When** I create import logic in `packages/app/src/lib/exportImport/importProgress.ts`
**Then** import function is exported:
- `importProgressFromJSON(jsonString: string)`: Validates and parses JSON, returns parsed state or error
**And** function validates JSON structure using Zod schema (same schema as store persist validation)
**And** function returns validation errors if JSON is corrupted or invalid
**And** function returns parsed state object if validation passes

**Given** import function exists
**When** user uploads a valid progress JSON file
**Then** file reader reads file contents as string
**And** import function validates JSON structure with Zod
**And** if validation passes, Zustand store is updated with imported state
**And** all progress restores with perfect fidelity (NFR-R4: 100% data capture and restore)
**And** success toast displays: "Progress imported successfully! [X characters, Y vocabulary, Z quizzes]"

**Given** user uploads an invalid or corrupted JSON file
**When** import function validates JSON
**Then** Zod validation fails
**And** error toast displays: "Import failed: Invalid progress file. Please check the file and try again."
**And** detailed error is logged to Sentry (validation failure details)
**And** store state remains unchanged (no partial import)

**Given** I create Settings page in `packages/app/src/pages/Settings/Settings.tsx`
**When** page component mounts
**Then** page displays:
- "Export Progress" button: Downloads JSON file
- "Import Progress" file input: Accepts .json files
- Current progress summary: "X/80 characters, Y/50 vocabulary, Z quizzes taken"
- Data storage info: "Your progress is stored locally on this device"
- Account section: Display email if account exists, "Create Account" button if not
- User preferences section: Configurable accuracy thresholds (70% alphabet default, 50% vocabulary default)
- "Auto-add weak items to revision deck" toggle (autoRevisionEnabled)
**And** page uses Styled Components with theme colors

**Given** Settings page is styled
**When** I create styles in `packages/app/src/pages/Settings/Settings.styles.ts`
**Then** styled components include:
- PageContainer: Full viewport, cream background, scrollable
- SectionCard: Lavender background, rounded corners, padding
- Button: Minimum 44x44px touch target, periwinkle background
- FileInput: Styled file input with custom appearance
- ToggleSwitch: Accessible toggle using Radix UI Switch primitive
- SummaryText: Sage color, summary statistics
**And** styles use theme colors and spacing from Story 1.6

**Given** Settings page routing is configured
**When** I add route in `packages/app/src/routes.ts`
**Then** route constant is defined: `ROUTES.SETTINGS = '/settings'`
**And** route uses Wouter for routing
**And** route is accessible from app navigation

**Given** export/import is complete
**When** I create unit tests in `packages/app/src/lib/exportImport/tests/exportImport.test.ts`
**Then** tests validate:
- `exportProgressToJSON()` generates valid JSON string
- Exported JSON includes all required state sections
- `importProgressFromJSON()` successfully parses valid JSON
- Import validation rejects invalid JSON structures
- Import validation rejects JSON missing required fields
- Downloaded filename format is correct (`thai-master-progress-YYYY-MM-DD.json`)
**And** all tests pass

**Given** export/import is implemented
**When** I create E2E test in `packages/app/e2e/export-import.spec.ts`
**Then** Playwright test validates:
- Practice 10 characters, learn 5 vocabulary words, take 2 quizzes
- Navigate to Settings page
- Click "Export Progress" button
- Verify download initiates (check downloads folder)
- Read downloaded JSON file
- Verify JSON contains practiced character IDs, vocabulary knowledge, quiz history
- Clear LocalStorage (simulate data loss)
- Upload exported JSON file via "Import Progress" file input
- Verify progress restores with perfect fidelity (10 characters, 5 vocabulary, 2 quizzes, NFR-R4)
- Verify success toast displays
**And** test passes in Chrome

---

### Story 5.4: Implement WCAG AA Accessibility Compliance

As a developer,
I want full WCAG AA accessibility compliance across all components and pages,
So that the app is usable by people with disabilities and meets accessibility standards (NFR-U1, NFR-U4).

**Acceptance Criteria:**

**Given** the Fuse component library exists
**When** I audit all components for accessibility
**Then** ALL components meet WCAG AA requirements:
- Color contrast ratios: 7:1 for Thai characters (charcoal on cream, NFR-U3), 4.5:1 for body text (AA standard), 3:1 for UI components
- Touch targets: Minimum 44x44px for all interactive elements (buttons, links, inputs, NFR-U1)
- Spacing: Minimum 8px between adjacent touch targets (prevent mis-taps)
- Focus indicators: Visible focus outline (2px solid periwinkle) on all interactive elements
- ARIA labels: All interactive elements have descriptive labels
- Semantic HTML: Proper heading hierarchy (h1, h2, h3), semantic tags (<button>, <nav>, <main>)

**Given** Canvas component is reviewed for accessibility
**When** I add ARIA labels to `packages/fuse/src/components/Canvas/Canvas.tsx`
**Then** canvas element includes:
- `aria-label`: "Trace Thai character [romanization]" (e.g., "Trace Thai character gor gai")
- `role`: "img" (canvas is presentational for screen readers)
- Focus management: Canvas is focusable via tab key (tabindex="0")
**And** ghost font text is announced by screen readers (aria-describedby references off-screen text)

**Given** FlashCard component is reviewed for accessibility
**When** I add ARIA labels to `packages/fuse/src/components/FlashCard/FlashCard.tsx`
**Then** card includes:
- `aria-label`: "Flash card: [Thai word]" (front side)
- `aria-label`: "Flash card translation: [English]" (back side after flip)
- Flip action: `aria-label`: "Flip card to reveal translation"
- Swipe actions: `aria-label`: "Swipe left if you know this word" and "Swipe right if you're learning this word"
- Focus management: Card is focusable, spacebar flips card (keyboard navigation)

**Given** MultipleChoiceQuiz component is reviewed for accessibility
**When** I add ARIA labels to `packages/fuse/src/components/MultipleChoiceQuiz/MultipleChoiceQuiz.tsx`
**Then** quiz includes:
- `aria-label`: "Quiz question: Identify character [Thai text]"
- Answer buttons: `aria-label`: "Answer option: [romanization]"
- Feedback: `aria-live="polite"` region announces "Correct!" or "Incorrect, correct answer is [romanization]"
- Focus management: Tab through answer buttons, enter to select

**Given** all pages are reviewed for accessibility
**When** I audit page structure
**Then** pages meet accessibility requirements:
- Heading hierarchy: h1 for page title, h2 for sections, h3 for subsections (no skipped levels)
- Landmark regions: `<header>`, `<nav>`, `<main>`, `<footer>` semantic tags
- Skip link: "Skip to main content" link at top of page (hidden unless focused)
- Page title: Unique `<title>` for each route (e.g., "Character Practice - Thai Master")

**Given** keyboard navigation is implemented
**When** user navigates with keyboard only (no mouse)
**Then** user can:
- Tab through all interactive elements in logical order
- See visible focus indicators on focused elements (2px periwinkle outline)
- Activate buttons with Enter or Space key
- Navigate forms with Tab and Shift+Tab
- Dismiss modals with Escape key
- Use arrow keys for radio button groups and select dropdowns

**Given** ARIA live regions are needed for dynamic updates
**When** progress updates, errors occur, or feedback is shown
**Then** ARIA live regions announce changes:
- `aria-live="polite"` for progress updates: "Character 5 of 80 practiced"
- `aria-live="assertive"` for errors: "Audio failed to load. Check your connection and try again."
- `aria-live="polite"` for quiz feedback: "Correct!" or "Incorrect"
- Toast notifications use `role="status"` and are announced by screen readers

**Given** animations respect user preferences
**When** user has `prefers-reduced-motion` enabled (system setting)
**Then** ALL animations are disabled or reduced:
- FlashCard flip: Instant flip (no CSS transition)
- Toast notifications: Fade only (no slide animation)
- Achievement modals: Fade only (no bounces or slides)
- Canvas strokes: Immediate draw (already <50ms, no change needed)
- Page transitions: Instant navigation (no fade/slide)

**Given** color is not sole indicator of information
**When** visual feedback is shown
**Then** information is conveyed through multiple channels:
- Correct answer: Green background + checkmark icon (✓) + "Correct" text + audio feedback
- Incorrect answer: Red background + X icon (✗) + "Incorrect" text + correct answer shown
- Above target: Sage color + checkmark icon (✓) + "Above target" text
- Below target: Coral color + warning icon (⚠️) + "Below target" text

**Given** accessibility compliance is complete
**When** I test with automated accessibility tools
**Then** run axe-core accessibility tests on all pages
**And** no critical or serious accessibility violations
**And** all WCAG AA criteria pass (Level AA conformance)

**Given** accessibility is implemented
**When** I create accessibility tests in `packages/app/e2e/accessibility.spec.ts`
**Then** Playwright test with axe-core validates:
- CharacterPractice page: No accessibility violations
- VocabularyLearning page: No violations
- QuizTaking page: No violations
- ReportCard page: No violations
- Settings page: No violations
- Keyboard navigation: Tab through all interactive elements
- Focus indicators: Verify visible focus outlines
- ARIA labels: Verify screen reader announces correct labels
**And** tests pass with zero violations

**Given** accessibility is fully implemented
**When** I document accessibility features
**Then** README explains:
- WCAG AA compliance (Level AA conformance)
- Color contrast ratios (7:1 for Thai characters, 4.5:1 for body text)
- Touch target sizes (minimum 44x44px)
- Keyboard navigation support
- Screen reader support (ARIA labels, semantic HTML)
- Reduced motion support (prefers-reduced-motion)
- Accessibility testing tools (axe-core)

---

### Story 5.5: Implement Toast Notifications & Achievement Modals

As a developer,
I want toast notifications for feedback and achievement modals for milestones,
So that users receive immediate visual feedback and celebrate their progress (FR50, NFR-U4).

**Acceptance Criteria:**

**Given** the Fuse package exists
**When** I create Toast component in `packages/fuse/src/components/Toast/Toast.tsx`
**Then** component implementation includes:
- Toast container positioned at bottom of viewport
- Slide-up animation (3-second auto-dismiss, respects prefers-reduced-motion)
- Multiple toast types: success (sage background), error (coral background), info (periwinkle background)
- Icon for each type: ✓ (success), ✗ (error), ℹ️ (info)
- Message text (16px minimum, charcoal color)
- Dismiss button (X icon, optional manual dismiss)
- Stacking support (multiple toasts stack vertically with 8px spacing)
- Accessible: `role="status"`, `aria-live="polite"`, ARIA labels
**And** component uses Styled Components with theme colors
**And** component follows file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** Toast component is created
**When** I create toast hook in `packages/app/src/hooks/useToast/useToast.ts`
**Then** hook provides:
- `showToast(message: string, type: 'success' | 'error' | 'info', duration?: number)`: Displays toast notification
- `dismissToast(toastId: string)`: Manually dismisses toast
- Toast queue management (max 3 visible toasts at once)
**And** hook uses React context for global toast state
**And** hook returns `{ showToast, dismissToast }`

**Given** useToast hook exists
**When** user action triggers feedback (e.g., audio error, quiz completion, progress saved)
**Then** `showToast()` is called with appropriate message and type
**And** toast appears at bottom of viewport within 100ms (NFR-U4 immediate feedback)
**And** toast displays for specified duration (default 3 seconds)
**And** toast auto-dismisses after duration
**And** toast can be manually dismissed by tapping X button

**Given** I create Modal component in `packages/fuse/src/components/Modal/Modal.tsx`
**When** component is implemented
**Then** modal implementation includes:
- Overlay: Semi-transparent background (charcoal 50% opacity), full viewport
- Modal container: Centered, lavender background, rounded corners, max-width 400px
- Heading: h2 element, charcoal color, 24px font size
- Body content: Slot for custom content
- Action buttons: Primary and secondary button slots
- Close button: X icon in top-right corner
- Accessible: `role="dialog"`, `aria-modal="true"`, focus trap, Escape key dismisses
- Animation: Fade-in (200ms, respects prefers-reduced-motion)
**And** component uses Radix UI Dialog primitive for accessibility
**And** component follows file structure (.tsx, .styles.ts, .types.ts, index.ts)

**Given** Modal component is created
**When** user completes milestones (Week 4, Week 6, Week 12)
**Then** achievement modal displays with:
- Heading: "Milestone Achieved! 🎉"
- Body: "You've completed [milestone description]!"
  - Week 4 (FR48): "You've mastered all 80 Thai characters!"
  - Week 12 (FR49): "You've learned all 50 vocabulary words!"
- Visual: Achievement badge or icon (pastel colors)
- Primary button: "Continue Learning" (dismisses modal)
- Secondary button: "View Progress" (navigates to Report Card)

**Given** achievement modal is triggered
**When** character mastery completes (Story 2.5 checkMasteryCompletion)
**Then** modal displays Week 4 milestone achievement
**And** modal fades in with 200ms animation
**And** modal traps focus (tab cycles through modal buttons only)
**And** Escape key dismisses modal

**When** vocabulary completion (Story 3.5 checkVocabularyCompletion)
**Then** modal displays Week 12 milestone achievement
**And** FR50 requirement met: Achievement indicators for milestone completions

**Given** Toast and Modal components are complete
**When** I integrate throughout app
**Then** toasts are used for:
- Success: "Progress saved!", "Vocabulary Unlocked!", "Account created!"
- Error: "Audio failed to load. Check your connection and try again.", "Import failed: Invalid progress file."
- Info: "Revision deck updated", "Character mastery 50% complete"
**And** modals are used for:
- Achievement milestones (Week 4, Week 12)
- Destructive actions confirmation: "Clear all progress?"
- Progress save prompt (from Story 5.1)

**Given** Toast and Modal are styled
**When** animations are tested with prefers-reduced-motion
**Then** users with reduced motion preference see:
- Toasts: Fade-in only (no slide animation)
- Modals: Fade-in only (no scale/bounce animations)
- Instant feedback within 100ms (NFR-U4)

**Given** Toast and Modal are complete
**When** I create unit tests
**Then** tests validate:
- Toast displays with correct type styling (success, error, info)
- Toast auto-dismisses after duration
- Toast respects prefers-reduced-motion (fade only)
- Modal displays and traps focus
- Modal dismisses on Escape key
- Modal respects prefers-reduced-motion (fade only)
**And** all tests pass

**Given** Toast and Modal are implemented
**When** I create E2E test in `packages/app/e2e/toast-modal.spec.ts`
**Then** Playwright test validates:
- Trigger error (audio failure)
- Verify error toast appears with correct message
- Wait 3 seconds
- Verify toast auto-dismisses
- Complete character mastery (80 characters)
- Verify achievement modal appears
- Click "Continue Learning"
- Verify modal dismisses
**And** test passes in Chrome

---

### Story 5.6: Final Service Worker Optimization & Progressive Audio Caching

As a developer,
I want optimized Service Worker with progressive audio caching (next 10 items) and versioned cache management,
So that audio loads seamlessly in background without UI blocking and meets performance requirements (FR38, FR39, NFR-P5).

**Acceptance Criteria:**

**Given** Service Worker exists from Story 2.6
**When** I enhance Service Worker in `packages/app/public/sw.js` with progressive caching
**Then** Service Worker implements progressive audio caching strategy:
- On user action (e.g., "Next Character" button), trigger background caching of next 10 items
- Caching occurs asynchronously without blocking UI (NFR-P5)
- Cache character audio URLs for next 10 characters in practice order
- Cache vocabulary audio URLs for next 10 words in spaced repetition queue
- Use `clients.postMessage()` to communicate cache status to app (optional progress indicator)

**Given** progressive caching logic exists
**When** user practices character 5
**Then** Service Worker caches audio for characters 6-15 in background
**And** caching does not block UI interactions (<50ms canvas latency maintained, NFR-P5)
**And** caching completes within 5 seconds on 4G connection
**And** if caching fails (network error), retry once after 2-second delay

**Given** progressive caching is active
**When** user advances to character 6
**Then** audio loads from cache immediately (<100ms, FR39, NFR-P2)
**And** Service Worker caches audio for characters 16-25 in background (rolling window)
**And** cache size is manageable (~10-20 audio files cached ahead)

**Given** Service Worker handles cache versioning
**When** app version updates (e.g., v1.0.0 → v1.1.0)
**Then** Service Worker detects version mismatch
**And** activation event deletes old caches:
  - Delete `thai-master-audio-v1` (old version)
  - Delete `thai-master-fonts-v1` (old version if font cache version changed)
  - Delete `thai-master-static-v1` (old version)
**And** new caches are created with incremented version:
  - `thai-master-audio-v2`
  - `thai-master-static-v2`
**And** cache invalidation prevents stale content

**Given** Service Worker handles fonts
**When** I extend Service Worker to cache fonts (from Story 1.6)
**Then** Service Worker caches Google Fonts CDN requests:
- URL pattern: `https://fonts.googleapis.com/*` and `https://fonts.gstatic.com/*`
- Cache name: `thai-master-fonts-v1`
- Cache strategy: Cache-first with long-term persistence (30+ days)
**And** font caching occurs on first font load
**And** subsequent page loads use cached fonts immediately

**Given** Service Worker caches all asset types
**When** I document cache strategies
**Then** documentation explains:
- Static assets (HTML, JS, CSS): Cache name `thai-master-static-v1`, network-first for HTML, cache-first for JS/CSS
- Audio files: Cache name `thai-master-audio-v1`, cache-first, progressive caching (next 10 items, FR39)
- Fonts: Cache name `thai-master-fonts-v1`, cache-first, long-term persistence (NFR-P5)
- Cache versioning: Increment version number on app updates for cache invalidation
- Cache size: ~50-100 audio files cached (progressive strategy prevents caching all 130 upfront, FR38)

**Given** Service Worker is optimized
**When** I test performance with progressive caching
**Then** validate performance requirements:
- Initial app load: <2s on 4G (NFR-P3)
- Subsequent navigation: <500ms when cached (NFR-P3)
- Audio playback: <100ms from cache (NFR-P2)
- Canvas latency: <50ms (unaffected by background caching, NFR-P5)
- UI responsiveness: No blocking during audio caching (NFR-P5)

**Given** Service Worker supports offline mode
**When** user goes offline after initial load
**Then** offline mode provides:
- 100% character practice functionality (canvas, progress tracking, no audio if not cached, FR42)
- 100% vocabulary learning functionality (flash cards, spaced repetition, no audio if not cached, FR43)
- 100% quiz functionality (quizzes, score tracking, results persist when online, FR44)
- Cached assets serve immediately (<500ms)
- No degradation in canvas or UI performance (NFR-P4)
- Silent offline mode (no error messages if offline functionality works, per UX design)

**Given** Service Worker handles network failures gracefully
**When** audio fails to cache (network unavailable)
**Then** Service Worker logs error to console
**And** retry logic attempts cache again after 2 seconds (1 retry only)
**And** if retry fails, skip caching that item (user will load on-demand if needed)
**And** no error messages shown to user (silent background process)

**Given** Service Worker is fully optimized
**When** I create E2E test in `packages/app/e2e/progressive-caching.spec.ts`
**Then** Playwright test validates:
- Navigate to CharacterPractice page
- Practice character 1 (audio loads and caches)
- Verify Service Worker begins caching next 10 characters (monitor network tab)
- Practice characters 2-5 rapidly
- Verify cached audio loads within 100ms (no network requests after initial cache)
- Verify canvas latency remains <50ms during background caching (NFR-P5)
- Practice character 10
- Verify Service Worker caches next window (characters 11-20)
**And** test passes in Chrome

**Given** Service Worker is complete
**When** I document caching strategy
**Then** README explains:
- Progressive caching strategy (next 10 items, FR39)
- Cache-on-first-use vs preloading rationale (prevents caching all 130 files upfront, FR38)
- How to monitor Service Worker caching (browser DevTools Application tab)
- Cache versioning and invalidation (increment version on app updates)
- Offline mode capabilities and limitations (cached content only)
- Performance benchmarks (2s initial load, 100ms cached audio, <50ms canvas)

---

## Summary

### Epic and Story Breakdown

**Total Epics**: 5
**Total Stories**: 33

#### Epic 1: Project Setup & Core Infrastructure (9 stories)
Foundation for all future development with monorepo, testing, CI/CD, state management, error tracking, theming, Storybook, and documentation.

1. Story 1.1: Initialize Vite Monorepo with Fuse Library & App Packages
2. Story 1.2: Configure Testing Infrastructure (Vitest & Playwright)
3. Story 1.3: Set Up CI/CD Pipeline (GitHub Actions & Cloudflare Pages)
4. Story 1.4: Implement Core Zustand Store with LocalStorage Persistence
5. Story 1.5: Integrate Sentry Error Tracking
6. Story 1.6: Configure Thai Font Loading & Theme Foundation
7. Story 1.7: Create Project Context Documentation
8. Story 1.8: Add Storybook to @thai-master/fuse Library
9. Story 1.9: Deploy to Cloudflare Pages via GitHub Actions

#### Epic 2: Character Learning Foundation (6 stories)
Interactive canvas-based character practice with audio, progress tracking, and offline support.

1. Story 2.1: Create Character Data Model & Content Structure
2. Story 2.2: Build Touch-Enabled Canvas Component with Ghost Font
3. Story 2.3: Implement Audio Player Hook with 3-Retry Logic
4. Story 2.4: Create Character Practice Page with Canvas & Audio Integration
5. Story 2.5: Implement Character Progress Tracking in Zustand Store
6. Story 2.6: Add Offline Support for Character Practice with Service Worker Audio Caching

#### Epic 3: Vocabulary Learning System (6 stories)
Flash card-based vocabulary learning with spaced repetition, progression gates, and 50-word deck.

1. Story 3.1: Create Vocabulary Data Model & Content Structure
2. Story 3.2: Build Flash Card Component in Fuse Library
3. Story 3.3: Implement Spaced Repetition Algorithm
4. Story 3.4: Create Vocabulary Learning Page with Flash Cards & Spaced Repetition
5. Story 3.5: Implement Vocabulary Progress Tracking in Zustand Store
6. Story 3.6: Implement Progression Gate to Unlock Vocabulary After Character Mastery

#### Epic 4: Assessment & Performance Review (6 stories)
Quizzes, accuracy tracking, report card, weak area detection, and custom revision deck.

1. Story 4.1: Create Quiz Data Model & Question Generation Logic
2. Story 4.2: Build Multiple-Choice Quiz Component in Fuse Library
3. Story 4.3: Create Quiz Taking Page for Characters & Vocabulary
4. Story 4.4: Implement Accuracy Tracking & Calculation in Zustand Store
5. Story 4.5: Create Report Card Dashboard with Accuracy Breakdown & Trends
6. Story 4.6: Implement Weak Area Detection & Custom Revision Deck

#### Epic 5: User Experience & Accessibility Polish (6 stories)
Zero onboarding, PWA, export/import, accessibility, toast notifications, and Service Worker optimization.

1. Story 5.1: Implement Zero Onboarding with Progressive Signup Prompt
2. Story 5.2: Configure PWA with Manifest & Service Worker Registration
3. Story 5.3: Implement Export/Import Progress Functionality
4. Story 5.4: Implement WCAG AA Accessibility Compliance
5. Story 5.5: Implement Toast Notifications & Achievement Modals
6. Story 5.6: Final Service Worker Optimization & Progressive Audio Caching

### Requirements Coverage

**Functional Requirements**: 50 FRs (FR1-FR50) - 100% coverage
**Non-Functional Requirements**: 16 NFRs - 100% coverage
**Additional Requirements**: 77 additional (45 architecture + 32 UX) - 100% coverage

### Epic Dependencies

- **Epic 1** → **Epic 2**: Core infrastructure enables character learning
- **Epic 2** → **Epic 3**: Character mastery unlocks vocabulary (progression gate, FR7)
- **Epic 2, 3** → **Epic 4**: Progress data enables quizzes and analytics
- **Epic 1-4** → **Epic 5**: All features ready for UX polish and accessibility

### Implementation Order

Epics are designed to be implemented sequentially (Epic 1 → Epic 2 → Epic 3 → Epic 4 → Epic 5). Within each epic, stories are ordered by dependency and can be implemented sequentially or with minimal parallelization where dependencies allow.

### Key Technical Achievements

- **Monorepo Structure**: Fuse component library (CDN-compilable) + App package
- **Offline-First**: Service Worker with progressive audio caching, 100% offline functionality
- **Zero Data Loss**: Zustand persist with Zod validation, automatic corruption recovery
- **Performance**: <50ms canvas latency, <100ms cached audio, <2s initial load
- **Accessibility**: WCAG AA compliance, keyboard navigation, screen reader support
- **Testing**: Comprehensive unit tests (Vitest) and E2E tests (Playwright) for all critical paths
- **CI/CD**: GitHub Actions for testing, Cloudflare Pages for deployment, merge gate on test failures

### Next Steps

After completing all 31 stories across 5 epics:
1. Run implementation readiness check workflow
2. Create sprint planning with sprint-status.yaml
3. Begin implementation starting with Epic 1 Story 1.1
4. Execute dev-story workflow for each story sequentially
5. Complete Week 4 milestone (character mastery)
6. Complete Week 12 milestone (vocabulary completion)
7. Deploy POC to Cloudflare Pages for 12-week validation

### Document History

- **Created**: 2026-01-10
- **Requirements Extracted**: PRD, Architecture, UX Design
- **Epic Design**: 5 epics organized by user value
- **Story Creation**: 31 stories with comprehensive acceptance criteria
- **Status**: Complete - Ready for implementation
