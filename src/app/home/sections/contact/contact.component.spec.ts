import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('collects only name, phone, and company', () => {
    const fields: NodeListOf<HTMLInputElement> = fixture.nativeElement.querySelectorAll('input[formControlName]');
    expect(Array.from(fields).map((field) => field.getAttribute('formControlName')))
      .toEqual(['name', 'phone', 'company']);
  });

  it('shows inline validation after an empty submission', () => {
    fixture.componentInstance.onSubmit();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Name is required');
    expect(fixture.nativeElement.textContent).toContain('Phone is required');
    expect(fixture.nativeElement.textContent).toContain('Company is required');
  });

  it('confirms success only after Netlify accepts the request', () => {
    const component = fixture.componentInstance;
    component.contactForm.setValue({ name: 'Morgan Lee', phone: '602-555-0199', company: 'Desert HVAC' });

    component.onSubmit();
    const request = httpMock.expectOne('/');
    expect(request.request.body).toContain('form-name=time-audit-contact');
    expect(request.request.body).toContain('phone=602-555-0199');
    expect(component.loading).toBeTrue();

    request.flush({});

    expect(component.message).toContain('We received your details');
    expect(component.contactForm.value).toEqual({ name: null, phone: null, company: null });
  });

  it('preserves entered details after a Netlify failure', () => {
    const component = fixture.componentInstance;
    component.contactForm.setValue({ name: 'Morgan Lee', phone: '602-555-0199', company: 'Desert HVAC' });

    component.onSubmit();
    const request = httpMock.expectOne('/');
    request.flush('Submission failed', { status: 500, statusText: 'Server Error' });

    expect(component.message).toContain('not sent');
    expect(component.contactForm.value).toEqual({ name: 'Morgan Lee', phone: '602-555-0199', company: 'Desert HVAC' });
  });
});
