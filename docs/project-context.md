---
project_name: 'thai-learning-v2'
user_name: 'thaieager'
date: '2026-01-10'
sections_completed: ['technology_stack', 'language_specific', 'framework_specific', 'testing_rules', 'code_quality', 'critical_rules']
status: 'complete'
rule_count: 85
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

**Core Framework:**
- React 18 + TypeScript 5 (strict mode)
- Vite 5 (monorepo: packages/fuse + packages/app)
- Node.js 18+ required

**State & Data:**
- Zustand 5.0.9 (single global store, persist middleware)
- Zod 4.3.5 (LocalStorage validation)
- LocalStorage API (primary persistence, no backend)

**UI & Styling:**
- Styled Components (CSS-in-JS, NO Tailwind)
- Radix UI (accessible primitives)

**Routing & Navigation:**
- Wouter 3.9.0

**Testing:**
- Vitest 2.0.0 (unit tests)
- Playwright 1.45.0 (E2E, Chrome-only)

**Code Quality:**
- ESLint 9.39.2 + typescript-eslint v8
- Prettier 3.7.4

**Monitoring:**
- Sentry 10.32.1 (@sentry/react)

**Critical Constraints:**
- Chrome-only POC (no cross-browser support)
- Mid-range Android performance baseline
- Offline-first PWA architecture

---

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

**Critical TypeScript Patterns:**
- ✅ Strict mode enabled - all types must be explicit
- ✅ Named exports ONLY (never default exports)
- ✅ Barrel pattern via `index.ts` for all components/modules
- ✅ Type-only imports: `import type { ButtonProps } from './Button.types'`
- ❌ No 'I' prefix on interfaces (use `ButtonProps`, not `IButtonProps`)

**Import/Export Convention:**
```typescript
// Component.tsx
export const Component = () => { ... }

// Component.types.ts
export interface ComponentProps { ... }

// index.ts (barrel)
export { Component } from './Component'
export type { ComponentProps } from './Component.types'
```

**Error Handling Requirements:**
- All errors must be caught and reported to Sentry
- User-facing errors must be actionable with clear guidance
- Audio playback: 3-retry with exponential backoff (100ms, 200ms, 400ms)
- Always provide retry actions for network failures

**Async Patterns:**
- Use async/await (not raw Promises)
- Always catch errors in async functions
- Audio retry pattern documented in architecture

### Framework-Specific Rules (React 18)

**Component Structure (CRITICAL):**
- ✅ Separated concerns: `.tsx`, `.styles.ts`, `.types.ts`, `index.ts`
- ✅ Tests in `tests/` subdirectory within component folder
- ❌ NO single-file components with co-located styles
- Example structure:
  ```
  Button/
  ├── Button.tsx
  ├── Button.styles.ts
  ├── Button.types.ts
  ├── index.ts
  └── tests/
      └── Button.test.tsx
  ```

**State Management (Zustand):**
- ✅ Single global store (NOT feature-based stores)
- ✅ Access via hooks: `const { progress, updateProgress } = useStore()`
- ✅ LocalStorage keys prefixed: `thai-master:store`
- ✅ Zod validation on hydration (integrated in persist middleware)
- ❌ NO direct store manipulation outside hooks
- ❌ NO multiple stores (all state in one global store)

**Hooks Patterns:**
- Custom hooks: camelCase with `use` prefix
- Examples: `useAudioPlayer.ts`, `useCanvas.ts`, `useProgressStore.ts`

**Component Communication:**
- Fuse library: Props-only (no global state dependency)
- App components: Props for parent-child, Zustand for cross-component
- NO direct component-to-component calls

**Performance (Canvas-Specific):**
- Immediate draw on touch events (no batching)
- NO requestAnimationFrame for POC
- Direct touch event handling for <50ms latency

**Styled Components Theme:**
- Props-based access: `${props => props.theme.colors.sage}`
- Theme from Fuse package
- Pastel color system (cream, lavender, sage, periwinkle, coral)

### Testing Rules

**Test Organization (CRITICAL):**
- ✅ Unit tests: `tests/` subdirectory within component/lib/hooks/stores folders
- ✅ E2E tests: Separate `packages/app/e2e/` directory
- ✅ Test naming: Match source file with `.test.tsx` suffix
- ✅ Split large test files by concern (`.interactions.test.tsx`, `.performance.test.tsx`)
- ❌ NO co-located test files next to source files

**Test Coverage Focus:**
- ✅ Critical path coverage (NOT comprehensive)
- ✅ Business logic: Spaced repetition algorithm, accuracy calculations, weak area detection
- ✅ LocalStorage persistence with Zod validation
- ✅ Canvas rendering accuracy
- ✅ Audio playback with 3-retry logic

**E2E Test Requirements (Playwright):**
- Chrome-only (matches POC target)
- Critical paths: Canvas tracing, audio playback, offline mode, flash-cards, quiz, report card
- Visual regression: Thai fonts with tone marks, canvas rendering, pastel theme colors
- Mobile viewport emulation (320px-428px width range)

