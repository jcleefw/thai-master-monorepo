# Thai Master

Script-first Thai language learning application. Master Thai consonants, vowels, and tone marks through interactive canvas tracing, then build vocabulary with spaced repetition flash cards.

## Project Structure

This is a monorepo containing:

- **`packages/fuse`** - Reusable component library (CDN-compilable)
- **`packages/app`** - Thai Master PWA application

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Install all dependencies
npm install

# Build all packages
npm run build
```

### Development

```bash
# Start app dev server (http://localhost:3000)
npm run dev

# Build Fuse library in watch mode
npm run dev:fuse
```

### Testing

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run E2E tests (requires dev server)
npm run test:e2e

# Run all tests (unit + E2E)
npm run test:all
```

### Linting & Type Checking

```bash
# Run ESLint
npm run lint

# Run TypeScript type checks
npm run type-check
```

### Building

```bash
# Build all packages
npm run build

# Build Fuse library only
npm run build:fuse

# Build App only (requires Fuse to be built first)
npm run build:app
```

## Technology Stack

- **Framework**: React 18 + TypeScript 5
- **Build Tool**: Vite 5.x
- **State Management**: Zustand 5.0.9 with LocalStorage persistence
- **Routing**: Wouter (planned)
- **Styling**: Styled Components + Radix UI (planned)
- **Testing**: Vitest 2.0.0 + Playwright 1.45.0
- **Error Tracking**: Sentry 10.32.1
- **Linting**: ESLint 9 + typescript-eslint v8
- **Deployment**: Cloudflare Pages

## Error Tracking Setup (Optional)

Sentry error tracking is optional but recommended for production deployments. The app will work perfectly without it.

### Setup Instructions

1. **Create a Sentry account** at [https://sentry.io](https://sentry.io) (free tier available)

2. **Create a new project** in Sentry:
   - Platform: **React**
   - Alert frequency: Choose based on your needs

3. **Get your DSN**:
   - Navigate to **Settings > Projects > [Your Project] > Client Keys (DSN)**
   - Copy the DSN URL (looks like `https://xxx@xxx.ingest.sentry.io/xxx`)

4. **Configure locally**:
   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local

   # Edit .env.local and add your DSN
   # VITE_SENTRY_DSN=https://your-dsn-here@sentry.io/project-id
   ```

5. **Verify setup**:
   - Start the dev server: `npm run dev`
   - Check browser console - no Sentry warnings should appear
   - The app will display a warning if DSN is missing (this is normal and safe)

### Production vs Development

- **Recommended**: Use separate Sentry projects for development and production
- Set different DSNs in `.env.local` (development) and deployment environment variables (production)
- Development DSN: Captures all errors during local development
- Production DSN: Captures errors from live users

### What Gets Tracked

When Sentry is configured, the following errors are automatically captured:

- **React component errors** with full stack traces
- **LocalStorage validation failures** (Zod schema errors)
- **LocalStorage quota exceeded** errors
- **Browser/device context** automatically included
- **Session replays** for errors (helps with debugging)

### Privacy & Security

- `.env.local` is already in `.gitignore` to prevent committing sensitive DSNs
- No user PII is collected by default
- All data is stored in your Sentry account

### Graceful Degradation

If `VITE_SENTRY_DSN` is not configured:
- The app works normally with full functionality
- A console warning indicates Sentry is disabled
- Users see friendly error messages with recovery options
- Errors are logged to browser console only

## Project Goals

Build a **12-week POC** validating the script-first language learning methodology:

### Week 4 Milestone
- ✅ Character mastery (44 consonants + 32 vowels + 4 tone marks)
- Target: 70% accuracy on character quizzes

### Week 12 Milestone
- ✅ 50-word vocabulary deck completion
- Target: 50% accuracy on vocabulary quizzes

## Features

### Pillar 1: Character Learning
- Interactive canvas tracing with ghost font guidance
- Native speaker pronunciation for all characters
- Progress tracking and mastery detection
- Offline-capable with Service Worker

### Pillar 2: Vocabulary Building
- 50-word flash card deck
- Spaced repetition algorithm (85% known / 15% new)
- Sentence examples for context
- Unlocks after character mastery

### Pillar 3: Assessment & Review
- Character and vocabulary quizzes
- Performance analytics and trends
- Weak area identification
- Custom revision decks

## Development Workflow

### Branch Protection
- PRs require passing CI checks before merge
- CI runs: ESLint, TypeScript checks, unit tests, E2E tests

### Deployment
- **Production**: Auto-deploys on push to `main`/`master`
- **Preview**: Auto-generates preview URL for each PR
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for details

## Architecture Decisions

- **Monorepo**: npm workspaces for shared component library
- **Chrome-only**: POC targets Chrome Desktop/Android only
- **Mobile-first**: Primary viewport 320px-428px
- **LocalStorage**: Client-side data persistence
- **No backend**: Fully client-side application

## Links

- Production URL: `https://thai-master.pages.dev` (after deployment)
- Documentation: [DEPLOYMENT.md](./DEPLOYMENT.md)

## License

MIT
