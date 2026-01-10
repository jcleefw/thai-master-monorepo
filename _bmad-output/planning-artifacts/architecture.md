---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-thai-learn-playground-2026-01-09.md"
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
workflowType: 'architecture'
project_name: 'thai-learning-v2'
user_name: 'thaieager'
date: '2026-01-10'
lastStep: 8
status: 'complete'
completedAt: '2026-01-10'
---

# Architecture Decision Document - Thai Master

**Project:** thai-learning-v2
**Author:** thaieager
**Date:** 2026-01-10

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

Thai Master requires **50 functional requirements** across 7 major capability areas:

1. **Character Learning & Practice (FR1-FR7)**: Touch-enabled canvas tracing system for all Thai characters (44 consonants, 32 vowels, 4 tone marks) with ghost font guidance (30% opacity), individual canvas reset, native audio pronunciation, and progression gating (vocabulary unlocks after character completion).

2. **Vocabulary Learning & Flash Cards (FR8-FR14)**: 50-word foundational deck using flash-card interface with spaced repetition algorithm, 85% known/15% controlled sentence exposure methodology, tone mark integration, and daily progress tracking.

3. **Assessment & Quiz System (FR15-FR20)**: Multiple-choice character and vocabulary recognition quizzes with immediate audio feedback, separate accuracy tracking for consonants/vowels/tone marks/vocabulary, and performance-based item surfacing.

4. **Performance Review & Reporting (FR21-FR29)**: Report card dashboard with accuracy breakdown by category (70% alphabet target, 50% vocabulary target), visual indicators (✓/⚠️), trend visualization, weak area identification (<70%/<50% thresholds), and custom revision deck generation with dynamic updates.

5. **User Onboarding & Access (FR30-FR33)**: Zero signup wall for immediate canvas access, progress save prompt after 5-6 characters, free account creation for persistence, direct web browser access without app store.

6. **Audio & Pronunciation System (FR34-FR39)**: Native speaker pronunciation for all 130 items (44 consonants + 32 vowels + 4 tone marks + 50 vocabulary), Service Worker caching for offline playback, progressive loading (next 10 items).

7. **Data Persistence & Offline Mode (FR40-FR45)**: LocalStorage for all progress data with zero data loss guarantee, offline functionality for tracing/flash cards/quizzes after initial load, export/import for manual backup.

**Architectural Implications:**
- Canvas API integration with aggressive performance requirements
- Service Worker implementation for offline-first architecture
- LocalStorage as primary data persistence layer (cloud sync deferred)
- Spaced repetition algorithm implementation for intelligent content surfacing
- Real-time accuracy tracking and weak area detection algorithms

**Non-Functional Requirements:**

**Performance (NFR-P1 to NFR-P5):**
- Canvas touch latency: <50ms on mid-range Android devices (Samsung Galaxy A-series baseline)
- Audio playback: <100ms from cached files
- Initial app load: <2 seconds on 4G mobile connection
- Offline mode: Identical performance to online mode
- Progressive audio caching: Background loading without UI blocking

**Reliability (NFR-R1 to NFR-R4):**
- LocalStorage persistence: Zero data loss across browser sessions, crashes, unexpected closures
- Offline mode: 100% functionality after initial cache
- Progress tracking accuracy: Precise to 2 decimal places (e.g., 72.45%)
- Export/import integrity: Perfect fidelity with no data corruption

**Usability (NFR-U1 to NFR-U4):**
- Mobile-first optimization: Minimum 5-inch display support, 44x44px touch targets
- Audio quality: 128kbps AAC minimum, normalized volume levels
- Thai font rendering: Accurate tone mark positioning on Chrome Desktop/Android, 30% opacity ghost font visible without strain, minimum 48pt for mobile canvas
- Immediate feedback: <100ms for all interactions (tracing, quiz answers, button presses)

**Security (NFR-S1 to NFR-S2):**
- HTTPS in production
- No sensitive data collection (passwords, payment, PII) during POC
- LocalStorage same-origin security
- Optional account creation: Hashed passwords, no plaintext storage

**Integration (NFR-I1 to NFR-I2):**
- Cloudflare R2 for audio delivery: 99% uptime during 12-week POC, CORS support, 3-retry logic on failure
- Audio CDN: 30-day caching headers, range request support, stable URLs

**Architectural Implications:**
- Performance monitoring and validation critical for <50ms canvas requirement
- Service Worker must be rock-solid for offline reliability promise
- LocalStorage quota management and error handling essential
- Audio caching strategy must be progressive to avoid blocking
- Chrome-only scope simplifies compatibility but limits reach

**Scale & Complexity:**

- **Primary Domain**: Mobile Web (Progressive Web App)
- **Complexity Level**: Medium
  - Custom Canvas API interaction with aggressive performance constraints
  - Offline-first architecture with Service Worker complexity
  - Spaced repetition algorithm implementation
  - Real-time accuracy tracking and analytics
  - Thai character rendering accuracy requirements

- **Estimated Architectural Components**: 8-10 major components
  - Canvas tracing engine
  - Audio playback manager
  - Service Worker caching layer
  - LocalStorage persistence layer
  - Spaced repetition algorithm
  - Quiz/assessment engine
  - Report card analytics
  - Progress tracking system
  - Flash-card interface
  - Thai font rendering subsystem

### Technical Constraints & Dependencies

**Platform Constraints:**
- **Chrome-Only for POC**: Desktop Chrome for development, Android Chrome for production use
- **No iOS/Safari Support**: Out of scope for 12-week POC validation
- **No Cross-Browser Testing**: Firefox, Edge, other browsers explicitly excluded
- **Mid-Range Android Baseline**: Performance targets based on Samsung Galaxy A-series equivalent

**Technology Decisions Already Made (from UX Spec):**
- **UI Framework**: Radix UI (unstyled primitives) + Styled Components
- **Theme System**: Pastel color palette with specific hex codes defined
- **Component Architecture**: 5 key screens specified (Canvas Practice, Flash Cards, Quiz, Report Card, Achievement Modal)

**External Dependencies:**
- **Cloudflare R2**: Audio file hosting and delivery (130 audio files)
- **Native Speaker Audio**: Requirement for 130 professionally recorded audio files (44 consonants + 32 vowels + 4 tone marks + 50 vocabulary)
- **Thai Fonts**: Noto Sans Thai (primary), Sarabun (fallback) - must be Unicode-compliant with accurate tone mark positioning

**Performance Constraints:**
- **<50ms Canvas Latency**: Aggressive requirement that may need optimization strategies or technology selection to achieve on mid-range devices
- **<100ms Audio Playback**: Requires effective Service Worker caching and audio preloading
- **<2s Initial Load**: PWA performance budget on 4G connection
- **100% Offline After First Load**: No degraded functionality without network

**Data Constraints:**
- **LocalStorage Only for POC**: No cloud sync, no backend database in 12-week validation phase
- **130 Audio Files**: ~10-15MB total audio content (128kbps AAC), must cache progressively
- **Progress Data Volume**: Minimal (character practice counts, vocabulary scores, quiz accuracy percentages)

### Testing Strategy & Quality Assurance

**Testing Framework Architecture:**

**Unit Testing (Vitest):**
- Component-level unit tests for React components
- Business logic testing (spaced repetition algorithm, accuracy calculations, weak area detection)
- Utility function testing (Thai character rendering helpers, audio caching logic)
- LocalStorage persistence layer testing

**E2E/Integration Testing (Playwright):**
- **Critical Path Coverage Focus**:
  - Canvas tracing workflow (ghost font display → trace → audio playback → reset → next character)
  - Audio playback system (play pronunciation, offline cached audio, fallback on failure)
  - Offline mode functionality (Service Worker caching, LocalStorage persistence, full feature parity offline)
  - Flash-card study flow (spaced repetition surfacing, 85/15 methodology, progress tracking)
  - Quiz system (multiple choice, immediate feedback, accuracy tracking)
  - Report card and revision deck generation (weak area identification, add to revision deck)
  - Character mastery progression gate (Week 4 unlock, vocabulary deck access)

**Visual Regression Testing:**
- Canvas rendering accuracy (ghost font at 30% opacity, stroke rendering, Thai character display)
- Thai font rendering with tone marks across screens
- Pastel theme color consistency (cream background, lavender canvas, sage/periwinkle/coral accents)
- Responsive layout on mobile viewports (320px-428px width range)
- Component visual states (buttons hover/active, toast notifications, modal overlays)

**CI/CD Integration:**
- Automated test execution on pull requests
- Critical path Playwright tests as merge gate
- Unit test coverage reporting (Vitest coverage)
- Visual regression comparison (baseline vs current)
- Performance is NOT a concern for testing (defer performance benchmarking to post-POC)

**Testing Constraints:**
- Chrome-only testing (matches POC browser target)
- Mobile viewport emulation for Playwright tests
- Mid-range Android device characteristics simulated (if possible)

**Quality Gates:**
- All critical path E2E tests must pass before merge
- Visual regression tests must pass or be explicitly reviewed
- Unit tests run on every commit
- No specific coverage percentage requirement for POC, but focus on business logic and critical components

### Cross-Cutting Concerns Identified

**1. Offline-First Architecture**
- **Affects**: All features (canvas tracing, flash cards, quizzes, audio playback, progress tracking)
- **Technical Requirement**: Service Worker implementation with Cache API for audio files and static assets
- **Design Impact**: Progressive audio caching strategy (next 10 items, not all 130), explicit "Cached for offline" indicators
- **Risk**: Service Worker complexity, debugging offline issues, cache invalidation strategy

**2. Performance Monitoring & Validation**
- **Affects**: Canvas interaction (<50ms latency), audio playback (<100ms), initial load (<2s)
- **Technical Requirement**: Performance measurement instrumentation, latency tracking, real-user monitoring
- **Design Impact**: May need performance profiling tools in development, performance budget enforcement
- **Risk**: Meeting aggressive <50ms canvas latency on mid-range Android devices

**3. Progress Persistence & Data Integrity**
- **Affects**: Every user interaction that modifies progress (character traced, vocabulary learned, quiz completed)
- **Technical Requirement**: LocalStorage write after every interaction, error handling for quota exceeded, export/import for backup
- **Design Impact**: Auto-save after every action, no manual save buttons, "progress is safe" implicit trust
- **Risk**: LocalStorage quota limits (~5-10MB), data corruption on browser crashes, no cloud backup in POC

**4. Audio Content Management**
- **Affects**: All audio playback features (character pronunciation, vocabulary pronunciation, quiz feedback)
- **Technical Requirement**: Service Worker caching, progressive loading, offline playback, CDN integration with Cloudflare R2
- **Design Impact**: Audio caching status indicators, progressive loading strategy (cache next 10), pre-fetch on idle
- **Risk**: Large audio file payload (~10-15MB), network failures during caching, R2 CDN reliability

