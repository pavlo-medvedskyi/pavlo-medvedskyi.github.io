import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 240);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Go to top"
      className={`go-top-btn fixed flex h-12 w-12 items-center justify-center rounded-lg
        border border-slate-700 bg-slate-950/70 text-slate-200 shadow-xl backdrop-blur-xl
        transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-200/60
        hover:bg-amber-200/10 hover:text-amber-100
        ${
          isVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
    >
      <div className="relative flex items-center justify-center">
        <ArrowUp className="h-5 w-5" />
      </div>
    </button>
  );
}
