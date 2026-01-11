---
story_id: "1-3"
story_key: "1-3-set-up-ci-cd-pipeline-github-actions-cloudflare-pages"
epic: "epic-1"
title: "Set Up CI/CD Pipeline (GitHub Actions & Cloudflare Pages)"
status: "done"
created: "2026-01-11"
completed: "2026-01-11"
---

# Story 1.3: Set Up CI/CD Pipeline (GitHub Actions & Cloudflare Pages)

## User Story

As a developer,
I want automated testing and deployment pipelines,
So that code quality is enforced on every PR and successful merges deploy automatically to production.

## Acceptance Criteria

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

## Implementation Notes

- GitHub Actions workflow: `.github/workflows/test.yml`
- Triggers: Pull requests to main branch
- Quality checks: ESLint, TypeScript, Vitest, Playwright (Chrome-only)
- Required status checks prevent merge if any check fails
- Cloudflare Pages: Auto-deploy on push to main
- Build config: packages/app as root, output to packages/app/dist
- Node.js 18+ requirement for build environment
- HTTPS enforced in production (NFR-S1)

## Related Requirements

- NFR-S1: Application served over HTTPS in production
- NFR-P3: Initial app load within 2 seconds on 4G mobile connection
- CI/CD: GitHub Actions for testing, Cloudflare Pages for deployment