**5. Thai Character Rendering Accuracy**
- **Affects**: All screens displaying Thai text (canvas, flash cards, quizzes, report card)
- **Technical Requirement**: Unicode-compliant font loading (Noto Sans Thai/Sarabun), accurate tone mark positioning, ghost font rendering at 30% opacity
- **Design Impact**: Font loading strategy (async with fallback), tone mark visual validation, contrast ratio compliance (7:1 for characters)
- **Risk**: Font rendering inconsistencies across Chrome versions, tone mark positioning bugs, ghost font visibility issues

**6. Accessibility (WCAG AA Compliance)**
- **Affects**: All UI components and interactions
- **Technical Requirement**: Radix UI provides built-in ARIA attributes, keyboard navigation, screen reader support
- **Design Impact**: 44x44px minimum touch targets, 7:1 contrast for Thai characters, 4.5:1 for body text, audio visual fallbacks
- **Risk**: Canvas accessibility (custom ARIA labels needed), keyboard navigation for canvas tracing (defer to Phase 2+)

**7. Spaced Repetition Intelligence**
- **Affects**: Practice session composition (what characters/vocabulary to surface), revision deck generation
- **Technical Requirement**: Algorithm to track accuracy per item, identify weak areas (<70%/<50%), surface items based on performance patterns
- **Design Impact**: Automatic deck generation, dynamic practice session composition, accuracy trend visualization
- **Risk**: Algorithm effectiveness, balancing repetition frequency, avoiding user frustration with weak items

**8. Canvas Touch Interaction**
- **Affects**: Core character tracing experience (FR1-FR3)
- **Technical Requirement**: Canvas API, touch event handling, stroke rendering, ghost font overlay, real-time drawing with <50ms latency
- **Design Impact**: Canvas-dominant layout (60-70% viewport), bottom-anchored controls for thumb access, individual reset button
- **Risk**: Achieving <50ms latency on mid-range Android, smooth stroke rendering without dropped frames, touch event compatibility

**9. Testing & Quality Assurance**
- **Affects**: All features and components
- **Technical Requirement**: Vitest for unit tests, Playwright for E2E/integration tests, visual regression testing for UI consistency
- **Design Impact**: CI/CD pipeline with automated test execution, critical path coverage as merge gate
- **Risk**: Visual regression test maintenance, Playwright test flakiness, mobile viewport emulation accuracy

---

## Starter Template Evaluation

### Primary Technology Domain

**Progressive Web Application (PWA) with Shared Component Library** based on project requirements:
- Mobile-first web application requiring offline-first architecture
- Reusable component library ("Fuse") that can be compiled to CDN for cross-project sharing
- Canvas API integration for character tracing
- Service Worker for audio caching and offline mode
- Chrome-only deployment for 12-week POC

### Technical Preferences Established

**Framework & Language:**
- React (required for Radix UI component primitives)
- TypeScript (for type safety in medium-complexity project)

**Styling:**
- Styled Components (explicitly chosen over Tailwind)
- Radix UI for accessible, unstyled component primitives

**Testing:**
- Vitest for unit testing
- Playwright for E2E testing
- Visual regression testing for UI consistency

**Build & Development:**
- Vite for fast development experience and optimized builds
- PWA plugin for Service Worker generation
- Library mode for Fuse component package CDN compilation

**Project Structure:**
- Separate "fuse" package for generic/reusable components (CDN-ready)
- Main application package consuming the Fuse component library
- Monorepo structure for unified development

### Starter Options Considered

**Option 1: Vite Monorepo with Workspaces**
- **Pros**: Single repository, unified dependencies, easy cross-package development
- **Cons**: Requires manual monorepo configuration (pnpm/npm/yarn workspaces)
- **Assessment**: Best for maintaining component library alongside application

**Option 2: Separate Repositories**
- **Pros**: True separation, independent versioning, clear boundaries
- **Cons**: Complex development workflow, version management overhead during POC
- **Assessment**: Overkill for POC phase, better for post-POC if library proves valuable

**Option 3: Multi-Package Single Repo (Vite Library Mode)**
- **Pros**: Vite's built-in library mode, separate build configs, simpler than full monorepo
- **Cons**: Manual workspace setup, coordination between packages
- **Assessment**: Good balance for POC with CDN compilation need

### Selected Starter: Vite Monorepo with npm Workspaces

**Rationale for Selection:**

Given the requirement for a separate component library ("Fuse") that can be compiled to CDN, a monorepo structure provides:

1. **Unified Development**: Work on app and Fuse components simultaneously with hot reload
2. **Library Build Mode**: Vite's library mode for CDN-ready bundle generation
3. **Clear Separation**: Distinct packages for generic (Fuse) vs app-specific code
4. **Shared Tooling**: Single testing, linting, and build configuration
5. **Easy Linking**: No need for npm link during development

**Project Structure:**

```
thai-learning-v2/
├── packages/
│   ├── app/                    # Main PWA application
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── fuse/                   # Shared component library (CDN-ready)
│       ├── src/
│       │   ├── index.ts       # Library entry point
│       │   ├── Button/
│       │   ├── Card/
│       │   └── ... (generic components)
│       ├── package.json
│       └── vite.config.ts     # Library mode configuration
│
├── package.json               # Root workspace configuration
├── tsconfig.json             # Shared TypeScript config
└── vitest.config.ts          # Shared test configuration
```

**Initialization Commands:**

```bash
# Create root directory
mkdir thai-learning-v2
cd thai-learning-v2

# Initialize root package with workspaces
npm init -y

# Create workspace structure
mkdir -p packages/app packages/fuse

# Initialize app package
cd packages/app
npm create vite@latest . -- --template react-ts
cd ../..

# Initialize Fuse component library package
cd packages/fuse
npm init -y
cd ../..

# Configure npm workspaces in root package.json
# (Add "workspaces": ["packages/*"])
```

**Root package.json Configuration:**

```json
{
  "name": "thai-learning-v2",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev -w packages/app",
    "build": "npm run build -w packages/fuse && npm run build -w packages/app",
    "build:fuse": "npm run build -w packages/fuse",
    "build:app": "npm run build -w packages/app",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vitest": "^2.0.0",
    "@playwright/test": "^1.45.0"
  }
}
```

**Fuse Library Dependencies (packages/fuse/package.json):**

```json
{
  "name": "@thai-learning/fuse",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/fuse.umd.js",
  "module": "./dist/fuse.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/fuse.es.js",
      "require": "./dist/fuse.umd.js"
    }
  },
  "files": [
    "dist"
  ],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "styled-components": "^6.0.0"
  }
}
```

**Install Fuse Dependencies:**

```bash
# From root directory
npm install react react-dom styled-components -w packages/fuse
npm install --save-dev @types/react @types/react-dom @types/styled-components vite @vitejs/plugin-react -w packages/fuse
```

**Fuse Library Vite Config (packages/fuse/vite.config.ts):**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Fuse',
      fileName: (format) => `fuse.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        }
      }
    }
  }
})
```

**App Package Dependencies (packages/app/package.json):**

```bash
# From root directory
npm install @thai-learning/fuse -w packages/app  # Internal workspace dependency
npm install styled-components @radix-ui/react-dialog @radix-ui/react-toast @radix-ui/react-progress workbox-window -w packages/app
npm install --save-dev vite-plugin-pwa @vitejs/plugin-react -w packages/app
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- TypeScript 5.x with strict mode enabled (shared tsconfig at root)
- React 18.x with modern hooks and concurrent features
- ES2020+ JavaScript features
- Node.js 18+ runtime for development

**Package Architecture:**
- **Monorepo with npm workspaces** for unified dependency management
- **packages/fuse**: Generic, reusable component library (CDN-compilable)
- **packages/app**: Thai Master PWA application
- Fuse library exports ES modules (tree-shakeable) and UMD (CDN-ready)

**Styling Solution:**
- Styled Components for component-scoped CSS-in-JS (both packages)
- Theme provider for pastel color system
- Shared theme can be exported from Fuse if needed
- No utility CSS framework (avoiding Tailwind per user preference)

**Build Tooling:**
- Vite 5.x for development server with HMR (both packages)
- **Vite Library Mode** for Fuse package CDN compilation
- Rollup-based production bundling with code splitting
- Tree-shaking for optimal bundle size
- PWA manifest generation and Service Worker bundling (app only)
- CDN-ready UMD bundle for Fuse component library

**Testing Framework:**
- Vitest at root level (tests both packages)
- Playwright for E2E tests (app package)
- Testing Library for component testing
- Fuse library can be tested independently

**Code Organization:**

```
packages/fuse/src/
├── index.ts              # Library entry (exports all components)
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   ├── Card.test.tsx
│   └── index.ts
├── Theme/
│   ├── ThemeProvider.tsx
│   ├── theme.ts          # Pastel color system
│   └── index.ts
└── ... (other generic components)

