import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ContactFormData } from '../models/contact.model';

// Firebase configuration - these will be provided at runtime
declare const firebase: any;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db: any = null;
  private isInitialized = false;

  constructor() {
    this.initializeFirebase();
  }

  /**
   * Initialize Firebase if not already done
   * You'll add your Firebase config here after creating a project
   */
  private async initializeFirebase(): Promise<void> {
    try {
      // Check if Firebase is already available from CDN
      if (typeof (window as any).firebase === 'undefined') {
        console.warn('Firebase not loaded from CDN. Using fallback.');
        return;
      }

      // Initialize Firebase with config from environment variables
      // For development: Add to .env file (see .env.example)
      // For production: Add to Netlify environment variables
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
      };

      if (!this.isInitialized && firebaseConfig.apiKey) {
        const app = (window as any).firebase.initializeApp(firebaseConfig);
        this.db = (window as any).firebase.firestore();
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('Firebase initialization error (will use Netlify Forms only):', error);
    }
  }

  /**
   * Submit contact form to Firebase Firestore
   * Stores submission with timestamp and metadata
   */
  async submitContactForm(data: ContactFormData): Promise<string> {
    if (!this.db || !this.isInitialized) {
      throw new Error('Firebase not initialized. Will fallback to Netlify Forms.');
    }

    try {
      const docRef = await this.db.collection('contact-submissions').add({
        name: data.name,
        email: data.email,
        service: data.service,
        message: data.message,
        submittedAt: (window as any).firebase.firestore.Timestamp.now(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });

      console.log('Submission saved to Firebase with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error submitting to Firebase:', error);
      throw error;
    }
  }

  /**
   * Get all submissions (for admin dashboard later)
   */
  async getSubmissions(): Promise<any[]> {
    if (!this.db || !this.isInitialized) {
      throw new Error('Firebase not initialized');
    }

    try {
      const snapshot = await this.db.collection('contact-submissions').orderBy('submittedAt', 'desc').get();
      return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
  }
}
