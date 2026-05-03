import { useEffect } from 'react';
import { initAnalytics, trackEvent, trackFunnelStep } from '../utils/analytics';

export function useEngagementAnalytics() {
  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const milestones = [30, 60, 120];
    const sentMilestones = new Set<number>();
    const sessionKey = 'analytics_contact_seen';

    const intervalId = window.setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);

      milestones.forEach((milestone) => {
        if (elapsedSec >= milestone && !sentMilestones.has(milestone)) {
          sentMilestones.add(milestone);
          trackEvent('engagement_time', { seconds: milestone, page: 'resume' });
        }
      });
    }, 5000);

    const contactSection = document.getElementById('contact');
    let contactObserver: IntersectionObserver | null = null;

    if (contactSection) {
      contactObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const wasTracked = sessionStorage.getItem(sessionKey) === '1';
            if (!wasTracked) {
              sessionStorage.setItem(sessionKey, '1');
              trackEvent('contact_section_view', { page: 'resume' });
              trackFunnelStep('contact_section_view', { page: 'resume' });
            }

            contactObserver?.disconnect();
          });
        },
        { threshold: 0.35 }
      );
      contactObserver.observe(contactSection);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') return;

      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      if (elapsedSec >= 5) {
        trackEvent('engagement_session_end', { seconds: elapsedSec, page: 'resume' });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      contactObserver?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
