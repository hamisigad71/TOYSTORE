import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { TOY_PRODUCTS } from '../data/toys';
import { PlusIcon, XIcon, CheckIcon, BagIcon, GiftIcon } from '../components/Icons';

export default function BundlesPage() {
  const { formatPrice, addToCart, showToast, navigate } = useStore();
  const [slotItems, setSlotItems] = useState([
    TOY_PRODUCTS[0],
    TOY_PRODUCTS[3],
    TOY_PRODUCTS[6]
  ]);

  const addToyToSlot = (toy) => {
    if (slotItems.length >= 3) {
      showToast('Your 3-Toy Bundle Box is full! Remove a slot first or click Add Bundle to Bag.', 'info');
      return;
    }
    setSlotItems((prev) => [...prev, toy]);
  };

  const removeSlotIndex = (idx) => {
    setSlotItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const rawBundleTotal = slotItems.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = slotItems.length === 3 ? rawBundleTotal * 0.15 : 0;
  const finalBundlePrice = rawBundleTotal - discountAmount;

  const handleAddCompleteBundle = () => {
    if (slotItems.length < 3) {
      showToast('Select 3 toys to complete your 15% Off Bundle Box!', 'error');
      return;
    }
    slotItems.forEach((item) => addToCart(item, 1));
    showToast('Added your Custom 3-Toy Bundle (15% OFF) to your bag!');
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* Bundle Builder Header & 3 Interactive Slots */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '2px solid var(--brand-primary)',
          borderRadius: '24px',
          padding: '2rem',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <span className="badge badge-red">SIGNATURE MINISO DEAL</span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '0.4rem' }}>
              Build Your Custom 3-Toy Collector Box (Save 15% Instantly)
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Pick any 3 toys below to fill your custom gift crate. Mix die-cast cars, brick builds, or blind boxes!
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Bundle Price ({slotItems.length}/3 Toys Selected)
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--brand-primary)' }}>
                {formatPrice(finalBundlePrice)}
              </span>
              {slotItems.length === 3 && (
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(rawBundleTotal)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3 Visual Box Slots */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
          }}
        >
          {[0, 1, 2].map((slotIdx) => {
            const toy = slotItems[slotIdx];
            return (
              <div
                key={slotIdx}
                style={{
                  minHeight: '115px',
                  borderRadius: '16px',
                  border: toy ? '1px solid var(--border-strong)' : '2px dashed var(--border-strong)',
                  background: toy ? 'var(--bg-elevated)' : 'transparent',
                  padding: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                {toy ? (
                  <>
                    <img
                      src={toy.image}
                      alt={toy.name}
                      style={{ width: 64, height: 64, borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                        SLOT #{slotIdx + 1}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {toy.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {formatPrice(toy.price)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSlotIndex(slotIdx)}
                      className="circle-btn"
                      title="Remove from slot"
                    >
                      <XIcon size={14} />
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', width: '100%', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600 }}>
                    + Empty Slot #{slotIdx + 1} (Click a toy below)
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Complete Bundle Action Bar */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <GiftIcon size={16} />
            <span>Includes complimentary Gents Dollhouse Collector Box packaging!</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setSlotItems([])}
              className="btn btn-secondary"
            >
              Clear Slots
            </button>
            <button
              type="button"
              onClick={handleAddCompleteBundle}
              className="btn btn-primary"
            >
              <BagIcon size={16} />
              <span>
                Add All 3 Toys to Bag (Save {formatPrice(discountAmount)})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Select Toys to Add to Your Bundle */}
      <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '1rem' }}>
        Click Any Toy to Add to Your Bundle Box:
      </h2>
      <div className="product-grid">
        {TOY_PRODUCTS.map((toy) => (
          <div key={toy.id} className="product-card">
            <div className="product-media" style={{ height: '180px' }}>
              <img src={toy.image} alt={toy.name} />
              <div className="product-badges">
                <span className={`badge ${toy.badgeClass || 'badge-red'}`}>{toy.badge}</span>
              </div>
            </div>
            <div className="product-body">
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {toy.roomLabel}
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.94rem', marginTop: '0.2rem' }}>
                  {toy.name}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>
                  {formatPrice(toy.price)}
                </span>
                <button
                  type="button"
                  onClick={() => addToyToSlot(toy)}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                >
                  <PlusIcon size={14} />
                  Add to Box
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

