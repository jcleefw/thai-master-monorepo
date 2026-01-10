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
- **State Management**: Zustand (planned)
- **Routing**: Wouter (planned)
- **Styling**: Styled Components + Radix UI (planned)
- **Testing**: Vitest 2.0.0 + Playwright 1.45.0
- **Linting**: ESLint 9 + typescript-eslint v8
- **Deployment**: Cloudflare Pages

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
