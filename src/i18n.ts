import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      header: {
        menu: "MENU",
        nav: {
            home: "INÍCIO",
            media: "VÍDEOS",
            shop: "LOJA",
            tour: "AGENDA"
        }
      },
      hero: {
        listen_now: "ESCUTE AGORA"
      },
      media: {
        title: "ÚLTIMOS LANÇAMENTOS"
      },
      store: {
        title: "LOJA",
        add_to_bag: "ADICIONAR AO CARRINHO",
        details: "DETALHES",
        select_size: "Selecione o Tamanho",
        close: "Fechar"
      },
      tour: {
        title: "AGENDA"
      },
      footer: {
        join: "JUNTE-SE AOS SCUMBAGS",
        news_text: "Receba novidades e datas de shows.",
        email_placeholder: "SEU EMAIL",
        signup: "INSCREVER-SE",
        rights: "Todos os direitos reservados."
      }
    }
  },
  en: {
    translation: {
      header: {
        menu: "MENU",
        nav: {
            home: "HOME",
            media: "MEDIA",
            shop: "SHOP",
            tour: "TOUR"
        }
      },
      hero: {
        listen_now: "LISTEN NOW"
      },
      media: {
        title: "LATEST MEDIA"
      },
      store: {
        title: "SCUMSTORE",
        add_to_bag: "ADD TO BAG",
        details: "DETAILS",
        select_size: "Select Size",
        close: "Close"
      },
      tour: {
        title: "TOUR DATES"
      },
      footer: {
        join: "JOIN THE SCUM",
        news_text: "Get the latest news and tour dates.",
        email_placeholder: "YOUR EMAIL",
        signup: "SIGN UP",
        rights: "All rights reserved."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
