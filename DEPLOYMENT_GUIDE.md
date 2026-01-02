# Deployment Guide - Amancha Consulting Website

## Development vs Production Builds

### Local Development (ng serve)
```bash
npm start
```
- **Uses:** Tailwind CDN from index.html (instant styling)
- **URL:** http://localhost:4200
- **Best for:** Rapid development and testing

### Production Build (Netlify)
```bash
npm run build:consulting
```
- **Uses:** PostCSS compiled Tailwind (optimized, bundled)
- **Output:** `dist/amancha_develops/`
- **CDN:** Ignored in production build
- **Best for:** Secure, optimized deployment

---

## Why This Dual Approach?

| Aspect | Development (CDN) | Production (PostCSS) |
|--------|------------------|---------------------|
| Load Time | Instant (no build) | ~30s build |
| CSS Size | ~100KB | ~15-30KB (purged) |
| CSP Issues | None | ✅ Safe, no inline eval |
| Performance | Fast reload | Optimized files |
| Security | Dev-only | ✅ Production-grade |

---

## Architecture Overview

```
Your Angular App (amancha-develops)
    ↓
Multiple Deployment Options:
    ├── GitHub Pages (static hosting)
    ├── Netlify (static + forms + serverless)
    └── Vercel (static + serverless)
```

## Project Structure (Components)

```
src/app/
├── shared/
│   ├── components/
│   │   ├── navigation/          # Responsive navbar
│   │   └── footer/              # Footer with links
│   ├── models/
│   │   └── contact.model.ts     # Form data types
│   └── services/
│       └── contact.service.ts   # Form submission handler
├── home/
│   ├── home.component.ts        # Main container
│   ├── home.component.html      # Layout (composes sections)
│   └── sections/
│       ├── hero/                # Hero banner with CTA
│       ├── services/            # 3-column service cards
│       ├── mentorship/          # Developer programs
│       ├── expertise/           # Tech stack display
│       ├── about/               # About Steve + achievements
│       └── contact/             # Contact form with validation
```

## Deployment Option 1: GitHub Pages (Simple)

**Pros:** Free, integrated with GitHub, no backend needed
**Cons:** Cannot handle forms directly, no serverless functions

### Steps:
1. Build the app for GitHub Pages:
```bash
npm run build:github-pages
```

2. Configure GitHub Pages:
   - Go to repo Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or your branch)
   - Folder: `docs` (or `/dist`)

3. For forms, use **Formspree** or **Netlify Forms** as external service

### Update app for GitHub Pages base href:
```typescript
// angular.json - update outputPath for GitHub Pages
"outputPath": "docs/amancha-consulting"
```

---

## Deployment Option 2: Netlify (Recommended) ⭐

**Pros:** Free tier, built-in form handling, serverless functions, CDN
**Cons:** Learning curve for advanced features

### Steps:
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build:consulting
```

3. Deploy to Netlify:
```bash
netlify deploy --prod --dir=dist/amancha-develops
```

### Alternative: Connect Git Repository
1. Push code to GitHub
2. Go to netlify.com → New site from Git
3. Select your repository
4. Build settings:
   - Build command: `npm run build:consulting`
   - Publish directory: `dist/amancha-develops`
5. Deploy

### Configure Forms:
- Netlify automatically captures forms with `data-netlify="true"`
- You'll receive email notifications for submissions
- Dashboard shows all submissions in real-time
- Set up automated replies via Netlify settings

### Environment Setup:
- Create `netlify.toml` in root (optional):
```toml
[build]
  command = "npm run build:consulting"
  publish = "dist/amancha-develops"

[functions]
  directory = "netlify/functions"
```

---

## Deployment Option 3: Vercel (Alternative)

**Pros:** Great Next.js integration, fast deployments, generous free tier
**Cons:** Overkill if you just need static hosting

### Steps:
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Or connect GitHub:
   - Go to vercel.com → Import Project
   - Select GitHub repo
   - Set build command: `npm run build:consulting`
   - Publish directory: `dist/amancha-develops`

### Serverless API (optional):
- Create API routes in `/api/contact.ts`
- Handle form submissions server-side
- Send emails using SendGrid, Mailgun, etc.

---

## Form Submission Flow (Recommended)

### Current Implementation (Netlify Forms):
```
User fills form → Validates → Submits to Netlify
    → Netlify captures submission
    → Email sent to admin
    → Form response message shown
```

### Production Checklist:
- [ ] Update form-name input: `name="contact"`
- [ ] Add data-netlify attribute to form
- [ ] Test form submission in staging
- [ ] Set up email notifications in Netlify
- [ ] Verify reCAPTCHA (optional, for spam prevention)
- [ ] Add confirmation email to user (requires Netlify Function)

---

## Domain Setup

### For GitHub Pages:
1. Buy domain (Namecheap, GoDaddy, etc.)
2. Update DNS records:
   - CNAME: `username.github.io`
3. Add domain in repo Settings → Pages

### For Netlify:
1. Buy domain or use free Netlify domain
2. Add custom domain in Netlify dashboard
3. Auto-configured SSL/HTTPS

### For Vercel:
1. Similar process, set domain in dashboard
2. Auto SSL/HTTPS

---

## CI/CD Pipeline (GitHub Actions)

### Automated Deploy on Push:
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:consulting
      - uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=dist/amancha-develops
```

### Setup:
1. Generate Netlify token
2. Add to GitHub Secrets
3. Push to main → Automatic deployment ✅

---

## Local Development

### Development Server:
```bash
npm start
# Visit http://localhost:4200
```

### Netlify Preview:
```bash
netlify dev
# Visit http://localhost:8888
# Test forms locally
```

---

## Environment Variables

Create `.env` files for different environments:

```env
# .env.production
ANGULAR_APP_API_ENDPOINT=https://your-api.com
ANGULAR_APP_ENVIRONMENT=production
```

Use in components:
```typescript
import { environment } from '@env/environment';

// environment.production.ts
export const environment = {
  production: true,
  apiEndpoint: 'https://your-api.com'
};
```

---

## Performance Optimization

### Build Optimization:
```bash
# Production build with optimization
ng build --configuration production --optimization --build-optimizer
```

### Lazy Loading:
- Split contact form into separate module
- Load only when user navigates to section

### Caching:
- Netlify automatically caches assets
- Configure cache headers in netlify.toml

---

## Monitoring & Analytics

### Netlify Analytics (built-in):
- Visit dashboard for traffic stats
- Form submission metrics
- Performance insights

### Google Analytics (optional):
```typescript
// Add to app.config.ts
import { GoogleAnalyticsService } from '@shared/services/google-analytics.service';
```

---

## Troubleshooting

### Form Not Submitting?
- [ ] Check `data-netlify="true"` on form
- [ ] Verify form `name` attribute matches
- [ ] Check browser console for errors
- [ ] Test with `netlify dev`

### Build Fails?
- [ ] Check Node version: `node --version`
- [ ] Clear cache: `rm -rf dist node_modules`
- [ ] Reinstall: `npm ci`

### Slow Performance?
- [ ] Run Lighthouse audit
- [ ] Check bundle size: `npm run build -- --stats-json`
- [ ] Optimize images
- [ ] Enable gzip compression

---

## Next Steps

1. **Immediate**: Set up Netlify deployment (easiest)
2. **Week 1**: Configure custom domain and SSL
3. **Week 2**: Set up CI/CD pipeline
4. **Week 3**: Add analytics and monitoring
5. **Month 1**: Optimize performance and SEO

---

## Resources

- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Guide](https://pages.github.com)
- [Angular Build Guide](https://angular.io/guide/build)
- [Formspree Docs](https://formspree.io)
