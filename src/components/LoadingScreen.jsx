import React, { useState, useEffect, useRef } from 'react';

const FLOORS = [
  { id: '1F', icon: '🏎️', name: 'Speed Garage', desc: 'Die-cast 1:24 supercars & RC racers' },
  { id: '2F', icon: '🧩', name: 'Brick & Gear Lab', desc: '880-pc steam locomotive & technic kits' },
  { id: '3F', icon: '🤖', name: 'Mecha & Figures', desc: '32-joint articulated titan robots' },
  { id: '4F', icon: '🎁', name: 'Blind Box Alley', desc: 'Mystery gashapon capsules & 1:72 secret chase' },
  { id: '5F', icon: '🎲', name: 'Retro & Cubes', desc: 'Magnetic speed cubes & tabletop classics' },
  { id: 'ROOF', icon: '🚁', name: 'Sky Arena', desc: 'Altitude-hold quadcopters & aerobatic jets' },
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [floorIndex, setFloorIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [boxTaps, setBoxTaps] = useState(0);
  const [burstParticles, setBurstParticles] = useState([]);
  const hasFinishedRef = useRef(false);

  // Fast, smooth realistic progress ramp with elevator floor checkpoints
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2800; // ~2.8 seconds total for an engaging yet snappy experience

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(rawProgress);

      // Map progress to the 6 floors
      const currentFloor = Math.min(FLOORS.length - 1, Math.floor((rawProgress / 100) * FLOORS.length));
      setFloorIndex(currentFloor);

      if (rawProgress >= 100 && !hasFinishedRef.current) {
        hasFinishedRef.current = true;
        clearInterval(timer);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 450);
        }, 500);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [onFinish]);

  // Handle playful tap on mystery box
  const handleTapBox = (e) => {
    setBoxTaps((prev) => prev + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const emojis = ['✨', '🎁', '🏎️', '🤖', '🧩', '⭐', '💎', '🔥'];
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: (Math.random() - 0.5) * 140,
      y: -20 - Math.random() * 80,
    }));
    setBurstParticles((prev) => [...prev.slice(-12), ...newParticles]);
    setTimeout(() => {
      setBurstParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 800);
  };

  const activeFloor = FLOORS[floorIndex] || FLOORS[0];

  return (
    <aside
      aria-label="Loading Store"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(circle at 50% 25%, #1a1f2e 0%, #0a0d14 75%, #05070a 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1rem, 3vh, 2rem) clamp(1rem, 4vw, 2.5rem)',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s ease-out',
        pointerEvents: isFading ? 'none' : 'auto',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Ambient background light spheres */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: 'min(90vw, 420px)',
          height: 'min(90vw, 420px)',
          background: 'radial-gradient(circle, rgba(230,0,18,0.22) 0%, rgba(251,191,36,0.08) 45%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          animation: 'pulseAura 3s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '260px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Row */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '560px',
          margin: '0 auto',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #e60012 0%, #b8000e 100%)',
              borderRadius: '9px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(230,0,18,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <span style={{ fontSize: '0.52rem', fontWeight: 900, lineHeight: 1, letterSpacing: '0.04em' }}>GENTS</span>
            <span style={{ fontSize: '0.66rem', fontWeight: 900, lineHeight: 1, marginTop: '1px' }}>TOYS</span>
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              The Gents Dollhouse
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
              Runda Mall 3F • Express Elevator
            </div>
          </div>
        </div>

        {/* Skip button */}
        <button
          type="button"
          onClick={() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 300);
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#e2e8f0',
            fontSize: '0.74rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          Skip Intro →
        </button>
      </header>

      {/* Main Interactive Center Section */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
          maxWidth: '520px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          padding: '0.75rem 0',
        }}
      >
        {/* Burst particles when tapping box */}
        {burstParticles.map((p) => (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              top: '42%',
              left: '50%',
              transform: `translate(calc(-50% + ${p.x}px), ${p.y}px)`,
              fontSize: '1.4rem',
              pointerEvents: 'none',
              animation: 'fadeFloat 0.8s ease-out forwards',
              zIndex: 10,
            }}
          >
            {p.emoji}
          </span>
        ))}

        {/* 3D Floating Mystery Capsule Container */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleTapBox}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTapBox(e);
            }
          }}
          title="Tap the Mystery Capsule for good luck!"
          style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            touchAction: 'manipulation',
            marginBottom: '1rem',
          }}
        >
          {/* Orbital Gyroscope Ring 1 */}
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '2px dashed rgba(251, 191, 36, 0.45)',
              animation: 'spinOrbit 7s linear infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Orbital Gyroscope Ring 2 */}
          <div
            style={{
              position: 'absolute',
              inset: '-24px',
              borderRadius: '50%',
              border: '1.5px solid rgba(230, 0, 18, 0.35)',
              borderTopColor: '#e60012',
              borderBottomColor: '#fbbf24',
              animation: 'spinOrbitReverse 5s linear infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Glowing pedestal shadow under the floating capsule */}
          <div
            style={{
              position: 'absolute',
              bottom: '-12px',
              width: '110px',
              height: '24px',
              background: 'radial-gradient(ellipse, rgba(230,0,18,0.55) 0%, rgba(0,0,0,0.6) 50%, transparent 80%)',
              borderRadius: '50%',
              animation: 'shadowPulse 3s ease-in-out infinite',
            }}
          />

          {/* The 3D PopMart / Miniso Mystery Blind Box */}
          <div
            key={boxTaps}
            style={{
              width: '104px',
              height: '108px',
              background: 'linear-gradient(145deg, #ff1a2b 0%, #b8000e 65%, #7a0008 100%)',
              borderRadius: '24px',
              boxShadow: '0 18px 38px rgba(230, 0, 18, 0.45), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -6px 12px rgba(0,0,0,0.4)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 230, 150, 0.65)',
              animation: boxTaps > 0 ? 'wobbleBox 0.5s ease' : 'floatBox 3s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Golden Ribbon Vertical */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '18px',
                background: 'linear-gradient(90deg, #d97706, #fbbf24 45%, #fffbeb 60%, #b45309 100%)',
                boxShadow: '0 0 8px rgba(251, 191, 36, 0.5)',
              }}
            />

            {/* Golden Ribbon Horizontal */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '18px',
                background: 'linear-gradient(180deg, #d97706, #fbbf24 45%, #fffbeb 60%, #b45309 100%)',
                boxShadow: '0 0 8px rgba(251, 191, 36, 0.5)',
              }}
            />

            {/* Ribbon Knot / Golden Medallion */}
            <div
              style={{
                position: 'absolute',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #fef08a 0%, #f59e0b 70%, #78350f 100%)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.4), 0 0 12px rgba(251, 191, 36, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                border: '1.5px solid #ffffff',
                zIndex: 3,
              }}
            >
              {activeFloor.icon}
            </div>

            {/* Mystery Blind Box Label Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                background: '#ffffff',
                color: '#e60012',
                fontSize: '0.62rem',
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: '9999px',
                boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                border: '1px solid #fed7aa',
                zIndex: 4,
              }}
            >
              1:72 GOLD CHASE
            </div>
          </div>
        </div>

        {/* Tap Prompt Hint */}
        <div
          style={{
            fontSize: '0.7rem',
            color: '#cbd5e1',
            background: 'rgba(255,255,255,0.06)',
            padding: '3px 10px',
            borderRadius: '9999px',
            marginBottom: '1.25rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          🎁 Tap capsule to peek • {boxTaps > 0 ? `Luck +${boxTaps * 10}%!` : 'Gashapon Mode'}
        </div>

        {/* Live Elevator Telemetry Card */}
        <div
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '1rem clamp(0.75rem, 3vw, 1.25rem)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          {/* Floor Ascent Line / Stepper */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.55rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#94a3b8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Express Elevator Deck
              </span>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 900,
                  color: '#fbbf24',
                  fontFamily: 'monospace',
                }}
              >
                LEVEL {activeFloor.id}
              </span>
            </div>

            {/* 6-Floor Badge Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '4px',
                position: 'relative',
              }}
            >
              {FLOORS.map((floor, idx) => {
                const isActive = idx === floorIndex;
                const isPassed = idx < floorIndex;
                return (
                  <div
                    key={floor.id}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #e60012 0%, #fbbf24 100%)'
                        : isPassed
                        ? 'rgba(230, 0, 18, 0.25)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: isActive
                        ? '1.5px solid #ffffff'
                        : isPassed
                        ? '1px solid rgba(230, 0, 18, 0.4)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '0.4rem 0.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 0 14px rgba(230, 0, 18, 0.7)' : 'none',
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>{floor.icon}</span>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: isActive ? 900 : 700,
                        color: isActive ? '#ffffff' : isPassed ? '#fca5a5' : '#64748b',
                        lineHeight: 1,
                      }}
                    >
                      {floor.id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High-Tech Progress Bar */}
          <div>
            <div
              style={{
                height: '9px',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '9999px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #e60012 0%, #f59e0b 50%, #fbbf24 100%)',
                  borderRadius: '9999px',
                  boxShadow: '0 0 12px rgba(230, 0, 18, 0.8)',
                  transition: 'width 0.08s ease-out',
                  position: 'relative',
                }}
              >
                {/* Traveling light shimmer highlight */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: '24px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9))',
                    animation: 'shimmerBar 1.2s infinite',
                  }}
                />
              </div>
            </div>

            {/* Progress Percentage & Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.45rem',
                fontSize: '0.76rem',
              }}
            >
              <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#fbbf24',
                    animation: 'pulseDot 1s infinite alternate',
                  }}
                />
                Ascending to <strong>{activeFloor.name}</strong>
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  color: progress === 100 ? '#4ade80' : '#fbbf24',
                  letterSpacing: '0.02em',
                }}
              >
                {progress === 100 ? 'READY 100%' : `${progress}%`}
              </span>
            </div>
          </div>

          {/* Floor Live Subtitle & Description */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '8px',
              padding: '0.45rem 0.65rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.74rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>{activeFloor.icon}</span>
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {activeFloor.desc}
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Footer Info */}
      <footer
        style={{
          textAlign: 'center',
          fontSize: '0.72rem',
          color: '#64748b',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
        }}
      >
        <div>The Gents Dollhouse • Miniso Flagship Concept • 6 Storeys of Collector Culture</div>
        <div style={{ fontSize: '0.66rem', color: '#475569' }}>
          Zinc-Alloy Die-Cast • 880-Pc Technic • Articulated Mecha • Gashapon Blind Boxes
        </div>
      </footer>

      {/* Keyframe animations */}
      <style>{`
        @keyframes floatBox {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes wobbleBox {
          0% { transform: scale(0.92) rotate(-8deg); }
          30% { transform: scale(1.15) rotate(8deg); }
          60% { transform: scale(0.96) rotate(-4deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes shadowPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(0.82);
            opacity: 0.35;
          }
        }
        @keyframes spinOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinOrbitReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulseAura {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        @keyframes pulseDot {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        @keyframes shimmerBar {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        @keyframes fadeFloat {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(0.6);
          }
          50% {
            opacity: 1;
            transform: translate(calc(-50% + var(--dx, 20px)), -40px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--dx, 30px)), -70px) scale(0.9);
          }
        }
      `}</style>
    </aside>
  );
}
