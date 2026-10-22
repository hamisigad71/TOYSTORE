import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { TOY_PRODUCTS } from '../data/toys';
import ProductCard from '../components/ProductCard';
import {
  StarIcon,
  HeartIcon,
  CompareIcon,
  CheckIcon,
  TruckIcon,
  ShieldIcon,
  PlusIcon,
  MinusIcon
} from '../components/Icons';

export default function ProductDetailPage() {
  const {
    selectedProductId,
    navigate,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    compareIds,
    toggleCompare,
    reviews,
    addReview
  } = useStore();

  const product =
    TOY_PRODUCTS.find((p) => p.id === selectedProductId) || TOY_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || 'Standard');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews' | 'shipping'

  // Review Form State
  const [revName, setRevName] = useState('');
  const [revTitle, setRevTitle] = useState('');
  const [revComment, setRevComment] = useState('');
  const [revRating, setRevRating] = useState(5);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedVariant(product.variants?.[0] || 'Standard');
    setQty(1);
  }, [product]);

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = TOY_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.room === product.room || p.price <= 25)
  ).slice(0, 4);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    addReview({
      productId: product.id,
      author: revName,
      title: revTitle || 'Great quality toy!',
      comment: revComment,
      rating: Number(revRating)
    });
    setRevName('');
    setRevTitle('');
    setRevComment('');
  };

  const galleryList = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          marginBottom: '1.25rem',
          flexWrap: 'wrap'
        }}
      >
        <button
          type="button"
          onClick={() => navigate('home')}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          Flagship Home
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => navigate('shop', { category: product.room })}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          {product.roomLabel}
        </button>
        <span>/</span>
        <strong style={{ color: 'var(--text-primary)' }}>{product.name}</strong>
      </div>

      {/* Main Product Showcase Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2.5rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {/* Left: Image Gallery */}
        <div>
          <div
            style={{
              height: '390px',
              borderRadius: '18px',
              overflow: 'hidden',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}
          >
            <img
              src={activeImage}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span
              className={`badge ${product.badgeClass || 'badge-red'}`}
              style={{ position: 'absolute', top: '1rem', left: '1rem' }}
            >
              {product.badge}
            </span>
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.85rem' }}>
            {galleryList.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(imgUrl)}
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: activeImage === imgUrl ? '2px solid var(--brand-primary)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  padding: 0,
                  background: 'none'
                }}
              >
                <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
              <span>{product.brand} • {product.roomLabel}</span>
              <span style={{ color: 'var(--text-muted)' }}>SKU: {product.sku}</span>
            </div>

            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '0.35rem', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.6rem', fontSize: '0.84rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontWeight: 700 }}>
                <StarIcon size={16} filled />
                <strong style={{ color: 'var(--text-primary)' }}>{product.rating}</strong>
                <span style={{ color: 'var(--text-secondary)' }}>({product.reviewsCount} verified reviews)</span>
              </span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>
                ● In Stock ({product.stock} units ready to ship)
              </span>
            </div>

            {/* Price Block */}
            <div
              style={{
                marginTop: '1.1rem',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                background: 'var(--bg-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--brand-primary)' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="badge badge-emerald">
                Eligible for 3-Toy 15% Bundle
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.6 }}>
              {product.shortDesc}
            </p>

            {/* Edition / Variant Selector */}
            {product.variants && (
              <div style={{ marginTop: '1.15rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.45rem' }}>
                  Edition / Colorway: <span style={{ color: 'var(--brand-primary)' }}>{selectedVariant}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: selectedVariant === v ? '2px solid var(--brand-primary)' : '1px solid var(--border-strong)',
                        background: selectedVariant === v ? 'var(--brand-primary-soft)' : 'var(--bg-surface)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Highlights */}
            <div style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {product.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem' }}>
                  <span style={{ color: '#10b981' }}>
                    <CheckIcon size={15} />
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Bag + Buy Now */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              {/* Qty Selector */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-strong)',
                  borderRadius: '12px',
                  padding: '0.3rem'
                }}
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="circle-btn"
                  style={{ border: 'none' }}
                >
                  <MinusIcon size={14} />
                </button>
                <span style={{ minWidth: 34, textAlign: 'center', fontWeight: 800 }}>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="circle-btn"
                  style={{ border: 'none' }}
                >
                  <PlusIcon size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product, qty, selectedVariant)}
                className="btn btn-primary"
                style={{ flex: 1, minWidth: '170px', padding: '0.85rem' }}
              >
                + Add to Shopping Bag ({formatPrice(product.price * qty)})
              </button>

              <button
                type="button"
                onClick={() => {
                  addToCart(product, qty, selectedVariant);
                  navigate('checkout');
                }}
                className="btn btn-dark"
                style={{ padding: '0.85rem 1.25rem' }}
              >
                Buy Now →
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="icon-btn"
                title="Save to Wishlist"
              >
                <HeartIcon size={17} filled={wishlist.includes(product.id)} />
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(product.id)}
                className="icon-btn"
                title="Compare Specs"
              >
                <CompareIcon size={17} />
              </button>
            </div>

            {/* Store Pickup & Safety Assurance */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
                marginTop: '1rem',
                fontSize: '0.76rem',
                color: 'var(--text-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <TruckIcon size={15} />
                <span>Free Express Delivery over KSh 4,500 or 30-Min Runda Mall 3F Pickup</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <ShieldIcon size={15} />
                <span>ASTM F963 & EN71 Certified Non-Toxic Materials</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS: Technical Specifications & Customer Reviews */}
      <div
        style={{
          marginTop: '2.5rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '1.75rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          {[
            { id: 'specs', label: 'Full Technical Specifications' },
            { id: 'reviews', label: `Customer Reviews (${productReviews.length + product.reviewsCount})` }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`nav-link ${activeTab === t.id ? 'active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'specs' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'SKU Number', value: product.sku },
              { label: 'Brand / Maker', value: product.brand },
              { label: 'Store Department', value: product.roomLabel },
              { label: 'Recommended Age', value: `Ages ${product.age} (${product.ageGroup} Group)` },
              { label: 'Scale / Format', value: product.scale },
              { label: 'Pieces / Action', value: product.pieces },
              { label: 'Primary Material', value: product.material },
              { label: 'Product Dimensions', value: product.dimensions },
              { label: 'Safety Certification', value: 'ASTM F963 / CE EN71 Certified Wholesome Toy' }
            ].map((spec) => (
              <div
                key={spec.label}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {spec.label}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, marginTop: '0.2rem' }}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            {/* Existing Reviews */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                Verified Collector & Parent Feedback
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {productReviews.length === 0 ? (
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    Be the first to write a featured review for {product.name}!
                  </p>
                ) : (
                  productReviews.map((r) => (
                    <div
                      key={r.id}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <strong>{r.author}</strong>
                        <span style={{ color: '#d0106f', fontWeight: 700 }}>{r.rating} / 5 Rating</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', marginTop: '0.25rem' }}>{r.title}</div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        {r.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Write a Review Form */}
            <form
              onSubmit={handleReviewSubmit}
              style={{
                padding: '1.25rem',
                background: 'var(--bg-elevated)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Write a Customer Review</h4>
              <input
                type="text"
                required
                placeholder="Your Name (e.g. Daniel K.)"
                value={revName}
                onChange={(e) => setRevName(e.target.value)}
                className="input-field"
              />
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Rating:</label>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(e.target.value)}
                  className="input-field"
                  style={{ width: 'auto' }}
                >
                  <option value={5}>5 / 5 Stars</option>
                  <option value={4}>4 / 5 Stars</option>
                  <option value={3}>3 / 5 Stars</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Review Headline"
                value={revTitle}
                onChange={(e) => setRevTitle(e.target.value)}
                className="input-field"
              />
              <textarea
                rows={3}
                required
                placeholder="Share your experience with build quality, scale details, or play value..."
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
                className="input-field"
              />
              <button type="submit" className="btn btn-primary">
                Publish Verified Review
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Related Toys */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Frequently Bought Together on {product.roomLabel}
        </h3>
        <div className="product-grid">
          {relatedProducts.map((toy) => (
            <ProductCard key={toy.id} toy={toy} />
          ))}
        </div>
      </div>
    </div>
  );
}

