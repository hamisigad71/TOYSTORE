import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  DOLLHOUSE_ROOMS,
  TOY_PRODUCTS,
  FAQ_ITEMS
} from '../data/toys';
import ProductCard from '../components/ProductCard';
import {
  ArrowRightIcon
} from '../components/Icons';

const PLINTH_SPECIMENS = [
  {
    productId: 'tgd-001',
    shortName: 'Apex GT-R 1:24 Racer',
    floorTag: '1F Speed Garage',
    fieldBg: '#fed878',
    fact: 'Zinc-alloy body, opening gullwing doors, working LED headlights'
  },
  {
    productId: 'tgd-003',
    shortName: 'Steampunk Locomotive 880-Pc',
    floorTag: '2F Brick & Gear Lab',
    fieldBg: '#97aaf6',
    fact: '880 precision bricks with linked moving steam piston rods'
  },
  {
    productId: 'tgd-002',
    shortName: 'Titan Mecha 32-Joint Figure',
    floorTag: '3F Hero & Mecha Vault',
    fieldBg: '#6ef8fb',
    fact: '32 articulated joints, snap booster pack and display flight stand'
  },
  {
    productId: 'tgd-004',
    shortName: 'Mystery Garage Capsule S4',
    floorTag: '4F Mystery Capsule Alley',
    fieldBg: '#bbf697',
    fact: '1 of 12 collectible vinyl racers with 1:72 Gold Chase odds'
  },
  {
    productId: 'tgd-007',
    shortName: 'Magnetic Pro Speed Cube 3x3',
    floorTag: '5F Tabletop & Retro Den',
    fieldBg: '#fed878',
    fact: '48 internal snap-aligning magnets and dual-spring tension core'
  },
  {
    productId: 'tgd-012',
    shortName: 'SkyHover Pocket Mini Drone',
    floorTag: 'Roof Sky Arena',
    fieldBg: '#97aaf6',
    fact: 'Barometric altitude hold, 360 safety cage and 2 modular batteries'
  }
];