packages/app/src/
├── components/           # App-specific components (CanvasPractice, Quiz, ReportCard)
├── lib/                 # Business logic (spaced repetition, accuracy tracking)
├── hooks/               # Custom React hooks
├── styles/              # Global styles
└── pages/               # App pages/screens
```

**Development Experience:**
- Hot Module Replacement (HMR) across workspace packages
- TypeScript language server integration
- Fuse component changes instantly reflected in app during development
- Unified `npm run dev` from root
- ESLint + Prettier for code formatting
- Chrome DevTools debugging with source maps

**CDN Compilation Strategy:**
- `npm run build:fuse` generates UMD bundle for CDN hosting
- Output: `packages/fuse/dist/fuse.umd.js` and `packages/fuse/dist/fuse.es.js`
- Can be hosted on CDN (Cloudflare R2, jsDelivr, unpkg)
- Usage in other projects via CDN:
  ```html
  <script src="https://cdn.example.com/fuse.umd.js"></script>
  ```
- Usage in other projects via npm:
  ```bash
  npm install @thai-learning/fuse
  ```

**PWA Configuration (App Only):**
- vite-plugin-pwa for Service Worker generation
- Workbox for caching strategies (audio files, static assets)
- Web App Manifest for installability
- Offline fallback pages
- Cache-first strategy for audio files, network-first for HTML

**Note:** Project initialization with monorepo structure should be the first implementation story. The Fuse library can start minimal and grow as generic patterns emerge during app development.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Monorepo structure with npm workspaces (packages/app + packages/fuse)
- React 18 + TypeScript 5 as foundation
- LocalStorage for data persistence (POC requirement)
- Service Worker with cache-on-first-use strategy
- Native Canvas 2D API for <50ms latency requirement
- Custom spaced repetition algorithm for 85/15 methodology

**Important Decisions (Shape Architecture):**
- Zustand for global state management
- Wouter for lightweight routing
- Zod for LocalStorage data validation
- Sentry for production error tracking
- ESLint + Prettier for code quality
- GitHub Actions for CI + Cloudflare Pages for deployment

**Deferred Decisions (Post-POC):**
- Cloud sync / backend integration (POC uses LocalStorage only)
- Progressive audio caching (starting with cache-on-first-use)
- Cross-browser support (POC is Chrome-only)
- Advanced spaced repetition algorithms (custom solution sufficient for validation)

### Data Architecture

**Data Persistence:**
- **Technology**: LocalStorage API (browser native)
- **Rationale**: POC requirement, no backend needed for 12-week validation, offline-first compatible
- **Capacity**: ~5-10MB (sufficient for progress data, well below audio file size)
- **Data Types**: Character practice counts, vocabulary scores, quiz accuracy, user preferences

**Data Validation:**
- **Technology**: Zod 4.3.5
- **Rationale**: TypeScript-first schema validation, runtime type safety prevents corrupted LocalStorage crashes
- **Affects**: Progress data integrity, export/import reliability, app stability on data corruption
- **Schemas**: User progress, quiz results, accuracy tracking, preference configuration

**Caching Strategy:**
- **Approach**: Cache on First Use (Lazy Loading)
- **Rationale**: Minimal initial load (<2s target), simple implementation, audio cached after first playback
- **Implementation**: Service Worker intercepts audio requests, caches successful fetches
- **Affects**: Audio playback (FR34-FR39), offline functionality (FR40-FR45)
- **Future Enhancement**: Progressive background caching (next 10 items) if POC validates

### Authentication & Security

**Authentication:**
- **Approach**: Deferred to post-POC
- **POC Strategy**: Optional account creation after 5-6 characters practiced (FR30-FR33)
- **Rationale**: Focus on learning experience validation, not user management during POC
- **Security**: LocalStorage same-origin policy, HTTPS in production (NFR-S1, NFR-S2)

**Error Tracking:**
- **Technology**: Sentry (@sentry/react) 10.32.1
- **Rationale**: Production debugging, React ErrorBoundary integration, user context for issue reproduction
- **Affects**: Error handling across all components, crash reporting, production issue diagnosis
- **Privacy**: No sensitive data collection during POC (aligns with NFR-S2)

### API & Communication Patterns

**Audio CDN Integration:**
- **Technology**: Cloudflare R2 (already decided)
- **Delivery**: HTTPS CDN URLs with 30-day caching headers (NFR-I1, NFR-I2)
- **Retry Logic**: 3-retry on failure per requirements
- **Offline Strategy**: Service Worker cache-first for audio files
- **Affects**: 130 audio files (44 consonants + 32 vowels + 4 tone marks + 50 vocabulary)

**Environment Configuration:**
- **Technology**: Vite built-in .env files
- **Rationale**: No additional setup, sufficient for R2 CDN URLs and environment-specific config
- **Variables**: VITE_R2_AUDIO_BASE_URL, VITE_SENTRY_DSN, environment flags
- **Affects**: R2 integration, Sentry configuration, build-specific settings

### Frontend Architecture

**State Management:**
- **Technology**: Zustand 5.0.9
- **Rationale**: Lightweight (~1KB), minimal boilerplate, excellent TypeScript support
- **Stores**: Progress tracking, quiz state, audio playback state, user preferences (including configurable spaced repetition thresholds)
- **Persistence**: LocalStorage middleware for state hydration
- **Affects**: All interactive features requiring global state

**Routing:**
- **Technology**: Wouter 3.9.0
- **Rationale**: Minimal bundle (~1.5KB), hooks-based API, sufficient for 5-screen PWA
- **Routes**: Canvas Practice, Flash Cards, Quiz, Report Card, Settings
- **Affects**: Screen navigation, deep linking (if needed post-POC)

**Canvas Implementation:**
- **Technology**: Native Canvas 2D API
- **Rationale**: Zero dependencies, maximum performance control for <50ms latency (NFR-P1)
- **Optimization**: Direct touch event handling, minimal redraws, efficient stroke rendering
- **Affects**: Character tracing (FR1-FR3), ghost font rendering, stroke capture

**Audio Playback:**
- **Technology**: Native HTML5 Audio API
- **Rationale**: No additional dependencies, sufficient for pronunciation playback, Service Worker integration
- **Preloading**: Progressive loading as user advances through content
- **Affects**: Character pronunciation (FR34-FR39), vocabulary audio, quiz feedback

**Spaced Repetition Algorithm:**
- **Approach**: Custom accuracy-based algorithm
- **Default Thresholds**: 70% (alphabet mastery), 50% (vocabulary mastery) per PRD requirements
- **User Configurable**: Yes - adjustable thresholds for personalized learning pace
- **Storage**: Threshold preferences stored in Zustand + LocalStorage
- **Implementation**: Accuracy tracking per item, weak area identification, revision deck generation
- **Affects**: Vocabulary surfacing (FR8-FR14), weak area detection (FR21-FR29), practice session composition

**Font Loading:**
- **Technology**: Google Fonts CDN (Noto Sans Thai primary, Sarabun fallback)
- **Rationale**: Fast CDN delivery, automatic optimization, accurate tone mark positioning
- **Offline Strategy**: Service Worker caches font files for offline compatibility
- **Affects**: Thai character rendering across all screens, tone mark display accuracy

### Infrastructure & Deployment

**Build Tooling:**
- **Technology**: Vite 5.x
- **Package Structure**: npm workspaces monorepo
  - `packages/fuse`: Generic component library (CDN-compilable via Vite library mode)
  - `packages/app`: Thai Master PWA application
- **Output Formats**:
  - Fuse: ES modules (tree-shakeable) + UMD (CDN-ready)
  - App: Optimized PWA bundle with code splitting
- **PWA Plugin**: vite-plugin-pwa for Service Worker generation

**Testing Framework:**
- **Unit Testing**: Vitest (root level, tests both packages)
- **E2E Testing**: Playwright (Chrome-only, critical path coverage)
- **Visual Regression**: TBD during implementation
- **CI Integration**: Automated test execution on PRs via GitHub Actions, critical path as merge gate

**Code Quality:**
- **Linting**: ESLint 9.39.2 with typescript-eslint v8
- **Formatting**: Prettier 3.7.4
- **Configuration**: Shared ESLint config at root for consistency across packages
- **React Support**: eslint-plugin-react for React-specific rules

**CI/CD & Deployment:**
- **CI Platform**: GitHub Actions
  - Runs on every PR: Vitest unit tests, Playwright E2E tests, ESLint checks, visual regression tests
  - Parallel test execution with proper reporting
  - Blocks merge if tests fail
  - Test results visible in PR interface
- **Deployment Platform**: Cloudflare Pages
  - Automatic deployments from main branch after tests pass
  - Preview deployments for PRs (optional)
  - Global CDN distribution
  - Unified with Cloudflare R2 audio infrastructure
- **Rationale**: GitHub Actions provides full CI capabilities, Cloudflare Pages unifies with R2 CDN
- **Workflow**: PR → GitHub Actions (test) → Merge → Cloudflare Pages (deploy)
- **Affects**: Automated testing, deployment pipeline, preview environments, production hosting

### Decision Impact Analysis

**Implementation Sequence:**

1. **Foundation Setup** (Epic 1):
   - Initialize monorepo with npm workspaces
   - Configure Vite for both packages (app + fuse library mode)
   - Setup TypeScript, ESLint, Prettier
   - Configure Vitest and Playwright
   - Setup GitHub Actions workflow

2. **Core Infrastructure** (Epic 2):
   - Implement Zustand stores for state management
   - Setup Wouter routing
   - Configure Service Worker with vite-plugin-pwa
   - Implement LocalStorage persistence with Zod validation
   - Integrate Sentry error tracking

3. **Fuse Component Library** (Epic 3):
   - Setup Styled Components theme (pastel colors from UX spec)
   - Implement Radix UI wrapper components
   - Configure library build for CDN compilation

4. **Core Features** (Epic 4+):
   - Canvas tracing with Native Canvas 2D API
   - Audio playback with HTML5 Audio + Service Worker caching
   - Custom spaced repetition algorithm with configurable thresholds
   - Flash cards, quizzes, report card screens

5. **Production Readiness** (Final Epic):
   - Cloudflare Pages deployment setup
   - Visual regression testing
   - Performance validation (<50ms canvas, <100ms audio)
   - Production Sentry configuration

**Cross-Component Dependencies:**

- **Zustand ↔ LocalStorage**: State hydration requires Zod validation
- **Service Worker ↔ Audio/Fonts**: Caching strategy affects all CDN resources (R2 audio + Google Fonts)
- **Fuse ↔ App**: Component library must be built before app can consume it
- **Custom Algorithm ↔ Zustand**: Spaced repetition state (including user-configurable thresholds) managed globally
- **Sentry ↔ React**: ErrorBoundary wraps app root, captures component errors
- **Cloudflare Pages ↔ R2**: Unified deployment simplifies environment configuration
- **GitHub Actions ↔ Cloudflare Pages**: CI tests must pass before deployment triggered

---

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 16 areas where AI agents could make different implementation choices have been addressed to ensure code consistency across the monorepo.

### Naming Patterns

**Component & File Naming Conventions:**
- **Component files**: PascalCase (`Button.tsx`, `CanvasPractice.tsx`)
- **Hook files**: camelCase with 'use' prefix (`useAudioPlayer.ts`, `useProgressStore.ts`)
- **Utility files**: camelCase (`formatAccuracy.ts`, `calculateWeakAreas.ts`)
- **Test files**: Match source file name with `.test.tsx` suffix (`Button.test.tsx`)
- **Type definition files**: Match source with `.types.ts` suffix (`Button.types.ts`)
- **Style files**: Match source with `.styles.ts` suffix (`Button.styles.ts`)

**Route Path Constants:**
- Centralized in `routes.ts` with uppercase constant names:
```typescript
export const ROUTES = {
  HOME: '/',
  PRACTICE: '/practice',
  FLASHCARDS: '/flashcards',
  QUIZ: '/quiz',
  REPORT: '/report',
} as const
```

**LocalStorage Key Convention:**
- Prefix all keys with `thai-master:` to avoid conflicts
- Examples: `thai-master:progress`, `thai-master:user-preferences`, `thai-master:store`

**Service Worker Cache Names:**
- Separate caches by asset type with version suffix
- Pattern: `thai-master-{type}-v{version}`
- Examples:
  - `thai-master-audio-v1` (R2 audio files, cache-first strategy)
  - `thai-master-static-v1` (App bundles, HTML, JS, CSS)
  - `thai-master-fonts-v1` (Google Fonts, long-term cache)

**TypeScript Interface Naming:**
- No 'I' prefix (modern TypeScript convention)
- Use descriptive suffixes when it adds clarity:
  - `ButtonProps` - Component props interface
  - `UserData` - Data model interface
  - `CreateUserInput` - API input interface
  - `AudioResponse` - API response interface

### Structure Patterns

**Component File Organization:**
All components (Fuse library and App) use separated concerns pattern:
```
ComponentName/
├── ComponentName.tsx        # Component logic only
├── ComponentName.styles.ts  # Styled Components
├── ComponentName.types.ts   # TypeScript interfaces
├── ComponentName.test.tsx   # Unit tests (in tests directory, see below)
└── index.ts                 # Barrel export
```

**Test File Organization:**
- **All tests** in separate `tests/` directory (not co-located)
- **Mirror source structure** in tests directory:
```
src/components/Button/Button.tsx
tests/components/Button.test.tsx
```
- **Split large test files** into smaller, focused files for readability:
```
tests/components/
├── Button.test.tsx           # Basic rendering tests
├── Button.interactions.test.tsx  # User interaction tests
├── Button.accessibility.test.tsx # A11y tests
```

**Import/Export Patterns:**
- Use **named exports** (not default exports)
- Use **barrel pattern** via `index.ts` files:
```typescript
// Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button.types'

