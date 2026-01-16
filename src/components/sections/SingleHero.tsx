import { useTranslation } from 'react-i18next';

export function SingleHero() {
  const { t } = useTranslation();

  return (
    <section className="single-hero container" id="single-hero">
      <div className="content-stack">
      <h2 className="section-title">{t('newrelease.title')}</h2>
        <div className="cover-wrapper">
          <a href="https://www.submithub.com/link/scumbags-synthetic-beach" target="_blank" rel="noopener noreferrer">
            <img 
                src="/featured/CAPA SYNTHETIC BEACH SCUMBAGS  FEAT. ALGO ERRADO.jpg" 
                alt="Synthetic Beach Single Cover" 
                className="single-cover"
            />
          </a>
        </div>
        
        <h2 className="single-title">SYNTHETIC BEACH</h2>
        
        <a 
            href="https://www.submithub.com/link/scumbags-synthetic-beach" 
            target="_blank" 
            rel="noopener noreferrer"
            className="listen-btn"
        >
            {t('hero.listen_now')}
        </a>
      </div>

      <style>{`
        .single-hero {
          padding-top: var(--space-md);
          padding-bottom: var(--space-xl);
          display: flex;
          justify-content: center;
        }
        .section-title {  
          font-size: 3rem;
          margin-bottom: 0 !important;
          color: var(--color-accent);
        }
        .content-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          max-width: 600px;
          width: 100%;
        }
        .cover-wrapper {
          width: 100%;
          border: 1px solid var(--color-border);
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .single-cover {
          width: 100%;
          height: auto;
          display: block;
        }
        .single-title {
           font-size: 2.5rem;
           color: var(--color-text);
           text-align: center;
           line-height: 1;
        }
        .listen-btn {
           background: var(--color-accent);
           color: #fff;
           padding: 1rem 2rem;
           font-family: var(--font-display);
           font-size: 1.5rem;
           text-transform: uppercase;
           letter-spacing: 1px;
           transition: transform 0.2s, background 0.2s;
           display: inline-block;
        }
        .listen-btn:hover {
           background: var(--color-accent-hover);
           transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
