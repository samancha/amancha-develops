#!/usr/bin/env node
/**
 * Generate environment.ts from environment variables at build time
 * This ensures credentials are never committed to git
 */

const fs = require('fs');
const path = require('path');

const environmentContent = `// AUTO-GENERATED FILE - Do not edit manually
// Generated from environment variables at build time

export const environment = {
  firebase: {
    apiKey: '${process.env.NG_APP_FIREBASE_API_KEY || 'PLACEHOLDER_API_KEY'}',
    projectId: '${process.env.NG_APP_FIREBASE_PROJECT_ID || 'PLACEHOLDER_PROJECT_ID'}',
    authDomain: '${process.env.NG_APP_FIREBASE_AUTH_DOMAIN || 'PLACEHOLDER_AUTH_DOMAIN'}',
    storageBucket: '${process.env.NG_APP_FIREBASE_STORAGE_BUCKET || 'PLACEHOLDER_STORAGE_BUCKET'}',
    messagingSenderId: '${process.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID || 'PLACEHOLDER_SENDER_ID'}',
    appId: '${process.env.NG_APP_FIREBASE_APP_ID || 'PLACEHOLDER_APP_ID'}'
  }
};
`;

// Use process.cwd() to get the project root, not __dirname (which is scripts folder)
const projectRoot = process.cwd();
const environmentPath = path.join(projectRoot, 'src/environments/environment.ts');

try {
  fs.writeFileSync(environmentPath, environmentContent);
  console.log('✅ Generated src/environments/environment.ts from environment variables');
  
  // Warn if using placeholders (local dev without .env)
  if (environmentContent.includes('PLACEHOLDER')) {
    console.warn('⚠️  WARNING: Using placeholder values. Set environment variables or .env file for real credentials.');
  }
} catch (error) {
  console.error('❌ Error generating environment.ts:', error);
  process.exit(1);
}

