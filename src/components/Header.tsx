import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Download,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/analytics';

export function Header() {
  const { t } = useLanguage();

  const highlights = [
    'API Testing',
    'SQL & Databases',
    'Desktop & Web',
    'Electron & Linux',
    'Real-time Systems',
    'TCP/UDP & Logs',
  ];
  const proofPoints = [
    { icon: Briefcase, value: '8+ Years', label: 'Commercial QA Experience' },
    { icon: ShieldCheck, value: 'Desktop • Web • API', label: 'Cross-platform Testing' },
    { icon: Award, value: 'Electron • Linux • Docker', label: 'Real-time Systems' },
  ];

  return (
    <section className="relative overflow-hidden pb-8 pt-12 md:pb-12 md:pt-16">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
        <div className="max-w-3xl">
          <div className="resume-chip mb-4 inline-flex max-w-full items-center rounded-full px-3 py-1 text-sm font-semibold text-cyan-100">
            <MapPin className="mr-2 h-4 w-4" />
            Senior Manual QA Engineer - Kharkiv, Ukraine - Europe/Kyiv
          </div>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Pavlo Medvedskyi
          </h1>
          <h2 className="mt-4 text-xl font-semibold text-cyan-100 md:text-2xl">
            {t('hero.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            {t('hero.description')}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="resume-chip inline-flex items-center rounded-lg px-3 py-2 text-sm text-slate-100"
              >
                <CheckCircle2 className="mr-2 h-4 w-4 text-amber-200" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
              onClick={() => trackEvent('cta_click', { cta: 'get_in_touch', location: 'hero' })}
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}Medvedskiy_Pavlo_Resume.pdf`}
              download="Medvedskiy_Pavlo_Resume.pdf"
              onClick={() => trackEvent('resume_download_click', { source: 'hero' })}
              className="inline-flex items-center justify-center rounded-lg border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-sm font-semibold text-amber-100 hover:border-amber-200/60 hover:text-amber-50"
            >
              {t('nav.resume')}
              <Download className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-cyan-300/60 hover:text-cyan-200"
            >
              View experience
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="glass-panel p-4">
            <div className="relative mx-auto h-64 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
              <img
                src={`${import.meta.env.BASE_URL}images/pavlo-profile-new.jpg`}
                alt="Pavlo Medvedskyi"
                className="h-full w-full object-cover object-[center_30%]"
                loading="eager"
                decoding="async"
                width={320}
                height={320}
              />
            </div>

            <div className="mt-4 grid gap-3">
              {proofPoints.map(({ icon: Icon, value, label }) => (
                <div key={label} className="resume-chip flex items-center gap-3 rounded-lg px-3 py-3">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-cyan-300/10">
                    <Icon className="h-4 w-4 text-cyan-200" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{value}</div>
                    <div className="text-xs leading-4 text-slate-400">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
