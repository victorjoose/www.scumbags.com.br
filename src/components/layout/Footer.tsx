export function Footer() {
  // const { t } = useTranslation(); // Not used currently due to hidden newsletter

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        {/* Footer Newsletter - Hidden by request
        <div className="newsletter">
            <h4>{t('footer.join')}</h4>
            <p>{t('footer.news_text')}</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder={t('footer.email_placeholder')} aria-label="Email Address" />
                <button type="submit">{t('footer.signup')}</button>
            </form>
        </div>
        */}
        <div className="socials">
            <a href="https://www.instagram.com/scumbags.br/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href="https://open.spotify.com/artist/4h2cZ1HMMIMuBIHR1Uke0q" target="_blank" rel="noopener noreferrer">SPOTIFY</a>
            <a href="https://www.youtube.com/channel/UC-bImr91y27m2lYhWwKEdRw" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
            <a href="https://scumbagsbr.bandcamp.com/" target="_blank" rel="noopener noreferrer">BANDCAMP</a>
        </div>
        <div className="legal">
            <p>© 2025 SCUMBAGS. All rights reserved.</p>
            <p>SCUMBAGS CORPORATION. All rights reserved.</p>
        </div>
      </div>
      <style>{`
        .site-footer {
            background: var(--color-surface);
            padding: var(--space-lg) 0;
            border-top: 1px solid var(--color-border);
            text-align: center;
        }
        .footer-content {
            display: flex;
            flex-direction: column;
            gap: var(--space-lg);
            align-items: center;
        }
        .newsletter h4 {
            font-size: 2rem;
            margin-bottom: var(--space-xs);
        }
        .newsletter-form {
            display: flex;
            gap: var(--space-xs);
            margin-top: var(--space-sm);
            justify-content: center;
        }
        .newsletter-form input {
            background: #000;
            border: 1px solid var(--color-border);
            padding: 0.5rem;
            color: #fff;
            min-width: 200px;
        }
        .newsletter-form button {
            background: var(--color-accent);
            color: #fff;
            padding: 0.5rem 1rem;
            font-weight: bold;
        }
        .socials {
            display: flex;
            gap: var(--space-md);
            flex-wrap: wrap;
            justify-content: center;
        }
        .socials a {
            font-family: var(--font-display);
            font-size: 1.5rem;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 4px;
            transition: color 0.2s;
        }
        .socials a:hover {
            color: var(--color-accent);
        }
        .legal {
            color: #666;
            font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
}
