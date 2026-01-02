# Security & Roadmap

## Current Security Setup ✅

### Frontend (Client-Side)
- **Web API Key**: Public, safe to expose
- **Location**: Environment variables (`.env`, never in git)
- **Protection**: Firestore security rules validate all requests
- **Risk Level**: ✅ LOW - Credentials are frontend-safe

### Why Service Account Keys Are NOT Needed
Service account keys are for backend servers (Node.js, Python, etc.) and should NEVER be in client-side code:
- Would expose admin credentials to public
- Could allow unauthorized database modifications
- Major security vulnerability if committed to git

---

## Current Implementation

```
Frontend (Browser)
  ↓ (web API key + security rules)
Firebase Firestore
  ↓ (only allows form submissions to contact-submissions)
Data Storage
```

**Security Rules Protect:**
- Only form submissions go to `contact-submissions` collection
- Unauthenticated users can write (spam filtered by Netlify)
- Only authenticated users can read (future admin dashboard)

---

## Future Security Enhancements (Roadmap)

### Phase 2: Backend Form Processing (Month 2-3)
**Goal:** Move sensitive operations to secure backend
- Create Node.js/Express backend on Firebase Cloud Functions
- Move email sending logic to backend
- Add rate limiting per IP address
- Add reCAPTCHA verification

**Why:** Prevent spam bots from overwhelming your database

**Implementation:**
```
Frontend (web API key)
  ↓
Firebase Cloud Function (service account, hidden)
  ↓
Firestore (secure backend access)
  ↓
SendGrid/Mailgun (email service)
```

### Phase 3: Admin Dashboard (Month 3-4)
**Goal:** Secure interface to view submissions
- Firebase Authentication (login required)
- Role-based access (admin-only)
- Export submissions to CSV
- Mark submissions as "reviewed"

**Why:** Prevent unauthorized access to leads

**Implementation:**
```
Admin Portal (protected route)
  ↓ (Firebase Auth token)
Admin API (verify user is admin)
  ↓
Firestore (read only from admin collection)
```

### Phase 4: Workload Identity Federation (Month 4+)
**Goal:** Zero-key security for backend services
- Use Google Cloud Run for serverless backend
- Authenticate via GCP service identity (no keys)
- Eliminates key rotation/storage concerns

**Why:** Enterprise-grade security, no credential leaks possible

**Note:** Only needed if you deploy backend services. Current frontend setup doesn't need this.

---

## Threat Model & Mitigations

| Threat | Current Mitigation | Future (Phase 2) |
|--------|-------------------|------------------|
| API key exposed in git | ✅ .gitignore + .env | Same |
| Spam form submissions | ✅ Netlify spam filter | reCAPTCHA + rate limiting |
| Unauthorized data access | ✅ Firestore rules | User authentication |
| Database cost overages | ✅ Free tier quota | Cloud Function quota limits |
| Unauthorized email sending | ⚠️ Not protected | ✅ Backend verification |

---

## Security Checklist (Current)

- ✅ Web API key in environment variables
- ✅ .env file gitignored
- ✅ .env.example provided for developers
- ✅ Firestore security rules configured
- ✅ Netlify Forms spam filtering enabled
- ✅ Firebase uses HTTPS only
- ⏳ reCAPTCHA (Phase 2)
- ⏳ Rate limiting (Phase 2)
- ⏳ Admin authentication (Phase 3)
- ⏳ Workload Identity Federation (Phase 4)

---

## How to Add Credentials

### Local Development (.env)
```bash
# Copy .env.example to .env
cp .env.example .env

# Fill in your Web API Key values
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_PROJECT_ID=amancha-consulting-abc123
# ... etc (get from Firebase Console > Your apps > Web)
```

### Production (Netlify)
1. Netlify Dashboard → Site settings → Build & deploy → Environment
2. Add same 7 environment variables
3. Redeploy site

---

## Running Securely

**Development:**
```bash
npm start
# Uses .env credentials (local only)
# Never committed to git
```

**Production:**
```bash
npm run build:consulting
netlify deploy --prod --dir=dist/amancha-develops
# Uses Netlify environment variables
# Configured in Netlify dashboard (secure)
```

---

## Credential Rotation (Best Practice)

If credentials are ever compromised:

1. **Immediately:**
   - Delete the compromised web app in Firebase Console
   - Create new web app
   - Get new API key

2. **Update Everywhere:**
   - Update .env (local)
   - Update Netlify environment variables
   - Redeploy

3. **Monitor:**
   - Check Firestore usage spike
   - Review Firebase logs for suspicious activity

---

## Resources

- [Firebase Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Web API Documentation](https://firebase.google.com/docs/firestore/client/libraries)
- [Google Cloud Workload Identity](https://cloud.google.com/iam/docs/workload-identity-federation)
- [OWASP API Security](https://owasp.org/www-project-api-security/)

---

## Questions?

- **"Is my API key safe in the browser?"** → Yes, Firebase designed for this with security rules
- **"Can someone steal my data?"** → No, security rules prevent unauthorized reads
- **"Do I need service account keys?"** → No, not for frontend. Only for backend (Phase 2+)
- **"Should I use Workload Identity now?"** → No, it's for backend services (Phase 4)
