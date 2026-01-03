import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormData } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Netlify form endpoint - configured at build time via environment variables
  private netlifyFormId = 'YOUR_NETLIFY_FORM_ID';
  private netlifyEndpoint = `${typeof window !== 'undefined' ? window.location.origin : ''}/.netlify/forms/contact`;

  constructor(private http: HttpClient) {}

  /**
   * Submit contact form via Netlify Forms
   * Netlify will automatically email the submission
   */
  submitContactForm(data: ContactFormData): Observable<any> {
    // For Netlify Forms, we can post directly to the form
    // Or use a serverless function endpoint
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('service', data.service);
    formData.append('message', data.message);
    formData.append('form-name', 'contact'); // Must match form name in HTML

    return this.http.post(this.netlifyEndpoint, formData);
  }

  /**
   * Alternative: Direct HTTP POST for form submission
   * Configure form endpoint in environment files
   */
  submitContactFormJSON(data: ContactFormData): Observable<any> {
    return this.http.post<any>('/api/contact', data);
  }
}
