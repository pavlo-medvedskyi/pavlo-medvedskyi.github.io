import { Github, Linkedin, Mail } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export function Footer() {
  return (
    <footer className="glass-panel mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Pavlo-qa90"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-[#E8ECF5]/60 hover:text-white transition-all duration-200 hover-bloom"
            onClick={() => trackEvent('social_click', { network: 'github', location: 'footer' })}
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/pavlo-medvedskyi-74231913b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-[#E8ECF5]/60 hover:text-white transition-all duration-200 hover-bloom"
            onClick={() => trackEvent('social_click', { network: 'linkedin', location: 'footer' })}
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:Medvedskiypa@gmail.com"
            aria-label="Email Contact"
            className="text-[#E8ECF5]/60 hover:text-white transition-all duration-200 hover-bloom"
            onClick={() => trackEvent('contact_click', { channel: 'email', location: 'footer' })}
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-[#E8ECF5]/60">
          © {new Date().getFullYear()} Pavlo Medvedskyi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
