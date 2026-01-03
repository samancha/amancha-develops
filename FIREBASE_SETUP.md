# Firebase Setup Guide for Amancha Consulting

## Overview
This guide will help you set up Firebase to store form submissions from your consulting website.

## Step 1: Create Firebase Project

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click "Get Started" or "Go to console"
3. Create a new project:
   - Project name: 
   - Accept the terms
   - Disable Google Analytics (for now)
   - Create project

## Step 2: Get Your Firebase Config

1. In Firebase Console, click the gear icon (settings) → Project settings
2. Scroll down to "Your apps" section
3. Click "Web" icon to add a web app
4. App nickname:
5. Check "Also set up Firebase Hosting"
6. Copy your Firebase config object

Your config will look like:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 3: Add Firebase Config to Your App

1. Open `src/app/shared/services/firebase.service.ts`

2. Find this section:
```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  projectId: 'YOUR_PROJECT_ID',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};
```

3. Replace with your actual config from Firebase Console

4. Alternative: Use environment variables for security
   - Create `.env` file with your config
   - Load in service from environment

## Step 4: Enable Firestore Database

1. Go to Firebase Console → Firestore Database
2. Click "Create database"
3. Select "Start in production mode"
4. Choose region closest to you (e.g., `us-east1` for US)
5. Create

## Step 5: Set Firestore Security Rules

1. In Firestore → Rules tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to contact-submissions
    // (Netlify forms have spam protection built-in)
    match /contact-submissions/{document=**} {
      allow read: if request.auth.uid != null;  // Only authenticated users can read
      allow write: if true;                        // Anyone can submit (frontend validates)
    }
  }
}
```

3. Click "Publish"

## Step 6: Add Firebase to index.html

Add Firebase SDK to your `src/index.html` before the `</head>` tag:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"></script>
```

## Step 7: Test Your Form

1. Run your app: `npm start`
2. Navigate to the contact form section
3. Fill out and submit the form
4. Check:
   - Email notification from Netlify (if deployed)
   - Firebase Console → Firestore → `contact-submissions` collection

## Step 8: View Submissions in Firebase Console

1. Open Firebase Console
2. Firestore Database → Collections
3. Click `contact-submissions` collection
4. See all submissions with:
   - Name, email, service, message
   - Submission timestamp
   - User agent info

## Step 9: Export Your Data (Anytime)

1. Firestore → contact-submissions → ⋮ (three dots) → Export
2. Choose CSV format
3. Download to analyze submissions

---

## Optional: Create Admin Dashboard

Later, you can create an admin page to view submissions:

```typescript
// Example: Get all submissions
this.firebaseService.getSubmissions().then(submissions => {
  console.log('Total submissions:', submissions.length);
  submissions.forEach(sub => {
    console.log(`${sub.name} (${sub.email}) - ${sub.submittedAt}`);
  });
});
```

---

## Cost Monitoring

**Free tier includes:**
- 50,000 reads/day
- 20,000 writes/day
- 1GB storage

**Your app usage (estimate):**
- 1000 submissions/month = ~50 writes/day
- Reading submissions = ~10 reads/day
- **Total: Well within free tier** ✅

Monitor your usage:
1. Firebase Console → Usage
2. Set budget alerts (optional)

---

## Troubleshooting

### Forms Not Appearing in Firestore

1. Check browser console (F12) for errors
2. Verify Firebase config is correct (no typos)
3. Check Firestore security rules (should allow writes)
4. Try submit again, watch console for "Submission saved to Firebase"

### "Firebase not loaded from CDN" Warning

This is OK - Firebase is optional. Netlify Forms will still capture submissions.

To fix:
1. Ensure Firebase CDN script is in index.html
2. Check CDN URL is accessible
3. May be blocked by ad blocker in development

### Can't See Submissions in Firestore

1. Check you're in the correct Firebase project
2. Check Firestore → Collections (might be empty if no submissions yet)
3. Try submitting test form
4. Refresh page

---

## Security Notes

✅ **What's secure:**
- Firestore rules allow submissions (frontend validated)
- Only authenticated users can read submissions

⚠️ **To improve security:**
- Add reCAPTCHA to form (prevent spam bots)
- Rate limit submissions per IP
- Sanitize inputs on backend

For now, Netlify Forms has built-in spam filtering, so you're covered!

---

## Next Steps

1. Create Firebase project ✅
2. Get your config ✅
3. Add to firebase.service.ts ✅
4. Deploy to Netlify ✅
5. Test form submission ✅
6. Monitor in Firebase Console ✅

Once live, you'll see:
- Real-time submissions in Firebase
- Email alerts from Netlify
- Complete audit trail of all inquiries

**You're ready to capture leads!** 🚀
