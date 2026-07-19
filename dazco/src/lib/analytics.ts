export const CONSENT_STORAGE_KEY = "dazco_cookie_consent";

export type ConsentValue = "accepted" | "declined";

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(getGaMeasurementId());
}
