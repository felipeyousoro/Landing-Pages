"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_STORAGE_KEY,
  type ConsentValue,
  getGaMeasurementId,
  isAnalyticsConfigured,
} from "@/lib/analytics";

function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function Analytics() {
  const measurementId = getGaMeasurementId();
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(readConsent());

    function onConsentChange(event: Event) {
      const detail = (event as CustomEvent<ConsentValue>).detail;
      if (detail === "accepted" || detail === "declined") {
        setConsent(detail);
      }
    }

    window.addEventListener("dazco:cookie-consent", onConsentChange);
    return () => {
      window.removeEventListener("dazco:cookie-consent", onConsentChange);
    };
  }, []);

  if (!measurementId || consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;
    if (readConsent() === null) {
      setVisible(true);
    }
  }, []);

  function saveConsent(value: ConsentValue) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    window.dispatchEvent(
      new CustomEvent<ConsentValue>("dazco:cookie-consent", { detail: value }),
    );
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-neutral/10 bg-white p-4 shadow-[0_-8px_30px_rgba(60,60,60,0.12)] sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p
            id="cookie-consent-title"
            className="text-sm font-semibold text-neutral"
          >
            Cookie preferences
          </p>
          <p
            id="cookie-consent-desc"
            className="mt-1 text-sm leading-6 text-neutral-soft"
          >
            We use analytics cookies to understand how visitors use this site.
            You can accept or decline — essential site functionality is
            unaffected either way.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => saveConsent("declined")}
            className="rounded-full border border-neutral/20 px-4 py-2 text-sm font-semibold text-neutral transition-colors hover:border-neutral/40"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