// Usage
import { Button } from '@thai-learning/fuse/Button'
import type { ButtonProps } from '@thai-learning/fuse/Button'
```

**Monorepo Package Structure:**
```
packages/
├── fuse/                    # Generic component library (CDN-compilable)
│   ├── src/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Theme/
│   │   └── index.ts        # Main library export
│   └── tests/              # Separate test directory
│
└── app/                     # Thai Master PWA
    ├── src/
    │   ├── components/     # App-specific components
    │   ├── lib/            # Business logic
    │   ├── hooks/          # Custom hooks
    │   ├── stores/         # Zustand store
    │   ├── routes.ts       # Route constants
    │   └── App.tsx
    └── tests/              # Separate test directory
```

### State Management Patterns

**Zustand Store Organization:**
- **Single global store** (not feature-based stores)
- Store location: `packages/app/src/stores/store.ts`
- Store structure:
```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // Progress tracking
      progress: {},
      updateProgress: (data) => set({ progress: data }),

      // Quiz state
      quiz: {},
      setQuizState: (data) => set({ quiz: data }),

      // Audio playback state
      audio: { isPlaying: false, currentTrack: null },
      playAudio: (track) => set({ audio: { isPlaying: true, currentTrack: track } }),

      // User preferences (including configurable thresholds)
      preferences: {
        alphabetThreshold: 0.70,  // Default per PRD
        vocabularyThreshold: 0.50  // Default per PRD
      },
      updatePreferences: (prefs) => set({ preferences: prefs }),
    }),
    {
      name: 'thai-master:store',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const item = localStorage.getItem(name)
          if (!item) return null
          try {
            return storeSchema.parse(JSON.parse(item))  // Zod validation on hydration
          } catch (error) {
            console.error('Invalid store data, resetting:', error)
            localStorage.removeItem(name)
            return null
          }
        },
        setItem: localStorage.setItem,
        removeItem: localStorage.removeItem,
      }))
    }
  )
)
```

**Zustand + LocalStorage + Zod Integration:**
- Use **Zustand persist middleware** for automatic state persistence
- **Zod validation integrated** into storage adapter's `getItem` method
- Validates on hydration (app load)
- Resets corrupted data automatically with error logging
- Schema definitions in `stores/schemas.ts`:
```typescript
import { z } from 'zod'

export const progressSchema = z.object({
  // Character practice data
  characters: z.record(z.object({
    itemId: z.string(),
    accuracy: z.number().min(0).max(1),
    totalAttempts: z.number().int().min(0),
    correctCount: z.number().int().min(0),
    lastAttempt: z.string().datetime(),
    recentAccuracy: z.number().min(0).max(1),  // Last 10 attempts
  })),
  // Similar for vocabulary
  vocabulary: z.record(/* ... */),
})

export const storeSchema = z.object({
  progress: progressSchema,
  quiz: quizSchema,
  audio: audioSchema,
  preferences: preferencesSchema,
})
```

**Spaced Repetition Algorithm Data Structure:**
- **Aggregated accuracy with recency tracking** (not full attempt history):
```typescript
interface ItemProgress {
  itemId: string                // e.g., 'consonant-ก' or 'vocab-hello'
  accuracy: number              // Overall accuracy: 0.0 to 1.0 (e.g., 0.75 = 75%)
  totalAttempts: number         // Total number of attempts
  correctCount: number          // Total correct attempts
  lastAttempt: string           // ISO datetime of last attempt
  recentAccuracy: number        // Accuracy of last 10 attempts (for recency weighting)
}
```
- Use `recentAccuracy` to detect current weak areas (< threshold)
- Use `accuracy` for overall progress reporting
- No full history stored (keep LocalStorage lean)

### Format Patterns

**Styled Components Theme Access:**
- Use **props-based theme access** (standard pattern):
```typescript
import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.theme.colors.sage};
  padding: ${props => props.theme.space.md};
  color: ${props => props.theme.colors.charcoal};
  border-radius: 8px;
`
```
- Theme defined in Fuse package (`packages/fuse/src/Theme/theme.ts`)
- Matches pastel color system from UX specification

**Error Message Format:**
- **Actionable error messages** with clear user guidance:
```typescript
// Good example
showError({
  message: "Audio failed to load. Check your connection and try again.",
  action: { label: "Retry", onClick: retryAudio },
  dismissible: true
})

// Anti-pattern
showError("Error code: AUD-001")  // Not actionable
```
- Sentry receives full error context + stack traces
- Users see friendly, actionable messages
- Console logs technical details in development

### Process Patterns

**Canvas Drawing Strategy:**
- **Immediate draw on touch events** for <50ms latency:
```typescript
canvas.addEventListener('touchmove', (e) => {
  const touch = e.touches[0]
  const x = touch.clientX - canvas.offsetLeft
  const y = touch.clientY - canvas.offsetTop

  ctx.lineTo(x, y)
  ctx.stroke()  // Draw immediately, no batching
})
```
- Optimize only if performance issues detected on mid-range Android
- Direct touch event handling (no requestAnimationFrame batching for POC)

**Audio Playback Error Handling:**
- **3-retry logic with exponential backoff** per NFR-I2:
```typescript
async function playAudio(url: string, retries = 3): Promise<void> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const audio = new Audio(url)
      await audio.play()
      return  // Success
    } catch (error) {
      const delay = Math.pow(2, attempt) * 100  // 100ms, 200ms, 400ms

      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }

      // Final attempt failed
      Sentry.captureException(error, {
        extra: { url, attempts: retries }
      })

      showError({
        message: "Audio failed to load after 3 attempts. Check your connection.",
        action: { label: "Retry", onClick: () => playAudio(url) }
      })

      throw error
    }
  }
}
```
- Exponential backoff: 100ms, 200ms, 400ms delays
- Report to Sentry on final failure
- Show actionable error to user

**Service Worker Caching Strategy:**
- **Cache on First Use** (lazy loading):
```typescript
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Audio files: cache-first with lazy loading
  if (request.url.includes('audio/')) {
    event.respondWith(
      caches.open('thai-master-audio-v1').then(cache =>
        cache.match(request).then(response =>
          response || fetch(request).then(fetchResponse => {
            cache.put(request, fetchResponse.clone())
            return fetchResponse
          })
        )
      )
    )
  }

  // Fonts: cache-first with long-term storage
  if (request.url.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.open('thai-master-fonts-v1').then(cache =>
        cache.match(request).then(response =>
          response || fetch(request).then(fetchResponse => {
            cache.put(request, fetchResponse.clone())
            return fetchResponse
          })
        )
      )
    )
  }

  // Static assets: network-first for HTML, cache-first for JS/CSS
  // (Implementation details TBD during epic)
})
```

### Enforcement Guidelines

**All AI Agents MUST:**

1. **Follow naming conventions exactly** - PascalCase for components, camelCase for functions/hooks, prefixed LocalStorage keys
2. **Use separated component structure** - Split component logic, styles, types, and tests into separate files
3. **Use named exports with barrel pattern** - Never use default exports, always re-export via index.ts
4. **Validate LocalStorage data with Zod** - Integrate validation into Zustand persist middleware
5. **Use single global Zustand store** - All state in one store, not feature-based stores
6. **Implement 3-retry logic for audio** - Exponential backoff per NFR-I2 requirement
7. **Use actionable error messages** - Always provide user guidance and retry options
8. **Separate caches by asset type** - Use distinct Service Worker caches for audio/fonts/static
9. **Store aggregated accuracy data** - Track recency and totals, not full attempt history
10. **Place tests in separate directory** - Mirror source structure, split large test files

**Pattern Verification:**

- **ESLint rules** enforce naming conventions (configured in root `.eslintrc.js`)
- **TypeScript strict mode** catches type mismatches and incorrect imports
- **Vitest tests** validate LocalStorage schemas and Zustand store behavior
- **Code review checklist** includes pattern compliance verification
- **CI/CD blocks merge** if ESLint or TypeScript errors present

**Pattern Evolution:**

- Patterns documented in `architecture.md` (this document)
- Pattern changes require architecture document update
- New patterns proposed via PR discussion, not ad-hoc decisions
- Pattern violations logged in PR review comments for learning

### Pattern Examples

**Good Example - Component Implementation:**

```typescript
// packages/fuse/src/Button/Button.tsx
import type { ButtonProps } from './Button.types'
import { StyledButton } from './Button.styles'

export const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

// packages/fuse/src/Button/Button.styles.ts
import styled from 'styled-components'

export const StyledButton = styled.button<{ variant: string }>`
  background: ${props => props.variant === 'primary'
    ? props.theme.colors.sage
    : props.theme.colors.periwinkle};
  padding: ${props => props.theme.space.md};
  border-radius: 8px;
`

// packages/fuse/src/Button/Button.types.ts
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

// packages/fuse/src/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button.types'

// tests/fuse/Button.test.tsx
import { Button } from '@thai-learning/fuse/Button'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

**Good Example - Zustand Store with Persistence:**

```typescript
// packages/app/src/stores/store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { storeSchema } from './schemas'

