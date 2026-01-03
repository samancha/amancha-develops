# Netlify Environment Variables Setup

## For Production Build on Netlify

When you deploy to Netlify, you need to provide Firebase credentials as environment variables. Netlify will use these during the build to inject them into your app.

### Step 1: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Project Settings → Your apps → Web
4. Copy your config values

### Step 2: Add to Netlify Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. **Site settings** → **Build & deploy** → **Environment**
4. Click **Add environment variables**

### Step 3: Add Each Variable

Add these 6 variables with the `NG_APP_` prefix:

```
Variable Name: [PREFIX]_FIREBASE_API_KEY
Value: [Your Firebase API Key from Console]
Scopes: Builds
Deploy context: All
```

Repeat for all 6 firebase configuration variables:
- `[PREFIX]_FIREBASE_API_KEY`
- `[PREFIX]_FIREBASE_PROJECT_ID`
- `[PREFIX]_FIREBASE_AUTH_DOMAIN`
- `[PREFIX]_FIREBASE_STORAGE_BUCKET`
- `[PREFIX]_FIREBASE_MESSAGING_SENDER_ID`
- `[PREFIX]_FIREBASE_APP_ID`

(Replace `[PREFIX]` with `NG_APP`)

### Step 4: Redeploy

Once variables are added, Netlify will use them for the next build. Push to GitHub or manually trigger a redeploy.

### How It Works

When Netlify builds your app:
1. You set Firebase environment variables in the dashboard
2. Netlify injects them into the build environment
3. Angular CLI reads them from environment
4. They replace the `PLACEHOLDER_*` values in your app
5. Your Firebase credentials are securely embedded in the production build

---

## Local Development

For local development, your `.env` file has the real credentials. This file is:
- ✅ Gitignored (never committed)
- ✅ Used only for local testing
- ✅ Not deployed anywhere

When you run `npm start`, the app uses your local `.env` credentials.
