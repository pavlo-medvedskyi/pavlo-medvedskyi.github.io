import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t } = useLanguage();

  const experiences = [
    {
      id: 'cody-solutions',
      company: 'Cody Solutions',
      link: 'https://codysolutions.com/',
      companyKey: 'experience.company.cody.desc',
      position: 'Senior Quality Assurance Engineer',
      period: '2024 - Present',
      shortDescription:
        'Enterprise-level platform with integrated backend, API, and desktop applications for multiple operating systems. Focused on quality assurance across data flow, system logic, and cross-platform stability.',
      logo:
        `${import.meta.env.BASE_URL}images/codyua.jpg`,
      responsibilities: [
        'Performed manual and automated API testing using Java and RestAssured',
        'Designed and executed test cases for backend, database, and API validation',
        'Tested desktop applications across Windows, macOS, and Linux environments',
        'Performed mobile and responsive testing across Android and iOS devices',
        'Collaborated with developers and product managers to refine requirements and ensure feature completeness',
        'Conducted exploratory, regression, and usability testing across web and desktop layers',
        'Interviewed and mentored QA candidates, participated in team onboarding and knowledge sharing',
        'Maintained test documentation, reporting, and continuous improvement processes in Agile workflow',
      ],
    },
    {
      id: '1648-factory',
      company: '1648 Factory',
      link: 'https://www.1648factory.com/',
      companyKey: 'experience.company.1648.desc',
      position: 'Senior Quality Assurance Engineer',
      period: '2024 - 2024',
      logo:
        `${import.meta.env.BASE_URL}images/1648factory_logo.jpg`,
      responsibilities: [
        'Performed manual and API testing across multiple environments',
        'Created and executed automated Postman collections and runners',
        'Validated MetaMask integration and crypto transaction flows',
        'Conducted database validation (PostgreSQL)',
        'Performed regression and smoke testing for web builds',
        'Maintained detailed QA documentation and test cases',
        'Collaborated with developers and product owners to refine requirements',
        'Actively participated in Scrum ceremonies',
      ],
    },
    {
      id: 'railsware',
      company: 'Railsware',
      link: 'https://railsware.com/',
      companyKey: 'experience.company.railsware.desc',
      position: 'Senior Quality Assurance Engineer',
      period: '2022 - 2023',
      logo:
        `${import.meta.env.BASE_URL}images/railsware.jpg`,
      responsibilities: [
        'Performed manual API and database testing',
        'Validated data synchronization and ETL pipeline accuracy',
        'Tested integrations with external APIs (Ads, CRMs, eCommerce platforms)',
        'Executed regression and smoke testing for weekly releases',
        'Verified UI/UX for responsive and mobile layouts',
        'Analyzed logs in Google Cloud Console and Sentry',
        'Maintained test plans, test cases, and QA documentation',
        'Provided product support and collaborated with cross-functional teams',
      ],
    },
    {
      id: 'softserve',
      company: 'SoftServe',
      link: 'https://www.softserveinc.com/',
      companyKey: 'experience.company.softserve.desc',
      position: 'Senior Quality Assurance Engineer',
      period: '2019 - 2022',
      logo:
        `${import.meta.env.BASE_URL}images/softserve.jpg`,
      responsibilities: [
        'Analyzed functional requirements and created QA strategy for the project',
        'Developed and maintained regression and smoke test suites',
        'Performed manual and API testing using Postman and Fiddler',
        'Conducted installation and compatibility testing on Windows and Unix servers',
        'Reviewed and analyzed server and application logs (OpenShift, Java apps)',
        'Validated backend data integrity in PostgreSQL',
        'Collaborated with developers to identify root causes of defects',
        'Mentored junior QA engineers and performed code reviews for test cases',
      ],
    },
    {
      id: 'epam',
      company: 'EPAM Systems',
      link: 'https://www.epam.com/',
      companyKey: 'experience.company.epam.desc',
      position: 'Junior Quality Assurance Engineer',
      period: '2018 - 2019',
      logo:
        `${import.meta.env.BASE_URL}images/epam.png`,
      responsibilities: [
        'Performed manual functional and UI testing',
        'Documented defects and test results in Jira',
        'Analyzed technical requirements and created test cases',
        'Executed database testing (MongoDB, DynamoDB)',
        'Conducted CLI-based validation and mobile testing',
        'Participated in daily stand-ups and QA review sessions',
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative">
      <div className="relative z-10 w-full">
        <div className="section-kicker">Career evidence</div>
        <h2 className="section-title">{t('nav.experience')}</h2>

        <div className="space-y-4">
          {experiences.map((exp) => (
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
                    <h3 className="text-sm text-slate-300">{exp.position}</h3>
                    {exp.period.includes('Present') && (
                      <span className="mt-2 inline-flex rounded-full border border-amber-200/25 bg-amber-200/10 px-2 py-0.5 text-xs font-semibold text-amber-100">
                        Current role
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-400">
                  <Calendar className="mr-2 h-4 w-4 text-cyan-300" />
                  <span>{exp.period}</span>
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
                    Responsibilities:
                  </h4>
                  <ul className="grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                    {exp.responsibilities.map((responsibility, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
