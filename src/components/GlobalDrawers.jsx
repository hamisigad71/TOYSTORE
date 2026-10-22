import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { TOY_PRODUCTS } from '../data/toys';
import {
  XIcon,
  PlusIcon,
  MinusIcon,
  BagIcon,
  CheckIcon,
  SparklesIcon,
  CompareIcon
} from './Icons';

export default function GlobalDrawers() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    cartCount,
    cartSubtotal,
    bundleEligible,
    bundleDiscount,
    promoDiscount,
    appliedPromo,
    applyPromoCode,
    setAppliedPromo,
    cartTotal,
    formatPrice,
    navigate,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isCompareOpen,
    setIsCompareOpen,
    compareIds,
    toggleCompare,
    toast
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [selectedQuickVariant, setSelectedQuickVariant] = useState('');

  const comparedProducts = TOY_PRODUCTS.filter((p) => compareIds.includes(p.id));

  return (
    <>
      {/* 1. SLIDE-OUT SHOPPING BAG DRAWER */}
      {isCartOpen && (
        <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                background: 'var(--brand-navy)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}>
                <BagIcon size={20} />
                <span>Your Shopping Bag ({cartCount})</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none',
                  color: '#fff',
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <XIcon size={16} />
              </button>
            </div>

            {/* Miniso 3-Toy Bundle Progress Banner */}
            <div
              style={{
                padding: '0.9rem 1.5rem',
                background: bundleEligible ? 'rgba(16, 185, 129, 0.14)' : 'var(--brand-primary-soft)',
                borderBottom: '1px solid var(--border-color)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '0.4rem'
                }}
              >
                {bundleEligible ? (
                  <span style={{ color: '#059669' }}>
                    Miniso 3-Toy Bundle Active (15% Off Applied)
                  </span>
                ) : (
                  <span>
                    Add <strong>{3 - cartCount}</strong> more toy{3 - cartCount === 1 ? '' : 's'} for{' '}
                    <strong style={{ color: 'var(--brand-primary)' }}>15% OFF Bundle</strong>
                  </span>
                )}
                <span>{Math.min(cartCount, 3)}/3</span>
              </div>
              <div
                style={{
                  height: 7,
                  background: 'var(--bg-surface)',
                  borderRadius: 999,
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min((cartCount / 3) * 100, 100)}%`,
                    background: bundleEligible ? '#10b981' : 'var(--brand-primary)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                  <BagIcon size={44} />
                  <h4 style={{ marginTop: '0.75rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Your Toy Bag is Empty
                  </h4>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>
                    Explore our 6 departments or unbox a KSh 1,290 Mystery Capsule!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('shop');
                    }}
                    className="btn btn-primary"
                    style={{ marginTop: '1.25rem' }}
                  >
                    Browse All Toys
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedVariant}`}
                      style={{
                        display: 'flex',
                        gap: '0.85rem',
                        padding: '0.85rem',
                        borderRadius: '12px',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 68,
                          height: 68,
                          borderRadius: '10px',
                          objectFit: 'cover',
                          flexShrink: 0
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>
                          Edition: {item.selectedVariant}
                        </div>
                        <div
                          style={{
                            marginTop: '0.45rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span style={{ fontWeight: 800, color: 'var(--brand-primary)', fontSize: '0.92rem' }}>
                            {formatPrice(item.price * item.quantity)}
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, item.selectedVariant, -1)}
                              className="circle-btn"
                              style={{ width: 26, height: 26 }}
                            >
                              <MinusIcon size={12} />
                            </button>
                            <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: 20, textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, item.selectedVariant, 1)}
                              className="circle-btn"
                              style={{ width: 26, height: 26 }}
                            >
                              <PlusIcon size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Summary & Checkout Button */}
            {cart.length > 0 && (
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  borderTop: '1px solid var(--border-color)',
                  background: 'var(--bg-surface)'
                }}
              >
                {/* Promo Code Input */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.9rem' }}>
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (MINISO15, GENTS20)"
                    className="input-field"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (applyPromoCode(promoInput)) setPromoInput('');
                    }}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 0.9rem', fontSize: '0.8rem' }}
                  >
                    Apply
                  </button>
                </div>

                <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  {bundleEligible && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                      <span>3-Toy Bundle Discount (15%)</span>
                      <span>-{formatPrice(bundleDiscount)}</span>
                    </div>
                  )}
                  {appliedPromo && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb', fontWeight: 700 }}>
                      <span>
                        Promo ({appliedPromo.code}){' '}
                        <button
                          type="button"
                          onClick={() => setAppliedPromo(null)}
                          style={{
                            border: 'none',
                            background: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '0.72rem'
                          }}
                        >
                          [Remove]
                        </button>
                      </span>
                      <span>-{formatPrice(promoDiscount)}</span>
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      paddingTop: '0.5rem',
                      borderTop: '1px solid var(--border-color)',
                      marginTop: '0.25rem'
                    }}
                  >
                    <span>Estimated Total</span>
                    <span style={{ color: 'var(--brand-primary)' }}>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('checkout');
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem' }}
                  >
                    Proceed to Full Checkout →
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* 2. QUICK-VIEW PRODUCT MODAL */}
      {quickViewProduct && (
        <div className="backdrop" onClick={() => setQuickViewProduct(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-surface)',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              maxWidth: '780px',
              width: '100%',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ background: 'var(--bg-elevated)', minHeight: '300px', position: 'relative' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                className={`badge ${quickViewProduct.badgeClass || 'badge-red'}`}
                style={{ position: 'absolute', top: '1rem', left: '1rem' }}
              >
                {quickViewProduct.badge}
              </span>
            </div>

            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                    {quickViewProduct.roomLabel} • SKU: {quickViewProduct.sku}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(null)}
                    className="circle-btn"
                  >
                    <XIcon size={15} />
                  </button>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.4rem' }}>
                  {quickViewProduct.name}
                </h3>

                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-primary)', marginTop: '0.4rem' }}>
                  {formatPrice(quickViewProduct.price)}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.6rem' }}>
                  {quickViewProduct.shortDesc}
                </p>

                {/* Variant Picker */}
                {quickViewProduct.variants && (
                  <div style={{ marginTop: '0.9rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Select Edition / Colorway:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {quickViewProduct.variants.map((v) => {
                        const active = (selectedQuickVariant || quickViewProduct.variants[0]) === v;
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setSelectedQuickVariant(v)}
                            style={{
                              padding: '0.3rem 0.7rem',
                              borderRadius: '8px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              border: active ? '2px solid var(--brand-primary)' : '1px solid var(--border-strong)',
                              background: active ? 'var(--brand-primary-soft)' : 'var(--bg-elevated)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <ul style={{ marginTop: '0.9rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {quickViewProduct.features.slice(0, 3).map((f, i) => (
                    <li key={i} style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                      <CheckIcon size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(
                      quickViewProduct,
                      1,
                      selectedQuickVariant || quickViewProduct.variants?.[0]
                    );
                    setQuickViewProduct(null);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  + Add to Bag
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = quickViewProduct.id;
                    setQuickViewProduct(null);
                    navigate('product', { productId: id });
                  }}
                  className="btn btn-secondary"
                >
                  Full Product Page →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SIDE-BY-SIDE PRODUCT COMPARE MODAL */}
      {isCompareOpen && (
        <div className="backdrop" onClick={() => setIsCompareOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-surface)',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              maxWidth: '1020px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CompareIcon size={20} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Side-by-Side Toy Specification Comparison ({comparedProducts.length}/4)
                </h3>
              </div>
              <button type="button" onClick={() => setIsCompareOpen(false)} className="circle-btn">
                <XIcon size={16} />
              </button>
            </div>

            {comparedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-secondary)' }}>
                Click the Compare icon on any product card to compare up to 4 toys side-by-side.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                        Feature
                      </th>
                      {comparedProducts.map((p) => (
                        <th
                          key={p.id}
                          style={{
                            textAlign: 'left',
                            padding: '0.75rem',
                            borderBottom: '1px solid var(--border-color)',
                            minWidth: '190px'
                          }}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '10px' }}
                          />
                          <div style={{ marginTop: '0.5rem', fontWeight: 800 }}>{p.name}</div>
                          <button
                            type="button"
                            onClick={() => toggleCompare(p.id)}
                            style={{
                              marginTop: '0.25rem',
                              fontSize: '0.72rem',
                              color: '#ef4444',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Remove
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Price', render: (p) => <strong style={{ color: 'var(--brand-primary)' }}>{formatPrice(p.price)}</strong> },
                      { label: 'Floor / Dept', render: (p) => p.roomLabel },
                      { label: 'Age Rating', render: (p) => `Ages ${p.age}` },
                      { label: 'Scale / Size', render: (p) => p.scale },
                      { label: 'Pieces / Build', render: (p) => p.pieces },
                      { label: 'Material', render: (p) => p.material },
                      { label: 'Dimensions', render: (p) => p.dimensions },
                      { label: 'Rating', render: (p) => `${p.rating} / 5 (${p.reviewsCount} reviews)` }
                    ].map((row) => (
                      <tr key={row.label}>
                        <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                          {row.label}
                        </td>
                        {comparedProducts.map((p) => (
                          <td key={p.id} style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                            {row.render(p)}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td style={{ padding: '0.75rem' }}>Action</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} style={{ padding: '0.75rem' }}>
                          <button
                            type="button"
                            onClick={() => addToCart(p, 1)}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '0.5rem', fontSize: '0.78rem' }}
                          >
                            + Add to Bag
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. FLOATING TOAST NOTIFICATION */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 300,
            background: toast.type === 'error' ? '#be123c' : '#0f172a',
            color: '#fff',
            padding: '0.85rem 1.25rem',
            borderRadius: '14px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.86rem',
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          <SparklesIcon size={16} />
          <span>{toast.message}</span>
        </div>
      )}
    </>
  );
}

