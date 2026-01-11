---
story_id: "1-7"
story_key: "1-7-create-project-context-documentation"
epic: "epic-1"
title: "Create Project Context Documentation"
status: "ready-for-dev"
created: "2026-01-11"
---

# Story 1.7: Create Project Context Documentation

## User Story

As a developer,
I want comprehensive project context documentation,
So that AI agents and human developers understand critical patterns, anti-patterns, and architectural decisions when implementing features.

## Acceptance Criteria

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

## Implementation Notes

- Create `docs/project-context.md` with comprehensive rules and patterns
- Document all technology versions from Stories 1.1-1.6
- Include anti-patterns (NEVER DO THIS) section prominently
- Optimize document structure for LLM consumption (concise, clear formatting)
- Count all rules and update frontmatter `rule_count` to match
- Reference architecture.md, prd.md, and ux-design-specification.md where appropriate

## Related Requirements

- All Epic 1 stories contribute patterns and rules to this documentation
- NFR-P1: <50ms canvas latency requirement
- NFR-R1: Zero data loss guarantee
- NFR-U3: Thai font rendering with accurate tone marks, 7:1 contrast
