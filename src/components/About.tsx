import { Award, BookOpen, Coffee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { t } = useLanguage();
  const qaKeywords = t('about.keywords.list')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const stats = [
    { icon: Coffee, label: t('about.stats.projects'), value: '8' },
    { icon: BookOpen, label: t('about.stats.experience'), value: '8+' },
    { icon: Award, label: t('about.stats.awards'), value: '5' },
  ];

  return (
    <section className="relative">
      <div className="relative z-10">
        <div className="section-kicker">{t('about.kicker')}</div>
        <h2 className="section-title">{t('about.title')}</h2>

        <div className="glass-panel p-6 md:p-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_320px] lg:items-start">
            <div>
              <p className="max-w-3xl text-base leading-8 text-slate-300">
                {t('about.description')}
              </p>

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-400">{t('about.keywords.title')}</p>
                <div className="flex flex-wrap gap-2">
                  {qaKeywords.map((keyword) => (
                    <span
                      key={keyword}
                    className="resume-chip rounded-md px-2.5 py-1 text-xs text-slate-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-700/70 bg-slate-950/35 p-3 sm:p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="resume-chip flex min-h-20 items-center gap-3 rounded-lg p-3 transition-colors hover:bg-amber-200/10 sm:min-h-24 lg:min-h-0"
                  >
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-amber-200/20 bg-amber-200/10">
                      <Icon className="h-4 w-4 text-amber-200" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-semibold leading-none text-white">
                        {value}
                      </div>
                      <div className="mt-1 text-sm leading-5 text-slate-400 sm:text-xs sm:leading-4">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
