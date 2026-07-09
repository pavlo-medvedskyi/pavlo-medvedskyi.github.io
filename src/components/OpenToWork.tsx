import { Briefcase, Building2, Clock3, MapPin, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/analytics';

export function OpenToWork() {
  const { t } = useLanguage();

  const items = [
    {
      icon: Briefcase,
      label: t('openToWork.role.label'),
      value: t('openToWork.role.value'),
    },
    {
      icon: Building2,
      label: t('openToWork.format.label'),
      value: t('openToWork.format.value'),
    },
    {
      icon: MapPin,
      label: t('openToWork.timezone.label'),
      value: t('openToWork.timezone.value'),
    },
    {
      icon: Clock3,
      label: t('openToWork.availability.label'),
      value: t('openToWork.availability.value'),
    },
  ];

  return (
    <section className="relative">
      <div className="relative z-10">
        <div className="section-kicker">Hiring details</div>
        <h2 className="section-title">{t('openToWork.title')}</h2>

        <div className="glass-panel p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {items.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="resume-chip rounded-lg p-4"
              >
                <div className="mb-2 flex items-center">
                  <Icon className="mr-2 h-5 w-5 text-cyan-300" />
                  <p className="text-sm text-slate-400">{label}</p>
                </div>
                <p className="text-base font-medium text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-slate-300">
              <span className="font-semibold text-cyan-300">{t('openToWork.interview.label')}:</span>{' '}
              {t('openToWork.interview.value')}
            </p>

            <a
              href="https://www.linkedin.com/in/pavlo-medvedskyi-74231913b/details/recommendations/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-cyan-300/60 hover:text-cyan-200"
              onClick={() => trackEvent('social_click', { network: 'linkedin_recommendations', location: 'open_to_work' })}
            >
              <Star className="w-4 h-4 mr-2" />
              {t('openToWork.recommendations.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
