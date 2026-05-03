import { Download, Menu, X } from 'lucide-react';
import type { MouseEvent } from 'react';
import { LanguageDropdown } from './LanguageDropdown';

export interface NavSection {
  id: string;
  label: string;
}

interface NavigationProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onOpenResume: (event: MouseEvent) => void;
  onScrollToTop: () => void;
  sections: NavSection[];
  resumeLabel: string;
}

export function Navigation({
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onOpenResume,
  onScrollToTop,
  sections,
  resumeLabel,
}: NavigationProps) {
  return (
    <nav className="fixed w-full glass-panel z-50 border-b border-white/10 animate-fade-blur" data-delay="1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            onClick={onScrollToTop}
            className="brand-name gradient-text cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-0 p-0 mr-6"
            data-delay="1"
          >
            Pavlo Medvedskyi
          </button>

          <div className="hidden md:flex items-center space-x-4">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="nav-link text-sm font-medium animate-fade-blur"
                data-delay={index + 2}
              >
                {section.label}
              </a>
            ))}

            <button
              className="flex items-center px-5 py-2 rounded-full text-sm font-medium text-white liquid-glass-btn transition-all duration-300 hover:scale-[1.04]"
              onClick={onOpenResume}
            >
              <Download className="w-4 h-4 mr-2" />
              {resumeLabel}
            </button>

            <div className="animate-fade-blur" data-delay="8">
              <LanguageDropdown />
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageDropdown />
            <button
              onClick={onToggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-2xl text-[#E8ECF5]/60 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden animate-fade-blur" data-delay="2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block nav-link text-base font-medium"
                onClick={onCloseMenu}
              >
                {section.label}
              </a>
            ))}

            <button
              className="flex items-center w-full px-4 py-2 rounded-full text-base font-medium text-white liquid-glass-btn hover:scale-[1.02] transition-transform duration-300"
              onClick={onOpenResume}
            >
              <Download className="w-4 h-4 mr-2" />
              {resumeLabel}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
