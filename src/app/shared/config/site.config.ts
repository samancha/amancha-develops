/**
 * Public launch settings. Replace the remaining placeholder before publishing
 * the consulting site; keeping them here prevents CTAs from drifting apart.
 */
export const siteConfig = {
  bookingUrl: '',
  publicPhoneNumber: '630-744-9852'
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
