import type { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

// Simple flag components (SVG)
const FlagBR = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 50" width="30" height="20">
    <rect width="72" height="50" fill="#009c3b"/>
    <path d="M36 44L6 25l30-19 30 19-30 19z" fill="#ffdf00"/>
    <circle cx="36" cy="25" r="10.5" fill="#002776"/>
    <path d="M26 23c.5-1 4-2 10-2s9.5 1 10 2" stroke="#fff" strokeWidth="1" fill="none"/>
  </svg>
);

const FlagUS = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 50" width="30" height="20">
    <rect width="72" height="50" fill="#b22234"/>
    <rect y="7.7" width="72" height="7.7" fill="#fff"/>
    <rect y="23.1" width="72" height="7.7" fill="#fff"/>
    <rect y="38.5" width="72" height="7.7" fill="#fff"/>
    <rect width="28.8" height="26.9" fill="#3c3b6e"/>
    <text x="2" y="10" fontSize="8" fill="#fff">★</text>
  </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

export function Header(props: ComponentPropsWithoutRef<'header'>) {
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  const toggleLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    setNavMenuOpen(false);
  };

  const currentLang = i18n.language;

  return (
    <header className="site-header" {...props}>
      <div className="header-inner container">
        <div className="left-actions">
            <div className="lang-switcher">
                <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="lang-btn" aria-label="Switch Language">
                    {currentLang === 'pt' ? <FlagBR /> : <FlagUS />}
                </button>
                {langMenuOpen && (
                    <div className="lang-dropdown">
                        {currentLang === 'pt' ? (
                            <button onClick={() => toggleLang('en')} className="lang-option">
                                <FlagUS />
                            </button>
                        ) : (
                            <button onClick={() => toggleLang('pt')} className="lang-option">
                                <FlagBR />
                            </button>
                        )}
                    </div>
                )}
            </div>
            
            <button className="cart-header-btn" onClick={toggleCart} aria-label="Cart">
                <CartIcon />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
        </div>
        
        <div className="logo-container">
           <img src="/logos/Scumbags_Fonte Laranja.png" alt="Scumbags" className="logo-img" />
        </div>
        
        <nav className="site-nav">
          <button 
            className="icon-btn" 
            aria-label="Menu"
            onClick={() => setNavMenuOpen(!navMenuOpen)}
          >
             {navMenuOpen ? 'X' : t('header.menu')}
          </button>
          
          {navMenuOpen && (
            <div className="nav-dropdown">
                <ul>
                    <li><button onClick={() => scrollToSection('single-hero')}>{t('header.nav.home')}</button></li>
                    <li><button onClick={() => scrollToSection('media')}>{t('header.nav.media')}</button></li>
                    <li><button onClick={() => scrollToSection('shop')}>{t('header.nav.shop')}</button></li>
                    <li><button onClick={() => scrollToSection('tour')}>{t('header.nav.tour')}</button></li>
                </ul>
            </div>
          )}
        </nav>
      </div>
      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          height: var(--header-height);
          display: flex;
          align-items: center;
        }
        .header-inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          width: 100%;
        }
        .logo-container {
            display: flex;
            justify-content: center;
        }
        .site-nav {
            display: flex;
            justify-content: flex-end;
            position: relative;
        }
        .logo-img {
          height: 40px;
          object-fit: contain;
        }
        .icon-btn {
          color: var(--color-text);
          text-transform: uppercase;
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          z-index: 102; /* Above dropdown */
        }
        
        /* Language Switcher */
        .left-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .cart-header-btn {
            background: none;
            border: none;
            color: var(--color-text);
            cursor: pointer;
            position: relative;
            display: flex;
            align-items: center;
        }
        .cart-badge {
            position: absolute;
            top: -5px;
            right: -8px;
            background: var(--color-accent);
            color: white;
            font-size: 0.7rem;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        .lang-switcher {
            position: relative;
        }
        .lang-btn, .lang-option {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            display: flex;
            align-items: center;
        }
        .lang-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            padding: 5px;
            z-index: 101;
            box-shadow: 0 4px 6px rgba(0,0,0,0.5);
        }

        /* Nav Dropdown */
        .nav-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            padding: var(--space-md);
            min-width: 200px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            margin-top: 10px; /* Offset from header center line if needed, but sticky header context makes top: 100% relative to .site-nav? No, site-nav is flex. */
            /* Actually site-nav height might be small. Let's position validly. */
            top: 40px; /* Header height offset approx */
        }
        .nav-dropdown ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            text-align: right;
        }
        .nav-dropdown button {
            font-family: var(--font-display);
            font-size: 1.5rem;
            text-transform: uppercase;
            color: var(--color-text);
            transition: color 0.2s;
        }
        .nav-dropdown button:hover {
            color: var(--color-accent);
        }
      `}</style>
    </header>
  );
}
