---
story_id: "1-11"
story_key: "1-11-implement-preview-command-for-build-artifacts"
epic: "epic-1"
title: "Implement Preview Command for Build Artifacts"
status: "in-progress"
created: "2026-01-12"
---

# Story 1-11: Implement Preview Command for Build Artifacts

## User Story
As a developer, 
I want a unified command to serve production build files locally, 
So that I can verify the final bundle behavior (PWA features, routing) before deploying to Cloudflare Pages.

## Acceptance Criteria
- [x] Add `preview` scripts to `packages/app` and root `package.json`.
- [x] Root command `pnpm run preview` should trigger the app preview.
- [x] Preview server must correctly resolve routes and serve assets from the `dist` folder.

## BDD Verification (Gherkin)
**Scenario: Verifying production build artifacts locally**
  **Given** I have successfully run `pnpm run build`
  **And** the `packages/app/dist` directory contains the build output
  **When** I execute `pnpm run preview` from the root directory
  **Then** a local server should start (typically on port 4173)
  **And** I should be able to access the application via a web browser
  **And** navigating to internal routes should not result in 404 errors

## Tasks/Subtasks
- [x] Add `"preview": "vite preview"` to `packages/app/package.json`.
- [x] Add `"preview": "pnpm --filter @thai-master/app preview"` to root `package.json`.
- [x] Verify build-and-serve flow manually using the BDD scenario.

## Dev Agent Record
- **Implementation Plan**: Leverage Vite's preview capability. Added a clean-and-build step to the root preview command to ensure artifacts are fresh.
- **Completion Notes**: Production build verified locally; routing and asset resolution are functional.

## Status
status: "review"