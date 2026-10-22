import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_LOCATIONS } from '../data/toys';
import {
  CheckIcon,
  TruckIcon,
  ShieldIcon,
  GiftIcon,
  BagIcon
} from '../components/Icons';

export default function CheckoutPage() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    bundleEligible,
    bundleDiscount,
    promoDiscount,
    appliedPromo,
    applyPromoCode,
    giftWrap,
    setGiftWrap,
    giftNote,
    setGiftNote,
    shippingFee,
    cartTotal,
    formatPrice,
    placeOrder,
    navigate
  } = useStore();

  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment & Gift, 3: Receipt
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  const [formData, setFormData] = useState({
    firstName: 'Hamisi',
    lastName: 'Collector',
    email: 'customer@gentsdollhouse.com',
    phone: '+254 700 123 456',
    deliveryMethod: 'Express Home Delivery (1-2 Days)',
    pickupBranch: STORE_LOCATIONS[0].name,
    address: 'Suite 4B, Riverside Drive',
    city: 'Nairobi',
    paymentMethod: 'M-Pesa / Mobile Money Express'
  });

  const handleField = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const order = placeOrder(formData);
    setCompletedOrder(order);
    setStep(3);
  };

  if (step === 3 && completedOrder) {
    return (
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '780px' }}>
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '2px solid #10b981',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#10b981', fontWeight: 800 }}>
            <CheckIcon size={28} />
            <span style={{ fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Official Toy Store Order Confirmation
            </span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.5rem' }}>
            Thank You, {completedOrder.customerName}!
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Order <strong>#{completedOrder.id}</strong> has been sent to our packing station. You can track its live status anytime on your Orders page.
          </p>

          {/* Receipt Metadata */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1rem',
              margin: '1.5rem 0',
              padding: '1.25rem',
              borderRadius: '16px',
              background: 'var(--bg-elevated)',
              fontSize: '0.82rem'
            }}
          >
            <div>
              <div style={{ color: 'var(--text-secondary)' }}>Order Number</div>
              <strong style={{ fontSize: '0.95rem' }}>{completedOrder.id}</strong>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)' }}>Delivery Method</div>
              <strong>{completedOrder.deliveryMethod}</strong>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)' }}>Payment Method</div>
              <strong>{completedOrder.paymentMethod}</strong>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)' }}>Total Paid</div>
              <strong style={{ color: 'var(--brand-primary)', fontSize: '0.98rem' }}>
                {formatPrice(completedOrder.total)}
              </strong>
            </div>
          </div>

          {/* Items Purchased */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Items in Your Toy Box:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {completedOrder.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <span>
                    <strong>{item.qty}x</strong> {item.name} ({item.variant})
                  </span>
                  <strong>{formatPrice(item.price * item.qty)}</strong>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => navigate('account')}
              className="btn btn-primary"
            >
              Track Live Order Status →
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-secondary"
            >
              Print Official Receipt
            </button>
            <button
              type="button"
              onClick={() => navigate('shop')}
              className="btn btn-secondary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <BagIcon size={48} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.75rem' }}>
          Your Checkout Bag is Empty
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
          Add some die-cast cars, brick builds, or mystery capsules before checking out!
        </p>
        <button
          type="button"
          onClick={() => navigate('shop')}
          className="btn btn-primary"
          style={{ marginTop: '1.25rem' }}
        >
          Browse Store Catalog →
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      <h1 style={{ fontSize: '1.85rem', fontWeight: 900, marginBottom: '1.25rem' }}>
        Secure Toy Store Checkout ({cartCount} Items)
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        {/* Left: Step 1 & Step 2 Checkout Form */}
        <form
          onSubmit={handleCompleteOrder}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          {/* Step Indicator */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`btn ${step === 1 ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, fontSize: '0.82rem' }}
            >
              1. Contact & Delivery
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`btn ${step === 2 ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, fontSize: '0.82rem' }}
            >
              2. Gift Options & Payment
            </button>
          </div>

          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                Step 1: Customer Contact & Fulfillment
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleField('firstName', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleField('lastName', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Email for Receipt</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleField('email', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Phone (SMS Updates)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleField('phone', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Delivery vs Free Store Pickup */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Select Fulfillment Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    'Express Home Delivery (1-2 Days)',
                    'Free In-Store Pickup (Ready in 30 Mins)'
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => handleField('deliveryMethod', method)}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '12px',
                        border:
                          formData.deliveryMethod === method
                            ? '2px solid var(--brand-primary)'
                            : '1px solid var(--border-color)',
                        background:
                          formData.deliveryMethod === method
                            ? 'var(--brand-primary-soft)'
                            : 'var(--bg-elevated)',
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {formData.deliveryMethod.includes('Pickup') ? (
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Select Pickup Store</label>
                  <select
                    value={formData.pickupBranch}
                    onChange={(e) => handleField('pickupBranch', e.target.value)}
                    className="input-field"
                  >
                    {STORE_LOCATIONS.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.city})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Street / Building Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleField('address', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>City / Town</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleField('city', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-primary"
                style={{ marginTop: '0.5rem' }}
              >
                Continue to Gift Wrap & Payment →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                Step 2: Collector Gift Wrap & Payment Method
              </h3>

              {/* Gift Wrap Option */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.86rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    style={{ width: 17, height: 17, accentColor: 'var(--brand-primary)' }}
                  />
                  <GiftIcon size={16} />
                  <span>Add Signature Gents Dollhouse Gift Wrap & Ribbon (+{formatPrice(3.99)})</span>
                </label>

                {giftWrap && (
                  <input
                    type="text"
                    placeholder="Optional gift card message (e.g. Happy 8th Birthday Leo!)"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="input-field"
                    style={{ marginTop: '0.65rem' }}
                  />
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.45rem' }}>
                  Choose Payment Method
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {[
                    'M-Pesa / Mobile Money Express',
                    'Credit or Debit Card (Visa / Mastercard)',
                    'Pay on Delivery / In-Store Counter'
                  ].map((pm) => (
                    <label
                      key={pm}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border:
                          formData.paymentMethod === pm
                            ? '2px solid var(--brand-primary)'
                            : '1px solid var(--border-color)',
                        background:
                          formData.paymentMethod === pm
                            ? 'var(--brand-primary-soft)'
                            : 'var(--bg-elevated)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === pm}
                        onChange={() => handleField('paymentMethod', pm)}
                        style={{ accentColor: 'var(--brand-primary)' }}
                      />
                      <span>{pm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.9rem' }}
                >
                  Complete Order ({formatPrice(cartTotal)})
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Right: Order Summary Box */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
            Order Summary ({cartCount} Toys)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', marginBottom: '1rem' }}>
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedVariant}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', fontSize: '0.83rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 46, height: 46, borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      Qty: {item.quantity} • {item.selectedVariant}
                    </div>
                  </div>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>

          {/* Promo Input */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              placeholder="Promo code (MINISO15, WELCOME10)"
              className="input-field"
              style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
            />
            <button
              type="button"
              onClick={() => {
                if (applyPromoCode(promoCodeInput)) setPromoCodeInput('');
              }}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
            >
              Apply
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>
            {bundleEligible && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                <span>Miniso 3-Toy Bundle (15% Off)</span>
                <span>-{formatPrice(bundleDiscount)}</span>
              </div>
            )}
            {appliedPromo && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb', fontWeight: 700 }}>
                <span>Promo ({appliedPromo.code})</span>
                <span>-{formatPrice(promoDiscount)}</span>
              </div>
            )}
            {giftWrap && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Collector Gift Wrap</span>
                <strong>{formatPrice(3.99)}</strong>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
              <strong>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</strong>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.18rem',
                fontWeight: 900,
                paddingTop: '0.65rem',
                borderTop: '1px solid var(--border-color)',
                marginTop: '0.3rem'
              }}
            >
              <span>Total</span>
              <span style={{ color: 'var(--brand-primary)' }}>{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

