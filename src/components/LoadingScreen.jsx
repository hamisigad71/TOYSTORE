import React, { useState, useEffect, useRef } from 'react';

// Floor definitions for the architectural glass elevator
const FLOORS = [
  { id: '1F', num: '1F', name: 'Speed Garage', tag: 'Die-cast 1:24 supercars & RC racers', code: 'SHAFT-01' },
  { id: '2F', num: '2F', name: 'Brick & Gear Lab', tag: '880-pc steam locomotive & technic kits', code: 'SHAFT-02' },
  { id: '3F', num: '3F', name: 'Hero & Mecha Vault', tag: '32-joint articulated titan robots', code: 'SHAFT-03' },
  { id: '4F', num: '4F', name: 'Mystery Capsule Alley', tag: 'Pop-Mart blind boxes & 1:72 chase', code: 'SHAFT-04' },
  { id: '5F', num: '5F', name: 'Tabletop & Retro Den', tag: 'Magnetic speed cubes & classic kits', code: 'SHAFT-05' },
  { id: 'ROOF', num: 'RF', name: 'Sky Arena Flagship', tag: 'High-altitude drones & main entrance', code: 'DECK-SKY' },
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [currentFloorIdx, setCurrentFloorIdx] = useState(0);
  const [velocity, setVelocity] = useState('0.00');
  const [doorsOpening, setDoorsOpening] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const finishTriggered = useRef(false);

  // Exact 3.5 seconds duration (3500ms)
  useEffect(() => {
    const startTime = performance.now();
    const DURATION = 3500; // Exactly 3.5s per request

    let rafId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const rawRatio = Math.min(1, elapsed / DURATION);

      // Smooth realistic elevator acceleration curve (cubic ease-out with smooth cruise)
      const easedProgress = Math.min(100, Math.round(rawRatio * 100));
      setProgress(easedProgress);

      // Update floor index (0 to 5)
      const floorIndex = Math.min(FLOORS.length - 1, Math.floor(rawRatio * FLOORS.length));
      setCurrentFloorIdx(floorIndex);

      // Simulated realistic elevator velocity (accelerates to 2.80 m/s then glides to stop)
      let v = 0;
      if (rawRatio < 0.25) {
        v = (rawRatio / 0.25) * 2.8;
      } else if (rawRatio < 0.85) {
        v = 2.8 - (rawRatio - 0.25) * 0.4;
      } else {
        v = Math.max(0, (1 - rawRatio) / 0.15 * 2.5);
      }
      setVelocity(v.toFixed(2));

      if (rawRatio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Reached 100% at 3.5s -> Trigger elevator doors opening & transition
        if (!finishTriggered.current) {
          finishTriggered.current = true;
          setDoorsOpening(true);

          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 350);
          }, 450);
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [onFinish]);

  const handleSkip = () => {
    if (finishTriggered.current) return;
    finishTriggered.current = true;
    setDoorsOpening(true);
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 200);
    }, 250);
  };

  const currentFloor = FLOORS[currentFloorIdx] || FLOORS[0];

  return (
    <aside
      aria-label="Store Concourse Elevator"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#04070d',
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
      {/* 1. REALISTIC ATRIUM BACKGROUND IMAGE (User-supplied wallpaper with smooth upward parallax) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-8% -5%',
          backgroundImage: 'url("https://i.pinimg.com/736x/4d/07/bd/4d07bd637b424da4a24e4b580367ec18.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.42,
          filter: 'brightness(0.85) contrast(1.15)',
          transform: `translateY(${progress * 0.14}px) scale(1.04)`,
          transition: 'transform 0.08s linear',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. ARCHITECTURAL GALLERIA ATRIUM DEPTH OVERLAY */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(15, 23, 42, 0.2) 0%, rgba(4, 7, 13, 0.88) 85%, #020408 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 3. VERTICAL ELEVATOR GUIDE RAILS & CABLE LINES */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 6vw',
        }}
      >
        {/* Left Shaft Cable & Structural Column */}
        <div
          style={{
            width: '1px',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '12px 0 24px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: `${(progress * 1.8) % 100}%`,
              left: '-2px',
              width: '5px',
              height: '30px',
              background: 'rgba(230,0,18,0.7)',
              filter: 'blur(1px)',
              transition: 'top 0.05s linear',
            }}
          />
        </div>

        {/* Right Shaft Cable & Structural Column */}
        <div
          style={{
            width: '1px',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '-12px 0 24px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: `${(progress * 1.8) % 100}%`,
              right: '-2px',
              width: '5px',
              height: '30px',
              background: 'rgba(230,0,18,0.7)',
              filter: 'blur(1px)',
              transition: 'top 0.05s linear',
            }}
          />
        </div>
      </div>

      {/* 4. OPTICAL GLASS REFLECTION SHEEN (Angled sweep across the car) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(125deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 25%, transparent 35%, transparent 65%, rgba(255,255,255,0.03) 80%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* 5. TOP HEADER BAR: BRAND BADGE & SKIP BUTTON */}
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
          zIndex: 20,
        }}
      >
        {/* Brand Plaque */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(145deg, #ff1a2b, #b3000d)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 16px rgba(230,0,18,0.5)',
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
            <span>GENTS</span>
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
              Runda Mall • Panoramic Express Car
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip to store"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.45rem 0.95rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#e2e8f0',
            background: 'rgba(30, 41, 59, 0.65)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(230, 0, 18, 0.85)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.65)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
          }}
        >
          <span>Skip Intro</span>
          <span style={{ fontSize: '0.85rem' }}>➔</span>
        </button>
      </div>

      {/* 6. MAIN ARCHITECTURAL TITANIUM ELEVATOR CONSOLE */}
      <div
        style={{
          position: 'relative',
          zIndex: 15,
          width: '92%',
          maxWidth: '520px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* OVERHEAD BRUSHED TITANIUM HOUSING */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(180deg, #2a3342 0%, #171f2b 55%, #0f1622 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.6)',
            padding: '1.5rem 1.6rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Brushed Metal Texture Sheen */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)',
              pointerEvents: 'none',
            }}
          />

          {/* Hex Screws in the Corners for Architectural Authenticity */}
          <div style={{ position: 'absolute', top: '10px', left: '12px', color: 'rgba(255,255,255,0.25)', fontSize: '0.55rem', fontFamily: 'monospace' }}>⊙</div>
          <div style={{ position: 'absolute', top: '10px', right: '12px', color: 'rgba(255,255,255,0.25)', fontSize: '0.55rem', fontFamily: 'monospace' }}>⊙</div>
          <div style={{ position: 'absolute', bottom: '10px', left: '12px', color: 'rgba(255,255,255,0.25)', fontSize: '0.55rem', fontFamily: 'monospace' }}>⊙</div>
          <div style={{ position: 'absolute', bottom: '10px', right: '12px', color: 'rgba(255,255,255,0.25)', fontSize: '0.55rem', fontFamily: 'monospace' }}>⊙</div>

          {/* TOP STATUS LINE: ELEVATOR ID & VELOCITY TELEMETRY */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '0.55rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span
                style={{
                  color: '#e60012',
                  animation: 'pulse 1s infinite',
                  display: 'inline-block',
                }}
              >
                ▲
              </span>
              <span>ASCENDING EXPRESS</span>
            </div>

            <div style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>
              SPEED: <span style={{ color: '#ff4d5a', fontWeight: 900 }}>{velocity}</span> M/S
            </div>
          </div>

          {/* MAIN DIGITAL LED SEGMENTED READOUT PANEL */}
          <div
            style={{
              background: '#06090e',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: 'inset 0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0,0,0,0.4)',
              padding: '1.25rem 1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* LED Matrix Screen Scanlines */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 3px)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Glowing Big Digital Floor Readout */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', zIndex: 3 }}>
              <div
                style={{
                  fontSize: '3.6rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "'Courier New', Courier, monospace",
                  color: '#ff2a3a',
                  textShadow: '0 0 16px rgba(255, 42, 58, 0.9), 0 0 32px rgba(230, 0, 18, 0.5), 0 0 4px #ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                {currentFloor.num}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: '#ff808b', fontWeight: 800, letterSpacing: '0.1em' }}>
                  LEVEL
                </span>
                <span style={{ fontSize: '0.62rem', color: '#64748b', fontFamily: 'monospace' }}>
                  {currentFloor.code}
                </span>
              </div>
            </div>

            {/* Floor Name & Live Destination Description */}
            <div style={{ textAlign: 'right', maxWidth: '62%', zIndex: 3 }}>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                }}
              >
                {currentFloor.name}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#94a3b8',
                  marginTop: '0.25rem',
                  lineHeight: 1.3,
                }}
              >
                {currentFloor.tag}
              </div>
            </div>
          </div>

          {/* 7. BRUSHED METAL CALL BUTTON DECK (1F to ROOF with illuminated halo rings) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '0.6rem',
              marginTop: '1.25rem',
              position: 'relative',
              zIndex: 3,
            }}
          >
            {FLOORS.map((f, idx) => {
              const isPastOrCurrent = idx <= currentFloorIdx;
              const isCurrent = idx === currentFloorIdx;

              return (
                <div
                  key={f.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: isCurrent
                        ? 'radial-gradient(circle at 35% 30%, #ff4d5a, #b3000d)'
                        : isPastOrCurrent
                        ? 'radial-gradient(circle at 35% 30%, #3b4252, #1f2430)'
                        : 'radial-gradient(circle at 35% 30%, #202734, #0f141d)',
                      border: isCurrent
                        ? '2px solid #ffffff'
                        : isPastOrCurrent
                        ? '1.5px solid rgba(230, 0, 18, 0.7)'
                        : '1.5px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: isCurrent
                        ? '0 0 18px rgba(255, 42, 58, 0.85), inset 0 2px 4px rgba(255,255,255,0.4)'
                        : isPastOrCurrent
                        ? '0 0 10px rgba(230, 0, 18, 0.35), inset 0 1px 2px rgba(255,255,255,0.2)'
                        : 'inset 0 2px 4px rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      color: isCurrent ? '#ffffff' : isPastOrCurrent ? '#ffd4d8' : '#64748b',
                      transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    {f.num}
                  </div>
                  <span
                    style={{
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      color: isCurrent ? '#ff4d5a' : isPastOrCurrent ? '#cbd5e1' : '#475569',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {f.id}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 8. LASER TRANSIT PROGRESS TRACK */}
          <div style={{ marginTop: '1.35rem', position: 'relative', zIndex: 3 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.68rem',
                color: '#94a3b8',
                marginBottom: '0.4rem',
                fontFamily: 'monospace',
              }}
            >
              <span>SHAFT TRAVEL DISTANCE</span>
              <span style={{ color: '#f8fafc', fontWeight: 900 }}>{progress}%</span>
            </div>

            {/* Recessed Laser Track Bar */}
            <div
              style={{
                height: '8px',
                width: '100%',
                background: '#090d15',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              {/* Glowing Laser Red Fill Bar */}
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #b3000d 0%, #ff1a2b 75%, #ffffff 100%)',
                  borderRadius: '9999px',
                  boxShadow: '0 0 12px rgba(255, 26, 43, 0.9)',
                  transition: 'width 0.05s linear',
                }}
              />
            </div>
          </div>
        </div>

        {/* 9. LASER-ENGRAVED ARCHITECTURAL SPECIFICATION PLATE */}
        <div
          style={{
            marginTop: '1.25rem',
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.6) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            padding: '0.65rem 1.25rem',
            textAlign: 'center',
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            color: '#94a3b8',
            textTransform: 'uppercase',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            lineHeight: 1.5,
          }}
        >
          <div style={{ color: '#cbd5e1', fontWeight: 800 }}>
            RUNDA MALL NAIROBI • 3F FLAGSHIP CONCOURSE
          </div>
          <div style={{ color: '#64748b', fontSize: '0.58rem', marginTop: '2px', fontFamily: 'monospace' }}>
            CAPACITY: 1,200 KG • 16 PERSONS • OTIS ARCHITECTURAL GLASS SERIES
          </div>
        </div>
      </div>

      {/* 10. REALISTIC GLASS ELEVATOR DOORS (Slide open at 3.5s arrival) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 30,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Left Elevator Sliding Door */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 90%, rgba(255, 255, 255, 0.18) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '8px 0 24px rgba(0,0,0,0.8)',
            transform: doorsOpening ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'transform 0.48s cubic-bezier(0.7, 0, 0.3, 1)',
          }}
        />

        {/* Right Elevator Sliding Door */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(270deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 90%, rgba(255, 255, 255, 0.18) 100%)',
            backdropFilter: 'blur(20px)',
            borderLeft: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '-8px 0 24px rgba(0,0,0,0.8)',
            transform: doorsOpening ? 'translateX(100%)' : 'translateX(0)',
            transition: 'transform 0.48s cubic-bezier(0.7, 0, 0.3, 1)',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.4; transform: translateY(-2px); }
        }
      `}</style>
    </aside>
  );
}
