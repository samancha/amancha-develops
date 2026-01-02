import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ContactFormData } from '../models/contact.model';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

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
   * Uses npm-installed Firebase module with Angular environment file
   */
  private initializeFirebase(): void {
    try {
      console.log('🔍 Firebase: Loading config from environment...');
      
      const firebaseConfig = environment.firebase;

      console.log('🔧 Firebase Config loaded:', {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        hasApiKey: !!firebaseConfig.apiKey
      });

      if (!this.isInitialized && firebaseConfig.apiKey) {
        console.log('📱 Firebase: Initializing app...');
        const app = initializeApp(firebaseConfig);
        console.log('✅ Firebase App initialized');
        
        console.log('🗄️ Firebase: Getting Firestore instance...');
        this.db = getFirestore(app);
        console.log('✅ Firestore initialized successfully');
        
        this.isInitialized = true;
        console.log('✅ Firebase service ready');
      } else {
        console.warn('⚠️ Firebase: Already initialized or missing API key');
      }
    } catch (error) {
      console.error('❌ Firebase initialization error:', error);
      console.error('Error details:', {
        message: (error as any).message,
        code: (error as any).code
      });
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
      const docRef = await addDoc(collection(this.db, 'contact-submissions'), {
        name: data.name,
        email: data.email,
        service: data.service,
        message: data.message,
        submittedAt: Timestamp.now(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });

      console.log('✓ Submission saved to Firebase with ID:', docRef.id);
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
      const q = query(collection(this.db, 'contact-submissions'), orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);
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
