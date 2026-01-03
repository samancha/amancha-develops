// Universal environment file for both development and production
// IMPORTANT: This file uses placeholders that are replaced by environment variables
// - Local dev: Reads from .env file or uses placeholders
// - Netlify: Replaces with NG_APP_* environment variables during build

export const environment = {
  firebase: {
    // These will be replaced by process.env values set by Angular CLI
    // At build time, Angular replaces these with actual env vars
    apiKey: (process.env as any)['NG_APP_FIREBASE_API_KEY'] || 'PLACEHOLDER_API_KEY',
    projectId: (process.env as any)['NG_APP_FIREBASE_PROJECT_ID'] || 'PLACEHOLDER_PROJECT_ID',
    authDomain: (process.env as any)['NG_APP_FIREBASE_AUTH_DOMAIN'] || 'PLACEHOLDER_AUTH_DOMAIN',
    storageBucket: (process.env as any)['NG_APP_FIREBASE_STORAGE_BUCKET'] || 'PLACEHOLDER_STORAGE_BUCKET',
    messagingSenderId: (process.env as any)['NG_APP_FIREBASE_MESSAGING_SENDER_ID'] || 'PLACEHOLDER_SENDER_ID',
    appId: (process.env as any)['NG_APP_FIREBASE_APP_ID'] || 'PLACEHOLDER_APP_ID'
  }
};

