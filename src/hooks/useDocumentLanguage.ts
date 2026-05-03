import { useEffect } from 'react';

export function useDocumentLanguage(language: 'en' | 'ua') {
  useEffect(() => {
    document.documentElement.lang = language === 'ua' ? 'uk' : 'en';
  }, [language]);
}
