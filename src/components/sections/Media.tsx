import { useTranslation } from 'react-i18next';

export function Media() {
  const videoId = "I5rDrbzhW2Y";
  const { t } = useTranslation();

  return (
    <section className="media-section container" id="media">
      <h2 className="section-title">{t('media.title')}</h2>
      <div className="video-wrapper">
         <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
        ></iframe>
      </div>
      <style>{`
        .media-section {
          padding: var(--space-xl) var(--space-sm);
          text-align: center;
        }
        .section-title {
          font-size: 3rem;
          margin-bottom: var(--space-md);
          color: var(--color-accent);
        }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 */
          height: 0;
          overflow: hidden;
          background: #000;
          border: 1px solid var(--color-border);
          z-index: 1;
        }
        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </section>
  );
}
