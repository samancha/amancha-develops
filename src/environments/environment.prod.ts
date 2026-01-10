// Production environment - credentials loaded from Netlify environment variables
// Netlify injects these as process.env at build time
export const environment = {
  firebase: {
    apiKey: process.env['NG_APP_FIREBASE_API_KEY'] || '',
    projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'] || '',
    authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'] || '',
    storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'] || '',
    messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'] || '',
    appId: process.env['NG_APP_FIREBASE_APP_ID'] || ''
  }
};
