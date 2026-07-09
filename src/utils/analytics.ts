declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-H166RLL0TD';
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
const PAGE_TYPE = 'resume';
let isAnalyticsInitialized = false;

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
  if (isAnalyticsInitialized) return;
  isAnalyticsInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  if (GA_MEASUREMENT_ID) {
    const gaScriptSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    const isScriptLoaded = Boolean(document.querySelector(`script[src="${gaScriptSrc}"]`));

    if (!isScriptLoaded) {
      loadScript(gaScriptSrc);
    }

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`,
      send_page_view: true,
      transport_type: 'beacon',
    });
  }

  if (PLAUSIBLE_DOMAIN) {
    loadScript('https://plausible.io/js/script.js', { 'data-domain': PLAUSIBLE_DOMAIN, defer: 'true' });
  }
}

export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;

  const eventParams = {
    page_type: PAGE_TYPE,
    page_path: `${window.location.pathname}${window.location.search}`,
    language: document.documentElement.lang || 'en',
    transport_type: 'beacon',
    ...params,
  };

  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  if (window.plausible) {
    const props = Object.fromEntries(Object.entries(eventParams).map(([k, v]) => [k, String(v)]));
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

export function trackResumeDownload(source: string) {
  if (typeof window === 'undefined') return;

  trackEvent('resume_download_click', { source });
  trackEvent('file_download', {
    source,
    file_name: 'Medvedskiy_Pavlo_Resume.pdf',
    file_extension: 'pdf',
    link_url: `${window.location.origin}${import.meta.env.BASE_URL}Medvedskiy_Pavlo_Resume.pdf`,
  });
  trackFunnelStep('resume_download_click', { source });
}
