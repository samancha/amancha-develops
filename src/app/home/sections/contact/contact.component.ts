import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../shared/services/contact.service';
import { ContactFormData } from '../../../shared/models/contact.model';
import { bookingUrl, siteConfig, toTelHref } from '../../../shared/config/site.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm!: FormGroup;
  controls!: FormGroup['controls'];
  submitted = false;
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  readonly bookingUrl = bookingUrl;
  readonly phoneHref = toTelHref(siteConfig.publicPhoneNumber);
  readonly phoneLabel = siteConfig.publicPhoneNumber || 'Phone number coming soon';

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      company: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.controls = this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      this.message = 'Please fill in all required fields correctly.';
      this.messageType = 'error';
      this.focusFirstInvalidControl();
      return;
    }

    this.loading = true;
    const formData: ContactFormData = this.contactForm.value;

    this.contactService.submitContactForm(formData).subscribe({
      next: () => this.handleSuccess(),
      error: () => this.handleError()
    });
  }

  private handleSuccess(): void {
    this.loading = false;
    this.message = 'We received your details. I will be in touch soon.';
    this.messageType = 'success';
    this.contactForm.reset();
    this.submitted = false;

  }

  private handleError(): void {
    this.loading = false;
    this.message = 'Your details were not sent. Please try again, call, or text me instead.';
    this.messageType = 'error';
  }

  private focusFirstInvalidControl(): void {
    const invalidControl = this.elementRef.nativeElement.querySelector<HTMLElement>('.ng-invalid[formControlName]');
    invalidControl?.focus();
  }

}
