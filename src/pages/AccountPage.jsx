import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { TOY_PRODUCTS } from '../data/toys';
import ProductCard from '../components/ProductCard';
import { CheckIcon, BagIcon, GiftIcon, HeartIcon } from '../components/Icons';

export default function AccountPage() {
  const {
    orders,
    wishlist,
    unboxedVault,
    workshopBookings,
    formatPrice,
    addToCart,
    navigate
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'vault' | 'bookings'
  const [trackingQuery, setTrackingQuery] = useState('');

  const wishlistedToys = TOY_PRODUCTS.filter((p) => wishlist.includes(p.id));
  const filteredOrders = orders.filter(
    (o) => !trackingQuery.trim() || o.id.toLowerCase().includes(trackingQuery.toLowerCase())
  );

  const handleMoveWishlistToBag = () => {
    wishlistedToys.forEach((toy) => addToCart(toy, 1));
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* Header */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '1.75rem',
          marginBottom: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div>
          <span className="badge badge-blue">COLLECTOR MEMBER HUB</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '0.35rem' }}>
            My Orders, Saved Wishlist & Mystery Vault
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Track active toy deliveries, manage your saved wishlist, or view figures unboxed in the 4F Studio.
          </p>
        </div>

        {/* Section Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            { id: 'orders', label: `Orders & Tracking (${orders.length})` },
            { id: 'wishlist', label: `Saved Wishlist (${wishlistedToys.length})` },
            { id: 'vault', label: `Unboxed Vault (${unboxedVault.length})` },
            { id: 'bookings', label: `Store Workshops (${workshopBookings.length})` }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`nav-link ${activeTab === t.id ? 'active' : ''}`}
              style={{
                border: '1px solid var(--border-color)',
                background: activeTab === t.id ? 'var(--brand-primary)' : 'var(--bg-elevated)'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: ORDERS & LIVE TRACKING */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ maxWidth: '400px' }}>
            <input
              type="text"
              value={trackingQuery}
              onChange={(e) => setTrackingQuery(e.target.value)}
              placeholder="Lookup Order ID (e.g. TGD-84910)..."
              className="input-field"
            />
          </div>

          {filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '18px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <span className="badge badge-emerald">{order.status}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '0.35rem' }}>
                    Order #{order.id} • Placed {order.date}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {order.deliveryMethod} • {order.paymentMethod}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Order Total</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--brand-primary)' }}>
                    {formatPrice(order.total)}
                  </div>
                </div>
              </div>

              {/* 4-Step Visual Delivery Tracker */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.6rem',
                  margin: '1.25rem 0'
                }}
              >
                {[
                  { label: '1. Order Confirmed', done: true },
                  { label: '2. Quality Checked & Packed', done: true },
                  { label: '3. Dispatched / Ready', done: true },
                  { label: '4. Delivered to Collector', done: order.status === 'Delivered' }
                ].map((stage) => (
                  <div
                    key={stage.label}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '10px',
                      background: stage.done ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-elevated)',
                      border: stage.done ? '1px solid #10b981' : '1px solid var(--border-color)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: stage.done ? '#059669' : 'var(--text-muted)'
                    }}
                  >
                    {stage.done ? '[Done] ' : '[Pending] '}
                    {stage.label}
                  </div>
                ))}
              </div>

              {/* Order Line Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.84rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <span>
                      <strong>{item.qty}x</strong> {item.name}
                    </span>
                    <strong>{formatPrice(item.price * item.qty)}</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SAVED WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistedToys.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-surface)', borderRadius: '18px' }}>
              <HeartIcon size={40} />
              <h3 style={{ marginTop: '0.75rem', fontWeight: 800 }}>No Saved Wishlist Toys Yet</h3>
              <button
                type="button"
                onClick={() => navigate('shop')}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Explore Toys
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Your Saved Collector Wishlist ({wishlistedToys.length})
                </h3>
                <button type="button" onClick={handleMoveWishlistToBag} className="btn btn-primary">
                  <BagIcon size={16} />
                  <span>Add All Wishlist Toys to Bag</span>
                </button>
              </div>
              <div className="product-grid">
                {wishlistedToys.map((toy) => (
                  <ProductCard key={toy.id} toy={toy} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 3: UNBOXED MYSTERY CAPSULE VAULT */}
      {activeTab === 'vault' && (
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Your 4F Mystery Capsule Unboxed Vault ({unboxedVault.length})
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Every blind-box figure you reveal in the Mystery Studio is logged here.
              </p>
            </div>
            <button type="button" onClick={() => navigate('blindbox')} className="btn btn-primary">
              <GiftIcon size={16} />
              <span>Unbox Another Capsule</span>
            </button>
          </div>

          {unboxedVault.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              You haven’t unboxed any mystery capsules yet! Visit the Mystery Capsule Studio to test your luck.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {unboxedVault.map((pull) => (
                <div
                  key={pull.pullId}
                  style={{
                    padding: '1.1rem',
                    borderRadius: '14px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontSize: '2.2rem' }}>{pull.emoji}</div>
                  <div style={{ fontWeight: 800, marginTop: '0.35rem' }}>{pull.name}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--brand-primary)', fontWeight: 700 }}>
                    {pull.rarity}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {pull.seriesName} • Est. {pull.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: BOOKED IN-STORE WORKSHOPS */}
      {activeTab === 'bookings' && (
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem'
          }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Your In-Store Build Table & RC Track Reservations
          </h3>
          {workshopBookings.length === 0 ? (
            <div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                No active table reservations yet.
              </p>
              <button
                type="button"
                onClick={() => navigate('stores')}
                className="btn btn-secondary"
                style={{ marginTop: '0.85rem' }}
              >
                Book a Free Build Session →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {workshopBookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <div>
                    <strong>{b.activity}</strong> ({b.id})
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {b.store} • Date: {b.date} • {b.guests}
                    </div>
                  </div>
                  <span className="badge badge-emerald">CONFIRMED</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

