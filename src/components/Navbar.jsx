import React from 'react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES } from '../data/toys';
import {
  SearchIcon,
  BagIcon,
  HeartIcon,
  CompareIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  ShieldIcon,
  TruckIcon,
  GiftIcon,
  XIcon
} from './Icons';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop Catalog' },
  { id: 'rooms', label: '6-Floor Map' },
  { id: 'blindbox', label: 'Mystery Studio' },
  { id: 'bundles', label: '3-Toy Bundles' },
  { id: 'stores', label: 'Runda Mall Store' },
  { id: 'contact', label: 'Contact Care' },
  { id: 'about', label: 'About' }
];

export default function Navbar() {
  const {
    page,
    navigate,
    globalSearch,
    setGlobalSearch,
    theme,
    setTheme,
    currency,
    setCurrency,
    cartCount,
    wishlist,
    compareIds,
    setIsCartOpen,
    setIsCompareOpen
  } = useStore();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (page !== 'shop') {
      navigate('shop');
    }
  };

  return (
    <>
      {/* Slim Top Utility Strip */}
      <div className="utility-bar">
        <div className="container utility-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span className="utility-pill">15% OFF 3+ TOYS</span>
            <span style={{ color: '#d4d4d0' }}>
              Auto-applied in bag
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              type="button"
              onClick={() => navigate('contact')}
              style={{
                background: 'none',
                border: 'none',
                color: '#fed878',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Runda Mall, 3rd Floor • 0742630973
            </button>

            {/* Currency Switcher */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Select Currency"
              data-ui="currency-select"
              style={{
                background: '#182026',
                color: '#f7f7f5',
                border: 'none',
                padding: '0.2rem 0.55rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code} style={{ color: '#0f1419', background: '#ffffff' }}>
                  {CURRENCIES[code].label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="site-header">
        <div className="container header-main">
          {/* Logo */}
          <div className="brand-logo" onClick={() => navigate('home')}>
            <div className="brand-mark">
              <span>GENTS</span>
              <span>TOYS</span>
            </div>
            <div>
              <div className="brand-title">The Gents Dollhouse</div>
              <div className="brand-subtitle">
                Runda Mall • 3rd Floor
              </div>
            </div>
          </div>

          {/* Primary Navigation Links Centered */}
          <nav className="nav-links" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                page === item.id || (item.id === 'shop' && page === 'product');
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Right Search & Actions */}
          <div className="header-actions">
            <form className="header-search" onSubmit={handleSearchSubmit}>
              <span className="header-search-icon">
                <SearchIcon size={15} />
              </span>
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  if (page !== 'shop' && e.target.value.trim().length > 1) {
                    navigate('shop');
                  }
                }}
                placeholder="Search toys..."
              />
              {globalSearch && (
                <button
                  type="button"
                  onClick={() => setGlobalSearch('')}
                  style={{
                    position: 'absolute',
                    right: '0.55rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  <XIcon size={14} />
                </button>
              )}
            </form>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="icon-btn"
              title="Toggle Light / Dark Collector Mode"
            >
              {theme === 'light' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
            </button>

            {/* Compare Button */}
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="icon-btn"
              title="Compare Toy Specs"
            >
              <CompareIcon size={16} />
              {compareIds.length > 0 && (
                <span className="count-badge">{compareIds.length}</span>
              )}
            </button>

            {/* Wishlist / Account Button */}
            <button
              type="button"
              onClick={() => navigate('account')}
              className="icon-btn"
              title="Wishlist, Orders & Collector Vault"
            >
              <HeartIcon size={16} filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="count-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="icon-btn icon-btn-primary"
            >
              <BagIcon size={16} />
              <span>Bag</span>
              <span className="count-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

