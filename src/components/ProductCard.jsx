import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  HeartIcon,
  EyeIcon,
  CompareIcon,
  StarIcon,
  PlusIcon
} from './Icons';

export default function ProductCard({ toy: propToy, product }) {
  const toy = propToy || product;
  const {
    navigate,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    compareIds,
    toggleCompare,
    setQuickViewProduct
  } = useStore();

  const isWishlisted = wishlist.includes(toy.id);
  const isCompared = compareIds.includes(toy.id);

  return (
    <article className="product-card">
      {/* Top Media: 100% Fully Visible Product with Clean Unobstructed Framing */}
      <div className="product-media">
        <img
          src={toy.image}
          alt={toy.name}
          loading="lazy"
          onClick={() => navigate('product', { productId: toy.id })}
          style={{ cursor: 'pointer' }}
        />

        {/* Minimal Single Floating Badge (No Product Obstruction) */}
        {toy.badge && (
          <div className="product-badges">
            <span className={`badge ${toy.badgeClass || 'badge-red'}`}>
              {toy.badge}
            </span>
          </div>
        )}

        {/* Sleek Floating Action Buttons (Top Right Corner) */}
        <div className="product-actions-overlay">
          <button
            type="button"
            onClick={() => toggleWishlist(toy.id)}
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            className={`circle-btn ${isWishlisted ? 'active' : ''}`}
            aria-label="Wishlist"
          >
            <HeartIcon size={14} filled={isWishlisted} />
          </button>
          <button
            type="button"
            onClick={() => setQuickViewProduct(toy)}
            title="Quick View Specs"
            className="circle-btn"
            aria-label="Quick View"
          >
            <EyeIcon size={14} />
          </button>
        </div>
      </div>

      {/* Card Body: Well Fit, Balanced & Proportional on All Screens */}
      <div className="product-body">
        <div>
          {/* Category & Rating Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              marginBottom: '0.35rem'
            }}
          >
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
              {toy.roomLabel}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b' }}>
              <StarIcon size={13} filled />
              <strong style={{ color: 'var(--text-primary)' }}>{toy.rating}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>({toy.reviewsCount})</span>
            </span>
          </div>

          {/* Product Title */}
          <h3
            className="product-title"
            onClick={() => navigate('product', { productId: toy.id })}
            title={toy.name}
          >
            {toy.name}
          </h3>

          {/* Short Description (2 Lines Max) */}
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              marginTop: '0.35rem',
              lineHeight: 1.45,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {toy.shortDesc}
          </p>

          {/* Specs Chips: Clean, Uncluttered & Informative */}
          <div
            style={{
              marginTop: '0.65rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem'
            }}
          >
            {toy.scale && (
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '0.18rem 0.5rem',
                  borderRadius: '6px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600
                }}
              >
                {toy.scale}
              </span>
            )}
            {toy.pieces && (
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '0.18rem 0.5rem',
                  borderRadius: '6px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600
                }}
              >
                {toy.pieces}
              </span>
            )}
            <span
              style={{
                fontSize: '0.68rem',
                padding: '0.18rem 0.5rem',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#10b981',
                fontWeight: 700
              }}
            >
              {toy.stock} in stock
            </span>
          </div>
        </div>

        {/* Footer Price & Add Button */}
        <div
          style={{
            paddingTop: '0.85rem',
            marginTop: '0.85rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span
                className="tabular-nums"
                style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-primary)', letterSpacing: '-0.02em' }}
              >
                {formatPrice(toy.price)}
              </span>
              {toy.originalPrice && (
                <span
                  className="tabular-nums"
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'line-through'
                  }}
                >
                  {formatPrice(toy.originalPrice)}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '1px' }}>
              15% off 3+ bundle auto-applied
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(toy, 1)}
            className="btn btn-primary"
            style={{
              padding: '0.55rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              flexShrink: 0
            }}
          >
            <PlusIcon size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

