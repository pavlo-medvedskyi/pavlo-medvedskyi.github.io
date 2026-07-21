import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, ExternalLink, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent, trackFunnelStep } from '../utils/analytics';

export function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showTelegram, setShowTelegram] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xrbrzykq', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        trackEvent('contact_form_submit', { status: 'success' });
        trackFunnelStep('contact_form_submit', { status: 'success' });
        trackEvent('generate_lead', { method: 'contact_form' });
        alert(t('contact.alert.success'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        trackEvent('contact_form_submit', { status: 'error' });
        alert(t('contact.alert.error'));
      }
    } catch {
      trackEvent('contact_form_submit', { status: 'network_error' });
      alert(t('contact.alert.network'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative">
      <div className="relative z-10">
        <div className="section-kicker">{t('contact.kicker')}</div>
        <h2 className="section-title">{t('contact.title')}</h2>

        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel p-6">
            <p className="mb-6 text-base leading-7 text-slate-300">
              {t('contact.description')}
            </p>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setShowPhone(true);
                  trackEvent('contact_click', { channel: 'phone', location: 'contact_section' });
                }}
                className="flex w-full cursor-pointer items-center rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-left text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10">
                  <Phone className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="font-semibold">{t('contact.phone')}</div>
                  <div className="select-none text-sm text-slate-400">
                    {showPhone ? '+38 (095) 0-555-314' : '+38 (095) ***-***'}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowEmail(true);
                  trackEvent('contact_click', { channel: 'email_reveal', location: 'contact_section' });
                }}
                className="flex w-full cursor-pointer items-center rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-left text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10">
                  <Mail className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="font-semibold">{t('contact.email')}</div>
                  <div className="select-none text-sm text-slate-400">
                    {showEmail ? 'Medvedskiypa@gmail.com' : 'M*********@gmail.com'}
                  </div>
                </div>
              </button>

              <a
                href="https://www.linkedin.com/in/pavlo-medvedskyi-74231913b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
                onClick={() => trackEvent('social_click', { network: 'linkedin', location: 'contact_section' })}
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10">
                  <ExternalLink className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="font-semibold">{t('contact.linkedin')}</div>
                  <div className="text-sm text-slate-400">Pavlo Medvedskyi</div>
                </div>
              </a>

              <button
                type="button"
                onClick={() => {
                  setShowTelegram(true);
                  trackEvent('contact_click', { channel: 'telegram_reveal', location: 'contact_section' });
                }}
                className="flex items-center rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10">
                  <MessageSquare className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="font-semibold">{t('contact.telegram')}</div>
                  <div className="select-none text-sm text-slate-400">
                    {showTelegram ? '@Wisll' : '@W****'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-panel space-y-5 p-6"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t('contact.form.placeholder.name') || 'Your full name'}
                className="w-full px-4 py-3 text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t('contact.form.placeholder.email') || 'your@email.com'}
                className="w-full px-4 py-3 text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder={t('contact.form.placeholder.message') || 'Write your message here...'}
                className="w-full px-4 py-3 text-white placeholder-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`liquid-glass-btn flex w-full items-center justify-center px-6 py-3 font-semibold transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.form.send')}
                </>
              )}
            </button>

            <p className="text-xs leading-5 text-slate-500">
              {t('contact.privacy.note')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
