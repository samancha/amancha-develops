/**
 * Public launch settings. Replace both placeholders before publishing the
 * Time Audit campaign; keeping them here prevents CTAs from drifting apart.
 */
export const siteConfig = {
  bookingUrl: '',
  publicPhoneNumber: ''
} as const;

export function isValidBookingUrl(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

export function toTelHref(phoneNumber: string): string | null {
  const normalized = phoneNumber.replace(/[^\d+]/g, '');
  return normalized ? `tel:${normalized}` : null;
}

export const bookingUrl = isValidBookingUrl(siteConfig.bookingUrl) ? siteConfig.bookingUrl : null;
