import { isValidBookingUrl, toTelHref } from './site.config';

describe('site launch configuration', () => {
  it('accepts only HTTPS booking URLs', () => {
    expect(isValidBookingUrl('https://calendly.com/amancha/time-audit')).toBeTrue();
    expect(isValidBookingUrl('http://calendly.com/amancha/time-audit')).toBeFalse();
    expect(isValidBookingUrl('not-a-url')).toBeFalse();
  });

  it('normalizes a public phone number into a tel link', () => {
    expect(toTelHref('(630) 744-9852')).toBe('tel:6307449852');
    expect(toTelHref('')).toBeNull();
  });
});
