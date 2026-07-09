import { useLanguage } from '../context/LanguageContext';

export function Tools() {
  const { t } = useLanguage();

  const toolGroups = [
    {
      title: t('tools.cat.api'),
      items: ['Postman', 'Swagger', 'Fiddler', 'Rest Assured'],
    },
    {
      title: t('tools.cat.ui'),
      items: ['Selenide', 'TestNG', 'Java'],
    },
    {
      title: t('tools.cat.db'),
      items: ['PostgreSQL', 'MSSQL', 'Derby DB', 'NoSQL', 'BigQuery', 'DBeaver'],
    },
    {
      title: t('tools.cat.dev'),
      items: ['IntelliJ IDEA', 'Git', 'GitHub Actions'],
    },
    {
      title: t('tools.cat.ci'),
      items: ['Jenkins', 'Docker', 'VirtualBox', 'OpenShift'],
    },
    {
      title: t('tools.cat.mgmt'),
      items: ['Jira', 'Zephyr', 'TestRail', 'Allure Report'],
    },
    {
      title: t('tools.cat.monitor'),
      items: ['Sentry', 'Chrome DevTools', 'Google Cloud Console'],
    },
    {
      title: t('tools.cat.docs'),
      items: ['Confluence', 'Notion'],
    },
  ];

  return (
    <section className="relative">
      <div className="relative z-10">
        <div className="section-kicker">QA toolkit</div>
        <h2 className="section-title">{t('tools.title')}</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {toolGroups.map((group) => (
            <div
              key={group.title}
              className="glass-panel p-5"
            >
              <h3 className="mb-4 text-base font-semibold text-slate-100">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tool) => (
                  <span
                    key={tool}
                    className="resume-chip rounded-md px-2.5 py-1 text-xs text-slate-300"
                  >
                    {tool}
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
