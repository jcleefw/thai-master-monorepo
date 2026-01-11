---
story_id: "1-9"
story_key: "1-9-deploy-to-cloudflare-pages-via-github-actions"
epic: "epic-1"
title: "Deploy to Cloudflare Pages via GitHub Actions"
status: "ready-for-dev"
created: "2026-01-11"
---

# Story 1.9: Deploy to Cloudflare Pages via GitHub Actions

## User Story

As a developer,
I want automated deployment to Cloudflare Pages controlled by GitHub Actions,
So that builds run in GitHub's environment with full control over the build and deployment pipeline.

## Acceptance Criteria

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

## Implementation Notes

**Deployment Options:**
- **Option 1**: Use `cloudflare/pages-action@v1` (recommended, simpler)
- **Option 2**: Use Wrangler CLI (`wrangler pages deploy`)

**Required GitHub Secrets:**
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Pages Edit permissions
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID (found in dashboard)

**Workflow Structure:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout
      - Setup Node 18+ with cache
      - npm ci
      - npm run build
      - Upload build artifacts

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - Download build artifacts
      - Deploy to Cloudflare Pages (production)
      - Output deployment URL

  deploy-preview:
    needs: build
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - Download build artifacts
      - Deploy to Cloudflare Pages (preview)
      - Comment preview URL on PR
```

**Caching Strategy:**
- Cache `node_modules` using `actions/setup-node` cache
- Cache Cloudflare Pages builds (handled by Cloudflare)

**Benefits over Cloudflare Native Integration:**
- Single source of truth (all CI/CD in GitHub)
- More control over build environment
- Can run additional steps before/after deployment
- Build artifacts stay in GitHub
- Unified workflow execution

## Related Requirements

- Story 1.3: CI/CD pipeline foundation (extends with deployment control)
- NFR-S1: Application served over HTTPS in production
- NFR-P3: Initial app load within 2 seconds on 4G mobile connection
- GitHub Actions: Unified CI/CD platform

## Migration Notes

If Story 1.3 already has Cloudflare Pages native integration:
- GitHub Actions deployment can coexist (two deployment methods)
- Or disable Cloudflare Pages automatic builds (recommended for single source)
- Ensure only one deployment method is active to avoid confusion
