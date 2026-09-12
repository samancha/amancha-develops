import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormData } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  /**
   * Submit contact form via Netlify Forms
   * Netlify will automatically email the submission
   */
  submitContactForm(data: ContactFormData): Observable<unknown> {
    const body = new HttpParams({
      fromObject: {
        'form-name': 'time-audit-contact',
        name: data.name,
        phone: data.phone,
        company: data.company
      }
    }).toString();

    return this.http.post('/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    });
  }
}
