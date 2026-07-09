import { useEffect } from 'react';
import { initAnalytics, trackEvent, trackFunnelStep } from '../utils/analytics';

export function useEngagementAnalytics() {
  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const milestones = [30, 60, 120];
    const scrollMilestones = [25, 50, 75, 90];
    const sentMilestones = new Set<number>();
    const sentScrollMilestones = new Set<number>();
    const sectionIds = ['about', 'experience', 'projects', 'tools', 'skills', 'open-to-work', 'contact'];
    const trackedSections = new Set<string>();

    const intervalId = window.setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);

      milestones.forEach((milestone) => {
        if (elapsedSec >= milestone && !sentMilestones.has(milestone)) {
          sentMilestones.add(milestone);
          trackEvent('engagement_time', {
            seconds: milestone,
            engagement_time_msec: milestone * 1000,
          });
        }
      });
    }, 5000);

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const depth = Math.round((window.scrollY / scrollableHeight) * 100);
      scrollMilestones.forEach((milestone) => {
        if (depth >= milestone && !sentScrollMilestones.has(milestone)) {
          sentScrollMilestones.add(milestone);
          trackEvent('scroll_depth', { percent_scrolled: milestone });
        }
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;
          if (!sectionId || trackedSections.has(sectionId)) return;

          trackedSections.add(sectionId);
          trackEvent('section_view', { section_id: sectionId });

          if (sectionId === 'contact') {
            trackEvent('contact_section_view');
            trackFunnelStep('contact_section_view');
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) sectionObserver.observe(section);
    });

    if (window.scrollY > 0) {
      handleScroll();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') return;

      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      if (elapsedSec >= 5) {
        trackEvent('engagement_session_end', {
          seconds: elapsedSec,
          engagement_time_msec: elapsedSec * 1000,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
