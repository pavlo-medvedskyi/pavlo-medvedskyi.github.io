import { Github, Linkedin, Mail } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Pavlo-qa90"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-slate-400 transition-colors hover:text-cyan-300"
            onClick={() => trackEvent('social_click', { network: 'github', location: 'footer' })}
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/pavlo-medvedskyi-74231913b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-slate-400 transition-colors hover:text-cyan-300"
            onClick={() => trackEvent('social_click', { network: 'linkedin', location: 'footer' })}
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:Medvedskiypa@gmail.com"
            aria-label="Email Contact"
            className="text-slate-400 transition-colors hover:text-cyan-300"
            onClick={() => trackEvent('contact_click', { channel: 'email', location: 'footer' })}
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Pavlo Medvedskyi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
