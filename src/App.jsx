import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import GlobalDrawers from './components/GlobalDrawers';
import Footer from './components/Footer';

// Full Multi-Page Views
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlindBoxPage from './pages/BlindBoxPage';
import BundlesPage from './pages/BundlesPage';
import StoresPage from './pages/StoresPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import ContactPage from './pages/ContactPage';
import AboutContactPage from './pages/AboutContactPage';

function StoreRouter() {
  const { page } = useStore();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {page === 'home' && <HomePage />}
        {page === 'shop' && <ShopPage />}
        {page === 'product' && <ProductDetailPage />}
        {page === 'blindbox' && <BlindBoxPage />}
        {page === 'bundles' && <BundlesPage />}
        {page === 'stores' && <StoresPage />}
        {page === 'checkout' && <CheckoutPage />}
        {page === 'account' && <AccountPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'about' && <AboutContactPage />}
      </main>
      <GlobalDrawers />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreRouter />
    </StoreProvider>
  );
}