export const useStore = create(
  persist(
    (set) => ({
      progress: {},
      preferences: {
        alphabetThreshold: 0.70,
        vocabularyThreshold: 0.50
      },
      updateProgress: (itemId: string, correct: boolean) => {
        set((state) => {
          const item = state.progress[itemId] || {
            itemId,
            accuracy: 0,
            totalAttempts: 0,
            correctCount: 0,
            lastAttempt: new Date().toISOString(),
            recentAccuracy: 0
          }

          const newCorrectCount = correct ? item.correctCount + 1 : item.correctCount
          const newTotalAttempts = item.totalAttempts + 1

          return {
            progress: {
              ...state.progress,
              [itemId]: {
                ...item,
                accuracy: newCorrectCount / newTotalAttempts,
                totalAttempts: newTotalAttempts,
                correctCount: newCorrectCount,
                lastAttempt: new Date().toISOString(),
                // recentAccuracy calculation logic here
              }
            }
          }
        })
      }
    }),
    {
      name: 'thai-master:store',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const item = localStorage.getItem(name)
          if (!item) return null
          try {
            return storeSchema.parse(JSON.parse(item))
          } catch (error) {
            console.error('Store validation failed, resetting:', error)
            localStorage.removeItem(name)
            return null
          }
        },
        setItem: localStorage.setItem,
        removeItem: localStorage.removeItem
      }))
    }
  )
)
```

**Anti-Patterns to Avoid:**

```typescript
// ❌ WRONG - Default export
export default function Button() { ... }

// ❌ WRONG - No barrel export
import { Button } from './components/Button/Button'

// ❌ WRONG - 'I' prefix on interfaces
interface IButtonProps { ... }

// ❌ WRONG - Non-prefixed LocalStorage keys
localStorage.getItem('progress')

// ❌ WRONG - Multiple feature-based stores
export const useProgressStore = create(...)
export const useQuizStore = create(...)

// ❌ WRONG - No retry logic on audio
audio.play().catch(() => showError('Failed'))

// ❌ WRONG - Non-actionable error message
showError('Error: 500')

// ❌ WRONG - Co-located test files
src/Button/Button.test.tsx  // Should be in tests/ directory

// ❌ WRONG - Storing full attempt history
attempts: [
  { timestamp: '...', correct: true },
  { timestamp: '...', correct: false },
  // ... hundreds of entries
]
```

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
thai-learning-v2/
├── README.md
├── package.json                           # Root workspace configuration
├── tsconfig.json                          # Shared TypeScript config
├── .gitignore
├── .env.example
├── .github/
│   └── workflows/
│       ├── ci.yml                        # GitHub Actions: Vitest + Playwright + ESLint
│       └── deploy.yml                    # Cloudflare Pages deployment trigger
│
├── packages/
│   ├── fuse/                             # Generic component library (CDN-compilable)
│   │   ├── package.json                  # @thai-learning/fuse
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts               # Library mode configuration
│   │   └── src/
│   │       ├── index.ts                 # Main library export
│   │       ├── Theme/
│   │       │   ├── ThemeProvider.tsx
│   │       │   ├── ThemeProvider.styles.ts
│   │       │   ├── ThemeProvider.types.ts
│   │       │   ├── theme.ts             # Pastel color system
│   │       │   ├── index.ts
│   │       │   └── tests/               # Unit tests for Theme
│   │       │       ├── ThemeProvider.test.tsx
│   │       │       └── theme.test.ts
│   │       ├── Button/
│   │       │   ├── Button.tsx
│   │       │   ├── Button.styles.ts
│   │       │   ├── Button.types.ts
│   │       │   ├── index.ts
│   │       │   └── tests/               # Unit tests for Button
│   │       │       ├── Button.test.tsx
│   │       │       └── Button.accessibility.test.tsx
│   │       ├── Card/
│   │       │   ├── Card.tsx
│   │       │   ├── Card.styles.ts
│   │       │   ├── Card.types.ts
│   │       │   ├── index.ts
│   │       │   └── tests/
│   │       │       └── Card.test.tsx
│   │       ├── Toast/
│   │       │   ├── Toast.tsx
│   │       │   ├── Toast.styles.ts
│   │       │   ├── Toast.types.ts
│   │       │   ├── index.ts
│   │       │   └── tests/
│   │       │       └── Toast.test.tsx
│   │       ├── Dialog/
│   │       │   ├── Dialog.tsx
│   │       │   ├── Dialog.styles.ts
│   │       │   ├── Dialog.types.ts
│   │       │   ├── index.ts
│   │       │   └── tests/
│   │       │       └── Dialog.test.tsx
│   │       └── Progress/
│   │           ├── Progress.tsx
│   │           ├── Progress.styles.ts
│   │           ├── Progress.types.ts
│   │           ├── index.ts
│   │           └── tests/
│   │               └── Progress.test.tsx
│   │
│   └── app/                              # Thai Master PWA
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── playwright.config.ts
│       ├── index.html
│       ├── .env
│       ├── .env.example
│       │
│       ├── public/
│       │   ├── manifest.json            # PWA manifest
│       │   ├── icons/
│       │   │   ├── icon-192x192.png
│       │   │   └── icon-512x512.png
│       │   └── fonts/
│       │
│       ├── src/
│       │   ├── main.tsx                 # App entry point
│       │   ├── App.tsx                  # Root component with Sentry ErrorBoundary
│       │   ├── routes.ts                # Route path constants
│       │   ├── vite-env.d.ts
│       │   │
│       │   ├── components/
│       │   │   ├── CanvasPractice/      # FR1-FR7: Character tracing
│       │   │   │   ├── CanvasPractice.tsx
│       │   │   │   ├── CanvasPractice.styles.ts
│       │   │   │   ├── CanvasPractice.types.ts
│       │   │   │   ├── Canvas.tsx
│       │   │   │   ├── Canvas.styles.ts
│       │   │   │   ├── GhostFont.tsx
│       │   │   │   ├── GhostFont.styles.ts
│       │   │   │   ├── AudioButton.tsx
│       │   │   │   ├── AudioButton.styles.ts
│       │   │   │   ├── index.ts
│       │   │   │   └── tests/           # Unit tests for CanvasPractice
│       │   │   │       ├── CanvasPractice.test.tsx
│       │   │   │       ├── Canvas.test.tsx
│       │   │   │       ├── Canvas.interactions.test.tsx
│       │   │   │       ├── Canvas.performance.test.tsx
│       │   │   │       ├── GhostFont.test.tsx
│       │   │   │       └── AudioButton.test.tsx
│       │   │   │
│       │   │   ├── FlashCards/          # FR8-FR14: Vocabulary flash cards
│       │   │   │   ├── FlashCards.tsx
│       │   │   │   ├── FlashCards.styles.ts
│       │   │   │   ├── FlashCards.types.ts
│       │   │   │   ├── FlashCard.tsx
│       │   │   │   ├── FlashCard.styles.ts
│       │   │   │   ├── index.ts
│       │   │   │   └── tests/
│       │   │   │       ├── FlashCards.test.tsx
│       │   │   │       ├── FlashCards.spacedRepetition.test.tsx
│       │   │   │       └── FlashCard.test.tsx
│       │   │   │
│       │   │   ├── Quiz/                # FR15-FR20: Assessment quizzes
│       │   │   │   ├── Quiz.tsx
│       │   │   │   ├── Quiz.styles.ts
│       │   │   │   ├── Quiz.types.ts
│       │   │   │   ├── QuestionCard.tsx
│       │   │   │   ├── QuestionCard.styles.ts
│       │   │   │   ├── index.ts
│       │   │   │   └── tests/
│       │   │   │       ├── Quiz.test.tsx
│       │   │   │       ├── Quiz.accuracy.test.tsx
│       │   │   │       └── QuestionCard.test.tsx
│       │   │   │
│       │   │   ├── ReportCard/          # FR21-FR29: Performance dashboard
│       │   │   │   ├── ReportCard.tsx
│       │   │   │   ├── ReportCard.styles.ts
│       │   │   │   ├── ReportCard.types.ts
│       │   │   │   ├── AccuracyChart.tsx
│       │   │   │   ├── AccuracyChart.styles.ts
│       │   │   │   ├── WeakAreasPanel.tsx
│       │   │   │   ├── WeakAreasPanel.styles.ts
│       │   │   │   ├── RevisionDeckButton.tsx
│       │   │   │   ├── RevisionDeckButton.styles.ts
│       │   │   │   ├── index.ts
│       │   │   │   └── tests/
│       │   │   │       ├── ReportCard.test.tsx
│       │   │   │       ├── AccuracyChart.test.tsx
│       │   │   │       ├── WeakAreasPanel.test.tsx
│       │   │   │       └── RevisionDeckButton.test.tsx
│       │   │   │
│       │   │   ├── Settings/            # User preferences (configurable thresholds)
│       │   │   │   ├── Settings.tsx
│       │   │   │   ├── Settings.styles.ts
│       │   │   │   ├── Settings.types.ts
│       │   │   │   ├── index.ts
│       │   │   │   └── tests/
│       │   │   │       └── Settings.test.tsx
│       │   │   │
│       │   │   └── Layout/              # Shared layout components
│       │   │       ├── Header.tsx
│       │   │       ├── Header.styles.ts
│       │   │       ├── Navigation.tsx
│       │   │       ├── Navigation.styles.ts
│       │   │       ├── index.ts
│       │   │       └── tests/
│       │   │           ├── Header.test.tsx
│       │   │           └── Navigation.test.tsx
│       │   │
│       │   ├── lib/                     # Business logic
│       │   │   ├── spacedRepetition.ts  # Custom SR algorithm
│       │   │   ├── accuracyCalculator.ts # FR21-FR29: Accuracy tracking
│       │   │   ├── weakAreaDetector.ts  # Identify < threshold items
│       │   │   ├── audioPlayer.ts       # FR34-FR39: Audio with 3-retry logic
│       │   │   ├── canvasDrawing.ts     # Canvas drawing utilities
│       │   │   ├── thaiCharacters.ts    # Character data (44 consonants, 32 vowels, 4 tone marks)
│       │   │   ├── vocabulary.ts        # 50-word vocabulary deck data
│       │   │   ├── exportImport.ts      # FR43-FR45: Data export/import
│       │   │   └── tests/               # Unit tests for lib/
│       │   │       ├── spacedRepetition.test.ts
│       │   │       ├── accuracyCalculator.test.ts
│       │   │       ├── weakAreaDetector.test.ts
│       │   │       ├── audioPlayer.test.ts
│       │   │       ├── audioPlayer.retry.test.ts
│       │   │       ├── canvasDrawing.test.ts
│       │   │       ├── thaiCharacters.test.ts
│       │   │       ├── vocabulary.test.ts
│       │   │       └── exportImport.test.ts
│       │   │
│       │   ├── hooks/                   # Custom React hooks
│       │   │   ├── useAudio.ts          # Audio playback hook
│       │   │   ├── useCanvas.ts         # Canvas drawing hook
│       │   │   ├── useProgress.ts       # Progress tracking hook
│       │   │   ├── useSpacedRepetition.ts # SR algorithm hook
│       │   │   └── tests/               # Unit tests for hooks/
│       │   │       ├── useAudio.test.ts
│       │   │       ├── useCanvas.test.ts
│       │   │       ├── useProgress.test.ts
│       │   │       └── useSpacedRepetition.test.ts
│       │   │
│       │   ├── stores/                  # Zustand state management
│       │   │   ├── store.ts             # Single global store
│       │   │   ├── schemas.ts           # Zod validation schemas
│       │   │   └── tests/               # Unit tests for stores/
│       │   │       ├── store.test.ts
│       │   │       ├── store.persistence.test.ts
│       │   │       └── schemas.test.ts
│       │   │
│       │   ├── styles/                  # Global styles
│       │   │   └── global.css
│       │   │
│       │   └── serviceWorker.ts         # Service Worker registration
│       │
│       └── e2e/                          # Playwright E2E tests (separate from unit tests)
│           ├── canvas-practice.spec.ts
│           ├── flashcards.spec.ts
│           ├── quiz.spec.ts
│           ├── report-card.spec.ts
│           ├── offline-mode.spec.ts
│           ├── audio-playback.spec.ts
│           └── progression-gate.spec.ts
│
├── vitest.config.ts                     # Root Vitest configuration
├── .eslintrc.js                         # Shared ESLint configuration
├── .prettierrc                          # Prettier configuration
└── playwright-report/                   # Generated Playwright reports (gitignored)
```

