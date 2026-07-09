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

  const highlights = t('hero.highlights.list').split(', ');
  const proofPoints = [
    { icon: Briefcase, value: t('hero.proof.years.value'), label: t('hero.proof.years.label') },
    { icon: ShieldCheck, value: t('hero.proof.platforms.value'), label: t('hero.proof.platforms.label') },
    { icon: Award, value: t('hero.proof.systems.value'), label: t('hero.proof.systems.label') },
  ];

  return (
    <section className="relative overflow-hidden pb-8 pt-8 md:pb-10 md:pt-12">
      <div className="glass-panel relative z-10 p-5 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex max-w-full items-center rounded-lg border border-slate-700/80 bg-slate-950/35 px-3 py-2 text-sm font-medium text-slate-300">
              <MapPin className="mr-2 h-4 w-4 text-amber-200" />
              {t('hero.location')}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Pavlo Medvedskyi
            </h1>
            <h2 className="mt-3 text-xl font-semibold text-cyan-100 md:text-2xl">
              {t('hero.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              {t('hero.description')}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="resume-chip inline-flex items-center rounded-md px-2.5 py-1.5 text-sm text-slate-200 transition-colors hover:border-amber-200/35 hover:bg-amber-200/10 hover:text-amber-100"
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
                className="inline-flex items-center justify-center rounded-lg border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-sm font-semibold text-amber-100 hover:border-amber-200/60 hover:bg-amber-200/15 hover:text-amber-50"
              >
                {t('nav.resume')}
                <Download className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#experience"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-950/20 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-amber-200/45 hover:bg-amber-200/10 hover:text-amber-100"
              >
                {t('hero.experienceCta')}
              </a>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="overflow-hidden rounded-lg border border-slate-700/80 bg-slate-950/35">
              <div className="relative h-72 w-full overflow-hidden border-b border-slate-800">
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

              <div className="grid gap-0 divide-y divide-slate-800">
                {proofPoints.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-amber-200/10">
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-amber-200/20 bg-amber-200/10">
                      <Icon className="h-4 w-4 text-amber-200" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{value}</div>
                      <div className="text-xs leading-4 text-slate-400">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
