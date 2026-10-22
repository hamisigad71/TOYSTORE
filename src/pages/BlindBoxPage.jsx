import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BLINDBOX_SERIES, TOY_PRODUCTS } from '../data/toys';
import { GiftIcon, SparklesIcon, BagIcon, CheckIcon } from '../components/Icons';

export default function BlindBoxPage() {
  const { formatPrice, addToCart, unboxedVault, recordMysteryPull } = useStore();
  const [selectedSeriesId, setSelectedSeriesId] = useState(BLINDBOX_SERIES[0].id);
  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [pulledFigure, setPulledFigure] = useState(null);
  const [boxNumber, setBoxNumber] = useState(1);

  const series =
    BLINDBOX_SERIES.find((s) => s.id === selectedSeriesId) || BLINDBOX_SERIES[0];

  const shakeClues = [
    'Select a capsule and click "Shake Capsule" to listen for clues!',
    'Clink-clank! Sounds like heavy metallic armor or rubber race tires...',
    'Whoa, the collector card inside is humming! Ready to unseal?',
    'Maximum luck charged! Pop open your mystery capsule now!'
  ];

  const handleShake = () => {
    if (isShaking) return;
    setIsShaking(true);
    setShakeCount((c) => Math.min(3, c + 1));
    setTimeout(() => setIsShaking(false), 600);
  };

  const handleUnbox = () => {
    const pool = series.figures;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setPulledFigure(picked);
    recordMysteryPull(picked, series);
  };

  const handleAddPulledToCart = () => {
    const baseProd = TOY_PRODUCTS.find((p) => p.room === 'blindbox') || TOY_PRODUCTS[3];
    addToCart(
      {
        ...baseProd,
        id: `${baseProd.id}-${series.id}`,
        name: `${series.name} Capsule`,
        price: series.price
      },
      1,
      pulledFigure ? `Unboxed: ${pulledFigure.name}` : 'Sealed Mystery Capsule'
    );
  };

  const handleBuyFullCase = () => {
    const baseProd = TOY_PRODUCTS.find((p) => p.room === 'blindbox') || TOY_PRODUCTS[3];
    addToCart(
      {
        ...baseProd,
        id: `${baseProd.id}-case-${series.id}`,
        name: `${series.name} (Full 6-Box Sealed Case)`,
        price: series.casePrice
      },
      1,
      'Guaranteed 6 Unique Figures (No Duplicates)'
    );
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* Top Studio Header */}
      <div
        style={{
          background: 'var(--brand-navy)',
          color: '#fff',
          padding: '2.5rem',
          marginBottom: '2rem'
        }}
      >
        <span className="badge badge-red">FLOOR 4 • INTERACTIVE MYSTERY CAPSULE ALLEY</span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, marginTop: '0.5rem' }}>
          Miniso-Style Blind Box Unboxing Studio
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', maxWidth: '680px', marginTop: '0.4rem' }}>
          Choose a series below, pick one of the 6 capsules on the tray, shake it to feel the weight, and pop it open! Every figure you reveal is automatically recorded in your Collector Vault.
        </p>

        {/* Series Selector Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
          {BLINDBOX_SERIES.map((s) => {
            const active = s.id === selectedSeriesId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedSeriesId(s.id);
                  setPulledFigure(null);
                  setShakeCount(0);
                }}
                style={{
                  padding: '0.75rem 1.25rem',
                  border: active ? '2px solid #fed878' : 'none',
                  background: active ? s.themeColor : 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                {s.name} ({formatPrice(s.price)})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: Left Unboxer Machine + Right Series Odds & Checklist */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2rem'
        }}
      >
        {/* Left: Interactive Capsule Machine */}
        <div
          style={{
            background: 'var(--bg-surface)',
            padding: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setBoxNumber(num);
                    setPulledFigure(null);
                    setShakeCount(0);
                  }}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: boxNumber === num ? series.themeColor : 'var(--bg-elevated)',
                    color: boxNumber === num ? '#ffffff' : 'var(--text-primary)'
                  }}
                >
                  Box #{num}
                </button>
              ))}
            </div>

            {!pulledFigure ? (
              <div style={{ padding: '1.5rem 0' }}>
                <div
                  onClick={handleShake}
                  className={isShaking ? 'animate-shake' : ''}
                  style={{
                    width: 175,
                    height: 195,
                    margin: '0 auto',
                    background: series.themeColor,
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', opacity: 0.9 }}>
                    CAPSULE #{boxNumber}
                  </span>
                  <div style={{ margin: '0.65rem 0' }}>
                    <GiftIcon size={54} />
                  </div>
                  <span style={{ fontWeight: 900, fontSize: '1.05rem' }}>? MYSTERY ?</span>
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                    {[1, 2, 3].map((step) => (
                      <span
                        key={step}
                        style={{
                          width: 9,
                          height: 9,
                          background: shakeCount >= step ? '#fed878' : 'rgba(255,255,255,0.3)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-elevated)',
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)'
                  }}
                >
                  Clue: {shakeClues[shakeCount]}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                  <button type="button" onClick={handleShake} className="btn btn-secondary">
                    Shake Capsule ({shakeCount}/3)
                  </button>
                  <button type="button" onClick={handleUnbox} className="btn btn-primary">
                    <SparklesIcon size={16} />
                    <span>Unseal Capsule Now</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ padding: '1.5rem 0' }}>
                <span className={`badge ${pulledFigure.isRare ? 'badge-amber' : 'badge-red'}`}>
                  {pulledFigure.rarity}
                </span>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, margin: '0.75rem 0' }}>{pulledFigure.emoji}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{pulledFigure.name}</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Collector Market Value: <strong>{pulledFigure.value}</strong> • Added to your Collector Vault!
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  <button type="button" onClick={handleAddPulledToCart} className="btn btn-primary">
                    <BagIcon size={16} />
                    <span>Order This Capsule ({formatPrice(series.price)})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPulledFigure(null);
                      setShakeCount(0);
                      setBoxNumber((n) => (n % 6) + 1);
                    }}
                    className="btn btn-secondary"
                  >
                    Pick Another Box
                  </button>
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: '1.25rem',
              paddingTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
              fontSize: '0.8rem'
            }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>
              Want all 6 figures with <strong>zero duplicates</strong>?
            </span>
            <button
              type="button"
              onClick={handleBuyFullCase}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--brand-primary)',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Buy Full Sealed 6-Box Tray ({formatPrice(series.casePrice)})
            </button>
          </div>
        </div>

        {/* Right: Series Lineup & Collector Vault Checklist */}
        <div
          style={{
            background: 'var(--bg-surface)',
            padding: '2rem'
          }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{series.name}: Lineup &amp; Odds</h3>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {series.description}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '0.85rem',
              marginTop: '1.25rem'
            }}
          >
            {series.figures.map((fig) => {
              const isCollected = unboxedVault.some((u) => u.id === fig.id);
              return (
                <div
                  key={fig.id}
                  style={{
                    padding: '0.9rem',
                    background: isCollected ? 'var(--field-lime)' : 'var(--bg-elevated)',
                    position: 'relative'
                  }}
                >
                  {isCollected && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: '#059669',
                        color: '#fff',
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '0.1rem 0.45rem'
                      }}
                    >
                      IN VAULT
                    </span>
                  )}
                  <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{fig.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.84rem', marginTop: '0.35rem' }}>
                    {fig.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--brand-primary)', fontWeight: 700, marginTop: '0.15rem' }}>
                    {fig.rarity}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

