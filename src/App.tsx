import { Header } from './components/layout/Header';
import { SingleHero } from './components/sections/SingleHero';
import { Media } from './components/sections/Media';
import { StoreGrid } from './components/sections/StoreGrid';
import { BandsInTown } from './components/sections/BandsInTown';
import { Footer } from './components/layout/Footer';

import { CartDrawer } from './components/cart/CartDrawer';

import { Routes, Route } from 'react-router-dom';
import { Checkout } from './components/pages/Checkout';

function AppContent() {
  return (
    <>
       <SingleHero />
       <Media />
       <StoreGrid />
       <BandsInTown />
    </>
  );
}

function App() {
  return (
    <div className="app-layout">
       <Header />
       <main>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
       </main>
       <CartDrawer />
       <Footer />
    </div>
  );
}

export default App;
