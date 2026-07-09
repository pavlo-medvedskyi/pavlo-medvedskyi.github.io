import { useLanguage } from '../context/LanguageContext';

export function Skills() {
  const { t } = useLanguage();

  const skills = {
    [t('skills.testing.types')]: [
      'Functional Testing',
      'Regression Testing',
      'Smoke Testing',
      'Exploratory Testing',
      'Web Testing',
      'Mobile Testing',
    ],
    'Technical QA': [
      'API Validation',
      'Database Validation',
      'Log Analysis',
      'Cross-platform Testing',
      'Integration Testing',
      'Requirements Analysis',
    ],
    'QA Process & Collaboration': [
      'Test Strategy',
      'Test Case Design',
      'Defect Reporting',
      'Regression Planning',
      'Mentoring',
      'Stakeholder Communication',
    ],
  };

  return (
    <section className="relative">
      <div className="relative z-10">
        <div className="section-kicker">{t('skills.kicker')}</div>
        <h2 className="section-title">{t('skills.title')}</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(skills).map(([category, categorySkills]) => (
            <div
              key={category}
              className="glass-panel p-5"
            >
              <h3 className="mb-5 text-lg font-semibold text-white">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      index < 2
                        ? 'border-amber-200/35 bg-amber-200/10 text-amber-100'
                        : 'border-slate-700 bg-slate-900/70 text-slate-300'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
