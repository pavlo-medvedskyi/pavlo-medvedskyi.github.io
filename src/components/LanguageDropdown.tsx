import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Language {
  code: 'en' | 'ua';
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
  { code: 'ua', name: 'Українська', flag: 'https://flagcdn.com/w40/ua.png' },
];

export function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const portalRootRef = useRef<HTMLDivElement | null>(null);
  const currentLanguage = languages.find((lang) => lang.code === language);

  useEffect(() => {
    const portal = document.createElement('div');
    portal.id = 'language-dropdown-portal';
    portal.style.position = 'fixed';
    portal.style.top = '0';
    portal.style.left = '0';
    portal.style.width = '100%';
    portal.style.height = '100%';
    portal.style.zIndex = '9999';
    portal.style.pointerEvents = 'none';
    document.body.appendChild(portal);
    portalRootRef.current = portal;
    return () => portal.remove();
  }, []);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const button = dropdownRef.current;
      const menu = menuRef.current;

      if (button?.contains(target) || menu?.contains(target)) return;

      setIsOpen(false);
    }

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);


  const toggleMenu = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    }
    setIsOpen((prev) => !prev);
  };


  const menu = (
    <div
      id="language-dropdown-menu"
      ref={menuRef}
      style={{
        position: 'absolute',
        top: `${menuPos.top}px`,
        left: `${menuPos.left}px`,
        width: `${menuPos.width}px`,
        pointerEvents: 'auto',
      }}
      className="rounded-2xl overflow-hidden bg-[rgba(17,24,39,0.9)]
                 backdrop-blur-2xl border border-slate-700/80
                 shadow-[0_16px_34px_rgba(2,6,23,0.42)]
                 transition-all duration-300 ease-out transform origin-top
                 animate-[fadeSlide_0.25s_ease-out]"
    >
      {languages.map((lang, index) => (
        <button
          key={lang.code}
          onClick={() => {
            setLanguage(lang.code);
            setIsOpen(false);
          }}
          className={`flex items-center space-x-2 w-full px-4 py-3 text-left text-[#E8ECF5]/90 transition-all duration-200
            hover:bg-amber-200/10 hover:text-amber-100
            ${language === lang.code ? 'bg-amber-200/10 text-amber-100' : ''}
            ${index !== languages.length - 1 ? 'border-b border-white/10' : ''}`}
        >
          <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded" />
          <span className="text-sm font-medium">{lang.name}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex h-9 items-center space-x-2 rounded-lg border border-slate-800
          bg-slate-950/35 px-3 text-white backdrop-blur-xl
          transition-colors duration-200 hover:border-amber-200/45
          hover:bg-amber-200/10 hover:text-amber-100"
      >
        <img
          src={currentLanguage?.flag}
          alt={currentLanguage?.name}
          className="h-4 w-6 rounded object-cover"
        />
        <span className="text-sm font-semibold text-slate-100">
          {currentLanguage?.name}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-amber-200" />
        ) : (
          <ChevronDown className="h-4 w-4 text-amber-200" />
        )}
      </button>

      {isOpen && portalRootRef.current ? createPortal(menu, portalRootRef.current) : null}
    </div>
  );
}
