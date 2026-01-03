// Firebase Configuration
// Instructions for different environments:
//
// LOCAL DEVELOPMENT:
// 1. Create .env file in project root with your Firebase credentials
// 2. Credentials will be used from there
//
// NETLIFY PRODUCTION:
// 1. Set Firebase environment variables in Netlify dashboard (prefix with NG_APP_)
// 2. See NETLIFY_ENV_SETUP.md for detailed instructions
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


