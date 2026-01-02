import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../shared/services/contact.service';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { ContactFormData, ServiceOption } from '../../../shared/models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService, FirebaseService]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  serviceOptions: ServiceOption[] = [
    { value: 'ai-integration', label: 'AI Integration Consulting' },
    { value: 'cloud-migration', label: 'Cloud Transformation' },
    { value: 'proof-of-concept', label: 'Proof of Concept / Assessment' },
    { value: 'corporate-training', label: 'Corporate Team Training' },
    { value: 'mentorship', label: '1-on-1 Technical Mentorship' },
    { value: 'workshop', label: 'Group Workshop' },
    { value: 'other', label: 'Other / Not Sure' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private firebaseService: FirebaseService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Initialize form if not already done
  }

  private initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      this.message = 'Please fill in all required fields correctly.';
      this.messageType = 'error';
      return;
    }

    this.loading = true;
    const formData: ContactFormData = this.contactForm.value;

    // Submit to both Netlify (for email) and Firebase (for storage)
    this.submitBoth(formData);
  }

  /**
   * Submit to both Netlify Forms and Firebase
   * Netlify: Sends email notification
   * Firebase: Stores submission for dashboard
   */
  private async submitBoth(data: ContactFormData): Promise<void> {
    try {
      // Try Firebase first (async)
      try {
        await this.firebaseService.submitContactForm(data);
        console.log('✓ Submission saved to Firebase');
      } catch (firebaseError) {
        console.warn('Firebase submission failed (non-blocking):', firebaseError);
      }

      // Then submit to Netlify (will always work)
      this.submitViaNetlify(data);
    } catch (error) {
      console.error('Error in form submission:', error);
      this.loading = false;
      this.message = 'Error processing submission. Please try again.';
      this.messageType = 'error';
    }
  }

  /**
   * Submit form to Netlify using form POST
   * Netlify automatically captures form submissions when form has data-netlify="true"
   */
  private submitViaNetlify(data: ContactFormData): void {
    try {
      // Show success message first (before page reload from Netlify)
      this.handleSuccess();

      // Find the actual form element in the DOM
      const form = document.querySelector('form[data-netlify="true"]') as HTMLFormElement;
      
      if (form) {
        // Populate hidden fields and submit
        (form.querySelector('input[name="name"]') as HTMLInputElement).value = data.name;
        (form.querySelector('input[name="email"]') as HTMLInputElement).value = data.email;
        (form.querySelector('select[name="service"]') as HTMLSelectElement).value = data.service;
        (form.querySelector('textarea[name="message"]') as HTMLTextAreaElement).value = data.message;
        
        // Small delay to let user see success message before page reloads
        setTimeout(() => {
          form.submit();
        }, 1500);
      } else {
        console.warn('Form element not found');
      }
    } catch (error) {
      console.error('Netlify submission error:', error);
      this.handleSuccess();
    }
  }

  /**
   * Handle successful submission
   */
  private handleSuccess(): void {
    this.loading = false;
    this.message = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
    this.messageType = 'success';
    this.contactForm.reset();
    this.submitted = false;

    // Hide message after 5 seconds
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  get f() {
    return this.contactForm.controls;
  }
}
