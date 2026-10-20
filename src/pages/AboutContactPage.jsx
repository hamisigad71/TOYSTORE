import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQ_ITEMS } from '../data/toys';
import { ShieldIcon, CheckIcon, SparklesIcon } from '../components/Icons';

export default function AboutContactPage() {
  const { showToast, navigate } = useStore();
  const [openFaq, setOpenFaq] = useState(0);
  const [inquiryType, setInquiryType] = useState('Franchise / Store Partnership Inquiry');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent to The Gents Dollhouse Retail Team!');
    setSenderName('');
    setSenderEmail('');
    setMessage('');
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* Brand Story Hero */}
      <div
        style={{
          background: 'var(--brand-navy)',
          color: '#fff',
          padding: '2.5rem',
          marginBottom: '2.5rem'
        }}
      >
        <span className="badge badge-amber">BRAND CONCEPT &amp; SAFETY PLEDGE</span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, marginTop: '0.5rem' }}>
          About The Gents Dollhouse: The Miniso-Style Toy &amp; Model Emporium
        </h1>
        <p style={{ fontSize: '0.96rem', color: '#cbd5e1', maxWidth: '760px', marginTop: '0.6rem', lineHeight: 1.65 }}>
          Inspired by Miniso’s high-traffic, impulse-friendly retail format, <strong>The Gents Dollhouse</strong> reimagines how boys, dads, builders, and hobbyists shop for toys. Instead of cluttered warehouse aisles, our store is structured into <strong>6 themed floors</strong>, from <em>1F The Speed Garage</em> to <em>4F Mystery Capsule Alley</em>, offering 100% wholesome, safety-certified toys at accessible pocket prices.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1rem',
            marginTop: '1.75rem'
          }}
        >
          {[
            { metric: '70% Under KSh 3,200', desc: 'Miniso-inspired impulse pricing architecture' },
            { metric: 'ASTM & EN71', desc: '100% certified non-toxic family-safe toys' },
            { metric: 'Runda Mall 3F', desc: 'Curated room-by-room retail merchandising' },
            { metric: 'Weekly Drops', desc: 'New blind-box series & die-cast castings' }
          ].map((item) => (
            <div
              key={item.metric}
              style={{
                padding: '1.1rem',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fbbf24' }}>{item.metric}</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.2rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion + Contact / Franchise Form */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {/* Left: Interactive FAQ */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem'
          }}
        >
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-elevated)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '0.95rem 1.1rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{item.q}</span>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 900 }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.1rem 1rem',
                        fontSize: '0.83rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Customer Support & Franchise Inquiry Form */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem'
          }}
        >
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
            Contact Support & Retail Franchise Desk
          </h2>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginTop: '0.2rem', marginBottom: '1.25rem' }}>
            Have a question about an order, wholesale distribution, or opening a Gents Dollhouse branch? Send us a message below.
          </p>

          <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                Inquiry Topic
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="input-field"
              >
                <option>Franchise / Store Partnership Inquiry</option>
                <option>Order Support & Toy Warranty</option>
                <option>Bulk Birthday / Corporate Toy Bundles</option>
                <option>Supplier & Toy Designer Submission</option>
              </select>
            </div>

            <input
              type="text"
              required
              placeholder="Your Name or Company"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="input-field"
            />

            <input
              type="email"
              required
              placeholder="Your Email Address"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="input-field"
            />

            <textarea
              rows={4}
              required
              placeholder="How can our team help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field"
            />

            <button type="submit" className="btn btn-primary">
              Send Message to Retail Desk →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