export default function HomePage() {
  const { navigate, setShopCategory, formatPrice, addToCart } = useStore();
  const [specimenIdx, setSpecimenIdx] = useState(0);
  const [activeFloorId, setActiveFloorId] = useState('garage');
  const [homeTab, setHomeTab] = useState('all');
  const [receiptIds, setReceiptIds] = useState(['tgd-001', 'tgd-004', 'tgd-007']);

  // Signature slow-crossfade every 5.5s per taste-skill motion spec
  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) {
        setSpecimenIdx((prev) => (prev + 1) % PLINTH_SPECIMENS.length);
      }
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentSpec = PLINTH_SPECIMENS[specimenIdx];
  const specimenProduct =
    TOY_PRODUCTS.find((p) => p.id === currentSpec.productId) || TOY_PRODUCTS[0];

  const displayedToys =
    homeTab === 'all'
      ? TOY_PRODUCTS.slice(0, 8)
      : TOY_PRODUCTS.filter((p) => p.room === homeTab);

  const toggleReceiptItem = (id) => {
    setReceiptIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const receiptProducts = TOY_PRODUCTS.filter((p) => receiptIds.includes(p.id));
  const receiptSubtotal = receiptProducts.reduce((sum, p) => sum + p.price, 0);
  const receiptDiscount = receiptProducts.length >= 3 ? receiptSubtotal * 0.15 : 0;
  const receiptTotal = receiptSubtotal - receiptDiscount;

  return (
    <div>
      {/* 1. TASTESKILL HERO: Architectural Collector Stage & Interactive Specimen Plinth */}
      <section className="container tasteskill-hero">
        {/* Masthead Header + Storefront Metrics */}
        <div className="tasteskill-hero-top">
          <div>
            <h1 className="tasteskill-wordmark">
              THE GENTS DOLLHOUSE
            </h1>
            <p
              style={{
                fontSize: '1.08rem',
                color: 'var(--text-secondary)',
                maxWidth: '60ch',
                lineHeight: 1.55,
                marginTop: '1rem'
              }}
            >
              Nairobi&apos;s multi-floor collector toy emporium. Explore die-cast zinc-alloy supercars, 880-piece mechanical brick builds, 32-joint mecha figures, and Miniso-style mystery capsules—all priced in Kenyan Shillings (KSh).
            </p>
          </div>

          {/* Right Masthead: Quick Action & Storefront Highlights */}
          <div className="hero-masthead-card">
            <div className="hero-masthead-metrics">
              <div className="hero-metric-box">
                <span className="hero-metric-label">Flagship Store</span>
                <strong className="hero-metric-value">Runda Mall, 3F</strong>
                <span className="hero-metric-sub">30-Min Counter Pickup</span>
              </div>
              <div className="hero-metric-box">
                <span className="hero-metric-label">Collector Range</span>
                <strong className="hero-metric-value tabular-nums">KSh 2,340+</strong>
                <span className="hero-metric-sub">100% Authentic Models</span>
              </div>
              <div className="hero-metric-box">
                <span className="hero-metric-label">Multi-Buy Deal</span>
                <strong className="hero-metric-value" style={{ color: 'var(--brand-primary)' }}>15% Off 3+</strong>
                <span className="hero-metric-sub">Auto-Applied in Bag</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => navigate('shop')}
                className="btn btn-primary"
                style={{ flex: '1 1 auto' }}
              >
                <span>Browse All 16 Toys</span>
                <ArrowRightIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate('blindbox')}
                className="btn btn-secondary"
                style={{ flex: '1 1 auto' }}
              >
                <span>Open Mystery Studio</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('rooms')}
                className="btn btn-secondary"
              >
                <span>6-Floor Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Interactive Collector Stage: Left Specimen Deck + Right Wide Pastel Plinth */}
        <div className="tasteskill-hero-stage">
          {/* Left Column: Interactive Specimen Selector Deck */}
          <div className="hero-specimen-deck">
            <div className="hero-deck-header">
              <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                Select Floor Specimen (0{specimenIdx + 1} / 0{PLINTH_SPECIMENS.length})
              </span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {PLINTH_SPECIMENS.map((s, i) => (
                  <button
                    key={s.productId}
                    type="button"
                    aria-label={`Select specimen ${i + 1}`}
                    onClick={() => setSpecimenIdx(i)}
                    style={{
                      width: i === specimenIdx ? '22px' : '8px',
                      height: '8px',
                      border: 'none',
                      background: i === specimenIdx ? s.fieldBg : 'var(--bg-elevated)',
                      cursor: 'pointer',
                      transition: 'width 160ms ease, background-color 160ms ease'
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="tasteskill-specimen-list" role="tablist" aria-label="Featured toy specimens">
              {PLINTH_SPECIMENS.map((spec, idx) => {
                const isSelected = idx === specimenIdx;
                const itemProduct = TOY_PRODUCTS.find((p) => p.id === spec.productId) || TOY_PRODUCTS[0];
                return (
                  <button
                    key={spec.productId}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSpecimenIdx(idx)}
                    className={`tasteskill-specimen-btn ${isSelected ? 'active' : ''}`}
                    style={{
                      borderLeft: `6px solid ${spec.fieldBg}`,
                      background: isSelected ? spec.fieldBg : 'var(--bg-surface)',
                      color: isSelected ? '#000000' : 'var(--text-primary)'
                    }}
                  >
                    <img
                      src={itemProduct.image}
                      alt={spec.shortName}
                      className="specimen-btn-thumb"
                    />
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: isSelected ? '#222220' : 'var(--text-muted)',
                          marginBottom: '0.15rem'
                        }}
                      >
                        {spec.floorTag}
                      </div>
                      <div
                        style={{
                          fontSize: '0.98rem',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: isSelected ? '#000000' : 'var(--text-primary)'
                        }}
                      >
                        {spec.shortName}
                      </div>
                    </div>
                    <div
                      className="tabular-nums"
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.55rem',
                        background: isSelected ? '#0f1419' : 'var(--bg-elevated)',
                        color: isSelected ? '#ffffff' : 'var(--text-primary)',
                        flexShrink: 0
                      }}
                    >
                      {formatPrice(itemProduct.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Wide Architectural Pastel Plinth Stage */}
          <div
            className="tasteskill-plinth-tile"
            style={{ backgroundColor: currentSpec.fieldBg }}
          >
            {/* Plinth Top Metadata Bar */}
            <div className="plinth-top-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: '#0f1419',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.65rem'
                  }}
                >
                  {currentSpec.floorTag}
                </span>
                <span
                  style={{
                    background: 'rgba(0, 0, 0, 0.1)',
                    color: '#000000',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.65rem'
                  }}
                >
                  SPECIMEN 0{specimenIdx + 1} / 0{PLINTH_SPECIMENS.length}
                </span>
                {specimenProduct.badge && (
                  <span
                    style={{
                      background: '#d0106f',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.65rem'
                    }}
                  >
                    {specimenProduct.badge}
                  </span>
                )}
              </div>

              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#000000',
                  background: 'rgba(255, 255, 255, 0.65)',
                  padding: '0.3rem 0.7rem'
                }}
              >
                In Stock • Runda Mall 3F ({specimenProduct.stock} units)
              </span>
            </div>

            {/* Plinth Main Split Body: Left Framed Image + Right Collector Dossier */}
            <div className="plinth-main-grid">
              <div
                className="plinth-media-frame"
                onClick={() => navigate('product', { productId: specimenProduct.id })}
              >
                <img
                  src={specimenProduct.image}
                  alt={specimenProduct.name}
                  className="tasteskill-plinth-img"
                />
                <div className="plinth-media-caption">
                  <span>Click image to inspect full specs</span>
                  <span className="tabular-nums">Rated {specimenProduct.rating}/5 ({specimenProduct.reviews})</span>
                </div>
              </div>

              <div className="plinth-dossier">
                <div>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#222220',
                      marginBottom: '0.35rem'
                    }}
                  >
                    SKU: {specimenProduct.sku} • {specimenProduct.categoryName}
                  </div>
                  <h2
                    onClick={() => navigate('product', { productId: specimenProduct.id })}
                    style={{
                      fontSize: 'clamp(1.65rem, 2.4vw, 2.25rem)',
                      fontWeight: 700,
                      color: '#000000',
                      lineHeight: 1.02,
                      cursor: 'pointer',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {specimenProduct.name}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: 1.5,
                      color: '#181816',
                      marginBottom: '1.1rem'
                    }}
                  >
                    {currentSpec.fact}. {specimenProduct.description}
                  </p>

                  {/* Spec Chips Grid */}
                  <div className="plinth-specs-row">
                    <div className="plinth-spec-box">
                      <span>Scale / Format</span>
                      <strong>{specimenProduct.scale}</strong>
                    </div>
                    <div className="plinth-spec-box">
                      <span>Age Grade</span>
                      <strong>Ages {specimenProduct.age}</strong>
                    </div>
                    <div className="plinth-spec-box">
                      <span>Material</span>
                      <strong>{specimenProduct.material}</strong>
                    </div>
                  </div>
                </div>

                {/* Price & Action Footer inside Dossier */}
                <div className="plinth-action-box">
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#222220', display: 'block' }}>
                        Flagship Collector Price
                      </span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                        <span
                          className="tabular-nums"
                          style={{
                            fontFamily: 'var(--font-google-display)',
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#000000',
                            lineHeight: 1
                          }}
                        >
                          {formatPrice(specimenProduct.price)}
                        </span>
                        {specimenProduct.oldPrice && (
                          <span
                            className="tabular-nums"
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              color: '#4a4a46',
                              textDecoration: 'line-through'
                            }}
                          >
                            {formatPrice(specimenProduct.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      style={{
                        background: '#0f1419',
                        color: '#fed878',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.3rem 0.6rem'
                      }}
                    >
                      Eligible for 15% Bundle
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => addToCart(specimenProduct, 1, specimenProduct.variants?.[0])}
                      className="btn"
                      style={{
                        flex: '2 1 200px',
                        background: '#0f1419',
                        color: '#ffffff',
                        padding: '0.9rem 1.25rem'
                      }}
                    >
                      <span>+ Add Specimen to Bag ({formatPrice(specimenProduct.price)})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('product', { productId: specimenProduct.id })}
                      className="btn"
                      style={{
                        flex: '1 1 120px',
                        background: 'rgba(255, 255, 255, 0.75)',
                        color: '#000000',
                        padding: '0.9rem 1rem'
                      }}
                    >
                      <span>Full Dossier</span>
                      <ArrowRightIcon size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TASTESKILL SHOWCASE: Object in front of type */}
      <section className="tasteskill-showcase">
        <div className="container" style={{ position: 'relative' }}>
          <div className="tasteskill-showcase-lines">
            <div className="tasteskill-display-line" style={{ color: 'var(--text-muted)' }}>
              DIE-CAST METAL
            </div>
            <h2 className="tasteskill-display-line" style={{ color: 'var(--text-primary)' }}>
              BUILT TO KEEP
            </h2>
            <div className="tasteskill-display-line" style={{ color: 'var(--text-secondary)' }}>
              SIX TOY FLOORS
            </div>
          </div>

          <img
            src={TOY_PRODUCTS[0].image}
            alt="Apex GT-R 1:24 Die-Cast Metal Supercar"
            className="tasteskill-showcase-object"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '3.5rem',
              maxWidth: '780px',
              marginLeft: 'auto'
            }}
          >
            <p style={{ fontSize: '1.12rem', lineHeight: 1.55, color: 'var(--text-primary)' }}>
              Every model at The Gents Dollhouse is chosen for tactile weight: zinc-alloy supercars with working suspension, laser-cut birch clockwork pendulums, and 880-piece interlocking brick locomotives.
            </p>
            <p style={{ fontSize: '1.12rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
              Walk into our Runda Mall 3rd Floor store or order online in Kenyan Shillings (KSh) with 30-minute counter pickup and same-day Nairobi dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 6-FLOOR ARCHITECTURAL DIRECTORY & LIVE SPOTLIGHT */}
      <section className="container tasteskill-poster-section">
        <div className="section-header" style={{ marginBottom: '2.25rem' }}>
          <div>
            <span className="badge badge-red" style={{ marginBottom: '0.5rem' }}>
              RUNDA MALL 3RD FLOOR • ARCHITECTURAL STORE GUIDE
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-google-display)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: '-0.035em'
              }}
            >
              Six floors to explore
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '58ch' }}>
              Every zone in The Gents Dollhouse is organized like a room in a collector’s house. Select any floor below to preview its live shelf and KSh prices, or step straight inside the department.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {DOLLHOUSE_ROOMS.filter((r) => r.id !== 'all').map((room) => {
              const isCurrent = activeFloorId === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setActiveFloorId(room.id)}
                  className="btn"
                  style={{
                    padding: '0.55rem 0.95rem',
                    fontSize: '0.82rem',
                    background: isCurrent ? room.color : 'var(--bg-surface)',
                    color: isCurrent ? '#ffffff' : 'var(--text-primary)'
                  }}
                >
                  {room.floor}
                </button>
              );
            })}
          </div>
        </div>

        {(() => {
          const floorsOnly = DOLLHOUSE_ROOMS.filter((r) => r.id !== 'all');
          const spotlightFloor =
            floorsOnly.find((r) => r.id === activeFloorId) || floorsOnly[0];
          const spotlightToys = TOY_PRODUCTS.filter(
            (p) => p.room === spotlightFloor.id
          );
          const leadToy = spotlightToys[0] || TOY_PRODUCTS[0];

          return (
            <div className="floors-architectural-grid">
              {/* Left Column: Rich Interactive 6-Floor Stack */}
              <div className="floor-arch-stack">
                {floorsOnly.map((room) => {
                  const roomToys = TOY_PRODUCTS.filter((p) => p.room === room.id);
                  const heroToy = roomToys[0] || TOY_PRODUCTS[0];
                  const minPrice = roomToys.reduce(
                    (min, p) => (p.price < min ? p.price : min),
                    heroToy.price
                  );
                  const isSelected = room.id === spotlightFloor.id;

                  return (
                    <div
                      key={room.id}
                      onMouseEnter={() => setActiveFloorId(room.id)}
                      onClick={() => setActiveFloorId(room.id)}
                      className={`floor-arch-card ${isSelected ? 'active' : ''}`}
                      style={{
                        borderLeft: `6px solid ${room.color}`
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.6rem',
                            marginBottom: '0.45rem'
                          }}
                        >
                          <span
                            style={{
                              background: room.color,
                              color: '#ffffff',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '0.18rem 0.55rem'
                            }}
                          >
                            {room.floor}
                          </span>
                          <span
                            style={{
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {room.subtitle}
                          </span>
                          <span
                            className="tabular-nums"
                            style={{
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              color: 'var(--brand-primary)',
                              marginLeft: 'auto'
                            }}
                          >
                            From {formatPrice(minPrice)}
                          </span>
                        </div>

                        <h3
                          style={{
                            fontFamily: 'var(--font-google-display)',
                            fontSize: 'clamp(1.45rem, 2.3vw, 2rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.05
                          }}
                        >
                          {room.name}
                        </h3>

                        <p
                          style={{
                            fontSize: '0.94rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                            marginTop: '0.4rem'
                          }}
                        >
                          {room.description}
                        </p>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.85rem',
                            marginTop: '0.85rem'
                          }}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShopCategory(room.id);
                              navigate('shop');
                            }}
                            className="btn"
                            style={{
                              padding: '0.45rem 0.9rem',
                              fontSize: '0.8rem',
                              background: isSelected ? room.color : 'var(--bg-primary)',
                              color: isSelected ? '#ffffff' : 'var(--text-primary)'
                            }}
                          >
                            <span>Shop {room.floor} ({roomToys.length} Toys)</span>
                            <ArrowRightIcon size={14} />
                          </button>

                          <span
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--text-muted)',
                              fontWeight: 500
                            }}
                          >
                            Featured: {heroToy.name}
                          </span>
                        </div>
                      </div>

                      <div style={{ position: 'relative' }}>
                        <img
                          src={heroToy.image}
                          alt={heroToy.name}
                          className="floor-arch-thumb"
                        />
                        <div
                          className="tabular-nums"
                          style={{
                            position: 'absolute',
                            bottom: 6,
                            right: 6,
                            background: 'var(--brand-navy)',
                            color: '#ffffff',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.45rem'
                          }}
                        >
                          {formatPrice(heroToy.price)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Sticky Live Floor Spotlight Stage */}
              <aside
                className="floor-spotlight-panel"
                style={{ borderTop: `6px solid ${spotlightFloor.color}` }}
              >
                <div className="floor-spotlight-media">
                  <img src={leadToy.image} alt={leadToy.name} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      display: 'flex',
                      gap: '0.4rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span
                      style={{
                        background: spotlightFloor.color,
                        color: '#ffffff',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '0.22rem 0.65rem'
                      }}
                    >
                      {spotlightFloor.floor} SPOTLIGHT
                    </span>
                    <span className="badge badge-dark">
                      {spotlightToys.length} Models in Stock
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: spotlightFloor.color }}>
                  {spotlightFloor.subtitle}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-google-display)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    marginTop: '0.2rem',
                    lineHeight: 1.08
                  }}
                >
                  {spotlightFloor.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.45rem',
                    lineHeight: 1.55
                  }}
                >
                  {spotlightFloor.description}
                </p>

                {/* Live Floor Shelf Preview */}
                <div style={{ marginTop: '1.25rem' }}>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      marginBottom: '0.6rem'
                    }}
                  >
                    MODELS ON THIS FLOOR ({spotlightToys.length})
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {spotlightToys.slice(0, 3).map((toyItem) => (
                      <div key={toyItem.id} className="floor-mini-toy-row">
                        <div
                          onClick={() => navigate('product', { productId: toyItem.id })}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            minWidth: 0,
                            flex: 1
                          }}
                        >
                          <img
                            src={toyItem.image}
                            alt={toyItem.name}
                            style={{
                              width: '52px',
                              height: '52px',
                              objectFit: 'cover',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div
                              style={{
                                fontWeight: 700,
                                fontSize: '0.88rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {toyItem.name}
                            </div>
                            <div
                              className="tabular-nums"
                              style={{
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                color: 'var(--brand-primary)',
                                marginTop: '0.1rem'
                              }}
                            >
                              {formatPrice(toyItem.price)} • Ages {toyItem.age}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(toyItem, 1, toyItem.variants?.[0])}
                          className="btn btn-primary"
                          style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem', flexShrink: 0 }}
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.35rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShopCategory(spotlightFloor.id);
                      navigate('shop');
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1, background: spotlightFloor.color }}
                  >
                    <span>Enter {spotlightFloor.name}</span>
                    <ArrowRightIcon size={16} />
                  </button>

                  {spotlightFloor.id === 'blindbox' && (
                    <button
                      type="button"
                      onClick={() => navigate('blindbox')}
                      className="btn btn-secondary"
                    >
                      Unbox Live
                    </button>
                  )}
                </div>
              </aside>
            </div>
          );
        })()}
      </section>

      {/* 4. CATALOG SHOWCASE: Interactive Floor Filter & Product Grid */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title"> Shelf favourites in KSh </h2>
            <p className="section-subtitle">
              Filter by floor or inspect any model for scale measurements and verified collector reviews.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {DOLLHOUSE_ROOMS.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => setHomeTab(room.id)}
                className="btn"
                style={{
                  padding: '0.5rem 0.95rem',
                  fontSize: '0.84rem',
                  background: homeTab === room.id ? 'var(--brand-primary)' : 'var(--bg-surface)',
                  color: homeTab === room.id ? '#ffffff' : 'var(--text-primary)'
                }}
              >
                {room.id === 'all' ? 'All Floors' : room.floor}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {displayedToys.map((product) => (
            <ProductCard key={product.id} toy={product} />
          ))}
        </div>
      </section>

      {/* 5. TASTESKILL HOW-IT-WORKS: Tiles that grow */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '520px', marginBottom: '2.5rem' }}>
          <h2 className="section-title">How our 3-toy bundle works</h2>
          <p className="section-subtitle">
            Mix any three toys across any floor for an automatic 15% storewide reduction.
          </p>
        </div>

        <div className="tasteskill-tiles-grid">
          {/* Stage 1 */}
          <div>
            <div
              style={{
                background: 'var(--field-periwinkle)',
                height: '260px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={TOY_PRODUCTS[6].image}
                alt={TOY_PRODUCTS[6].name}
                style={{ width: '75%', height: '190px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Picked from six floors</h3>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Combine die-cast cars, magnetic speed cubes, or sealed mystery capsules in one bag.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div>
            <div
              style={{
                background: 'var(--field-lime)',
                height: '350px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={TOY_PRODUCTS[0].image}
                alt={TOY_PRODUCTS[0].name}
                style={{ width: '85%', height: '260px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Packed with 15% off</h3>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Your third item triggers an instant 15% Miniso-style bundle discount at checkout.
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div>
            <div
              style={{
                background: 'var(--field-amber)',
                height: '450px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={TOY_PRODUCTS[2].image}
                alt={TOY_PRODUCTS[2].name}
                style={{ width: '92%', height: '350px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Collected at Runda Mall</h3>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Pick up at Runda Mall 3rd Floor in 30 minutes or choose express doorstep delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TASTESKILL PRICING: The itemised receipt (Interactive Live KSh Bundle Slip) */}
      <section className="tasteskill-receipt-section">
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start'
          }}
        >
          <div>
            <h2 className="section-title">Test your 3-toy receipt</h2>
            <p
              style={{
                fontSize: '1.08rem',
                color: 'var(--text-secondary)',
                marginTop: '0.85rem',
                maxWidth: '48ch'
              }}
            >
              Tick any combination of toys below to see your live Kenyan Shilling (KSh) bundle receipt update. Select three or more toys to apply the 15% bundle rate.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.75rem' }}>
              {TOY_PRODUCTS.slice(0, 6).map((item) => {
                const checked = receiptIds.includes(item.id);
                return (
                  <label
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      background: checked ? 'var(--bg-primary)' : 'transparent',
                      cursor: 'pointer',
                      fontWeight: checked ? 700 : 500
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleReceiptItem(item.id)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)' }}
                      />
                      <span>{item.name}</span>
                    </span>
                    <span className="tabular-nums">{formatPrice(item.price)}</span>
                  </label>
                );
              })}
            </div>

            <div style={{ marginTop: '1.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  receiptProducts.forEach((p) => addToCart(p, 1, p.variants?.[0]));
                }}
                className="btn btn-primary"
              >
                <span>Add Selected Receipt Toys to Bag ({receiptProducts.length})</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Zigzag Paper Receipt Slip */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="tasteskill-receipt-slip">
              <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                THE GENTS DOLLHOUSE
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.82rem', color: '#52524e', marginBottom: '1.5rem' }}>
                Runda Mall, 3rd Floor • Care: 0742630973
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {receiptProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.95rem',
                      gap: '1rem'
                    }}
                  >
                    <span>{p.name}</span>
                    <strong className="tabular-nums" style={{ whiteSpace: 'nowrap' }}>
                      {formatPrice(p.price)}
                    </strong>
                  </div>
                ))}

                {receiptDiscount > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.95rem',
                      color: '#d0106f',
                      fontWeight: 700
                    }}
                  >
                    <span>3-Toy Bundle (15% Off)</span>
                    <span className="tabular-nums">-{formatPrice(receiptDiscount)}</span>
                  </div>
                )}
              </div>

              <div
                style={{
                  height: '4px',
                  background: '#000000',
                  margin: '1.5rem 0 1rem'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>Total (KES)</span>
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: 'var(--font-google-display)',
                    fontSize: '2.4rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em'
                  }}
                >
                  {formatPrice(receiptTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TASTESKILL FAQ: Wide heading, indented questions */}
      <section className="container" style={{ padding: '6rem 1.5rem' }}>
        <div className="tasteskill-faq-grid">
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-google-display)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 0.95
              }}
            >
              Common questions
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} className="tasteskill-faq-item" open={idx === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>+</span>
                </summary>
                <p
                  style={{
                    marginTop: '0.85rem',
                    fontSize: '1.02rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '54ch',
                    lineHeight: 1.6
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TASTESKILL CONTACT: Visit card on a photograph */}
      <section
        className="tasteskill-visit-section"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=80)'
        }}
      >
        <div className="tasteskill-visit-card">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.1 }}>
            Visit Runda Mall
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
            Runda Mall, 3rd Floor (Main Atrium Wing)
            <br />
            Nairobi, Kenya
          </p>

          <div
            style={{
              marginTop: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              fontSize: '0.95rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Mon to Fri</span>
              <span className="tabular-nums" style={{ fontWeight: 700 }}>09:00 to 20:30</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Saturday</span>
              <span className="tabular-nums" style={{ fontWeight: 700 }}>09:00 to 21:00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Sunday &amp; Holidays</span>
              <span className="tabular-nums" style={{ fontWeight: 700 }}>09:30 to 20:30</span>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', fontSize: '0.95rem' }}>
            <div>
              Customer Care: <strong className="tabular-nums">0742630973</strong>
            </div>
            <div style={{ marginTop: '0.2rem' }}>
              Email: <strong>thegenttoystore@gmail.com</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('contact')}
            className="btn btn-primary"
            style={{ width: '100%', height: '52px', marginTop: '1.5rem' }}
          >
            Open Customer Care &amp; Store Desk
          </button>
        </div>
      </section>
    </div>
  );
}