### Architectural Boundaries

**Package Boundaries:**

- **packages/fuse/**: Generic, reusable component library
  - Exports via barrel pattern (`@thai-learning/fuse`)
  - No app-specific logic or dependencies
  - Can be compiled to CDN-ready UMD bundle
  - Consumed by packages/app via npm workspace dependency

- **packages/app/**: Thai Master PWA application
  - Depends on packages/fuse for UI components
  - Contains all app-specific business logic
  - No exports (final application bundle)

**Component Boundaries:**

- **Fuse components** communicate via props only (no global state)
- **App components** communicate via:
  - Props for parent-child relationships
  - Zustand global store for cross-component state
  - No direct component-to-component calls (state-mediated)

**State Management Boundaries:**

- **Global State** (Zustand store): Progress tracking, quiz state, audio playback, user preferences
- **Local State** (React useState): Component-specific UI state (e.g., form inputs, toggle states)
- **URL State** (Wouter): Current route/screen
- **Persistent State** (LocalStorage): All Zustand state via persist middleware

**Service Worker Boundaries:**

- **Cache Domains**:
  - `thai-master-audio-v1`: Cloudflare R2 audio files (cache-first)
  - `thai-master-fonts-v1`: Google Fonts (cache-first)
  - `thai-master-static-v1`: App bundles, HTML, JS, CSS (network-first)
- **No cross-origin requests** except audio (R2) and fonts (Google Fonts CDN)

### Requirements to Structure Mapping

**FR1-FR7 (Character Learning & Practice):**
- **Components**: `packages/app/src/components/CanvasPractice/`
  - `Canvas.tsx` - Native Canvas 2D API implementation
  - `GhostFont.tsx` - 30% opacity character overlay
  - `AudioButton.tsx` - Pronunciation playback
- **Business Logic**: `packages/app/src/lib/canvasDrawing.ts`, `packages/app/src/lib/thaiCharacters.ts`
- **Hooks**: `packages/app/src/hooks/useCanvas.ts`, `packages/app/src/hooks/useAudio.ts`
- **State**: Zustand store (canvas progress, current character)
- **Tests**: `packages/app/src/components/CanvasPractice/tests/`

**FR8-FR14 (Vocabulary Learning & Flash Cards):**
- **Components**: `packages/app/src/components/FlashCards/`
  - `FlashCards.tsx` - Flash card container with SR logic
  - `FlashCard.tsx` - Individual card component
- **Business Logic**: `packages/app/src/lib/spacedRepetition.ts`, `packages/app/src/lib/vocabulary.ts`
- **Hooks**: `packages/app/src/hooks/useSpacedRepetition.ts`
- **State**: Zustand store (vocabulary progress, spaced repetition data)
- **Tests**: `packages/app/src/components/FlashCards/tests/`

**FR15-FR20 (Assessment & Quiz System):**
- **Components**: `packages/app/src/components/Quiz/`
  - `Quiz.tsx` - Quiz container
  - `QuestionCard.tsx` - Individual question display
- **Business Logic**: `packages/app/src/lib/accuracyCalculator.ts`
- **State**: Zustand store (quiz state, accuracy tracking)
- **Tests**: `packages/app/src/components/Quiz/tests/`

**FR21-FR29 (Performance Review & Reporting):**
- **Components**: `packages/app/src/components/ReportCard/`
  - `ReportCard.tsx` - Dashboard container
  - `AccuracyChart.tsx` - Visual accuracy breakdown
  - `WeakAreasPanel.tsx` - Identify < threshold items
  - `RevisionDeckButton.tsx` - Generate revision deck
- **Business Logic**: `packages/app/src/lib/weakAreaDetector.ts`, `packages/app/src/lib/accuracyCalculator.ts`
- **State**: Zustand store (progress data, user preferences with configurable thresholds)
- **Tests**: `packages/app/src/components/ReportCard/tests/`

**FR30-FR33 (User Onboarding & Access):**
- **Implementation**: Direct browser access (no auth in POC)
- **State**: Zustand store tracks if user has practiced 5-6 characters (triggers save prompt)
- **Deferred**: Account creation to post-POC

**FR34-FR39 (Audio & Pronunciation System):**
- **Business Logic**: `packages/app/src/lib/audioPlayer.ts` (3-retry logic with exponential backoff)
- **Hooks**: `packages/app/src/hooks/useAudio.ts`
- **Service Worker**: `thai-master-audio-v1` cache (cache-on-first-use strategy)
- **External Integration**: Cloudflare R2 CDN (130 audio files)
- **Tests**: `packages/app/src/lib/tests/audioPlayer.test.ts`, `packages/app/src/lib/tests/audioPlayer.retry.test.ts`

**FR40-FR45 (Data Persistence & Offline Mode):**
- **State Management**: Zustand persist middleware with Zod validation
- **Business Logic**: `packages/app/src/lib/exportImport.ts`
- **Service Worker**: `packages/app/src/serviceWorker.ts` (cache-on-first-use for all assets)
- **Storage**: LocalStorage with `thai-master:` prefix
- **Validation**: `packages/app/src/stores/schemas.ts` (Zod schemas)
- **Tests**: `packages/app/src/stores/tests/store.persistence.test.ts`

**Cross-Cutting Concerns:**

**Theme System (Pastel Colors):**
- **Location**: `packages/fuse/src/Theme/theme.ts`
- **Components**: All Fuse components use ThemeProvider
- **Pattern**: Props-based theme access (`${props => props.theme.colors.sage}`)

**Error Handling:**
- **Global**: Sentry ErrorBoundary wraps `App.tsx`
- **Components**: Actionable error messages via Toast component (Fuse)
- **Audio**: 3-retry logic in `audioPlayer.ts`, reports to Sentry on final failure

**Routing:**
- **Configuration**: `packages/app/src/routes.ts` (path constants)
- **Implementation**: Wouter for lightweight routing
- **Routes**: `/`, `/practice`, `/flashcards`, `/quiz`, `/report`

### Integration Points

**Internal Communication:**

1. **packages/fuse → packages/app**:
   - Import path: `import { Button } from '@thai-learning/fuse'`
   - Communication: Props only, no global state dependency
   - Build order: Fuse must build before App

2. **Component → Zustand Store**:
   - Pattern: `const { progress, updateProgress } = useStore()`
   - All components access single global store
   - Store persists to LocalStorage automatically

3. **Component → Service Worker**:
   - Service Worker intercepts fetch requests transparently
   - Components use standard `fetch()` or `<Audio>` elements
   - No direct Service Worker communication in components

**External Integrations:**

1. **Cloudflare R2 (Audio CDN)**:
   - **Access Point**: `packages/app/src/lib/audioPlayer.ts`
   - **URL Pattern**: `${VITE_R2_AUDIO_BASE_URL}/{characterId}.mp3`
   - **Caching**: Service Worker `thai-master-audio-v1` cache
   - **Error Handling**: 3-retry with exponential backoff, Sentry reporting

2. **Google Fonts CDN**:
   - **Fonts**: Noto Sans Thai (primary), Sarabun (fallback)
   - **Loading**: CSS `@import` in global.css
   - **Caching**: Service Worker `thai-master-fonts-v1` cache
   - **Offline**: Fonts cached on first load

3. **Sentry (Error Tracking)**:
   - **Integration Point**: `packages/app/src/main.tsx` (Sentry.init)
   - **ErrorBoundary**: Wraps `App.tsx` root component
   - **Manual Reporting**: `Sentry.captureException()` in audioPlayer.ts retry logic
   - **Context**: User progress data attached to error reports

4. **Cloudflare Pages (Deployment)**:
   - **Build Command**: `npm run build` (builds Fuse then App)
   - **Output Directory**: `packages/app/dist/`
   - **Environment Variables**: VITE_R2_AUDIO_BASE_URL, VITE_SENTRY_DSN
   - **Trigger**: GitHub Actions CI passes, merge to main

**Data Flow:**

```
User Interaction → Component
                     ↓
                  useStore (Zustand)
                     ↓
                  store.ts (state update)
                     ↓
                  persist middleware
                     ↓
                  Zod validation (schemas.ts)
                     ↓
                  LocalStorage (thai-master:store)
                     ↓
                  Re-render affected components
```

**Audio Playback Flow:**

```
User clicks AudioButton → useAudio hook
                            ↓
                         audioPlayer.ts (3-retry logic)
                            ↓
                         fetch audio URL (R2)
                            ↓
                         Service Worker intercepts
                            ↓
                         Cache check (thai-master-audio-v1)
                            ↓
                    Cache hit: serve cached
                    Cache miss: fetch from R2, cache, serve
                            ↓
                         HTML5 Audio.play()
                            ↓
                    Success: update UI
                    Failure: retry (3x), then Sentry + Toast error
```

### File Organization Patterns

**Configuration Files:**
- **Root level**: Shared configs (`tsconfig.json`, `.eslintrc.js`, `.prettierrc`, `vitest.config.ts`)
- **Package level**: Package-specific configs (`packages/app/vite.config.ts`, `packages/fuse/vite.config.ts`)
- **Environment**: `.env` files at package level, `.env.example` for documentation

**Source Organization:**
- **Component structure**: Separated concerns (`.tsx`, `.styles.ts`, `.types.ts`, `index.ts`)
- **Test location**: `tests/` subdirectory within each component/lib/hooks/stores folder
- **Barrel exports**: All components export via `index.ts` for clean imports
- **Named exports**: Never use default exports

**Test Organization:**
- **Unit tests**: `tests/` subdirectory close to source code
- **E2E tests**: Separate `packages/app/e2e/` directory (Playwright specs)
- **Test naming**: Match source file name (e.g., `Button.tsx` → `Button.test.tsx`)
- **Split large tests**: Separate files for different concerns (e.g., `Canvas.test.tsx`, `Canvas.interactions.test.tsx`, `Canvas.performance.test.tsx`)

**Asset Organization:**
- **Public assets**: `packages/app/public/` (PWA manifest, icons, fonts)
- **CDN assets**: Audio files hosted on Cloudflare R2 (not in repository)
- **Build output**: `packages/app/dist/` and `packages/fuse/dist/` (gitignored)

### Development Workflow Integration

**Development Server Structure:**
- **Fuse development**: `cd packages/fuse && npm run dev` (Vite dev server in library mode)
- **App development**: `cd packages/app && npm run dev` (Vite dev server, auto-imports Fuse from workspace)
- **Root development**: `npm run dev` (runs app dev server)
- **Hot reload**: Changes in Fuse instantly reflected in App during development

**Build Process Structure:**
- **Build order**: Fuse must build before App
- **Root build command**: `npm run build` (builds Fuse then App sequentially)
- **Fuse output**: `packages/fuse/dist/` (ES + UMD bundles)
- **App output**: `packages/app/dist/` (optimized PWA bundle)
- **Tree-shaking**: Named exports + ES modules enable optimal bundle size

**Deployment Structure:**
- **CI/CD Pipeline**: GitHub Actions runs tests on PR
- **Deployment Trigger**: Merge to main → Cloudflare Pages auto-deploy
- **Build Command** (Cloudflare Pages): `npm run build`
- **Output Directory** (Cloudflare Pages): `packages/app/dist/`
- **Environment Variables**: Set in Cloudflare Pages dashboard (VITE_R2_AUDIO_BASE_URL, VITE_SENTRY_DSN)

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices are fully compatible and work together seamlessly:
- React 18 + TypeScript 5 + Vite 5 form a modern, well-supported foundation
- Styled Components + Radix UI integrate perfectly with React 18
- Zustand 5.0.9 + Zod 4.3.5 provide robust state management with validation
- Wouter 3.9.0 is lightweight and React 18 compatible
- Testing stack (Vitest 2.0.0 + Playwright 1.45.0) is purpose-built for Vite projects
- Code quality tools (ESLint 9.39.2 + Prettier 3.7.4) support TypeScript and React
- Sentry 10.32.1 has full React 18 support including Error Boundaries
- All tools support Node.js 18+ runtime

**Pattern Consistency:**
All implementation patterns align with and support the chosen technology stack:
- Naming patterns (PascalCase components, camelCase functions) match React/TypeScript conventions
- Component structure (separated .tsx, .styles.ts, .types.ts) optimizes for Styled Components + TypeScript
- Test organization (tests/ subdirectories) supports both Vitest and Playwright workflows
- State management patterns (single Zustand store + persist middleware) enable LocalStorage integration
- Canvas patterns (immediate draw on touch) optimize for <50ms latency requirement
- Audio patterns (3-retry with exponential backoff) meet NFR-I2 reliability requirement

**Structure Alignment:**
Project structure fully supports all architectural decisions:
- Monorepo with npm workspaces enables Fuse library + App separation
- Fuse package structure supports Vite library mode for CDN compilation
- App package structure supports PWA requirements (manifest, Service Worker, offline mode)
- Test locations (close to source code) support rapid development iteration
- E2E tests (separate directory) support Playwright Chrome-only testing strategy
- Build order (Fuse → App) is enforceable via npm scripts

**Assessment:** FULLY COHERENT - All architectural elements work together without conflicts or contradictions.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
All 7 functional requirement categories fully covered by architecture:

1. **Character Learning & Practice (FR1-FR7):** CanvasPractice component with Canvas.tsx (Native Canvas 2D API), GhostFont.tsx (30% opacity), AudioButton.tsx, business logic in canvasDrawing.ts and thaiCharacters.ts

2. **Vocabulary Learning & Flash Cards (FR8-FR14):** FlashCards component with spacedRepetition.ts algorithm, vocabulary.ts data, useSpacedRepetition hook

3. **Assessment & Quiz System (FR15-FR20):** Quiz component with accuracyCalculator.ts, QuestionCard.tsx, immediate feedback via Zustand state

4. **Performance Review & Reporting (FR21-FR29):** ReportCard component with AccuracyChart.tsx, WeakAreasPanel.tsx (threshold detection), RevisionDeckButton.tsx (dynamic deck generation)

5. **User Onboarding & Access (FR30-FR33):** Zero signup wall implemented (direct access), progress save prompt tracked in Zustand store

6. **Audio & Pronunciation System (FR34-FR39):** audioPlayer.ts with 3-retry logic, Service Worker caching (thai-master-audio-v1), Cloudflare R2 integration, useAudio hook

7. **Data Persistence & Offline Mode (FR40-FR45):** Zustand persist middleware + Zod validation, Service Worker cache-on-first-use, exportImport.ts for backup

**Functional Requirements Coverage:**
All 50 functional requirements have clear architectural support with specific file/component mappings documented in "Requirements to Structure Mapping" section.

**Non-Functional Requirements Coverage:**

- **Performance (NFR-P1 to NFR-P5):** <50ms canvas latency via immediate draw strategy, <100ms audio via Service Worker caching, <2s load via Vite optimization, offline mode via Service Worker, progressive caching strategy
- **Reliability (NFR-R1 to NFR-R4):** Zero data loss via LocalStorage + Zod validation, 100% offline functionality, accurate progress tracking, export/import data integrity
- **Usability (NFR-U1 to NFR-U4):** Mobile-first Styled Components, 128kbps AAC audio quality, accurate Thai font rendering (Noto Sans Thai + Sarabun), <100ms interaction feedback
- **Security (NFR-S1 to NFR-S2):** HTTPS via Cloudflare Pages, no sensitive data collection, LocalStorage same-origin security
- **Integration (NFR-I1 to NFR-I2):** Cloudflare R2 with 99% uptime target, 3-retry logic with exponential backoff, 30-day CDN caching

**Assessment:** COMPLETE REQUIREMENTS COVERAGE - Every functional and non-functional requirement is architecturally supported and mapped to specific implementation components.

### Implementation Readiness Validation ✅

**Decision Completeness:**
- ✅ All critical decisions documented with specific versions (Zustand 5.0.9, Zod 4.3.5, Wouter 3.9.0, Sentry 10.32.1, ESLint 9.39.2, Prettier 3.7.4)
- ✅ Technology stack fully specified (React 18, TypeScript 5, Vite 5, Styled Components, Radix UI, Vitest 2.0.0, Playwright 1.45.0)
- ✅ Integration patterns defined (Cloudflare R2 audio CDN, Google Fonts CDN, Sentry error tracking, GitHub Actions CI, Cloudflare Pages deployment)
- ✅ Performance considerations addressed (<50ms canvas, <100ms audio, <2s load, cache strategies)

**Structure Completeness:**
- ✅ Complete directory tree defined with all files and directories specified
- ✅ Component boundaries established (Fuse library vs App, props-only communication for Fuse, Zustand for App state)
- ✅ Integration points mapped (R2 audio URLs, Google Fonts, Sentry init, Service Worker caches, LocalStorage keys)
- ✅ Requirements to structure mapping complete (all 50 FRs mapped to specific files/components)

**Pattern Completeness:**
- ✅ 16 potential AI agent conflict points identified and resolved
- ✅ Naming conventions established: PascalCase components, camelCase functions/hooks, prefixed LocalStorage keys, versioned Service Worker caches, no 'I' prefix on interfaces, path constants
- ✅ Structure patterns defined: Separated component files, tests in subdirectories, named exports with barrel pattern, monorepo package organization
- ✅ Communication patterns specified: Zustand single global store, props-based theme access, state-mediated component communication
- ✅ Process patterns documented: Immediate canvas draw, 3-retry audio with exponential backoff, actionable error messages, cache-on-first-use Service Worker strategy

**Assessment:** FULLY READY FOR IMPLEMENTATION - AI agents have comprehensive guidance for consistent implementation across all aspects of the project.

### Gap Analysis Results

**Critical Gaps:** NONE

**Important Gaps:** NONE

**Minor Enhancement Opportunities (Nice-to-Have):**

1. **GitHub Actions YAML Examples**: Basic CI/CD workflow structure is documented, but specific YAML configuration could be provided as a starting template.
   - Priority: Low
   - Impact: Minimal - AI agents can generate standard CI/CD configs
   - Recommendation: Defer to implementation phase

2. **Cloudflare Pages Environment Variable Configuration**: Requirements are documented (VITE_R2_AUDIO_BASE_URL, VITE_SENTRY_DSN), but dashboard setup steps not detailed.
   - Priority: Low
   - Impact: Minimal - standard Cloudflare Pages configuration
   - Recommendation: Defer to implementation phase

3. **Performance Benchmarking Strategy**: Deferred per testing strategy (performance not a concern for POC), but could specify tools for post-POC validation.
   - Priority: Low
   - Impact: None for POC phase
   - Recommendation: Defer to post-POC if validation succeeds

**Assessment:** NO BLOCKING GAPS - Architecture is complete and ready for implementation. Minor enhancements can be addressed during implementation or post-POC.

### Validation Issues Addressed

**No Critical Issues Found**

All architectural elements are coherent, complete, and implementation-ready. The architecture successfully:
- Provides clear guidance for all 50 functional requirements
- Addresses all non-functional requirements (performance, reliability, usability, security, integration)
- Defines comprehensive patterns to prevent AI agent conflicts
- Maps requirements to specific files and components
- Establishes clear boundaries and integration points

**Minor Recommendations Implemented:**
- Test file organization revised per user preference (tests/ subdirectories within components)
- Configurable thresholds added to spaced repetition algorithm per user request
- GitHub Actions + Cloudflare Pages CI/CD architecture selected per user feedback

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed (50 FRs, NFRs, 9 cross-cutting concerns)
- [x] Scale and complexity assessed (Medium complexity, 8-10 major components)
- [x] Technical constraints identified (Chrome-only POC, LocalStorage-only persistence, <50ms canvas latency)
- [x] Cross-cutting concerns mapped (offline-first, performance, persistence, audio, font rendering, accessibility, spaced repetition, canvas interaction, testing)

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions (State management: Zustand 5.0.9, Validation: Zod 4.3.5, Routing: Wouter 3.9.0, Error tracking: Sentry 10.32.1, Code quality: ESLint 9.39.2 + Prettier 3.7.4)
- [x] Technology stack fully specified (React 18 + TypeScript 5 + Vite 5, Styled Components + Radix UI, Vitest 2.0.0 + Playwright 1.45.0)
- [x] Integration patterns defined (Cloudflare R2 audio CDN with 3-retry logic, Google Fonts with Service Worker caching, Sentry error reporting, GitHub Actions CI, Cloudflare Pages deployment)
- [x] Performance considerations addressed (Native Canvas 2D for <50ms latency, cache-on-first-use for <2s load, Service Worker for offline mode)

**✅ Implementation Patterns**

- [x] Naming conventions established (Components: PascalCase, Functions/hooks: camelCase, LocalStorage: thai-master: prefix, Caches: thai-master-{type}-v{version}, Interfaces: no 'I' prefix with descriptive suffixes, Routes: path constants)
- [x] Structure patterns defined (Separated component files, tests in subdirectories, named exports with barrel pattern, monorepo npm workspaces)
- [x] Communication patterns specified (Single Zustand store, props-based theme access, state-mediated component communication, Service Worker transparent caching)
- [x] Process patterns documented (Immediate canvas draw, 3-retry audio with exponential backoff, actionable error messages, Zod validation on hydration)

**✅ Project Structure**

- [x] Complete directory structure defined (Full tree with all files: packages/fuse/ and packages/app/ with all subdirectories and files listed)
- [x] Component boundaries established (Fuse: generic components, props-only communication; App: business logic, Zustand state management)
- [x] Integration points mapped (Cloudflare R2 audio URLs, Google Fonts CDN, Sentry SDK, LocalStorage with thai-master: prefix, Service Worker caches)
- [x] Requirements to structure mapping complete (All 50 FRs mapped to specific files, components, business logic, hooks, and tests)

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION ✅

**Confidence Level:** HIGH

The architecture is comprehensive, coherent, and complete. All requirements are covered, all patterns are defined, and all potential conflict points are addressed. AI agents have clear, unambiguous guidance for consistent implementation.

**Key Strengths:**

1. **Comprehensive Requirements Coverage**: All 50 functional requirements and all non-functional requirements are architecturally supported with specific file/component mappings

2. **Clear Pattern Definition**: 16 potential AI agent conflict points identified and resolved with comprehensive naming, structure, format, and process patterns

3. **Technology Stack Coherence**: All technology choices are compatible, well-supported, and aligned with project requirements (React 18 ecosystem, Vite build system, Chrome-only PWA focus)

4. **Detailed Project Structure**: Complete directory tree with all files specified, requirements mapped to specific locations, and integration points clearly defined

5. **Performance-Focused Design**: Native Canvas 2D API for <50ms latency, Service Worker caching for offline mode, immediate draw strategy, 3-retry audio logic

6. **Testing Strategy Integration**: Vitest for unit tests (close to code), Playwright for E2E tests (critical path coverage), visual regression testing, CI/CD integration

7. **Monorepo Benefits**: Clean separation between generic Fuse library (CDN-compilable) and Thai Master app, unified development workflow, shared tooling

**Areas for Future Enhancement (Post-POC):**

1. **Progressive Audio Caching**: Current cache-on-first-use is simple; upgrade to "next 10 items" strategy if POC validates user engagement

2. **Cross-Browser Support**: POC is Chrome-only; expand to Firefox, Safari, Edge if POC succeeds

3. **Backend Integration**: LocalStorage-only for POC; add cloud sync, user accounts, analytics if POC validates market need

4. **Advanced Spaced Repetition**: Custom accuracy-based algorithm for POC; consider SM-2 or more sophisticated algorithms if effectiveness data warrants

5. **Performance Benchmarking**: Deferred for POC; add automated performance testing if <50ms canvas latency proves challenging on mid-range Android

### Implementation Handoff

**AI Agent Guidelines:**

- **Follow all architectural decisions exactly as documented** - Technology versions, patterns, and structure are not suggestions but requirements for consistency
- **Use implementation patterns consistently across all components** - Naming conventions, file organization, and communication patterns must be uniform
- **Respect project structure and boundaries** - Fuse library is generic only, App contains business logic, tests stay close to code
- **Refer to this document for all architectural questions** - Every decision has been validated and documented with rationale

**First Implementation Priority:**

Initialize monorepo with npm workspaces and starter template:

```bash
# Step 1: Initialize root monorepo
mkdir thai-learning-v2
cd thai-learning-v2
npm init -y

# Step 2: Configure workspaces in root package.json
# Edit package.json to add: "workspaces": ["packages/*"]

# Step 3: Create packages structure
mkdir -p packages/app packages/fuse

# Step 4: Initialize Fuse library
cd packages/fuse
npm init -y
# Configure as library: name: "@thai-learning/fuse", main: "./dist/fuse.umd.js", module: "./dist/fuse.es.js"

# Step 5: Initialize App with Vite
cd ../app
npm create vite@latest . -- --template react-ts
cd ../..

# Step 6: Install shared dependencies at root
npm install --save-dev typescript vitest @playwright/test

# Step 7: Install Fuse dependencies
npm install react react-dom styled-components -w packages/fuse
npm install --save-dev @types/react @types/react-dom @types/styled-components vite @vitejs/plugin-react -w packages/fuse

# Step 8: Install App dependencies
npm install @thai-learning/fuse zustand zod wouter @sentry/react -w packages/app
npm install styled-components @radix-ui/react-dialog @radix-ui/react-toast @radix-ui/react-progress workbox-window -w packages/app
npm install --save-dev vite-plugin-pwa -w packages/app

# Step 9: Configure Vite for library mode (Fuse) and PWA mode (App)
# Create vite.config.ts in both packages per documented configurations

# Step 10: Configure ESLint, Prettier, Vitest at root
# Create .eslintrc.js, .prettierrc, vitest.config.ts per documented patterns

# Step 11: Configure Playwright for E2E tests
cd packages/app
npx playwright install chromium
# Create playwright.config.ts per documented configuration

# Step 12: Verify monorepo setup
npm run build  # Should build Fuse then App
```

This initialization creates the foundation for all subsequent development. Once complete, implement components in priority order: Fuse Theme → Fuse UI components → App infrastructure (Zustand store, routes, Service Worker) → Feature components (CanvasPractice, FlashCards, Quiz, ReportCard).

---

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-10
**Document Location:** _bmad-output/planning-artifacts/architecture.md

### Final Architecture Deliverables

**📋 Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**

- 12 architectural decisions made (State management, Routing, Validation, Audio, Canvas, Caching, Spaced Repetition, Font Loading, Error Tracking, Code Quality, CI/CD)
- 16 implementation patterns defined (Naming, Structure, State Management, Format, Process patterns)
- 7 architectural components specified (Character Learning, Vocabulary, Quiz, Report Card, Onboarding, Audio System, Data Persistence)
- 50 requirements fully supported (All functional requirements + non-functional requirements)

**📚 AI Agent Implementation Guide**

- Technology stack with verified versions (React 18, TypeScript 5, Vite 5, Zustand 5.0.9, Zod 4.3.5, Wouter 3.9.0, Sentry 10.32.1, ESLint 9.39.2, Prettier 3.7.4, Vitest 2.0.0, Playwright 1.45.0)
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries (Fuse library vs App)
- Integration patterns and communication standards

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing thai-learning-v2 (Thai Master). Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
Initialize monorepo with npm workspaces and starter template (documented in Implementation Handoff section above).

**Development Sequence:**

1. Initialize project using documented starter template (monorepo with npm workspaces)
2. Set up development environment per architecture (TypeScript, ESLint, Prettier, Vitest, Playwright)
3. Implement core architectural foundations (Fuse Theme, Zustand store, routes, Service Worker)
4. Build features following established patterns (CanvasPractice, FlashCards, Quiz, ReportCard)
5. Maintain consistency with documented rules (naming conventions, file organization, state management, error handling)

### Quality Assurance Checklist

**✅ Architecture Coherence**

- [x] All decisions work together without conflicts
- [x] Technology choices are compatible (React 18 ecosystem, Vite build system)
- [x] Patterns support the architectural decisions (separated component structure, single Zustand store, Service Worker caching)
- [x] Structure aligns with all choices (monorepo for Fuse library + App separation)

**✅ Requirements Coverage**

- [x] All functional requirements are supported (50 FRs across 7 categories, all mapped to specific files/components)
- [x] All non-functional requirements are addressed (Performance, Reliability, Usability, Security, Integration)
- [x] Cross-cutting concerns are handled (Offline-first, Performance monitoring, Persistence, Audio management, Thai font rendering, Accessibility, Spaced repetition, Canvas interaction, Testing)
- [x] Integration points are defined (Cloudflare R2 audio CDN, Google Fonts, Sentry, LocalStorage, Service Worker caches)

**✅ Implementation Readiness**

- [x] Decisions are specific and actionable (All technology choices include exact versions)
- [x] Patterns prevent agent conflicts (16 conflict points resolved with clear patterns)
- [x] Structure is complete and unambiguous (Full directory tree with all files specified)
- [x] Examples are provided for clarity (Component patterns, Zustand store setup, Service Worker caching, error handling)

### Project Success Factors

**🎯 Clear Decision Framework**
Every technology choice was made collaboratively with clear rationale, ensuring all stakeholders understand the architectural direction. Decisions align with project requirements (Chrome-only POC, LocalStorage persistence, offline-first, <50ms canvas latency).

**🔧 Consistency Guarantee**
Implementation patterns and rules ensure that multiple AI agents will produce compatible, consistent code that works together seamlessly. 16 potential conflict points identified and resolved with naming, structure, format, and process patterns.

**📋 Complete Coverage**
All project requirements are architecturally supported, with clear mapping from business needs to technical implementation. Every functional requirement (50 FRs) and non-functional requirement is addressed.

**🏗️ Solid Foundation**
The chosen starter template (Vite monorepo with npm workspaces) and architectural patterns provide a production-ready foundation following current best practices. Fuse library is CDN-compilable, App is a PWA with offline-first architecture.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.

---
