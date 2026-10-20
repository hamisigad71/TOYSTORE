import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_LOCATIONS, DOLLHOUSE_ROOMS } from '../data/toys';
import { MapPinIcon, CheckIcon, SparklesIcon } from '../components/Icons';

export default function StoresPage() {
  const { bookWorkshop, workshopBookings, navigate, setShopCategory } = useStore();
  const [selectedStore, setSelectedStore] = useState(STORE_LOCATIONS[0].name);
  const [activity, setActivity] = useState('Weekend Brick & Gear Build Table (Free)');
  const [date, setDate] = useState('2026-10-24');
  const [guests, setGuests] = useState('2 Builders');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    const res = bookWorkshop({
      store: selectedStore,
      activity,
      date,
      guests,
      guestName,
      guestPhone
    });
    setConfirmedBooking(res);
    setGuestName('');
    setGuestPhone('');
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-red">PHYSICAL FLAGSHIP &amp; EXPRESS STORES</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.4rem' }}>
          Visit The Gents Dollhouse Stores &amp; Book a Build Table
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '680px', marginTop: '0.25rem' }}>
          Modeled on high-energy Miniso retail stores with bright lighting, hands-on RC drift tracks, mystery capsule walls, and weekend father-son &amp; collector brick workshops.
        </p>
      </div>

      {/* Store Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}
      >
        {STORE_LOCATIONS.map((store) => (
          <div
            key={store.id}
            style={{
              background: 'var(--bg-surface)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ height: '185px', position: 'relative' }}>
                <img
                  src={store.image}
                  alt={store.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-emerald" style={{ position: 'absolute', top: '0.85rem', left: '0.85rem' }}>
                  {store.status}
                </span>
              </div>

              <div style={{ padding: '1.35rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{store.name}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPinIcon size={14} />
                  <span>{store.city} • {store.address}</span>
                </p>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {store.hours} • {store.phone}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.9rem' }}>
                  {store.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.55rem',
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '0 1.35rem 1.35rem' }}>
              <button
                type="button"
                onClick={() => {
                  setSelectedStore(store.name);
                  const el = document.getElementById('workshop-booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-secondary"
                style={{ width: '100%', fontSize: '0.82rem' }}
              >
                Reserve a Build Table at This Branch ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive 6-Floor Architectural Guide + Workshop Reservation Form */}
      <div
        id="workshop-booking"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {/* Left: Flagship Floor Blueprint */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem'
          }}
        >
          <span className="badge badge-amber">ARCHITECTURAL FLOOR DIRECTORY</span>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.4rem' }}>
            Inside Our 6-Floor Flagship Store
          </h2>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginTop: '0.2rem', marginBottom: '1rem' }}>
            Every floor is themed like a room in the ultimate collector’s house:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {DOLLHOUSE_ROOMS.filter((r) => r.id !== 'all')
              .slice()
              .reverse()
              .map((floor) => (
                <div
                  key={floor.id}
                  onClick={() => {
                    setShopCategory(floor.id);
                    navigate('shop', { category: floor.id });
                  }}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    background: 'var(--bg-elevated)',
                    borderLeft: `5px solid ${floor.color}`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.9rem' }}>
                    <span>{floor.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)' }}>Shop Floor →</span>
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {floor.description}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Right: Reserve an In-Store Build Table / Event */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem'
          }}
        >
          <span className="badge badge-blue">IN-STORE EXPERIENCE</span>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.4rem' }}>
            Reserve an In-Store Build Table or RC Track Slot
          </h2>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginTop: '0.2rem', marginBottom: '1.25rem' }}>
            Test RC drift cars, build 3D wooden kits with our staff, or host a wholesome birthday build session.
          </p>

          <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                Select Store Location
              </label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="input-field"
              >
                {STORE_LOCATIONS.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                Select Activity / Station
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="input-field"
              >
                <option>Weekend Brick &amp; Gear Build Table (Free)</option>
                <option>1F Indoor Mini RC Drift Track Session (KSh 500 / 30m)</option>
                <option>4F Blind-Box Collector Trading Night (Free)</option>
                <option>Group / Birthday Toy Build Party (Up to 8 Kids)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Number of Builders
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="input-field"
                >
                  <option>1 Builder</option>
                  <option>2 Builders (e.g. Parent & Child)</option>
                  <option>3–4 Builders</option>
                  <option>5–8 Builders (Party Table)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="input-field"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="input-field"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.4rem' }}>
              Confirm Free Table Reservation
            </button>
          </form>

          {confirmedBooking && (
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid #10b981',
                fontSize: '0.82rem'
              }}
            >
              <strong style={{ color: '#059669' }}>
                Reservation Confirmed ({confirmedBooking.id})!
              </strong>
              <div>
                {confirmedBooking.activity} at {confirmedBooking.store} on {confirmedBooking.date}.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

