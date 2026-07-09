import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ua';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.tools': 'Tools & Technologies',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.openToWork': 'Open to Work',
    'nav.contact': 'Contact',
    'nav.resume': 'Download CV',

    // Header Hero
    'hero.title': 'Senior Quality Assurance Engineer',
    'hero.description':
      'Senior Quality Assurance Engineer with 8+ years of experience in desktop, web, API, and real-time systems testing. Experienced in functional, integration, regression, exploratory, and system testing. Strong background in requirements analysis, test design, SQL, API testing, databases, network protocols, Electron applications, Docker, Linux, and cross-platform validation.',
    'hero.cta': 'Get in touch',

    // About
    'about.title': 'About Me',
    'about.description':
      'I enjoy working on technically challenging products where quality depends on understanding the system rather than only testing the UI. My experience includes desktop applications, web platforms, APIs, databases, real-time communication, and complex client-server architectures. I focus on understanding business logic, investigating defects, validating integrations, and improving overall product reliability throughout the software development lifecycle.',
    'about.keywords.title': 'Core QA Focus',
    'about.keywords.list':
      'Requirements Analysis, API Testing, SQL, Database Validation, Regression Testing, Integration Testing, Electron, Docker, Linux, TCP/UDP, Log Analysis, Real-time Systems, Cross-platform Testing',
    'about.stats.projects': 'Projects Completed',
    'about.stats.experience': 'Years Experience',
    'about.stats.awards': 'Awards',

    // Tools
    'tools.title': 'Tools & Technologies',
    'tools.cat.api': 'API & Backend',
    'tools.cat.ui': 'UI / Automation',
    'tools.cat.db': 'Databases',
    'tools.cat.dev': 'Dev & IDE',
    'tools.cat.ci': 'CI/CD & Infrastructure',
    'tools.cat.mgmt': 'Test Management',
    'tools.cat.monitor': 'Monitoring & Debug',
    'tools.cat.docs': 'Documentation',

    // Skills
    'skills.title': 'Skills',
    'skills.technologies': 'Technologies',
    'skills.testing.tools': 'Testing Tools',
    'skills.testing.types': 'Testing Types',

    // Projects
    'projects.title': 'Projects',

    // Open To Work
    'openToWork.title': 'Open to Work',
    'openToWork.role.label': 'Desired Role',
    'openToWork.role.value': 'Senior Manual QA Engineer',
    'openToWork.format.label': 'Work Format',
    'openToWork.format.value': 'Remote or Office',
    'openToWork.timezone.label': 'Timezone',
    'openToWork.timezone.value': 'Europe/Kyiv (GMT+2/GMT+3)',
    'openToWork.availability.label': 'Availability',
    'openToWork.availability.value': 'Open to new opportunities now',
    'openToWork.interview.label': 'Interview Status',
    'openToWork.interview.value': 'Ready for interviews',
    'openToWork.recommendations.cta': 'LinkedIn Recommendations',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.description':
      "I'm always interested in hearing about new opportunities and challenges. Whether you have a question or just want to say hi, feel free to reach out!",
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.placeholder.name': 'Your full name',
    'contact.form.placeholder.email': 'your@email.com',
    'contact.form.placeholder.message': 'Write your message here...',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.telegram': 'Telegram',

    // Experience - Company Descriptions
    'experience.company.cody.desc':
      'Cody Solutions is a Ukrainian IT company providing full-cycle software development and quality assurance services. The team focuses on building stable, scalable, and secure solutions across backend, API, desktop, and mobile platforms.',
    'experience.company.1648.desc':
      '1648 Factory is a German-based product and innovation company that helps global enterprises and startups build digital solutions from idea to market. The company provides full-cycle software development, UX/UI design, and startup acceleration services.',
    'experience.company.railsware.desc':
      'Railsware is a US–Ukrainian product development and consulting company delivering high-quality SaaS, data, and automation solutions. Known for building products such as Coupler.io and Mailtrap.io, the company focuses on efficiency and excellence in software design.',
    'experience.company.softserve.desc':
      'SoftServe is a global IT outsourcing and consulting company headquartered in Ukraine, delivering digital transformation, cloud, AI/ML, and software engineering services for clients across North America, Europe, and Asia.',
    'experience.company.epam.desc':
      'EPAM Systems is one of the world’s largest software engineering and digital consulting companies. It provides end-to-end technology solutions, product design, and engineering services for enterprise clients globally.',
  },

  ua: {
    // Navigation
    'nav.about': 'Про мене',
    'nav.experience': 'Досвід',
    'nav.tools': 'Інструменти та технології',
    'nav.skills': 'Навички',
    'nav.projects': 'Проєкти',
    'nav.openToWork': 'Відкритий до роботи',
    'nav.contact': 'Контакти',
    'nav.resume': 'Завантажити CV',

    // Header Hero
    'hero.title': 'Старший інженер із забезпечення якості',
    'hero.description':
      'Senior Quality Assurance Engineer with 8+ years of experience in desktop, web, API, and real-time systems testing. Experienced in functional, integration, regression, exploratory, and system testing. Strong background in requirements analysis, test design, SQL, API testing, databases, network protocols, Electron applications, Docker, Linux, and cross-platform validation.',
    'hero.cta': "Зв'язатися",

    // About
    'about.title': 'Про мене',
    'about.description':
      'I enjoy working on technically challenging products where quality depends on understanding the system rather than only testing the UI. My experience includes desktop applications, web platforms, APIs, databases, real-time communication, and complex client-server architectures. I focus on understanding business logic, investigating defects, validating integrations, and improving overall product reliability throughout the software development lifecycle.',
    'about.keywords.title': 'Ключова QA спеціалізація',
    'about.keywords.list':
      'Requirements Analysis, API Testing, SQL, Database Validation, Regression Testing, Integration Testing, Electron, Docker, Linux, TCP/UDP, Log Analysis, Real-time Systems, Cross-platform Testing',
    'about.stats.projects': 'Завершених проєктів',
    'about.stats.experience': 'Років досвіду',
    'about.stats.awards': 'Нагород',

    // Tools
    'tools.title': 'Інструменти та технології',
    'tools.cat.api': 'API та бекенд',
    'tools.cat.ui': 'UI / Автоматизація',
    'tools.cat.db': 'Бази даних',
    'tools.cat.dev': 'Dev та IDE',
    'tools.cat.ci': 'CI/CD та інфраструктура',
    'tools.cat.mgmt': 'Управління тестуванням',
    'tools.cat.monitor': 'Моніторинг та дебаг',
    'tools.cat.docs': 'Документація',

    // Skills
    'skills.title': 'Навички',
    'skills.technologies': 'Технології',
    'skills.testing.tools': 'Інструменти тестування',
    'skills.testing.types': 'Види тестування',

    // Projects
    'projects.title': 'Проєкти',

    // Open To Work
    'openToWork.title': 'Відкритий до роботи',
    'openToWork.role.label': 'Бажана роль',
    'openToWork.role.value': 'Senior Manual QA Engineer',
    'openToWork.format.label': 'Формат роботи',
    'openToWork.format.value': 'Віддалено або офіс',
    'openToWork.timezone.label': 'Часовий пояс',
    'openToWork.timezone.value': 'Europe/Kyiv (GMT+2/GMT+3)',
    'openToWork.availability.label': 'Доступність',
    'openToWork.availability.value': 'Відкритий до нових можливостей зараз',
    'openToWork.interview.label': 'Статус інтерв’ю',
    'openToWork.interview.value': 'Готовий до співбесід',
    'openToWork.recommendations.cta': 'Рекомендації в LinkedIn',

    // Contact
    'contact.title': "Зв'язатися",
    'contact.description':
      'Я завжди відкритий до нових можливостей і викликів. Якщо у вас є питання або просто хочете привітатись — не соромтеся зв’язатися зі мною!',
    'contact.form.name': "Ім'я",
    'contact.form.email': 'Електронна пошта',
    'contact.form.message': 'Повідомлення',
    'contact.form.send': 'Надіслати',
    'contact.form.placeholder.name': "Ваше ім'я",
    'contact.form.placeholder.email': 'ваша@пошта.com',
    'contact.form.placeholder.message': 'Напишіть ваше повідомлення...',
    'contact.phone': 'Телефон',
    'contact.email': 'Пошта',
    'contact.linkedin': 'LinkedIn',
    'contact.telegram': 'Telegram',

    // Experience - Company Descriptions
    'experience.company.cody.desc':
      'Cody Solutions — українська ІТ-компанія, що надає повний цикл послуг із розробки та тестування програмного забезпечення. Команда зосереджена на створенні стабільних, масштабованих і безпечних рішень для бекенду, API, десктопних і мобільних платформ.',
    'experience.company.1648.desc':
      '1648 Factory — німецька продуктова та інноваційна компанія, що допомагає стартапам і великим підприємствам створювати цифрові рішення від ідеї до запуску. Надає послуги повного циклу розробки, UX/UI дизайну та прискорення стартапів.',
    'experience.company.railsware.desc':
      'Railsware — українсько-американська продуктова компанія та консалтинг, що створює високоякісні SaaS, аналітичні та автоматизаційні рішення. Відома такими продуктами, як Coupler.io та Mailtrap.io.',
    'experience.company.softserve.desc':
      'SoftServe — глобальна IT-компанія з офісом в Україні, яка надає послуги цифрової трансформації, хмарних технологій, AI/ML та розробки програмного забезпечення для клієнтів у США, Європі та Азії.',
    'experience.company.epam.desc':
      'EPAM Systems — одна з найбільших у світі компаній з розробки програмного забезпечення та IT-консалтингу. Надає повний цикл технологічних і дизайнерських послуг для корпоративних клієнтів у всьому світі.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
