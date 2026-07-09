import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      id: 'nda-project',
      title: 'NDA Project',
      shortDescription:
        'Worked as a Senior Quality Assurance Engineer on a large-scale Electron desktop application. Responsible for functional, integration, regression, and exploratory testing, requirements analysis, defect investigation, release validation, simulator testing, and cross-platform verification across Ubuntu, Windows, and macOS.',
      tech: [
        'Electron',
        'Cross-platform',
        'Ubuntu',
        'Windows',
        'macOS',
        'Desktop QA',
        'Integration Testing',
        'Regression Testing',
      ],
      confidential: true,
    },
    {
      id: 'blai',
      title: 'Blai',
      shortDescription:
        'Blai is an AI-powered mobile app that helps users manage crypto investments through smart insights, chat-based interactions, and automated portfolio tracking.',
      image: `${import.meta.env.BASE_URL}images/blai.png`,
      tech: ['API Testing', 'Mobile Testing', 'Swagger', 'iOS', 'Android'],
      link: 'https://play.google.com/store/apps/details?id=com.blai.app',
    },
    {
      id: 'jmesworld',
      title: 'JMES World',
      shortDescription:
        'JMES World is a Web3 platform that enables creators and communities to collaborate, tokenize content, and participate in decentralized governance.',
      image: `${import.meta.env.BASE_URL}images/JMES.jpg`,
      tech: ['API Testing', 'Web Testing', 'Blockchain', 'Postman', 'Java', 'Rest Assured'],
      link: 'https://app.jmesworld.com/login',
    },

    {
      id: 'supabox',
      title: 'SupaBox',
      shortDescription:
        'SupaBox is a gamified e-commerce platform that lets users open digital mystery boxes and win real-world prizes.',
      image: `${import.meta.env.BASE_URL}images/supabox.png`,
      tech: ['API Testing', 'PostgreSQL', 'Postman', 'Java', 'Rest Assured', 'Web Testing', 'Mobile Testing'],
      link: 'https://supabox.com/',
    },
    {
      id: 'concedes',
      title: 'Concedes Digital Assets',
      shortDescription:
        'Concedes Digital Assets is a fintech web application that empowers users to trade cryptocurrencies seamlessly.',
      image:
        `${import.meta.env.BASE_URL}images/CONCEDUS.webp`,
      tech: ['API Testing', 'PostgreSQL', 'Postman', 'MetaMask', 'Blockchain'],
      link: 'https://concedus.com/en/',
    },
    {
      id: 'coupler',
      title: 'Coupler.io',
      shortDescription:
        'A web application that synchronizes data between various services on a schedule, allowing users to monitor and manage metrics from Ads and marketplaces.',
      image:
        `${import.meta.env.BASE_URL}images/coupler.png`,
      tech: ['API Testing', 'Data Integration', 'Mobile Testing', 'Google Cloud Console'],
      link: 'https://www.coupler.io/',
    },
    {
      id: 'nectar',
      title: 'Nectar Corp Network Solutions',
      shortDescription:
        'Software solutions improving management, visibility, and service delivery across VoIP, SIP and MPLS networks.',
      image:
        `${import.meta.env.BASE_URL}images/nectar_services_logo.jpg`,
      tech: ['API Testing', 'PostgreSQL', 'OpenShift', 'VirtualBox', 'Linux', 'Microservices'],
      link: 'https://www.nectarcorp.com/',
    },
    {
      id: 'cloud',
      title: 'Epam Cloud',
      shortDescription:
        'Multi-cloud orchestrator helping users manage AWS, GCP, and MS Azure from one unified interface.',
      image:
        `${import.meta.env.BASE_URL}images/epam_cloud.jpg`,
      tech: ['CLI Testing', 'Cloud', 'AWS', 'GCP', 'Azure'],
      link: 'https://www.epam.com/services/cloud',
    },
  ];

  return (
    <section className="relative">
      <div className="relative z-10">
        <div className="section-kicker">Selected product work</div>
        <h2 className="section-title">{t('projects.title')}</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => {
            const CardTag = project.confidential ? 'article' : 'a';

            return (
            <CardTag
              key={project.id}
              {...(!project.confidential
                ? {
                    href: project.link,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {})}
              className={`group glass-panel grid overflow-hidden md:grid-cols-[170px_1fr] ${
                project.confidential ? 'cursor-default' : ''
              }`}
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-slate-800 bg-slate-950/45 md:h-full md:border-b-0 md:border-r">
                {project.confidential ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-amber-200/30 bg-amber-200/10">
                      <LockKeyhole className="h-7 w-7 text-amber-100" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">NDA</div>
                      <div className="mt-1 text-xs text-slate-400">protected details</div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-contain p-4 opacity-95 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={340}
                  />
                )}
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300">{project.title}</h3>
                  {project.confidential && (
                    <span className="resume-chip inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-amber-100">
                      <ShieldCheck className="h-3 w-3 text-amber-200" />
                      NDA
                    </span>
                  )}
                </div>
                <p className="mb-4 text-sm leading-6 text-slate-400">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="resume-chip rounded-md px-2 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardTag>
          );
          })}
        </div>
      </div>
    </section>
  );
}
