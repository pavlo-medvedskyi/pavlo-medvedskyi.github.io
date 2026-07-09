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
  sections: NavSection[];
  resumeLabel: string;
}

export function Navigation({
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onOpenResume,
  sections,
  resumeLabel,
}: NavigationProps) {
  return (
    <nav className="fixed w-full z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl animate-fade-blur" data-delay="1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-end md:justify-between">
          <div className="hidden min-w-0 items-center gap-1 md:flex">
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
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-cyan-300 bg-cyan-300 px-3 text-sm font-semibold text-slate-950 transition-colors hover:border-cyan-200 hover:bg-cyan-200"
              onClick={onOpenResume}
              aria-label={resumeLabel}
              title={resumeLabel}
            >
              <Download className="h-4 w-4" />
              <span>CV</span>
            </button>

            <div className="animate-fade-blur" data-delay="9">
              <LanguageDropdown />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageDropdown />
            <button
              onClick={onToggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/35 text-slate-300 transition-colors hover:border-amber-200/45 hover:bg-amber-200/10 hover:text-amber-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              className="mt-3 flex h-10 w-full items-center justify-center rounded-lg border border-cyan-300 bg-cyan-300 px-4 text-base font-semibold text-slate-950 transition-colors hover:border-cyan-200 hover:bg-cyan-200"
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
