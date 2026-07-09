import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const currentRoleLabel = language === 'ua' ? 'Поточна роль' : 'Current role';
  const responsibilitiesLabel = language === 'ua' ? 'Обов’язки:' : 'Responsibilities:';
  const sectionKicker = language === 'ua' ? 'Підтверджений досвід' : 'Career evidence';

  const experiences = [
    {
      id: 'cody-solutions',
      company: 'Cody Solutions',
      link: 'https://codysolutions.com/',
      companyKey: 'experience.company.cody.desc',
      position: {
        en: 'Senior Quality Assurance Engineer',
        ua: 'Старший інженер із забезпечення якості',
      },
      period: {
        en: '2024 - Present',
        ua: '2024 - зараз',
      },
      shortDescription:
        'Enterprise-level platform with integrated backend, API, and desktop applications for multiple operating systems. Focused on quality assurance across data flow, system logic, and cross-platform stability.',
      logo:
        `${import.meta.env.BASE_URL}images/codyua.jpg`,
      responsibilities: {
        en: [
          'Performed manual and automated API testing using Java and RestAssured',
          'Designed and executed test cases for backend, database, and API validation',
          'Tested desktop applications across Windows, macOS, and Linux environments',
          'Performed mobile and responsive testing across Android and iOS devices',
          'Collaborated with developers and product managers to refine requirements and ensure feature completeness',
          'Conducted exploratory, regression, and usability testing across web and desktop layers',
          'Interviewed and mentored QA candidates, participated in team onboarding and knowledge sharing',
          'Maintained test documentation, reporting, and continuous improvement processes in Agile workflow',
        ],
        ua: [
          'Виконую ручне та автоматизоване API testing з використанням Java і RestAssured',
          'Проєктую та виконую test cases для перевірки backend, баз даних і API',
          'Тестую desktop-застосунки в середовищах Windows, macOS і Linux',
          'Виконую mobile та responsive testing на Android і iOS пристроях',
          'Співпрацюю з розробниками та product managers для уточнення вимог і перевірки повноти функціональності',
          'Проводжу exploratory, regression та usability testing для web і desktop частин продукту',
          'Проводжу інтерв’ю та менторинг QA кандидатів, беру участь в onboarding і knowledge sharing',
          'Підтримую тестову документацію, звітність і процеси постійного покращення в Agile workflow',
        ],
      },
    },
    {
      id: '1648-factory',
      company: '1648 Factory',
      link: 'https://www.1648factory.com/',
      companyKey: 'experience.company.1648.desc',
      position: {
        en: 'Senior Quality Assurance Engineer',
        ua: 'Старший інженер із забезпечення якості',
      },
      period: {
        en: '2024 - 2024',
        ua: '2024 - 2024',
      },
      logo:
        `${import.meta.env.BASE_URL}images/1648factory_logo.jpg`,
      responsibilities: {
        en: [
          'Performed manual and API testing across multiple environments',
          'Created and executed automated Postman collections and runners',
          'Validated MetaMask integration and crypto transaction flows',
          'Conducted database validation (PostgreSQL)',
          'Performed regression and smoke testing for web builds',
          'Maintained detailed QA documentation and test cases',
          'Collaborated with developers and product owners to refine requirements',
          'Actively participated in Scrum ceremonies',
        ],
        ua: [
          'Виконував manual та API testing у кількох середовищах',
          'Створював і запускав automated Postman collections та runners',
          'Перевіряв інтеграцію MetaMask і crypto transaction flows',
          'Проводив валідацію бази даних PostgreSQL',
          'Виконував regression та smoke testing для web builds',
          'Підтримував детальну QA документацію та test cases',
          'Співпрацював із розробниками та product owners для уточнення вимог',
          'Активно брав участь у Scrum ceremonies',
        ],
      },
    },
    {
      id: 'railsware',
      company: 'Railsware',
      link: 'https://railsware.com/',
      companyKey: 'experience.company.railsware.desc',
      position: {
        en: 'Senior Quality Assurance Engineer',
        ua: 'Старший інженер із забезпечення якості',
      },
      period: {
        en: '2022 - 2023',
        ua: '2022 - 2023',
      },
      logo:
        `${import.meta.env.BASE_URL}images/railsware.jpg`,
      responsibilities: {
        en: [
          'Performed manual API and database testing',
          'Validated data synchronization and ETL pipeline accuracy',
          'Tested integrations with external APIs (Ads, CRMs, eCommerce platforms)',
          'Executed regression and smoke testing for weekly releases',
          'Verified UI/UX for responsive and mobile layouts',
          'Analyzed logs in Google Cloud Console and Sentry',
          'Maintained test plans, test cases, and QA documentation',
          'Provided product support and collaborated with cross-functional teams',
        ],
        ua: [
          'Виконував manual API testing і тестування баз даних',
          'Перевіряв синхронізацію даних і точність ETL pipelines',
          'Тестував інтеграції із зовнішніми API: Ads, CRM та eCommerce platforms',
          'Виконував regression та smoke testing для щотижневих релізів',
          'Перевіряв UI/UX для responsive та mobile layouts',
          'Аналізував логи в Google Cloud Console і Sentry',
          'Підтримував test plans, test cases і QA документацію',
          'Надавав product support і співпрацював із cross-functional teams',
        ],
      },
    },
    {
      id: 'softserve',
      company: 'SoftServe',
      link: 'https://www.softserveinc.com/',
      companyKey: 'experience.company.softserve.desc',
      position: {
        en: 'Senior Quality Assurance Engineer',
        ua: 'Старший інженер із забезпечення якості',
      },
      period: {
        en: '2019 - 2022',
        ua: '2019 - 2022',
      },
      logo:
        `${import.meta.env.BASE_URL}images/softserve.jpg`,
      responsibilities: {
        en: [
          'Analyzed functional requirements and created QA strategy for the project',
          'Developed and maintained regression and smoke test suites',
          'Performed manual and API testing using Postman and Fiddler',
          'Conducted installation and compatibility testing on Windows and Unix servers',
          'Reviewed and analyzed server and application logs (OpenShift, Java apps)',
          'Validated backend data integrity in PostgreSQL',
          'Collaborated with developers to identify root causes of defects',
          'Mentored junior QA engineers and performed code reviews for test cases',
        ],
        ua: [
          'Аналізував функціональні вимоги та створював QA strategy для проєкту',
          'Розробляв і підтримував regression та smoke test suites',
          'Виконував manual та API testing з використанням Postman і Fiddler',
          'Проводив installation та compatibility testing на Windows і Unix servers',
          'Переглядав і аналізував server та application logs: OpenShift, Java apps',
          'Перевіряв цілісність backend data у PostgreSQL',
          'Співпрацював із розробниками для визначення root causes дефектів',
          'Менторив junior QA engineers і виконував review test cases',
        ],
      },
    },
    {
      id: 'epam',
      company: 'EPAM Systems',
      link: 'https://www.epam.com/',
      companyKey: 'experience.company.epam.desc',
      position: {
        en: 'Junior Quality Assurance Engineer',
        ua: 'Молодший інженер із забезпечення якості',
      },
      period: {
        en: '2018 - 2019',
        ua: '2018 - 2019',
      },
      logo:
        `${import.meta.env.BASE_URL}images/epam.png`,
      responsibilities: {
        en: [
          'Performed manual functional and UI testing',
          'Documented defects and test results in Jira',
          'Analyzed technical requirements and created test cases',
          'Executed database testing (MongoDB, DynamoDB)',
          'Conducted CLI-based validation and mobile testing',
          'Participated in daily stand-ups and QA review sessions',
        ],
        ua: [
          'Виконував manual functional та UI testing',
          'Документував дефекти та результати тестування в Jira',
          'Аналізував технічні вимоги та створював test cases',
          'Виконував database testing у MongoDB і DynamoDB',
          'Проводив CLI-based validation і mobile testing',
          'Брав участь у daily stand-ups та QA review sessions',
        ],
      },
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative">
      <div className="relative z-10 w-full">
        <div className="section-kicker">{sectionKicker}</div>
        <h2 className="section-title">{t('nav.experience')}</h2>

        <div className="space-y-4">
          {experiences.map((exp) => {
            const period = exp.period[language];
            const responsibilities = exp.responsibilities[language];

            return (
            <div
              key={exp.id}
              className={`glass-panel w-full overflow-hidden ${
                expandedId === exp.id
                  ? 'border-cyan-300/40'
                  : ''
              }`}
            >
              <div
                className="flex cursor-pointer select-none flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
                onClick={() => toggleExpand(exp.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleExpand(exp.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={expandedId === exp.id}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="h-11 w-11 rounded-lg border border-slate-700 object-cover"
                    loading="lazy"
                    decoding="async"
                    width={56}
                    height={56}
                  />
                  <div>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-cyan-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {exp.company}
                      <ExternalLink className="h-4 w-4 text-cyan-300" />
                    </a>
                    <h3 className="text-sm text-slate-300">{exp.position[language]}</h3>
                    {exp.id === 'cody-solutions' && (
                      <span className="mt-2 inline-flex rounded-full border border-amber-200/25 bg-amber-200/10 px-2 py-0.5 text-xs font-semibold text-amber-100">
                        {currentRoleLabel}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-400">
                  <Calendar className="mr-2 h-4 w-4 text-cyan-300" />
                  <span>{period}</span>
                  {expandedId === exp.id ? (
                    <ChevronUp className="ml-3 h-4 w-4 text-cyan-300" />
                  ) : (
                    <ChevronDown className="ml-3 h-4 w-4 text-cyan-300" />
                  )}
                </div>
              </div>

              <div className="px-5 pb-4 text-sm leading-6 text-slate-400">
                {t(exp.companyKey)}
              </div>

              {expandedId === exp.id && (
                <div className="border-t border-slate-800 px-5 pb-6 pt-4">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-200">
                    {responsibilitiesLabel}
                  </h4>
                  <ul className="grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                    {responsibilities.map((responsibility, index) => (
                      <li
                        key={index}
                        className="flex gap-2 leading-6 before:mt-2 before:h-1.5 before:w-1.5 before:flex-none before:rounded-full before:bg-cyan-300"
                      >
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
