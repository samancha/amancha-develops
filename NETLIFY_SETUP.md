# Netlify Configuration for Amancha Consulting

This configuration file helps deploy your Angular app to Netlify with form handling.

## Setup Steps

1. **Connect Repository**
   - Go to netlify.com and connect your GitHub repository
   - Link to the AmanchaDevelOps project

2. **Build Settings**
   - Build command: `npm run build:consulting`
   - Publish directory: `dist/amancha-develops`

3. **Form Handling**
   - Netlify automatically detects forms with `data-netlify="true"`
   - Forms will be submitted to Netlify's backend
   - You'll receive email notifications for each submission

4. **Environment Variables** (if needed)
   - Add any API keys or secrets in Netlify Dashboard → Site settings → Build & deploy → Environment

## Alternative Deployment Options

### Option A: Netlify + GitHub Pages Hybrid
- Deploy static build to GitHub Pages
- Use Netlify Functions for form processing only
- Netlify's free tier includes form submissions

### Option B: Vercel
- Similar to Netlify but different pricing model
- Also supports form submission via Vercel Functions
- Might be better for serverless backend needs

### Option C: GitHub Pages + Formspree
- Deploy Angular build to GitHub Pages
- Use Formspree (formspree.io) for form handling
- Easy setup, free tier available

## Implementation in Contact Component

For **Netlify Forms** (Recommended):
- Add `data-netlify="true"` to the form element
- Include a hidden `form-name` input
- Netlify automatically captures POST submissions

```html
<form data-netlify="true" name="contact">
  <!-- form fields -->
</form>
```

For **Formspree**:
- Set form action to: `https://formspree.io/f/YOUR_FORM_ID`
- Get YOUR_FORM_ID from formspree.io

For **Custom API**:
- Create backend endpoint (Node.js, Python, etc.)
- Update ContactService to POST to your endpoint

## Testing Forms Locally

For local development with Netlify Forms:
1. Build: `npm run build`
2. Install netlify-cli: `npm install -g netlify-cli`
3. Run: `netlify dev`
4. Visit http://localhost:8888
5. Forms will submit to Netlify preview deployment
