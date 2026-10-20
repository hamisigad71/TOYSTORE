import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { DOLLHOUSE_ROOMS, TOY_PRODUCTS } from '../data/toys';
import ProductCard from '../components/ProductCard';
import { CompareIcon, SearchIcon, XIcon } from '../components/Icons';

export default function ShopPage() {
  const {
    shopCategory,
    setShopCategory,
    globalSearch,
    setGlobalSearch,
    compareIds,
    setIsCompareOpen,
    formatPrice
  } = useStore();

  const [maxPrice, setMaxPrice] = useState(50);
  const [selectedAge, setSelectedAge] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyFlashDeals, setOnlyFlashDeals] = useState(false);

  const filteredToys = useMemo(() => {
    return TOY_PRODUCTS.filter((toy) => {
      const matchesRoom = shopCategory === 'all' || toy.room === shopCategory;
      const matchesPrice = toy.price <= maxPrice;
      const matchesAge = selectedAge === 'all' || toy.ageGroup === selectedAge;
      const matchesFlash = !onlyFlashDeals || toy.isFlashDeal;
      const q = globalSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        toy.name.toLowerCase().includes(q) ||
        toy.shortDesc.toLowerCase().includes(q) ||
        toy.brand.toLowerCase().includes(q) ||
        toy.roomLabel.toLowerCase().includes(q);

      return matchesRoom && matchesPrice && matchesAge && matchesFlash && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [shopCategory, maxPrice, selectedAge, sortBy, onlyFlashDeals, globalSearch]);

  const activeRoomMeta =
    DOLLHOUSE_ROOMS.find((r) => r.id === shopCategory) || DOLLHOUSE_ROOMS[0];

  const resetAllFilters = () => {
    setShopCategory('all');
    setMaxPrice(50);
    setSelectedAge('all');
    setOnlyFlashDeals(false);
    setGlobalSearch('');
    setSortBy('featured');
  };

  return (
    <div className="container">
      {/* Department Header Banner */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div>
          <span
            className="badge"
            style={{ background: activeRoomMeta.color, color: '#fff', marginBottom: '0.4rem' }}
          >
            {activeRoomMeta.floor}
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>{activeRoomMeta.name}</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
            {activeRoomMeta.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCompareOpen(true)}
          className="btn btn-secondary"
        >
          <CompareIcon size={16} />
          <span>Compare Selected Toys ({compareIds.length}/4)</span>
        </button>
      </div>

      {/* Main Shop Sidebar + Grid */}
      <div className="shop-layout">
        {/* Left Filter Sidebar */}
        <aside className="filter-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Filter Catalog</h3>
            <button
              type="button"
              onClick={resetAllFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--brand-primary)',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Reset All
            </button>
          </div>

          {/* 1. Store Floor / Department */}
          <div className="filter-group">
            <div style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>
              STORE FLOOR / DEPARTMENT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {DOLLHOUSE_ROOMS.map((room) => {
                const count =
                  room.id === 'all'
                    ? TOY_PRODUCTS.length
                    : TOY_PRODUCTS.filter((p) => p.room === room.id).length;
                const active = shopCategory === room.id;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setShopCategory(room.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0.7rem',
                      borderRadius: '10px',
                      border: active ? '1px solid var(--brand-primary)' : '1px solid transparent',
                      background: active ? 'var(--brand-primary-soft)' : 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '0.82rem',
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{room.name}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Max Price Slider */}
          <div className="filter-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>MAX PRICE</span>
              <span style={{ color: 'var(--brand-primary)' }}>Up to {formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              <span>{formatPrice(10)}</span>
              <span>{formatPrice(25)}</span>
              <span>{formatPrice(50)}</span>
            </div>
          </div>

          {/* 3. Age Rating Filter */}
          <div className="filter-group">
            <div style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>
              AGE GROUP
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {[
                { id: 'all', label: 'All Ages' },
                { id: '3-5', label: 'Ages 3–5' },
                { id: '6-8', label: 'Ages 6–8' },
                { id: '9-12', label: 'Ages 9–12' },
                { id: '12+', label: '12+ & Collectors' }
              ].map((ag) => (
                <button
                  key={ag.id}
                  type="button"
                  onClick={() => setSelectedAge(ag.id)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: selectedAge === ag.id ? '1px solid var(--brand-primary)' : '1px solid var(--border-color)',
                    background: selectedAge === ag.id ? 'var(--brand-primary)' : 'var(--bg-elevated)',
                    color: selectedAge === ag.id ? '#fff' : 'var(--text-primary)'
                  }}
                >
                  {ag.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Special Promotions Toggle */}
          <div className="filter-group">
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={onlyFlashDeals}
                onChange={(e) => setOnlyFlashDeals(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--brand-primary)' }}
              />
              <span>Show Flash Deal Items Only</span>
            </label>
          </div>
        </aside>

        {/* Right Product Catalog Area */}
        <div>
          {/* Toolbar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              marginBottom: '1.25rem',
              padding: '0.85rem 1.15rem',
              background: 'var(--bg-surface)',
              borderRadius: '14px',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>
              Showing <strong>{filteredToys.length}</strong> of {TOY_PRODUCTS.length} wholesome toys
              {globalSearch && (
                <span>
                  {' '}
                  matching “<strong>{globalSearch}</strong>”
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Sort By:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
                style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 600 }}
              >
                <option value="featured">Featured Store Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

          {filteredToys.length === 0 ? (
            <div
              style={{
                background: 'var(--bg-surface)',
                borderRadius: '18px',
                border: '1px solid var(--border-color)',
                padding: '3.5rem 1.5rem',
                textAlign: 'center'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>No toys match those exact filters</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Try expanding the price slider or switching to All Departments.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredToys.map((toy) => (
                <ProductCard key={toy.id} toy={toy} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

