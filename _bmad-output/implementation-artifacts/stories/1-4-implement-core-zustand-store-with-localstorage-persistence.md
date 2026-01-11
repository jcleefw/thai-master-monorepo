---
story_id: "1-4"
story_key: "1-4-implement-core-zustand-store-with-localstorage-persistence"
epic: "epic-1"
title: "Implement Core Zustand Store with LocalStorage Persistence"
status: "done"
created: "2026-01-11"
completed: "2026-01-11"
---

# Story 1.4: Implement Core Zustand Store with LocalStorage Persistence

## User Story

As a developer,
I want a global Zustand store with LocalStorage persistence and Zod validation,
So that user progress persists across sessions with zero data loss and automatic corruption recovery.

## Acceptance Criteria

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

## Implementation Notes

- Follow single global store pattern (no feature-based stores)
- Use named exports only (no default exports)
- Zod validation must be integrated in persist middleware's `storage.getItem()` method
- Prefix all LocalStorage keys with `thai-master:`
- Tests must be placed in `packages/app/src/stores/tests/` subdirectory

## Related Requirements

- NFR-R1: User progress must persist across browser sessions with zero data loss
- Story 1.5: Sentry integration for validation error logging

---

## Dev Agent Record

### Implementation Plan

Implemented global Zustand store following single-store pattern with:
- Custom storage adapter integrating Zod validation in `storage.getItem()`
- Automatic corruption recovery (backup + reset + log)
- Quota exceeded error handling
- TypeScript strict mode with comprehensive JSDoc documentation
- Placeholder state structure for future epics (2-5)

### Completion Notes

✅ **Store Implementation Complete** (Date: 2026-01-11)

**Core Implementation:**
- Created single global store using Zustand 5.0.9 with persist middleware
- Integrated Zod 4.3.5 validation in custom storage adapter
- Implemented automatic corruption recovery with backup to `thai-master:store:corrupted`
- Added graceful error handling for quota exceeded scenarios
- Used named exports only (no default exports per project standards)

**State Structure:**
- 4 placeholder sections: characterProgress, vocabularyProgress, quizScores, userPreferences
- UserPreferences includes configurable thresholds (70% alphabet, 50% vocabulary)
- All sections typed with TypeScript strict mode + JSDoc comments

**Testing:**
- Created 3 comprehensive test files (552 lines total)
- 33 tests covering: state updates, persistence, validation, corruption recovery, quota errors
- All tests passing (100% pass rate)
- Tests organized in `tests/` subdirectory per project standards

**UI Testing:**
- Created StoreDebug component for browser-based testing
- Validated all acceptance criteria in actual browser environment
- Tested: persistence, corruption recovery, validation, all actions

**Validation:**
- All acceptance criteria satisfied
- NFR-R1 (zero data loss) verified with Zod validation + corruption recovery
- LocalStorage key prefix `thai-master:store` enforced
- Perfect fidelity restoration confirmed in tests

---

## File List

**Implementation Files:**
- `packages/app/src/stores/useStore.ts` (209 lines) - Main store with persist middleware
- `packages/app/src/stores/types.ts` (104 lines) - TypeScript interfaces
- `packages/app/src/stores/schemas.ts` (112 lines) - Zod validation schemas
- `packages/app/src/stores/index.ts` (32 lines) - Barrel exports

**Test Files:**
- `packages/app/src/stores/tests/useStore.test.ts` (126 lines) - Basic functionality tests
- `packages/app/src/stores/tests/useStore.persistence.test.ts` (214 lines) - Persistence tests
- `packages/app/src/stores/tests/schemas.test.ts` (212 lines) - Schema validation tests

**Debug/Demo Files:**
- `packages/app/src/components/StoreDebug.tsx` (231 lines) - Debug UI component
- `packages/app/src/App.tsx` (modified) - Integrated StoreDebug for testing

**Total:** 9 files (8 new, 1 modified) | 1,240 lines of code

---

## Change Log

**2026-01-11 - Initial Implementation**
- Implemented Zustand store with LocalStorage persistence and Zod validation
- Created comprehensive test suite (33 tests, 100% passing)
- Added StoreDebug component for browser-based validation
- Verified all acceptance criteria in actual browser environment

## Status
done