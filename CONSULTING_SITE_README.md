# Amancha Consulting Website

## Overview

This is a fully componentized Angular application for Amancha Consulting, built with:
- **Angular 19** (latest with standalone components)
- **Tailwind CSS** (utility-first styling)
- **Reactive Forms** (form validation)
- **Netlify Forms** (form submissions)

## Component Architecture

### Shared Components
Located in `src/app/shared/`:

#### Navigation (`shared/components/navigation/`)
- Responsive navbar with mobile hamburger menu
- Sticky header with smooth scrolling
- Navigation links to all sections

#### Footer (`shared/components/footer/`)
- Multi-column layout
- Social media links
- Quick links and contact info
- Dynamic copyright year

### Page Sections
Located in `src/app/home/sections/`:

#### Hero (`sections/hero/`)
- Main value proposition
- CTA buttons
- Achievement highlights card

#### Services (`sections/services/`)
- 3-column service cards grid
- Icons and descriptions
- Color-coded sections (AI, Cloud, POC)
- Service-specific CTAs

#### Mentorship (`sections/mentorship/`)
- Corporate upskilling program
- 1-on-1 mentorship track
- Group workshops
- Color-coded programs with benefits

#### Expertise (`sections/expertise/`)
- 4-column tech stack grid
- Cloud platforms, languages, DevOps, AI/Data
- Organized by expertise area

#### About (`sections/about/`)
- Bio and credentials
- Key achievements with icons
- Social links
- Educational background

#### Contact (`sections/contact/`)
- Validated form using ReactiveFormsModule
- Netlify Forms integration
- Error handling
- Loading states

### Services
Located in `src/app/shared/services/`:

#### ContactService (`shared/services/contact.service.ts`)
- Handles form submission logic
- Netlify Forms API integration
- Alternative backend support

### Models
Located in `src/app/shared/models/`:

#### ContactModel (`shared/models/contact.model.ts`)
- `ContactFormData` interface
- `ServiceType` union type
- `ServiceOption` interface

## File Structure

```
amancha_develops/
├── src/
│   ├── app/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── navigation/
│   │   │   │   │   ├── navigation.component.ts
│   │   │   │   │   └── navigation.component.html
│   │   │   │   └── footer/
│   │   │   │       ├── footer.component.ts
│   │   │   │       └── footer.component.html
│   │   │   ├── models/
│   │   │   │   └── contact.model.ts
│   │   │   └── services/
│   │   │       └── contact.service.ts
│   │   ├── home/
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── sections/
│   │   │       ├── hero/
│   │   │       ├── services/
│   │   │       ├── mentorship/
│   │   │       ├── expertise/
│   │   │       ├── about/
│   │   │       └── contact/
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── tailwind.config.cjs
├── package.json
├── DEPLOYMENT_GUIDE.md
├── NETLIFY_SETUP.md
└── README.md
```

## Key Features

### 1. **Responsive Design**
- Mobile-first approach
- Tailwind CSS breakpoints
- Hamburger menu on mobile
- Flexible grid layouts

### 2. **Form Handling**
- Reactive Forms validation
- Real-time error messages
- Netlify Forms integration
- Success/error message display

### 3. **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance

### 4. **Performance**
- Lazy loading sections (potential)
- Image optimization
- CSS purging with Tailwind
- Production build optimization

### 5. **SEO**
- Meta tags in index.html
- Semantic HTML structure
- Proper heading hierarchy
- Open Graph support (optional)

## Getting Started

### Installation
```bash
cd amancha_develops
npm install
```

### Development Server
```bash
npm start
# Navigate to http://localhost:4200/
```

### Production Build
```bash
npm run build:consulting
# Output: dist/amancha-develops/
```

### Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## Configuration

### Tailwind CSS
- Config: `tailwind.config.cjs`
- Built-in with Angular 19
- Customizable color palette

### Angular Config
- `angular.json`: Build and serve configuration
- `tsconfig.json`: TypeScript configuration
- `app.config.ts`: Application settings

## Styling

All components use **Tailwind CSS** utility classes:
- No separate CSS files needed (unless for animations)
- Consistent spacing and sizing
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Workflow

### Adding a New Section

1. Create component in `src/app/home/sections/new-section/`
2. Generate TypeScript component file
3. Create HTML template
4. Import in `home.component.ts`
5. Add to imports array
6. Use in `home.component.html`

### Updating Styles

- Modify Tailwind classes directly in templates
- No separate CSS files needed
- Run `npm run build` to purge unused styles

### Form Updates

- Update `contact.model.ts` for new fields
- Update form in `contact.component.ts`
- Add validation rules as needed
- Update HTML template with new inputs

## API Integration

For backend integration (optional):

1. Update `contact.service.ts`:
```typescript
submitContactForm(data: ContactFormData): Observable<any> {
  return this.http.post('/api/contact', data);
}
```

2. Configure API endpoint in `environment.ts`
3. Add HttpClientModule to imports

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
# Configure Cypress or Playwright
```

## Deployment Platforms

### Recommended: Netlify
- Free tier with form handling
- Automatic deployments from GitHub
- Built-in analytics

### Alternative: Vercel
- Fast Edge deployments
- Serverless functions
- Great Next.js integration

### Alternative: GitHub Pages
- Free hosting
- Use external form service (Formspree)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for full setup instructions.

## Performance Metrics

Target metrics:
- Lighthouse Score: 90+
- Core Web Vitals: Green
- Build Time: < 30s
- Bundle Size: < 200KB (gzipped)

## Future Enhancements

- [ ] Blog section
- [ ] Case studies/portfolio
- [ ] Client testimonials
- [ ] Pricing calculator
- [ ] Newsletter signup
- [ ] Live chat widget
- [ ] Analytics dashboard
- [ ] CRM integration

## Troubleshooting

### Components Not Rendering?
- Ensure all standalone components are imported
- Check imports in `home.component.ts`
- Verify component selectors match template

### Styles Not Applied?
- Ensure Tailwind is properly configured
- Check `tailwind.config.cjs` includes all template paths
- Rebuild: `npm run build`

### Form Not Submitting?
- Verify Netlify Forms setup (see NETLIFY_SETUP.md)
- Check browser console for errors
- Test with `netlify dev`

## Contact

For questions or support:
- Email: steve.amancha@gmail.com
- GitHub: @samancha
- LinkedIn: [Profile]

## License

© 2025 Amancha Consulting. All rights reserved.
