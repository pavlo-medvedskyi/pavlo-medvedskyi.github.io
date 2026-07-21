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
    const sectionIds = ['header', 'about', 'experience', 'projects', 'tools', 'skills', 'open-to-work', 'contact'];
    window.__trackedSectionViews = window.__trackedSectionViews || new Set<string>();
    const trackedSections = window.__trackedSectionViews;

    const trackSectionView = (sectionId: string) => {
      if (!sectionId || trackedSections.has(sectionId)) return;

      trackedSections.add(sectionId);
      trackEvent('section_view', {
        section_id: sectionId,
        section_name: sectionId.replace(/-/g, '_'),
      });

      if (sectionId === 'contact') {
        trackEvent('contact_section_view');
        trackFunnelStep('contact_section_view');
      }
    };

    const trackVisibleSections = () => {
      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section || trackedSections.has(sectionId)) return;

        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const minVisibleHeight = Math.min(rect.height * 0.2, 160);

        if (visibleHeight >= minVisibleHeight) {
          trackSectionView(sectionId);
        }
      });
    };

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
          trackSectionView(sectionId);
        });
      },
      { rootMargin: '-18% 0px -35% 0px', threshold: [0.05, 0.2, 0.35] }
    );

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) sectionObserver.observe(section);
    });

    window.setTimeout(trackVisibleSections, 600);
    window.setTimeout(trackVisibleSections, 1500);

    handleScroll();

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
    window.addEventListener('scroll', trackVisibleSections, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', trackVisibleSections);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
