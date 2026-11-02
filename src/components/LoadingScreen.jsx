import React, { useState, useEffect } from 'react';

const LOADING_STEPS = [
  { text: 'Stocking 1F Speed Garage die-cast metal models...', floor: '1F' },
  { text: 'Interlocking 2F 880-pc mechanical steam gears...', floor: '2F' },
  { text: 'Calibrating 3F Titan Mecha 32-joint articulation...', floor: '3F' },
  { text: 'Charging 4F Mystery Blind Box 1:72 gold chase odds...', floor: '4F' },
  { text: 'Tensioning 5F magnetic competition speed cubes...', floor: '5F' },
  { text: 'Pre-flight check for Roof Sky Arena quadcopters...', floor: 'ROOF' },
  { text: 'Ready! Welcome to The Gents Dollhouse Runda Mall 3F!', floor: 'FLAGSHIP' }
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Fast, smooth realistic progress ramp
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 500);
          }, 300);
          return 100;
        }

        const increment = Math.floor(Math.random() * 12) + 6;
        const next = Math.min(100, prev + increment);
        
        // Update phrase according to progress
        const step = Math.min(
          LOADING_STEPS.length - 1,
          Math.floor((next / 100) * LOADING_STEPS.length)
        );
        setStepIdx(step);

        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onFinish]);

  const currentStep = LOADING_STEPS[stepIdx];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0f1419',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFading ? 'none' : 'auto'
      }}
    >
      {/* Decorative Background Glow */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(230,0,18,0.25) 0%, rgba(0,0,0,0) 70%)',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Logo & Animated Capsule Box */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          zIndex: 1
        }}
      >
        {/* Animated Miniso Brand Mark */}
        <div
          style={{
            width: '74px',
            height: '74px',
            background: '#e60012',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 30px rgba(230, 0, 18, 0.45)',
            transform: 'scale(1)',
            animation: 'pulseBrand 2s infinite ease-in-out'
          }}
        >
          <span style={{ fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.04em', lineHeight: 1 }}>
            GENTS
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: 900, marginTop: '3px', lineHeight: 1 }}>
            TOYS
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-google-display, sans-serif)',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#ffffff'
            }}
          >
            The Gents Dollhouse
          </h1>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#94a3b8',
              marginTop: '0.35rem',
              fontWeight: 500
            }}
          >
            Flagship 6-Floor Toy &amp; Mystery Capsule Emporium • Runda Mall 3F
          </p>
        </div>

        {/* Progress Bar Container */}
        <div
          style={{
            width: 'min(90vw, 360px)',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            height: '8px',
            overflow: 'hidden',
            marginTop: '1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #e60012 0%, #fbbf24 100%)',
              borderRadius: '9999px',
              transition: 'width 0.12s ease-out'
            }}
          />
        </div>

        {/* Percentage & Step Indicator */}
        <div
          style={{
            width: 'min(90vw, 360px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            color: '#cbd5e1'
          }}
        >
          <span
            style={{
              background: 'rgba(230, 0, 18, 0.2)',
              color: '#f87171',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              fontWeight: 800,
              fontSize: '0.72rem'
            }}
          >
            {currentStep.floor}
          </span>
          <span
            style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              color: '#fbbf24',
              fontSize: '0.85rem'
            }}
          >
            {progress}%
          </span>
        </div>

        {/* Ticker Text */}
        <p
          style={{
            fontSize: '0.84rem',
            color: '#94a3b8',
            textAlign: 'center',
            minHeight: '2.4rem',
            maxWidth: '340px',
            lineHeight: 1.4,
            transition: 'all 0.2s ease'
          }}
        >
          {currentStep.text}
        </p>

        {/* Skip Button */}
        <button
          type="button"
          onClick={() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 300);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            fontSize: '0.75rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginTop: '0.5rem',
            padding: '0.4rem 0.8rem'
          }}
        >
          Skip into Store →
        </button>
      </div>

      <style>{`
        @keyframes pulseBrand {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 12px 30px rgba(230, 0, 18, 0.45);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 16px 40px rgba(230, 0, 18, 0.65);
          }
        }
      `}</style>
    </div>
  );
}

