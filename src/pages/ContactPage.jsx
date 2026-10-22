import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQ_ITEMS } from '../data/toys';
import {
  MapPinIcon,
  ShieldIcon,
  CheckIcon,
  TruckIcon,
  SparklesIcon,
  ArrowRightIcon
} from '../components/Icons';

export default function ContactPage() {
  const { showToast, navigate } = useStore();
  const [openFaq, setOpenFaq] = useState(0);

  // Support Ticket Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [topic, setTopic] = useState('Order Status & Express Delivery');
  const [channel, setChannel] = useState('WhatsApp (0742630973)');
  const [message, setMessage] = useState('');

  // Persisted Customer Support Tickets
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('tgd_support_tickets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tgd_support_tickets', JSON.stringify(tickets));
    } catch {
      // ignore storage errors
    }
  }, [tickets]);

  const copyToClipboard = (text, label) => {
    try {
      navigator.clipboard.writeText(text);
      showToast(`Copied ${label}: ${text}`);
    } catch {
      showToast(`${label}: ${text}`);
    }
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !message.trim()) return;

    const newTicket = {
      id: `CARE-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      fullName,
      phone,
      email,
      orderId: orderId.trim() || 'General Inquiry',
      topic,
      channel,
      message,
      status: 'Assigned to Runda Mall 3rd Floor Desk'
    };

    setTickets((prev) => [newTicket, ...prev]);
    showToast(`Support Ticket #${newTicket.id} created! Our Customer Care team (0742630973) will respond shortly.`);
    setFullName('');
    setPhone('');
    setEmail('');
    setOrderId('');
    setMessage('');
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      {/* 1. HERO BANNER: REAL CUSTOMER CARE & RUNDA MALL 3RD FLOOR HEADQUARTERS */}
      <section
        style={{
          background: 'var(--brand-navy)',
          color: '#ffffff',
          padding: '2.5rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', padding: '0.3rem 0.85rem', fontSize: '0.75rem', fontWeight: 800 }}>
              <span>CUSTOMER CARE DESK ONLINE NOW</span>
              <span>•</span>
              <span>RUNDA MALL, 3RD FLOOR</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)', fontWeight: 900, marginTop: '0.75rem', lineHeight: 1.15 }}>
              Contact &amp; Customer Care Center
            </h1>

            <p style={{ fontSize: '0.96rem', color: '#cbd5e1', marginTop: '0.65rem', lineHeight: 1.65 }}>
              Need help tracking a toy box delivery, checking stock on a die-cast model or brick set, or reserving a birthday build table? Reach our friendly team directly by phone, WhatsApp, email, or visit our flagship store at <strong>Runda Mall, 3rd Floor</strong>.
            </p>
          </div>

          {/* Quick Direct Call / WhatsApp Box */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '1.5rem',
              minWidth: '280px'
            }}
          >
            <div style={{ fontSize: '0.74rem', color: '#fed878', fontWeight: 800 }}>
              Direct Customer Care Hotline
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '0.2rem', letterSpacing: '-0.01em' }}>
              0742 630 973
            </div>
            <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: '0.15rem' }}>
              thegenttoystore@gmail.com
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.25rem' }}>
              Runda Mall, 3rd Floor • Mon to Sun: 9:00 AM to 8:30 PM
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <a
                href="tel:0742630973"
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.55rem 0.85rem', fontSize: '0.78rem', textDecoration: 'none' }}
              >
                Call Now
              </a>
              <a
                href="https://wa.me/254742630973"
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  fontSize: '0.78rem',
                  background: '#059669',
                  color: '#fff',
                  textDecoration: 'none'
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE DIRECT CONTACT CHANNELS (PHONE, EMAIL, LOCATION) */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        {/* Card 1: Phone & WhatsApp */}
        <div
          style={{
            background: 'var(--bg-surface)',
            borderTop: '4px solid var(--brand-primary)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span className="badge badge-red">PHONE &amp; WHATSAPP CARE</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '0.6rem' }}>
              Customer Care Line
            </h2>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--brand-primary)', marginTop: '0.35rem' }}>
              0742630973
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.45rem', lineHeight: 1.55 }}>
              Call or WhatsApp our Runda Mall customer care specialists for instant help with M-Pesa orders, same-day motorbike delivery, or toy stock checks.
            </p>
            <ul style={{ listStyle: 'none', marginTop: '0.85rem', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <li>Average phone pickup: <strong>Under 30 seconds</strong></li>
              <li>WhatsApp photo/video toy previews available</li>
              <li>Direct M-Pesa &amp; express dispatch assistance</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem' }}>
            <a href="tel:0742630973" className="btn btn-primary" style={{ flex: 1, fontSize: '0.8rem' }}>
              Call 0742630973
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard('0742630973', 'Customer Care Number')}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem' }}
            >
              Copy Number
            </button>
          </div>
        </div>

        {/* Card 2: Official Email Address */}
        <div
          style={{
            background: 'var(--bg-surface)',
            borderTop: '4px solid #2563eb',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span className="badge badge-blue">OFFICIAL EMAIL DESK</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '0.6rem' }}>
              Email Customer Support
            </h2>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#2563eb', marginTop: '0.5rem', wordBreak: 'break-all' }}>
              thegenttoystore@gmail.com
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.55rem', lineHeight: 1.55 }}>
              Send us order receipts, corporate or birthday bulk gift inquiries, warranty replacement requests, or supplier &amp; franchise proposals.
            </p>
            <ul style={{ listStyle: 'none', marginTop: '0.85rem', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <li>Guaranteed email response within <strong>2 business hours</strong></li>
              <li>Official invoices &amp; school/party bundle quotes</li>
              <li>30-day hassle-free toy warranty &amp; replacement</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem' }}>
            <a
              href="mailto:thegenttoystore@gmail.com?subject=Customer%20Care%20Inquiry%20-%20The%20Gents%20Dollhouse"
              className="btn btn-primary"
              style={{ flex: 1, fontSize: '0.8rem', background: '#2563eb' }}
            >
              Send Email Now
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard('thegenttoystore@gmail.com', 'Email Address')}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem' }}
            >
              Copy Email
            </button>
          </div>
        </div>

        {/* Card 3: Runda Mall 3rd Floor Flagship Location */}
        <div
          style={{
            background: 'var(--bg-surface)',
            borderTop: '4px solid #059669',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span className="badge badge-emerald">PHYSICAL FLAGSHIP STORE</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '0.6rem' }}>
              Visit Us in Person
            </h2>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#059669', marginTop: '0.35rem' }}>
              Runda Mall, 3rd Floor
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.45rem', lineHeight: 1.55 }}>
              Located on the <strong>3rd Floor of Runda Mall</strong> (Main Atrium Wing, off Kiambu Road / Runda). Experience all 6 themed toy zones, our Mystery Capsule wall, and our 30-minute Click &amp; Collect counter.
            </p>
            <ul style={{ listStyle: 'none', marginTop: '0.85rem', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <li><strong>Hours:</strong> Monday to Sunday, 9:00 AM to 8:30 PM</li>
              <li><strong>Access:</strong> Direct panoramic lift &amp; escalator to 3rd Floor</li>
              <li><strong>Parking:</strong> Ample secure mall parking available</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              type="button"
              onClick={() => navigate('stores')}
              className="btn btn-primary"
              style={{ flex: 1, fontSize: '0.8rem', background: '#059669' }}
            >
              Book a 3rd Floor Build Table →
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard('The Gents Dollhouse, Runda Mall, 3rd Floor, Nairobi', 'Store Address')}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem' }}
            >
              Copy Address
            </button>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTACT GRID: LEFT SUPPORT TICKET FORM + RIGHT RUNDA MALL 3RD FLOOR MAP & DIRECTORY */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}
      >
        {/* Left: Interactive Customer Care Message & Ticket Generator */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span className="badge badge-red">DIRECT MESSAGE TO CUSTOMER CARE</span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '0.45rem' }}>
            Send Us a Message or Open a Support Ticket
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
            Fill out the form below and our Runda Mall 3rd Floor Customer Care team (<strong>0742630973</strong> / <strong>thegenttoystore@gmail.com</strong>) will get right back to you.
          </p>

          <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hamisi M."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Your Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Order Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. TGD-84910"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  How Can We Help?
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="input-field"
                >
                  <option>Order Status &amp; Express Delivery</option>
                  <option>Reserve Item for Runda Mall 3rd Floor Pickup</option>
                  <option>Toy Warranty, Exchange or Missing Brick Piece</option>
                  <option>Birthday Party / Bulk 3-Toy Gift Bundles</option>
                  <option>Wholesale &amp; Franchise Store Inquiry</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Preferred Reply Channel
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="input-field"
                >
                  <option>WhatsApp (0742630973)</option>
                  <option>Direct Phone Call (0742630973)</option>
                  <option>Email (thegenttoystore@gmail.com)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                Message or Inquiry Details *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us which toy, order number, or question we can help you with..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem', fontSize: '0.92rem' }}>
              Submit Customer Care Request →
            </button>
          </form>

          {/* Active Submitted Tickets */}
          {tickets.length > 0 && (
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Your Recent Customer Care Tickets ({tickets.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid #10b981',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                      <span style={{ color: '#059669' }}>Ticket #{t.id} • {t.topic}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{t.createdAt}</span>
                    </div>
                    <div style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                      Reply via <strong>{t.channel}</strong> • Status: <strong>{t.status}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Interactive Runda Mall 3rd Floor Map, Directions & Store Desk Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Visual Location Map Card */}
          <div
            style={{
              background: 'var(--bg-surface)',
              overflow: 'hidden'
            }}
          >
            {/* Interactive Stylized Mall Floor & Location Map Header */}
            <div
              style={{
                background: 'var(--brand-navy)',
                color: '#fff',
                padding: '1.75rem',
                position: 'relative'
              }}
            >
              <span className="badge badge-emerald">STORE &amp; PICKUP LOCATION MAP</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginTop: '0.45rem' }}>
                Runda Mall, 3rd Floor, Main Atrium
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                The Gents Dollhouse Flagship Toy Store &amp; Customer Care Desk
              </p>

              {/* Visual 3rd Floor Mall Schematic */}
              <div
                style={{
                  marginTop: '1.25rem',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.07)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.6rem',
                  textAlign: 'center',
                  fontSize: '0.75rem'
                }}
              >
                <div style={{ padding: '0.65rem', background: 'rgba(255,255,255,0.08)' }}>
                  <div style={{ fontWeight: 800, color: '#94a3b8' }}>3F NORTH WING</div>
                  <div style={{ marginTop: '0.2rem' }}>Escalators &amp; Glass Lifts</div>
                </div>
                <div
                  style={{
                    padding: '0.65rem',
                    background: 'rgba(225, 29, 72, 0.35)',
                    border: '2px solid #fed878'
                  }}
                >
                  <div style={{ fontWeight: 900, color: '#fed878' }}>SUITE 301-304</div>
                  <div style={{ fontWeight: 800, marginTop: '0.15rem' }}>THE GENTS DOLLHOUSE</div>
                </div>
                <div style={{ padding: '0.65rem', background: 'rgba(255,255,255,0.08)' }}>
                  <div style={{ fontWeight: 800, color: '#94a3b8' }}>3F ATRIUM</div>
                  <div style={{ marginTop: '0.2rem' }}>Click &amp; Collect Counter</div>
                </div>
              </div>
            </div>

            {/* Getting Here & Customer Care Hours */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div style={{ padding: '0.85rem', background: 'var(--bg-elevated)' }}>
                  <div style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    PHYSICAL ADDRESS
                  </div>
                  <div style={{ fontWeight: 800, marginTop: '0.2rem' }}>
                    Runda Mall, 3rd Floor
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    Kiambu Rd / Runda Entrance, Nairobi
                  </div>
                </div>

                <div style={{ padding: '0.85rem', background: 'var(--bg-elevated)' }}>
                  <div style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    OPENING HOURS
                  </div>
                  <div style={{ fontWeight: 800, marginTop: '0.2rem' }}>
                    Mon to Sun: 9:00 AM to 8:30 PM
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#059669', fontWeight: 700 }}>
                    Open Weekends &amp; Public Holidays
                  </div>
                </div>
              </div>

              <div style={{ padding: '0.9rem 1rem', background: 'var(--bg-elevated)' }}>
                <div style={{ fontWeight: 800, marginBottom: '0.35rem' }}>
                  Directions to Our 3rd Floor Store:
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Enter <strong>Runda Mall</strong> via the main ground atrium or basement parking lifts. Take the central panoramic elevator or escalator straight up to the <strong>3rd Floor</strong>. You will spot our signature crimson and gold <strong>The Gents Dollhouse</strong> storefront right across from the 3rd floor atrium walkway.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Department Contacts Table */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              Quick Customer Care Directory
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              {[
                { dept: 'Customer Care & Order Tracking', contact: '0742630973', sub: 'Call or WhatsApp (Instant Response)' },
                { dept: 'Official Store Email Desk', contact: 'thegenttoystore@gmail.com', sub: 'Orders, Receipts & Bulk Quotes' },
                { dept: 'In-Store Pickup & Returns Counter', contact: 'Runda Mall, 3rd Floor', sub: 'Ready in 30 Mins • Free Gift Wrap' }
              ].map((row) => (
                <div
                  key={row.dept}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    background: 'var(--bg-elevated)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{row.dept}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{row.sub}</div>
                  </div>
                  <strong style={{ color: 'var(--brand-primary)' }}>{row.contact}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED CUSTOMER CARE QUESTIONS */}
      <section
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>
          Customer Care Frequently Asked Questions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '0.85rem' }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-elevated)',
                  padding: '1rem'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ color: 'var(--brand-primary)' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.6rem', lineHeight: 1.55 }}>
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

