import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function BandsInTown() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Load Bandsintown script
    const script = document.createElement('script');
    script.src = "https://widget.bandsintown.com/main.min.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
        try {
            document.body.removeChild(script);
        } catch(e) {/* ignore */}
    };
  }, []);

  return (
    <section className="tour-section container" id="tour">
      <h2 className="section-title">{t('tour.title')}</h2>
      <div className="bit-widget-container">
        <a 
            className="bit-widget-initializer" 
            data-artist-name="Scumbags" 
            data-language={i18n.language === 'pt' ? 'pt' : 'en'} 
            data-display-local-dates="false" 
            data-display-past-dates="false" 
            data-auto-style="false" 
            data-text-color="#f0f0f0" 
            data-link-color="#ff0000" 
            data-background-color="rgba(0,0,0,0)" 
            data-display-limit="15" 
            data-display-start-time="false" 
            data-link-text-color="#FFFFFF" 
            data-display-lineup="false" 
            data-separator-color="#333333"
        >
            Scumbags Tour Dates
        </a>
      </div>
      <style>{`
        .tour-section {
          padding: var(--space-xl) var(--space-sm);
        }
        .section-title {
            text-align: center; 
            font-size: 3rem; 
            margin-bottom: var(--space-lg);
        }
        .bit-widget-container {
            min-height: 200px;
        }
      `}</style>
    </section>
  );
}