**Mock Patterns:**
- Mock Cloudflare R2 audio URLs
- Mock LocalStorage with Zod schema validation
- Mock Service Worker caching behavior
- No backend to mock (LocalStorage-only)

**CI/CD Requirements:**
- All tests run on every PR (GitHub Actions)
- Critical path E2E tests must pass (merge gate)
- Visual regression tests must pass or be explicitly reviewed
- Performance testing deferred to post-POC

### Code Quality & Style Rules

**Linting & Formatting:**
- ✅ ESLint 9.39.2 + typescript-eslint v8 (shared config at root)
- ✅ Prettier 3.7.4
- ✅ CI/CD blocks merge on ESLint or TypeScript errors
- ❌ NO warnings allowed in production builds

**Naming Conventions (CRITICAL):**
- Components: PascalCase (`Button.tsx`, `CanvasPractice.tsx`)
- Hooks: camelCase with 'use' prefix (`useAudioPlayer.ts`)
- Utilities: camelCase (`formatAccuracy.ts`)
- LocalStorage keys: `thai-master:` prefix (`thai-master:store`)
- Service Worker caches: `thai-master-{type}-v{version}` (`thai-master-audio-v1`)
- Route constants: Uppercase (`ROUTES.PRACTICE`, `ROUTES.QUIZ`)

**File Organization:**
- Monorepo: `packages/fuse/` (library) + `packages/app/` (PWA)
- Fuse: Generic components ONLY (no app logic)
- App: Business logic, state, app-specific components
- Build order: Fuse → App (dependency chain)

**Code Organization:**
- Separated concerns: `.tsx`, `.styles.ts`, `.types.ts`, `index.ts`
- Business logic: `lib/` directory
- Custom hooks: `hooks/` directory
- Zustand store: `stores/` directory
- Barrel exports: All components via `index.ts`

**Documentation:**
- Comments only where logic isn't self-evident
- Error messages must be actionable (no technical codes for users)
- Architecture document is source of truth

### Critical Don't-Miss Rules

**Anti-Patterns (NEVER DO THIS):**
- ❌ Default exports (use named exports + barrel pattern)
- ❌ Multiple Zustand stores (single global store only)
- ❌ Tailwind CSS (use Styled Components)
- ❌ Canvas draw batching (immediate draw for <50ms)
- ❌ Unprefixed LocalStorage keys (must use `thai-master:`)
- ❌ Co-located test files (tests in `tests/` subdirectory)
- ❌ 'I' prefix on interfaces (use `ButtonProps`, not `IButtonProps`)
- ❌ Full attempt history in LocalStorage (aggregated data only)
- ❌ App-specific logic in Fuse library (keep generic)

**Thai Language Specifics (CRITICAL):**
- ✅ Fonts: Noto Sans Thai (primary), Sarabun (fallback)
- ✅ Tone marks: Unicode-compliant, accurate positioning required
- ✅ Ghost font: 30% opacity for canvas tracing
- ✅ Minimum size: 48pt for mobile canvas
- ✅ Contrast: 7:1 for Thai characters (accessibility)
- ✅ Service Worker: Cache fonts in `thai-master-fonts-v1`

**Performance Edge Cases:**
- <50ms canvas latency on mid-range Android (Samsung Galaxy A-series)
- <100ms audio from cached files (Service Worker cache-first)
- <2s initial load on 4G (bundle size optimization)
- Direct touch handling (NO requestAnimationFrame batching)
- LocalStorage ~5-10MB limit (aggregated data only)

**Offline-First Gotchas:**
- Separate Service Worker caches by type (`-audio-v1`, `-fonts-v1`, `-static-v1`)
- Version cache names for invalidation
- 100% functionality offline (zero degradation)
- Cache-on-first-use for audio (NOT preload all 130 files)
- Zero data loss guarantee (Zod validation on every hydration)

**State Management Edge Cases:**
- Zod validation in Zustand persist `getItem` (integrated, not separate)
- Reset corrupted data, log to Sentry
- User preferences: configurable thresholds (70%/50% defaults)
- Spaced repetition: aggregated + recent accuracy only (no full history)

**Security Requirements:**
- Chrome-only POC (no cross-browser support)
- HTTPS in production (Cloudflare Pages)
- No PII collection (LocalStorage same-origin security)
- Audio CDN: 3-retry logic mandatory (NFR-I2)
- Sentry gets full context, users get actionable messages

**Service Worker Cache Strategies:**
- Audio: Cache-first (`thai-master-audio-v1`)
- Fonts: Cache-first, long-term (`thai-master-fonts-v1`)
- Static: Network-first HTML, cache-first JS/CSS
- Version suffix for cache invalidation

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Refer to architecture.md for detailed architectural decisions
- Update this file if new patterns emerge during implementation

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time
- Ensure new team members understand these patterns

**Last Updated:** 2026-01-10
