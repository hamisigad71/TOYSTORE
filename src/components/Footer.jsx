import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { navigate } = useStore();

  const footerMenu = [
    { label: 'Shop All 6 Floors', page: 'shop' },
    { label: 'Mystery Capsule Studio', page: 'blindbox' },
    { label: '3-Toy Bundle Builder', page: 'bundles' },
    { label: 'Runda Mall 3rd Floor', page: 'stores' },
    { label: 'Contact & Customer Care', page: 'contact' },
    { label: 'Orders & Collector Vault', page: 'account' }
  ];

  return (
    <footer className="site-footer">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          minHeight: '520px'
        }}
      >
        {/* Left Half: Cropped Close-up Photograph of Subject */}
        <div style={{ overflow: 'hidden', minHeight: '340px', background: '#000' }}>
          <img
            src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=1200&q=80"
            alt="Close-up die-cast metal racer from The Gents Dollhouse"
            style={{
              width: '125%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* Right Half: Large Stacked Menu + Contact & Legal */}
        <div
          style={{
            padding: '4rem 2.5rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--brand-navy)',
            color: '#f7f7f5'
          }}
        >
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fed878', marginBottom: '2rem' }}>
              THE GENTS DOLLHOUSE • RUNDA MALL 3RD FLOOR
            </div>

            <nav
              aria-label="Footer navigation"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
            >
              {footerMenu.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.page)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f7f7f5',
                    fontFamily: 'var(--font-google-display)',
                    fontSize: 'clamp(1.55rem, 2.4vw, 2.35rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.75rem',
                marginTop: '3.25rem',
                fontSize: '0.94rem',
                lineHeight: 1.6
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: '#fed878' }}>Customer Care Desk</div>
                <div>
                  Phone / WhatsApp:{' '}
                  <a href="tel:0742630973" style={{ color: '#ffffff', fontWeight: 700 }}>
                    0742630973
                  </a>
                </div>
                <div>
                  Email:{' '}
                  <a href="mailto:thegenttoystore@gmail.com" style={{ color: '#ffffff' }}>
                    thegenttoystore@gmail.com
                  </a>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#fed878' }}>Flagship Store</div>
                <div>Runda Mall, 3rd Floor (Main Atrium Wing)</div>
                <div>Mon to Sun: 9:00 AM to 8:30 PM</div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '3rem',
              fontSize: '0.82rem',
              color: '#94a3b8',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}
          >
            <span>© 2026 The Gents Dollhouse • Runda Mall, 3rd Floor • 0742630973</span>
            <span>ASTM F963 &amp; CE EN71 Certified Wholesome Toys</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
