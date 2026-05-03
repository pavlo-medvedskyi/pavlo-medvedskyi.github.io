declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-H166RLL0TD';
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;

function loadScript(src: string, attrs: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  if (GA_MEASUREMENT_ID) {
    const gaScriptSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    const isConfiguredInHtml = Boolean(document.querySelector(`script[src="${gaScriptSrc}"]`));

    if (!isConfiguredInHtml) {
      loadScript(gaScriptSrc);
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
    }
  }

  if (PLAUSIBLE_DOMAIN) {
    loadScript('https://plausible.io/js/script.js', { 'data-domain': PLAUSIBLE_DOMAIN, defer: 'true' });
  }
}

export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  if (window.plausible) {
    const props = Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]));
    window.plausible(eventName, { props });
  }
}

const FUNNEL_STEP_ORDER: Record<string, number> = {
  resume_download_click: 1,
  contact_section_view: 2,
  contact_form_submit: 3,
};

export function trackFunnelStep(
  stepName: 'resume_download_click' | 'contact_section_view' | 'contact_form_submit',
  params: Record<string, string | number | boolean> = {}
) {
  trackEvent('funnel_step', {
    step_name: stepName,
    step_order: FUNNEL_STEP_ORDER[stepName],
    ...params,
  });
}
