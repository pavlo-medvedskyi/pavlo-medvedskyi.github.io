import { Helmet } from 'react-helmet-async';
import { useLanguage } from './context/LanguageContext';

export function SEO() {
  const { language } = useLanguage();

  return (
    <Helmet>
      <html lang={language === 'ua' ? 'uk' : 'en'} />
    </Helmet>
  );
}
