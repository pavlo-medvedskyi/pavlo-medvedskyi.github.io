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
    <nav className="fixed w-full z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl animate-fade-blur" data-delay="1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <button
            type="button"
            onClick={onScrollToTop}
            className="brand-name cursor-pointer hover:text-cyan-300 transition-colors bg-transparent border-0 p-0 mr-6 text-sm sm:text-base font-semibold text-white"
            data-delay="1"
          >
            Pavlo Medvedskyi
          </button>

          <div className="hidden md:flex items-center gap-1">
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
              className="ml-2 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-cyan-300 px-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200"
              onClick={onOpenResume}
              aria-label={resumeLabel}
              title={resumeLabel}
            >
              <Download className="h-4 w-4" />
              <span>CV</span>
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
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden animate-fade-blur border-t border-slate-800" data-delay="2">
          <div className="px-4 py-3 space-y-1">
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
              className="mt-2 flex items-center justify-center w-full px-4 py-2 rounded-lg text-base font-semibold text-slate-950 bg-cyan-300 hover:bg-cyan-200 transition-colors"
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
