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
      {/* Top Media & Overlays */}
      <div className="product-media">
        <img
          src={toy.image}
          alt={toy.name}
          loading="lazy"
          onClick={() => navigate('product', { productId: toy.id })}
          style={{ cursor: 'pointer' }}
        />

        {/* Left Badges */}
        <div className="product-badges">
          <span className={`badge ${toy.badgeClass || 'badge-red'}`}>
            {toy.badge}
          </span>
          <span className="badge badge-dark">
            Ages {toy.age} • {toy.scale}
          </span>
        </div>

        {/* Right Quick Action Circles */}
        <div className="product-actions-overlay">
          <button
            type="button"
            onClick={() => toggleWishlist(toy.id)}
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            className={`circle-btn ${isWishlisted ? 'active' : ''}`}
          >
            <HeartIcon size={15} filled={isWishlisted} />
          </button>
          <button
            type="button"
            onClick={() => setQuickViewProduct(toy)}
            title="Quick View Specs"
            className="circle-btn"
          >
            <EyeIcon size={15} />
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(toy.id)}
            title="Compare Toy Specs"
            className={`circle-btn ${isCompared ? 'active' : ''}`}
          >
            <CompareIcon size={15} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="product-body">
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.73rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '0.3rem'
            }}
          >
            <span>{toy.roomLabel}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b' }}>
              <StarIcon size={13} filled />
              <strong style={{ color: 'var(--text-primary)' }}>{toy.rating}</strong>
              <span style={{ color: 'var(--text-muted)' }}>({toy.reviewsCount})</span>
            </span>
          </div>

          <h3
            className="product-title"
            onClick={() => navigate('product', { productId: toy.id })}
          >
            {toy.name}
          </h3>

          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              marginTop: '0.35rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {toy.shortDesc}
          </p>

          <div
            style={{
              marginTop: '0.55rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem'
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px',
                background: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}
            >
              {toy.pieces}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px',
                background: 'var(--bg-elevated)',
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
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                {formatPrice(toy.price)}
              </span>
              {toy.originalPrice && (
                <span
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
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Eligible for 3-for-15% Bundle
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(toy, 1)}
            className="btn btn-primary"
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.8rem' }}
          >
            <PlusIcon size={15} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

