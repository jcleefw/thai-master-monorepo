# Deployment Guide

## Cloudflare Pages Setup

### Prerequisites
- GitHub repository connected to Cloudflare Pages
- Node.js 18+ environment

### Cloudflare Pages Configuration

**Build Settings:**
```
Framework preset: None (Custom)
Root directory: packages/app
Build command: npm run build
Output directory: packages/app/dist
Node version: 18
```

### Environment Variables
No environment variables required for basic deployment.

### Build Process

1. **Install Dependencies**
   ```bash
   npm ci
   ```

2. **Build Fuse Library**
   ```bash
   npm run build:fuse
   ```

3. **Build App**
   ```bash
   npm run build:app
   ```

The root `npm run build` command automatically runs both in the correct order.

### Production URL
- Production: `https://thai-master.pages.dev`
- Preview branches: `https://[branch].thai-master.pages.dev`

### Deployment Triggers
- **Production**: Pushes to `main` or `master` branch
- **Preview**: Pull requests to `main` or `master` branch

### Manual Deployment

If you need to deploy manually:

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npx wrangler pages deploy packages/app/dist --project-name=thai-master
```

### Performance Targets
- Initial load: <2 seconds on 4G connection (NFR-P3)
- HTTPS enabled by default (NFR-S1)
- Build time: <5 minutes

### Troubleshooting

**Build fails with "Cannot find module '@thai-master/fuse'"**
- Ensure build command includes `npm run build` (not just `npm run build:app`)
- Verify workspace dependencies are installed correctly

**Build timeout**
- Check build logs for specific errors
- Verify Node.js version is 18+
- Ensure all dependencies are in package.json (not just devDependencies)

**404 on routes**
- Cloudflare Pages serves SPAs correctly by default
- Add `_redirects` file if custom routing needed
