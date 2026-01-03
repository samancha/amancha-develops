// Firebase Configuration
// Instructions for different environments:
//
// LOCAL DEVELOPMENT:
// 1. Create .env file in project root with your Firebase credentials
// 2. Credentials will be used from there
//
// NETLIFY PRODUCTION:
// 1. Set these environment variables in Netlify dashboard:
//    NG_APP_FIREBASE_API_KEY
//    NG_APP_FIREBASE_PROJECT_ID
//    NG_APP_FIREBASE_AUTH_DOMAIN
//    NG_APP_FIREBASE_STORAGE_BUCKET
//    NG_APP_FIREBASE_MESSAGING_SENDER_ID
//    NG_APP_FIREBASE_APP_ID
//
// PLACEHOLDER VALUES - Replace these with your actual Firebase config for local development

export const environment = {
  firebase: {
    apiKey: 'PLACEHOLDER_API_KEY',
    projectId: 'PLACEHOLDER_PROJECT_ID',
    authDomain: 'PLACEHOLDER_AUTH_DOMAIN',
    storageBucket: 'PLACEHOLDER_STORAGE_BUCKET',
    messagingSenderId: 'PLACEHOLDER_SENDER_ID',
    appId: 'PLACEHOLDER_APP_ID'
  }
};


