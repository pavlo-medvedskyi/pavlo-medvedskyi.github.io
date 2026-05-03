import { lazy, Suspense, useState } from 'react';
import type { MouseEvent } from 'react';
import { Header } from './components/Header';
import { GoToTop } from './components/GoToTop';
import { Navigation, type NavSection } from './components/Navigation';
import { Footer } from './components/Footer';
import { useLanguage } from './context/LanguageContext';
import { useDocumentLanguage } from './hooks/useDocumentLanguage';
import { useEngagementAnalytics } from './hooks/useEngagementAnalytics';
import { useRevealAnimation } from './hooks/useRevealAnimation';
import { trackEvent, trackFunnelStep } from './utils/analytics';

const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const Experience = lazy(() => import('./components/Experience').then((m) => ({ default: m.Experience })));
const Tools = lazy(() => import('./components/Tools').then((m) => ({ default: m.Tools })));
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));
const OpenToWork = lazy(() => import('./components/OpenToWork').then((m) => ({ default: m.OpenToWork })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t } = useLanguage();

  useDocumentLanguage(language);
  useEngagementAnalytics();
  useRevealAnimation();

  const sections: NavSection[] = [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'tools', label: t('nav.tools') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'open-to-work', label: t('nav.openToWork') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const openResume = (event: MouseEvent) => {
    event.preventDefault();
    trackEvent('resume_download_click', { source: 'navigation' });
    trackFunnelStep('resume_download_click', { source: 'navigation' });

    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}Medvedskiy_Pavlo_Resume.pdf`;
    link.download = 'Medvedskiy_Pavlo_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-[#E8ECF5] overflow-x-hidden">
      <Navigation
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((isOpen) => !isOpen)}
        onCloseMenu={() => setIsMenuOpen(false)}
        onOpenResume={openResume}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sections={sections}
        resumeLabel={t('nav.resume')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-24">
        <section id="header" className="reveal"><Header /></section>
        <section id="about" className="reveal"><Suspense fallback={null}><About /></Suspense></section>
        <section id="experience" className="reveal"><Suspense fallback={null}><Experience /></Suspense></section>
        <section id="projects" className="reveal"><Suspense fallback={null}><Projects /></Suspense></section>
        <section id="tools" className="reveal"><Suspense fallback={null}><Tools /></Suspense></section>
        <section id="skills" className="reveal"><Suspense fallback={null}><Skills /></Suspense></section>
        <section id="open-to-work" className="reveal"><Suspense fallback={null}><OpenToWork /></Suspense></section>
        <section id="contact" className="reveal"><Suspense fallback={null}><Contact /></Suspense></section>
      </main>

      <Footer />
      <GoToTop />
    </div>
  );
}

export default App;
