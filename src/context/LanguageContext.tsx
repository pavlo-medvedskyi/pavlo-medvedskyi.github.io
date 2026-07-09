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
    'hero.location': 'Kharkiv, Ukraine - Europe/Kyiv',
    'hero.title': 'Senior Quality Assurance Engineer',
    'hero.description':
      '8+ years of experience in desktop, web, API, and real-time systems testing. Experienced in functional, integration, regression, exploratory, and system testing, with a strong background in requirements analysis, test design, SQL, API testing, databases, network protocols, Electron applications, Docker, Linux, and cross-platform validation.',
    'hero.cta': 'Get in touch',
    'hero.experienceCta': 'View experience',
    'hero.highlights.list':
      'API Testing, SQL & Databases, Desktop & Web, Electron & Linux, Real-time Systems, TCP/UDP & Logs',
    'hero.proof.years.value': '8+ Years',
    'hero.proof.years.label': 'Commercial QA Experience',
    'hero.proof.platforms.value': 'Desktop / Web / API',
    'hero.proof.platforms.label': 'Cross-platform Testing',
    'hero.proof.systems.value': 'Electron / Linux / Docker',
    'hero.proof.systems.label': 'Real-time Systems',

    // About
    'about.kicker': 'Profile snapshot',
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
    'tools.kicker': 'QA toolkit',
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
    'skills.kicker': 'Core strengths',
    'skills.title': 'Skills',
    'skills.technologies': 'Technologies',
    'skills.testing.tools': 'Testing Tools',
    'skills.testing.types': 'Testing Types',

    // Projects
    'projects.title': 'Projects',
    'projects.kicker': 'Selected product work',
    'projects.nda.details': 'protected details',
    'projects.nda.title': 'NDA Project',
    'projects.nda.description':
      'Currently working as a Senior Quality Assurance Engineer on a large-scale Electron desktop application. Responsible for functional, integration, regression, and exploratory testing, requirements analysis, defect investigation, release validation, simulator testing, and cross-platform verification across Ubuntu, Windows, and macOS.',
    'projects.blai.description':
      'Blai is an AI-powered mobile app that helps users manage crypto investments through smart insights, chat-based interactions, and automated portfolio tracking.',
    'projects.jmesworld.description':
      'JMES World is a Web3 platform that enables creators and communities to collaborate, tokenize content, and participate in decentralized governance.',
    'projects.supabox.description':
      'SupaBox is a gamified e-commerce platform that lets users open digital mystery boxes and win real-world prizes.',
    'projects.concedes.description':
      'Concedes Digital Assets is a fintech web application that empowers users to trade cryptocurrencies seamlessly.',
    'projects.coupler.description':
      'A web application that synchronizes data between various services on a schedule, allowing users to monitor and manage metrics from Ads and marketplaces.',
    'projects.nectar.description':
      'Software solutions improving management, visibility, and service delivery across VoIP, SIP and MPLS networks.',
    'projects.cloud.description':
      'Multi-cloud orchestrator helping users manage AWS, GCP, and MS Azure from one unified interface.',

    // Open To Work
    'openToWork.kicker': 'Hiring details',
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
    'contact.kicker': 'Next step',
    'contact.title': 'Get in Touch',
    'contact.description':
      "I'm always interested in hearing about new opportunities and challenges. Whether you have a question or just want to say hi, feel free to reach out!",
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.alert.success': 'Message sent successfully!',
    'contact.alert.error': 'Something went wrong. Please try again later.',
    'contact.alert.network': 'Network error. Please check your connection.',
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
    'hero.location': 'Харків, Україна - Europe/Kyiv',
    'hero.title': 'Старший інженер із забезпечення якості',
    'hero.description':
      '8+ років досвіду в тестуванні desktop, web, API та систем реального часу. Маю досвід функціонального, інтеграційного, регресійного, дослідницького та системного тестування, а також сильний технічний бекграунд в аналізі вимог, тест-дизайні, SQL, API testing, базах даних, мережевих протоколах, Electron-застосунках, Docker, Linux та кросплатформеній валідації.',
    'hero.cta': "Зв'язатися",
    'hero.experienceCta': 'Переглянути досвід',
    'hero.highlights.list':
      'API Testing, SQL і бази даних, Desktop і Web, Electron і Linux, Системи реального часу, TCP/UDP і логи',
    'hero.proof.years.value': '8+ років',
    'hero.proof.years.label': 'Комерційного QA досвіду',
    'hero.proof.platforms.value': 'Desktop / Web / API',
    'hero.proof.platforms.label': 'Кросплатформене тестування',
    'hero.proof.systems.value': 'Electron / Linux / Docker',
    'hero.proof.systems.label': 'Системи реального часу',

    // About
    'about.kicker': 'Профіль кандидата',
    'about.title': 'Про мене',
    'about.description':
      'Мені цікаво працювати з технічно складними продуктами, де якість залежить не лише від перевірки інтерфейсу, а й від розуміння всієї системи. Мій досвід охоплює desktop-застосунки, web-платформи, API, бази даних, real-time комунікацію та складні client-server архітектури. Я зосереджуюся на розумінні бізнес-логіки, розслідуванні дефектів, валідації інтеграцій і підвищенні надійності продукту протягом усього життєвого циклу розробки.',
    'about.keywords.title': 'Ключова QA спеціалізація',
    'about.keywords.list':
      'Аналіз вимог, API Testing, SQL, Валідація баз даних, Регресійне тестування, Інтеграційне тестування, Electron, Docker, Linux, TCP/UDP, Аналіз логів, Системи реального часу, Кросплатформене тестування',
    'about.stats.projects': 'Завершених проєктів',
    'about.stats.experience': 'Років досвіду',
    'about.stats.awards': 'Нагород',

    // Tools
    'tools.kicker': 'QA інструментарій',
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
    'skills.kicker': 'Сильні сторони',
    'skills.title': 'Навички',
    'skills.technologies': 'Технології',
    'skills.testing.tools': 'Інструменти тестування',
    'skills.testing.types': 'Види тестування',

    // Projects
    'projects.title': 'Проєкти',
    'projects.kicker': 'Практичний досвід',
    'projects.nda.details': 'деталі захищені NDA',
    'projects.nda.title': 'NDA проєкт',
    'projects.nda.description':
      'Працюю як старший інженер із забезпечення якості над масштабним desktop-застосунком на Electron. Відповідаю за функціональне, інтеграційне, регресійне та дослідницьке тестування, аналіз вимог, розслідування дефектів, перевірку релізів, тестування із симуляторами та кросплатформену валідацію на Ubuntu, Windows і macOS.',
    'projects.blai.description':
      'Blai — мобільний застосунок на базі AI, який допомагає користувачам керувати криптоінвестиціями за допомогою аналітичних підказок, чат-взаємодії та автоматизованого відстеження портфеля.',
    'projects.jmesworld.description':
      'JMES World — Web3-платформа для співпраці авторів і спільнот, токенізації контенту та участі в децентралізованому управлінні.',
    'projects.supabox.description':
      'SupaBox — гейміфікована e-commerce платформа, де користувачі відкривають цифрові mystery boxes і можуть вигравати реальні призи.',
    'projects.concedes.description':
      'Concedes Digital Assets — фінтех web-застосунок, який дає користувачам можливість зручно торгувати криптовалютами.',
    'projects.coupler.description':
      'Web-застосунок для синхронізації даних між різними сервісами за розкладом, щоб користувачі могли відстежувати й керувати метриками з реклами та маркетплейсів.',
    'projects.nectar.description':
      'Програмні рішення для покращення управління, видимості та якості сервісів у VoIP, SIP і MPLS мережах.',
    'projects.cloud.description':
      'Мультихмарний оркестратор, який допомагає керувати AWS, GCP та MS Azure з єдиного інтерфейсу.',

    // Open To Work
    'openToWork.kicker': 'Деталі для найму',
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
    'contact.kicker': 'Наступний крок',
    'contact.title': "Зв'язатися",
    'contact.description':
      'Я завжди відкритий до нових можливостей і викликів. Якщо у вас є питання або просто хочете привітатись — не соромтеся зв’язатися зі мною!',
    'contact.form.name': "Ім'я",
    'contact.form.email': 'Електронна пошта',
    'contact.form.message': 'Повідомлення',
    'contact.form.send': 'Надіслати',
    'contact.form.sending': 'Надсилання...',
    'contact.alert.success': 'Повідомлення успішно надіслано!',
    'contact.alert.error': 'Щось пішло не так. Спробуйте пізніше.',
    'contact.alert.network': 'Помилка мережі. Перевірте підключення.',
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
