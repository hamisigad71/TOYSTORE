import React, { useState, useEffect, useRef } from 'react';

// Stages of the Miniso Blind Box unboxing
const STAGES = [
  { step: '01', title: 'INSPECTING FOIL PACK', desc: 'Tamper-evident heat-sealed blister pouch' },
  { step: '02', title: 'TEARING LASER STRIP', desc: 'Crinkling foil perforation release' },
  { step: '03', title: 'REVEALING ACRYLIC CAPSULE', desc: 'Two-piece optical-grade gashapon sphere' },
  { step: '04', title: 'POPPING DOME & CHASE', desc: '1:72 Secret Rare Chase unboxed' },
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [taps, setTaps] = useState(0);
  const finishTriggered = useRef(false);

  // Exact 3.5 seconds duration (3500ms) with high-precision frame loop
  useEffect(() => {
    const startTime = performance.now();
    const DURATION = 3500; // Exactly 3.5s

    let rafId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const rawRatio = Math.min(1, elapsed / DURATION);
      const currentProgress = Math.min(100, Math.round(rawRatio * 100));

      setProgress(currentProgress);

      // Map progress to the 4 unboxing stages
      if (rawRatio < 0.28) {
        setStageIdx(0);
      } else if (rawRatio < 0.55) {
        setStageIdx(1);
      } else if (rawRatio < 0.82) {
        setStageIdx(2);
      } else {
        setStageIdx(3);
      }

      if (rawRatio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        if (!finishTriggered.current) {
          finishTriggered.current = true;
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 350);
          }, 350);
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [onFinish]);

  const handleSkip = () => {
    if (finishTriggered.current) return;
    finishTriggered.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 250);
  };

  const handleCapsuleTap = () => {
    setTaps((prev) => prev + 1);
  };

  const currentStage = STAGES[stageIdx] || STAGES[0];

  // Visual phase calculations based on progress
  // Phase 1 (0-35%): Sealed foil pouch with tear strip unzipping
  // Phase 2 (35-70%): Foil splits & reveals acrylic capsule
  // Phase 3 (70-100%): Capsule dome pops open with golden glow burst
  const foilTearPercent = Math.min(100, Math.max(0, (progress - 10) * 3.5));
  const isCapsuleRevealed = progress >= 32;
  const isDomePopped = progress >= 72;

  return (
    <aside
      aria-label="Miniso Blind-Box Unboxing"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#06090e',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* 1. STUDIO BACKGROUND IMAGE (User-specified wallpaper under studio photography scrim) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-5%',
          backgroundImage: 'url("https://i.pinimg.com/736x/4d/07/bd/4d07bd637b424da4a24e4b580367ec18.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.36,
          filter: 'brightness(0.7) contrast(1.15) blur(1px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. PHOTOREALISTIC STUDIO LIGHTING: Overhead warm key light & soft falloff */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 28%, rgba(255, 255, 255, 0.12) 0%, rgba(15, 23, 42, 0.6) 45%, rgba(4, 7, 12, 0.94) 85%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 3. STUDIO SPOTLIGHT CONE OVER THE PRODUCT */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '540px',
          height: '540px',
          background: 'radial-gradient(circle, rgba(255, 75, 90, 0.15) 0%, rgba(230, 0, 18, 0.05) 45%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* 4. TOP BAR: MINISO LOGO + RUNDA FLAGSHIP BADGE + SKIP BUTTON */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30,
        }}
      >
        {/* Miniso Brand Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(145deg, #e60012, #ba000d)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 18px rgba(230, 0, 18, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.62rem',
              lineHeight: 1,
              letterSpacing: '0.04em',
            }}
          >
            <span>MINISO</span>
            <span style={{ fontSize: '0.72rem', marginTop: '1px' }}>TOYS</span>
          </div>

          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#f8fafc' }}>
              The Gents Dollhouse
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  display: 'inline-block',
                }}
              />
              Runda Mall 3F • Blind-Box Studio
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip unboxing"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.45rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#f1f5f9',
            background: 'rgba(25, 33, 48, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(230, 0, 18, 0.9)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(25, 33, 48, 0.75)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <span>Skip Intro</span>
          <span style={{ fontSize: '0.85rem' }}>➔</span>
        </button>
      </div>

      {/* 5. MAIN PHOTOREALISTIC STAGE (Product presentation pedestal) */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          width: '92%',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '1.5rem',
        }}
      >
        {/* UNBOXING PRODUCT DISPLAY AREA */}
        <div
          onClick={handleCapsuleTap}
          style={{
            position: 'relative',
            width: '260px',
            height: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Click to tap capsule"
        >
          {/* Studio Tabletop Contact Shadow & Optical Floor Reflection */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '18px',
              width: '180px',
              height: '36px',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.45) 50%, transparent 75%)',
              filter: 'blur(8px)',
              transform: isDomePopped ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
          />

          {/* Golden Shimmer Aura when capsule pops */}
          {isDomePopped && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-20px',
                background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.35) 0%, rgba(230, 0, 18, 0.15) 45%, transparent 70%)',
                filter: 'blur(20px)',
                animation: 'goldenAura 1.5s infinite alternate ease-in-out',
              }}
            />
          )}

          {/* ══════════════════════════════════════════════════════════
              LAYER A: PHOTOREALISTIC FOIL POUCH (Visible during 0% - 35%)
              ══════════════════════════════════════════════════════════ */}
          <div
            style={{
              position: 'absolute',
              width: '200px',
              height: '240px',
              borderRadius: '12px',
              // Photorealistic holographic foil metallic finish with crimped edges
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 15%, #94a3b8 35%, #e2e8f0 55%, #f1f5f9 70%, #94a3b8 100%)',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 20px 45px rgba(0,0,0,0.65), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 6px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '0.85rem',
              opacity: isCapsuleRevealed ? 0 : 1,
              transform: isCapsuleRevealed
                ? 'scale(1.2) translateY(-20px)'
                : `scale(1) rotate(${(taps % 2 === 0 ? 1 : -1) * 1.5}deg)`,
              transition: 'opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: isCapsuleRevealed ? 'none' : 'auto',
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            {/* Holographic Rainbow Light Glare across foil */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(120deg, transparent 20%, rgba(255,215,0,0.25) 35%, rgba(230,0,18,0.2) 50%, rgba(56,189,248,0.25) 65%, transparent 80%)',
                backgroundSize: '200% 200%',
                animation: 'foilGlint 2.2s infinite linear',
                pointerEvents: 'none',
              }}
            />

            {/* Top Heat-Sealed Crimped Edge */}
            <div
              style={{
                height: '14px',
                width: '100%',
                borderBottom: '1.5px dashed rgba(0,0,0,0.25)',
                background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 2px, transparent 2px, transparent 4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.52rem',
                fontWeight: 900,
                letterSpacing: '0.15em',
                color: '#475569',
              }}
            >
              HEAT SEALED • DO NOT ACCEPT IF BROKEN
            </div>

            {/* Center Foil Branding & Artwork Stamp */}
            <div style={{ textAlign: 'center', margin: 'auto 0' }}>
              <div
                style={{
                  display: 'inline-block',
                  background: '#e60012',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(230,0,18,0.4)',
                  letterSpacing: '0.04em',
                }}
              >
                MINISO BLIND BOX
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0f172a', marginTop: '0.4rem', letterSpacing: '-0.02em' }}>
                SERIES 01: COLLECTOR
              </div>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#e60012', marginTop: '0.2rem', letterSpacing: '0.06em' }}>
                1:72 SECRET CHASE INSIDE
              </div>
            </div>

            {/* Laser Tear Strip Indicator across foil */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                borderRadius: '6px',
                padding: '0.35rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Tear Strip Fill animation */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${foilTearPercent}%`,
                  background: 'linear-gradient(90deg, #ff1a2b, #fbbf24)',
                  opacity: 0.85,
                  transition: 'width 0.08s linear',
                }}
              />
              <span style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.08em', color: '#ffffff', zIndex: 2 }}>
                ✂ TEARING SEAL
              </span>
              <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#fde047', zIndex: 2 }}>
                {foilTearPercent.toFixed(0)}%
              </span>
            </div>

            {/* Bottom Heat-Sealed Crimped Edge */}
            <div
              style={{
                height: '14px',
                width: '100%',
                borderTop: '1.5px dashed rgba(0,0,0,0.25)',
                background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 2px, transparent 2px, transparent 4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 0.35rem',
                fontSize: '0.48rem',
                color: '#64748b',
                fontFamily: 'monospace',
              }}
            >
              <span>BATCH #82-MINISO</span>
              <span>AUTHENTIC</span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              LAYER B: PHOTOREALISTIC ACRYLIC GASHAPON CAPSULE
              ══════════════════════════════════════════════════════════ */}
          <div
            style={{
              position: 'relative',
              width: '170px',
              height: '170px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isCapsuleRevealed ? 1 : 0,
              transform: isCapsuleRevealed ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
              zIndex: 15,
            }}
          >
            {/* 1. TOP DOME: Translucent Miniso Ruby Acrylic (Pops up when unboxed) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '86px',
                borderTopLeftRadius: '90px',
                borderTopRightRadius: '90px',
                // Photorealistic ruby red optical acrylic with internal depth
                background: 'radial-gradient(circle at 35% 25%, #ff4d5a 0%, #e60012 45%, #99000c 90%)',
                border: '1.5px solid rgba(255, 255, 255, 0.55)',
                borderBottom: '2.5px solid rgba(255, 255, 255, 0.7)',
                boxShadow: isDomePopped
                  ? '0 -15px 35px rgba(230, 0, 18, 0.75), inset 0 8px 16px rgba(255, 255, 255, 0.6)'
                  : '0 -6px 20px rgba(230, 0, 18, 0.5), inset 0 6px 12px rgba(255, 255, 255, 0.5)',
                transform: isDomePopped
                  ? 'translateY(-48px) rotate(16deg) scale(1.04)'
                  : 'translateY(0) rotate(0deg)',
                transition: 'transform 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                zIndex: 4,
                overflow: 'hidden',
              }}
            >
              {/* High-Specular Curved Glare Highlight on Acrylic Dome */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '26px',
                  width: '42px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 100%)',
                  transform: 'rotate(-25deg)',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '34px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.6)',
                }}
              />
            </div>

            {/* 2. MIDDLE ACRYLIC INTERLOCKING FLANGE / SEAM */}
            <div
              style={{
                position: 'absolute',
                top: '84px',
                left: '-4px',
                right: '-4px',
                height: '7px',
                borderRadius: '4px',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(200, 200, 200, 0.5) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                zIndex: 5,
                opacity: isDomePopped ? 0.3 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* 3. INTERIOR COLLECTIBLE (Visible through transparent optical acrylic) */}
            <div
              style={{
                position: 'absolute',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: isDomePopped
                  ? 'translateY(-8px) scale(1.18)'
                  : 'translateY(10px) scale(0.95)',
                transition: 'transform 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
              }}
            >
              {/* Gold Chase Emblem / Toy Figure */}
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '16px',
                  background: 'linear-gradient(145deg, #fbbf24 0%, #d97706 70%, #92400e 100%)',
                  border: '2px solid #fef08a',
                  boxShadow: '0 8px 24px rgba(245, 158, 11, 0.7), inset 0 2px 4px rgba(255,255,255,0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <span style={{ fontSize: '1.9rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
                  🏎️
                </span>
              </div>

              {isDomePopped && (
                <div
                  style={{
                    marginTop: '0.4rem',
                    background: 'rgba(245, 158, 11, 0.95)',
                    color: '#000000',
                    fontSize: '0.58rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.6)',
                  }}
                >
                  ★ 1:72 GOLD CHASE ★
                </div>
              )}
            </div>

            {/* 4. BOTTOM DOME: Crystal Clear Optical Acrylic Half */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '86px',
                borderBottomLeftRadius: '90px',
                borderBottomRightRadius: '90px',
                // Crystal clear transparent acrylic with refraction highlights
                background: 'radial-gradient(ellipse at 50% 70%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(200, 220, 255, 0.18) 100%)',
                border: '1.5px solid rgba(255, 255, 255, 0.45)',
                borderTop: 'none',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5), inset 0 -8px 18px rgba(255, 255, 255, 0.35)',
                zIndex: 3,
                overflow: 'hidden',
              }}
            >
              {/* Bottom Acrylic Glare Reflection */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '30px',
                  width: '50px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                  transform: 'rotate(15deg)',
                }}
              />
            </div>
          </div>
        </div>

        {/* 6. STUDIO UNBOXING TELEMETRY HUD PANEL */}
        <div
          style={{
            width: '100%',
            marginTop: '1.5rem',
            background: 'linear-gradient(180deg, #1b2332 0%, #101622 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            padding: '1.15rem 1.4rem',
            position: 'relative',
          }}
        >
          {/* Header row: Status and percentage */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isDomePopped ? '#fbbf24' : '#e60012',
                  boxShadow: `0 0 10px ${isDomePopped ? '#fbbf24' : '#e60012'}`,
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', color: '#cbd5e1' }}>
                STAGE {currentStage.step}: {currentStage.title}
              </span>
            </div>

            <span style={{ fontSize: '0.82rem', fontWeight: 900, fontFamily: 'monospace', color: '#ff4d5a' }}>
              {progress}%
            </span>
          </div>

          {/* Real-time Unboxing Progress Track */}
          <div
            style={{
              height: '8px',
              width: '100%',
              background: '#090d15',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '1px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #b3000d 0%, #ff1a2b 70%, #fde047 100%)',
                borderRadius: '9999px',
                boxShadow: '0 0 14px rgba(255, 26, 43, 0.8)',
                transition: 'width 0.05s linear',
              }}
            />
          </div>

          {/* Active Stage Description & Collector Specs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.85rem',
              fontSize: '0.68rem',
              color: '#94a3b8',
            }}
          >
            <span style={{ color: '#e2e8f0', fontWeight: 700 }}>
              {currentStage.desc}
            </span>

            <span style={{ fontFamily: 'monospace', color: '#fbbf24', fontWeight: 800 }}>
              CHASE RATIO: 1/72
            </span>
          </div>
        </div>

        {/* 7. AUTHENTIC JAPANESE / MINISO COLLECTOR GRADE SPECIFICATION FOOTER */}
        <div
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.62rem',
            color: '#64748b',
            letterSpacing: '0.06em',
            lineHeight: 1.5,
          }}
        >
          <div>
            MINISO CO. TOKYO • OFFICIAL BLIND BOX CAPSULE TOYS • QC PASSED
          </div>
          <div style={{ fontFamily: 'monospace', color: '#475569', fontSize: '0.55rem', marginTop: '2px' }}>
            TAMPER-EVIDENT FOIL • OPTICAL ACRYLIC 70MM SPHERE • LOT 2026-NBO
          </div>
        </div>
      </div>

      <style>{`
        @keyframes foilGlint {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes goldenAura {
          0% { opacity: 0.5; transform: scale(0.95); }
          100% { opacity: 0.9; transform: scale(1.08); }
        }
      `}</style>
    </aside>
  );
}
